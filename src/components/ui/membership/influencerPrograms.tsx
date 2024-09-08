import React from 'react';
import { plan1, plan2, plan3 } from '../../../../public';
import Image from 'next/image';

const programs = [
    {
        id: 1,
        title: 'Expert-Led Programs',
        description:
            'Each coach is a master in their field, offering specialized routines tailored to different fitness goals.',
        image: plan1,
    },
    {
        id: 2,
        title: ' Personalized Plans',
        description:
            'Subscribing gives access to customized workout plans, nutritional advice, and progress tracking tools.',
        image: plan2,
    },
    {
        id: 3,
        title: 'Exclusive Content',
        description:
            'Get insider tips, motivation, and exclusive challenges that are only available through the subscription.',
        image: plan3,
    },
];

const InfluencerPrograms = () => {
    return (
        <div className="flex flex-col items-center max-w-sm gap-4 ">
            {programs.map((plan) => (
                <div
                    key={plan.id}
                    className="bg-gray-100 relative rounded-md group   text-center"
                >
                    <Image
                        src={plan.image}
                        alt={plan.title}
                        className="mx-auto rounded-md"
                    />

                    <h3 className=" group-hover:opacity-0 w-full max-h-40 min-h-12 absolute bottom-0 rounded-b-md bg-slate-300 bg-opacity-[80%] py-3 font-medium mt-2">
                        {plan.title}
                    </h3>
                    <div className="absolute  flex-col inset-0 bg-[#DCE0D9] bg-opacity-[80%] text-black p-2 flex items-center justify-center gap-y-2  opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300 rounded-lg">
                        <span className="text-2xl leading-4 font-bold">
                            {' '}
                            {plan.title}{' '}
                        </span>
                        <span className=" text-xl font-normal">
                            {' '}
                            {plan.description}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InfluencerPrograms;
