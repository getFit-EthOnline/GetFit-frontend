import React from 'react';
import InfluencerProfile from '@/components/ui/membership/influencerProfile';
import InfluencerPrograms from '@/components/ui/membership/influencerPrograms';

const Page = () => {
    return (
        <div className=" flex items-start justify-center gap-x-10 p-10">
            <InfluencerProfile />
            <InfluencerPrograms />
        </div>
    );
};

export default Page;
