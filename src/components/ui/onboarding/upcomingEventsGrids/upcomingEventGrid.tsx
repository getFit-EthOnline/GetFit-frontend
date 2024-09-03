import React, { useState } from 'react';
import {
    FantacyChallengesBg,
    fantasySportsLogo,
    merchendiseLogo,
    p2pFanBattlesBg,
    predictionBg,
    predictionLogo,
    SocialsBg,
    socialsLogo,
    ticketBg,
    ticketLogo,
} from '../../../../../public';
import Image from 'next/image';
import { motion } from 'framer-motion';
const events = [
    {
        id: 1,
        title: 'Predictions',
        icon: predictionLogo,
    },
    {
        id: 2,
        title: 'Fantasy sports',
        icon: fantasySportsLogo,
    },
    {
        id: 3,
        title: 'merchandise',
        icon: merchendiseLogo,
    },
    {
        id: 4,
        title: 'Socials',
        icon: socialsLogo,
    },
    {
        id: 5,
        title: 'Tickets',
        icon: ticketLogo,
    },
];
const UpComingEventGrid = () => {
    const [clickedButtonId, setClickedButtonId] = useState<number | null>(1);
    const handleButtonClick = (id: number) => {
        setClickedButtonId(id);
    };
    return (
        <div>
            <div className="flex  justify-center gap-4">
                {events.map((event) => (
                    <BounceButton
                        key={event.id}
                        label={event.title}
                        icon={event.icon}
                        isClicked={clickedButtonId === event.id}
                        onClick={() => handleButtonClick(event.id)}
                    />
                ))}
            </div>
            <div className=" mt-10">
                {clickedButtonId === 1 && (
                    <div className="max-w-[1000px]   rounded-md ">
                        <Image
                            src={predictionBg}
                            alt="prediction logo "
                            className=" object-contain rounded-md"
                        />{' '}
                    </div>
                )}
                {clickedButtonId === 2 && (
                    <div className="max-w-[1000px]  rounded-md ">
                        <Image
                            src={FantacyChallengesBg}
                            alt="prediction logo "
                            className=" object-contain rounded-md"
                        />{' '}
                    </div>
                )}
                {clickedButtonId === 3 && (
                    <div className="max-w-[1000px] rounded-md ">
                        <Image
                            src={p2pFanBattlesBg}
                            alt="prediction logo "
                            className=" object-contain rounded-md"
                        />{' '}
                    </div>
                )}
                {clickedButtonId === 4 && (
                    <div className="max-w-[1000px]  rounded-md ">
                        <Image
                            src={SocialsBg}
                            alt="prediction logo "
                            className=" object-contain rounded-md"
                        />{' '}
                    </div>
                )}
                {clickedButtonId === 5 && (
                    <div className="max-w-[1000px] rounded-md ">
                        <Image
                            src={ticketBg}
                            alt="prediction logo "
                            className=" object-contain rounded-md"
                        />{' '}
                    </div>
                )}
            </div>
        </div>
    );
};
export default UpComingEventGrid;
const BounceButton = ({
    label,
    icon,
    isClicked,
    onClick,
}: {
    label: string;
    icon: any;
    isClicked: boolean;
    onClick: () => void;
}) => {
    return (
        <div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                className={`flex w-[10em] h-[6em] rounded-md flex-col items-center  justify-center transition-colors duration-400 ${
                    isClicked ? 'text-white' : ''
                }`}
                style={{ backgroundColor: isClicked ? '#80E142' : '#FFFFFF' }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onClick={onClick}
            >
                <Image src={icon} alt={label} className="w-14 p-2" />
                <p className="capitalize">{label}</p>
            </motion.button>
        </div>
    );
};
