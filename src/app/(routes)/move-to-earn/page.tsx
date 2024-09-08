'use client';
import ChatButton from '@/components/ui/chatBot/chatbutton';
import InfluencerModal from '@/components/ui/fitnessInfluncerModal';
import MentalFitness from '@/components/ui/m2e/mentalFitness';
import PhysicalFitness from '@/components/ui/m2e/PhysicalFitness';
import useGlobalStore from '@/store';
import { useState } from 'react';

const Page = () => {
    const { address } = useGlobalStore();
    const [open, setOpen] = useState(false);

    return (
        <div className="px-20">
            <PhysicalFitness />
            <MentalFitness />
            {address && <ChatButton open={open} setOpen={setOpen} />}
            {address && <InfluencerModal setChatOpen={setOpen} />}
        </div>
    );
};

export default Page;
