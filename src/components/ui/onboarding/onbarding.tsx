import React from 'react';
import UpComingEventGrid from './upcomingEventsGrids/upcomingEventGrid';

const Onboarding = () => {
    return (
        <div className="flex flex-col gap-4 items-center justify-center p-10 bg-gradient-to-tr from-[#D61415] from-[-157%] via-[#000000] via-[48%] to-[#D61415] to-[300%] ">
            <div className="flex items-center gap-y-4 flex-col justify-center">
                <div className=" uppercase text-[#FF5200] flex   gap-x-2 font-semibold text-[16px] leading-[1em]">
                    <p>
                        Achieve more, earn more, and elevate your fitness like
                        never before!
                    </p>
                </div>
                <div className=" uppercase text-[#B3F22B] flex gap-x-2 font-semibold text-[46px] leading-[1em] ">
                    <p>Power Up Your Fitness Game On-Chain</p>
                </div>
            </div>
            <div>
                <UpComingEventGrid />
            </div>
        </div>
    );
};

export default Onboarding;
