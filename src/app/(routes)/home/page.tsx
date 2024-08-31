"use client"
import React from 'react';
import {
    armWrestlingEvents,
    mmahomeEvents,
    weightliftingHomeevents,
} from '../../../../public';
import Image from 'next/image';
import ChatButton from '@/components/ui/chatBot/chatbutton';
import InfluencerModal from '@/components/ui/fitnessInfluncerModal';
import useGlobalStore from '@/store';

const events = [
    {
        id: 1,
        title: 'Weight Lifting',
        image: weightliftingHomeevents,
    },
    {
        id: 2,
        title: 'Arm Wrestling',
        image: armWrestlingEvents,
    },
    {
        id: 3,
        title: 'Mix Martial arts',
        image: mmahomeEvents,
    },
];

const Page = () => {

    const { userAgent } = useGlobalStore();
    console.log(userAgent)
    return (
        <div className=" bg-[#E2E2E2]">
            <h1 className=" text-2xl capitalize font-bold">Sports Bets</h1>
            <div>
                <div className=" flex flex-wrap items-center justify-center">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="relative w-1/4 p-2 group "
                        >
                            <div className=" overflow-hidden">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    className=" blur-[1px] group-hover:blur-0 group-hover:scale-110  w-full h-56 object-fill  transition ease-in-out duration-500"
                                />
                            </div>
                            <h1 className="absolute bottom-0 group-hover:blur-0  transition ease-in-out duration-500 group-hover:text-white translate-x-1 -translate-y-1/2 text-3xl text-slate-300 blur-[1px] capitalize font-bold">
                                {event.title}
                            </h1>
                        </div>
                    ))}
                </div>
                {userAgent &&
                    <ChatButton />}
            </div>
            <InfluencerModal />
        </div>
    );
};

export default Page;
