import Image from 'next/image';
import React from 'react';
import {
    armWrestlinglive1,
    armWrestlinglive2,
    armWrestlinglive3,
    armWrestlinglive4,
    mmalive1,
    mmalive2,
    mmalive3,
    mmalive4,
    weightLiftinglive1,
    weightLiftinglive2,
    weightLiftinglive3,
    weightLiftinglive4
} from '../../../../public';

import { StaticImageData } from 'next/image';
import Link from 'next/link';

type eventsProps = {
    [key: string]: {
        id: number;
        image: StaticImageData;
    }[];
};

const events: eventsProps = {
    armWrestling: [
        {
            id: 1,

            image: armWrestlinglive1,
        },
        {
            id: 2,
            image: armWrestlinglive2,
        },
        {
            id: 3,
            image: armWrestlinglive3,
        },
        {
            id: 4,
            image: armWrestlinglive4,
        },
    ],
    weightLifting: [
        {
            id: 1,

            image: weightLiftinglive1,
        },
        {
            id: 2,
            image: weightLiftinglive2,
        },
        {
            id: 3,
            image: weightLiftinglive3,
        },
        {
            id: 4,
            image: weightLiftinglive4,
        },
    ],
    mixMartialArts: [
        {
            id: 1,

            image: mmalive1,
        },
        {
            id: 2,
            image: mmalive2,
        },
        {
            id: 3,
            image: mmalive3,
        },
        {
            id: 4,
            image: mmalive4,
        },
    ],
};

const LiveMatches = ({ selected }: { selected: string }) => {
    const selectedEvents = events[selected] || [];
    return (
        <div className="mx-20">
            <h1 className=" text-2xl capitalize ml-28 font-bold">
                Live Matches
            </h1>
            <div>
                <div className=" flex flex-wrap items-center justify-center">
                    {selectedEvents.map((event: any) => (
                        <div
                            key={event.id}
                            className="relative w-[21%] p-2 group  "
                        >
                            <Link href="/liveMatch">
                                <div className=" overflow-hidden  rounded-md">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        className=" blur-[0.1px] group-hover:blur-0 group-hover:scale-110  w-full h-56 object-fill  transition ease-in-out duration-500"
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveMatches;
