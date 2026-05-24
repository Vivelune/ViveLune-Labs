import { getWebinarAttendance } from '@/actions/attendance'
import PageHeader from '@/components/ResuableComponents/PageHeader'
import { AttendedTypeEnum } from '@/lib/generated/prisma/enums'
import { CloudLightning, HomeIcon, Webcam } from 'lucide-react'
import React from 'react'
import PipelineLayout from './_components/PipelineLayout'
import { formatColumnTitle } from './_components/utils'

type Props = {
    params:Promise<{
        webinarId : string
    }>
}

const page = async ({params}: Props) => {
  
    const {webinarId} = await params
    const pipelineData = await getWebinarAttendance(webinarId)

    if(!pipelineData.data){
        return(
            <div className='text-3xl h-[400px] flex justify-center items-center'>
                No Pipelines Found
            </div>
        )
    }
  
    return (
        <div className='w-full flex flex-col gap8'>
            <PageHeader
            leftIcon={<HomeIcon className="w-3 h-3"/>}
            mainIcon={<Webcam className='w-12 h-12'/>}
            rightIcon={<CloudLightning className='w-4 h-4'/>}
            heading="Keep Track of all your students"
            placeholder="Search Name, Tag, Email..."/>

            <div className='flex overflow-x-auto mt-8 pb-4 gap-4 md:gap-6'>
                {Object.entries(pipelineData.data).map(([columnType, columnData])=>(
                    <PipelineLayout
                    key={columnType}
                    title={formatColumnTitle(columnType as AttendedTypeEnum)}
                    count={columnData.count}
                    users={columnData.user}
                    tags={pipelineData.webinarTags}
                    /> 
                ))}

            </div>

        </div>
    )
}

export default page