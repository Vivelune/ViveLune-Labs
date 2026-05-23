"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { usewebinarStore } from '@/store/useWebinarStore'
import { PlusIcon } from 'lucide-react'
import MultiStepForm from './MultiStepForm'
import { useState } from 'react'
import BasicInfoStep from './BasicInfoStep'
import CTAStep from './CTAStep'
import AdditionalInfoStep from './AdditionalInfoStep'

type Props = {
    
}

const CreateWebinarButton = (props: Props) => {

    const {isModalOpen, setModalOpen, isComplete, setComplete} = usewebinarStore()

    const [webinarLink, setWebinarLink] = useState("")

    const steps = [

    {
    id: "basicInfo",
    title: "Basic Information", 
    description: "Please fill out the standard info needed for your webinar" ,
    component: <BasicInfoStep/>,
    },
    {
        id: "cta",
        title: "CTA", 
        description: "Please provide the end-point for your customers through your webinar" ,
        component: <CTAStep
                    assistants={[]}
                    stripeProducts={[]}
        
        />,
        },

        {
            id: "additionalInfo",
            title: "Additional Information", 
            description: "Please fill out information about additional options if necessary" ,
            component: <AdditionalInfoStep/>,
            },

    ]

    const handleComplete = (webinarId : string )=> {
        setComplete(true)
        setWebinarLink(`${process.env.NEXT_PUBLIC_BASE_URL}/live-webinar/${webinarId}`)
    }

    

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger  >
        <div
        
        className="rounded-xl flex gap-2 items-center cursor-pointer px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm text-sm font-normal text-primary hover:bg-primary/20">
        <PlusIcon className='w-4 h-4'/>
        Create Learning Session
</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] p-0 bg-transparent border-none">
            
        
            {isComplete ? 
            (
                
                <div className='bg-muted text-primary rounded-lg overflow-hidden'>
                    <DialogHeader className="p-6">
                        <DialogTitle className="sr-only">
                            Webinar Created
                            {/* SUCCESS STEP */}
                        </DialogTitle>
                    </DialogHeader>
                    </div>
            )
           : 
            (
                <>
                <DialogHeader className="p-6">
                    <DialogTitle className="text-xl font-semibold">
                        Create Learning Session
                    </DialogTitle>
                        <p className="text-sm text-muted-foreground">
                        Set up a live class or upload content to start teaching.
                        </p>
                </DialogHeader>
                <MultiStepForm
                steps={steps}
                onComplete={handleComplete}
                />
                </>
            )}
         
        
        
        </DialogContent>
    </Dialog>
  )
}

export default CreateWebinarButton