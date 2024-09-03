import MentalFitness from '@/components/ui/m2e/mentalFitness';
import PhysicalFitness from '@/components/ui/m2e/PhysicalFitness';
import React from 'react';

const page = () => {
    return (
        <div>
            <PhysicalFitness />
            <MentalFitness />
        </div>
    );
};

export default page;
