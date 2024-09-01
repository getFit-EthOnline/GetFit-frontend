'use client';
import React, { useState } from 'react';

import Image from 'next/image';
import ChatButton from '@/components/ui/chatBot/chatbutton';
import InfluencerModal from '@/components/ui/fitnessInfluncerModal';
import useWeb3Auth from '@/hooks/useWeb3Auth';
import useGlobalStore from '@/store';
import SportsBets from '@/components/ui/homeScreen/sportsBets';
import LiveMatches from '@/components/ui/homeScreen/liveMatches';
import BettingTable from '@/components/ui/homeScreen/bettingTable';



const Page = () => {
    const { loggedIn, provider } = useWeb3Auth();
    const { userAgent } = useGlobalStore();
    const [selected, setSelected] = useState<string>("weightLifting")
    console.log(selected)
    return (
        <div className=" pt-10">
            <div className=' flex flex-col justify-center gap-y-20'>
                <SportsBets selected={selected} setSelected={setSelected} />
                <LiveMatches selected={selected} />
                <BettingTable />

            </div>
            <ChatButton />
            {/* {loggedIn && <InfluencerModal provider={provider} />} */}
        </div>
    );
};

export default Page;
