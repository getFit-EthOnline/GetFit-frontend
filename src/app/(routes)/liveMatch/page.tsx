"use client"
import LiveChat from '@/components/ui/liveMatch/liveChat'
import PlayerAnalysis from '@/components/ui/liveMatch/playerAnalysis'
import React from 'react'

const Page = () => {
    return (
        <div className='flex w-full px-16  py-10  gap-x-16'>
            <div className=' max-w-[60%] gap-y-10 flex flex-col items-center '>
                <div className=' '>
                    <iframe className='rounded-md' width="860" height="415" src="https://www.youtube.com/embed/cefwt-dOLrg?si=q1dCfmbZr-JT3EvL&amp;start=64" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                </div>
                <PlayerAnalysis />
            </div>
            <div className='  w-[40%]  max-h-[calc(100vh-10px)]  min-h-[calc(100vh-10px)]  shadow-lg   '> <LiveChat /></div>
        </div>
    )
}

export default Page
