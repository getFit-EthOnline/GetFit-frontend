import Image from 'next/image';
import React from 'react';

const ChallengeCard = ({ item }: { item: any }) => (
    <div>
        <div className=" flex flex-col gap-y-1 items-start justify-center">
            <span className=" text-xs text-slate-500">{item.subHeading}</span>
            <h4 className="text-md font-semibold">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
            <Image
                src={item.image}
                alt={item.title}
                className="w-full h-full"
            />
            {item.winner && (
                <p className="text-xl mt-1">Winner:{item.winner}</p>
            )}
        </div>
    </div>
);

export default ChallengeCard;
