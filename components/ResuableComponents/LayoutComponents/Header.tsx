"use client"
import { Button } from '@/components/ui/button'
import { User } from '@/lib/generated/prisma/client'
import { ArrowLeft, Bolt, CloudLightning, Lightbulb, PlusSquare } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import PurpleIcon from './PurpleIcon'
import CreateWebinarButton from '../CreateWebinarButton'

type Props = {
    user:User
}

// TODO: STRIPE SUBSCRIPTION, ASSISTANT
const Header = ({user}:Props) => {
    const pathname = usePathname()
    const router = useRouter()
    return (
        <div className="w-full px-4 pt-10 sticky mb-4 top-0 z-10 flex justify-between items-center flex-wrap gap-4 bg-background">
            {pathname.includes("pipline")? 
            (
                <Button
                className="bg-primary/10 border border-border rounded-x1"
                variant="outline"
                onClick={() => router.push('/webinar')}
                >
                <ArrowLeft />
                Back to Webinars
                </Button>       
            ): 
            (
                < div className="px-4 py-2 flex justify-center text-bold items-center rounded-xl bg-background border border-border
                text-primary capitalize">
     {pathname.split('/')[1]}
                </div>
            )
            }

            {/* TODO BUILD STRIPE SUBSCRIPTION AND CREATE WEBINAR BUTTON */}
            <div className='flex gap-6 items-center flex-wrap'>
                <PurpleIcon>
                <CloudLightning/>
                </PurpleIcon>



                {/* TODO ADD STRIPE SUBSCRIPTION AND CREATE WEBINAR BUTTON  */}


                <CreateWebinarButton/>

            </div>

            </ div>
        )
}

export default Header