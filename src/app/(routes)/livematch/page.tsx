'use client'
import LiveChat from "@/components/ui/liveMatch/liveChat"
import PlayerAnalysis from "@/components/ui/liveMatch/playerAnalysis"
import useWeb3AuthWrapper from "@/web3auth/useWeb3AuthWrapper"

const LiveMatch = () => {
    useWeb3AuthWrapper()
    return (
        <div className='min-h-screen w-full h-full flex items-start pt-20 max-w-[1300px] mx-auto space-x-4 justify-center'>
            <div className='w-[60%] h-full min-h-[calc(100vh-200px)] overflow-hidden'>
                <div className=''>
                    <iframe className='rounded-md' width="860" height="415" src="https://www.youtube.com/embed/cefwt-dOLrg?si=q1dCfmbZr-JT3EvL&amp;start=64" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                </div>
                <div className="mt-6" />
                <PlayerAnalysis />
            </div>
            <div className='w-[40%] h-full relative overflow-y-auto max-h-[calc(100vh-400px)] min-h-[calc(100vh-300px)] bg-white'>
                <LiveChat />
            </div>
        </div>
    )
}

export default LiveMatch
