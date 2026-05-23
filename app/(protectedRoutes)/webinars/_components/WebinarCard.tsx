import { Webinar } from '@/lib/generated/prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import WebinarThumbnail from './WebinarThumbnail'
import { format } from 'date-fns'
import { Calendar, Funnel, Menu } from 'lucide-react'

type Props = {
    webinar : Webinar | null | undefined;
}

const WebinarCard = ({webinar}: Props) => {
    if (!webinar) {
        return null;
      }
  return (
    <div className='flex gap-3 flex-col items-start w-full'>
        <Link href={`/live-webinar/${webinar?.id}`}
        className='w-full max-w-[400px]'>
         <WebinarThumbnail 
              // 4. Pass classes to handle width and add a subtle hover effect
              className='w-full max-w-[400px] group-hover:border-border/20 transition-all duration-300'
            />
        </Link>
        <div className='w-full flex justify-between gap-3 items-center'>
            <Link href={`/live-webinar/${webinar?.id}`}
            className='flex flex-col gap-2 items-start'>
                <div>
                <p className='text-sm text-primary font-bold'>
                    {webinar?.title}
                </p>
                <p className='text-xs text-muted-foreground'>
                    {webinar?.description}
                </p>
                </div>

                <div className='flex gap-2 justify-start items-center'>
                        <div className='flex gap-2 items-center text-xs text-muted-foreground'>
                            <Calendar size={25}/>
                            <p>{format(new Date(webinar?.startTime), 'dd/MM/yyyy')}</p>
                            
                        </div>
                </div>

            </Link>

            <Link
            href={`/webinars/${webinar?.id}/pipeline`}
            className='flex px-4 py-2 rounded-md border-[0.5px] border-border bg-secondary'
            >
                <Menu className='w-4 h-4'/>
            </Link>
        </div>
    </div>
  )
}

export default WebinarCard