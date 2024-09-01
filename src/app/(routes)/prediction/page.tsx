'use client';
import BettingTable from '@/components/ui/homeScreen/bettingTable';
import LiveMatches from '@/components/ui/homeScreen/liveMatches';
import SportsBets from '@/components/ui/homeScreen/sportsBets';
import { useState } from 'react';
import {
    armWrestlingEvents,
    mmahomeEvents,
    weightliftingHomeevents,
} from '../../../../public';

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
    const [selected, setSelected] = useState<string>('weightLifting');
    return (
        <div className="pt-10">
            <div className=" flex flex-col justify-center gap-y-20">
                <SportsBets selected={selected} setSelected={setSelected} />
                <LiveMatches selected={selected} />
                <BettingTable />
            </div>
        </div>
    );
};

export default Page;
