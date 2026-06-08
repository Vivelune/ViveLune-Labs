"use client"
import type { User, Webinar } from '@/lib/generated/prisma/client'
import { WebinarStatusEnum } from '@/lib/generated/prisma/enums'
import React, { useEffect } from 'react'
import WebinarUpcomingState from './UpcomingWebinar/WebinarUpcomingState'
import { usePathname, useRouter } from 'next/navigation'
import { useAttendeeStore } from '@/store/useAttendeeStore'
import { toast } from 'sonner'

type Props = {
    error: string | undefined
    user : User  | null
    webinar : Webinar
    apiKey : string 
    token : string 
    callId : string
}

const RenderWebinar = ({apiKey, error, user, webinar , token, callId }: Props) => {

  const router = useRouter()
  const pathname = usePathname()

  const {attendee} = useAttendeeStore()

  useEffect(()=>{
    if(error){
      toast.error(error)
      router.push(pathname)
    }
  }, [error, pathname, router])


  return (

    // Build Waiting Room and Live Webinar
    <React.Fragment>
        {
            webinar.webinarStatus === WebinarStatusEnum.SCHEDULED ? 
            (
                <WebinarUpcomingState
                webinar={webinar}
                currentUser= {user || null}
                />
            )
            :
             webinar.webinarStatus === WebinarStatusEnum.WAITING_ROOM ? (
              <WebinarUpcomingState
              webinar={webinar}
              currentUser={user || null}
              />
             ): webinar.webinarStatus === WebinarStatusEnum.LIVE ? (
                // TODO : Add livestream component and webinar stuff
                <React.Fragment>
                  {user?.id === webinar.presenterId ? (
                    // <LiveStreamState
                    // apiKey={apiKey}
                    // token={token}
                    // callId={callId}
                    // />
                    "Livestream for presenter"
                  ):
                  
                  attendee ? (
                    // <Participant
                    // apiKey={apiKey}
                    // token={token}
                    // callId={callId}
                    // />
                    "Livestream for participant"
                  )
                  :
                    (
                    <WebinarUpcomingState
                    webinar={webinar}
                    currentUser={user || null}
                    />
                  )}
                  </React.Fragment> 
             ): webinar.webinarStatus === WebinarStatusEnum.CANCELLED ? 
             (
              <div className='flex justify-center items-center h-full w-full'>
                  <div className='text-center space-y-4'>
                    <h3 className='text-2xl font-semibold text-primary'>{webinar?.title}</h3>
                    <p className='text-muted-foreground text-xs'>
                      This webinar has been cancelled
                    </p>
                  </div> 
              </div>
             ):
             (
              <WebinarUpcomingState
              webinar={webinar}
              currentUser={user || null}
              />
             )
        }
    </React.Fragment>
  )
}

export default RenderWebinar