'use client';
import ChatButton from '@/components/ui/chatBot/chatbutton';
import InfluencerModal from '@/components/ui/fitnessInfluncerModal';
import MentalFitness from '@/components/ui/m2e/mentalFitness';
import PhysicalFitness from '@/components/ui/m2e/PhysicalFitness';
import useWeb3Auth from '@/hooks/useWeb3Auth';
import useGlobalStore from '@/store';
import React, { useState } from 'react';

const Page = () => {
    const [chatId, setChatId] = useState(0);
    const { address } = useGlobalStore();
    const [open, setOpen] = useState(false);

    return (
        <div className="px-20">
            <PhysicalFitness />
            <MentalFitness />
            {address && (
                <ChatButton chatId={chatId} open={open} setOpen={setOpen} />
            )}
            {address && (
                <InfluencerModal setChatId={setChatId} setChatOpen={setOpen} />
            )}
        </div>
    );
};

export default Page;
