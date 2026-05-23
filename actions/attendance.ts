"use server"

import { AttendedTypeEnum, CtaTypeEnum } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma"
import { AttendanceData } from "@/lib/type";
import { revalidatePath } from "next/cache";

 export const getWebinarAttendance =  async ( webinarId : string,
    options:{
        includeUsers?:boolean;
        userLimit?: number
    } = {includeUsers : true, userLimit : 100}
 ) => {
    try {
        const webinar = await prisma.webinar.findUnique({

            where: { id : webinarId},
            select : {
                id: true, 
                ctaType: true,
                tags: true,
                _count:{
                    select:{
                        attendances : true
                    }
                }
            }
        })

        if(!webinar){
            return {
                success : false,
                status : 404, 
                error : "Webinar Not Found"
            }
        }


        const attendanceCounts = await prisma.attendance.groupBy({
            by: ['attendedType'],
            where : {
                webinarId
            },
            _count : {
                attendedType : true
            },

        })

        const result : Record<AttendedTypeEnum, AttendanceData> = {} as Record<AttendedTypeEnum, AttendanceData>


        for(const type of Object.values(AttendedTypeEnum)){
            if(type === AttendedTypeEnum.ADDED_TO_CART && 
            webinar.ctaType === CtaTypeEnum.BOOK_A_CLASS
            )
            continue

            if(type === AttendedTypeEnum.BREAKOUT_ROOM && 
                webinar.ctaType !== CtaTypeEnum.BOOK_A_CLASS
                )

            continue

            const countItem = attendanceCounts.find((item) => {
                if(webinar.ctaType === CtaTypeEnum.BOOK_A_CLASS && 
                    type === AttendedTypeEnum.BREAKOUT_ROOM &&
                    item.attendedType === AttendedTypeEnum.ADDED_TO_CART
                    ){
                        return true
                    }

                    return item.attendedType === type
            })

            result[type] = {
                count : countItem ? countItem._count.attendedType : 0,
                user: [],
            }


        }

        if(options.includeUsers){
            for(const type of Object.values(AttendedTypeEnum)){
                if(type === AttendedTypeEnum.ADDED_TO_CART && 
                    webinar.ctaType === CtaTypeEnum.BOOK_A_CLASS
                
                    ||
                    (
                        type === AttendedTypeEnum.BREAKOUT_ROOM &&
                        webinar.ctaType !== CtaTypeEnum.BOOK_A_CLASS
                    )
                )
                    {
                        continue
                    }

                    const queryType = webinar.ctaType === CtaTypeEnum.BOOK_A_CLASS &&
                    type === AttendedTypeEnum.BREAKOUT_ROOM
                    ? AttendedTypeEnum.ADDED_TO_CART
                    : type
                       
                    if(result[type].count > 0){
                         const attendances = await prisma.attendance.findMany({
                            where:{
                                webinarId,
                                attendedType: queryType
                            },
                            include:{
                                user: true
                            },
                            take: options.userLimit,
                            orderBy:{
                                joinedAt : 'desc'
                            }
                         })


                         result[type].user = attendances.map((attendance)=>({
                            id: attendance.user.id,
                            name: attendance.user.name,
                            email: attendance.user.email,
                            attendedAt : attendance.joinedAt,
                            stripeConnectId : null,
                            callStatus : attendance.user.callStatus
                         }))
                    }

                    }
        }

        // revalidatePath(`/webinars/${webinarId}/pipeline`)

        return {
            success : true, 
            data: result,
            ctaType : webinar.ctaType,
            webinarTags : webinar.tags || [] 
        }



    } catch (error) {
        console.error('Failed to fetch attendance data: ', error)
        return{
            success: false,
            error : 'Failed to fetch attendance data',
        }
        
    }
 }