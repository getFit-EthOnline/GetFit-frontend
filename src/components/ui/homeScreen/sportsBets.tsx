'use client';
import ChatButton from '@/components/ui/chatBot/chatbutton';
import InfluencerModal from '@/components/ui/fitnessInfluncerModal';
import useWeb3Auth from '@/hooks/useWeb3Auth';
import Image from 'next/image';
import {
    armWrestlingEvents,
    mmahomeEvents,
    weightliftingHomeevents,
} from '../../../../public';
import { useState } from 'react';
import useGlobalStore from '@/store';

const events = [
    {
        id: 1,
        title: 'Weight Lifting',

        for: 'weightLifting',
        image: weightliftingHomeevents,
    },
    {
        id: 2,
        title: 'Arm Wrestling',

        for: 'armWrestling',
        image: armWrestlingEvents,
    },
    {
        id: 3,
        title: 'Mix Martial arts',

        for: 'mixMartialArts',
        image: mmahomeEvents,
    },
];

const SportsBets = ({
    selected,
    setSelected,
}: {
    selected: string;
    setSelected: any;
}) => {
    const { loggedIn } = useWeb3Auth();
    const [chatId, setChatId] = useState(0);
    const { userAgent } = useGlobalStore();
    return (
        <div className="mx-20">
            <h1 className=" text-2xl capitalize ml-28 font-bold">
                Sports Bets
            </h1>
            <div>
                <div className=" flex flex-wrap items-center justify-center">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className={`relative w-[28%] p-1 rounded-md group ${
                                event.for === selected ? 'bg-[#B8FE22]' : ''
                            }  `}
                            onClick={() => setSelected(event.for)}
                        >
                            <div className=" overflow-hidden">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    className={`blur-[0.1px]  group-hover:blur-0 group-hover:scale-110  w-full h-56 object-fill  transition ease-in-out duration-500  ${
                                        event.for === selected ? 'blur-0 ' : ''
                                    }  `}
                                />
                            </div>
                            <h1
                                className={`absolute bottom-0 group-hover:blur-0  transition ease-in-out duration-500 group-hover:text-white translate-x-1 -translate-y-1/2 text-3xl text-slate-300 blur-[1px] capitalize font-bold  ${
                                    event.for === selected ? 'blur-0' : ''
                                }  `}
                            >
                                {event.title}
                            </h1>
                        </div>
                    ))}
                </div>
                {userAgent && <ChatButton chatId={chatId} />}
            </div>
            {loggedIn && <InfluencerModal setChatId={setChatId} />}
        </div>
    );
};

export default SportsBets;
