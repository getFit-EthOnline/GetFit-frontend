import React, { useState } from 'react'
import { ArmWrestleLogo, MmaLogo, weightLiftinglogo } from '../../../../../public'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { WeightLiftingGrid } from './WeightLiftingGrid'
import { MmaGrid } from './mma'
import { ArmWrestleGrid } from './armwrestling'



const events = [
    {
        id: 1,
        title: "Fantasy",
        icon: weightLiftinglogo,
        color: "#D61415"

    },
    {
        id: 2,
        title: "Tickets",
        icon: ArmWrestleLogo,
        color: "#00DCF6"

    },
    {
        id: 3,
        title: "merchandise",
        icon: MmaLogo,
        color: "#FF5200"
    },
    {
        id: 4,
        title: "prediction",
        icon: MmaLogo,
        color: "#FF5200"
    },
    {
        id: 5,
        title: "Social",
        icon: MmaLogo,
        color: "#FF5200"
    },
]

const UpComingEventGrid = () => {


    const [clickedButtonId, setClickedButtonId] = useState<number | null>(1);
    const handleButtonClick = (id: number) => {
        setClickedButtonId(id);
    };
    return (
        <div>
            <div className='flex  justify-center gap-4'>
                {events.map((event) => (
                    <BounceButton
                        key={event.id}
                        label={event.title}
                        icon={event.icon}
                        color={event.color}
                        isClicked={clickedButtonId === event.id}
                        onClick={() => handleButtonClick(event.id)}
                    />
                ))}
            </div>

            <div>
                {clickedButtonId === 1 && <WeightLiftingGrid />}
                {clickedButtonId === 2 && <ArmWrestleGrid />}
                {clickedButtonId === 3 && <MmaGrid />}
                {clickedButtonId === 4 && <MmaGrid />}
                {clickedButtonId === 5 && <MmaGrid />}
            </div>
        </div>
    )
}

export default UpComingEventGrid




const BounceButton = ({ label, icon, color, isClicked, onClick }: { label: string, icon: any, color: string, isClicked: boolean, onClick: () => void }) => {

    return (
        <div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                className={`flex w-[10em] h-[6em] rounded-md flex-col items-center justify-center transition-colors duration-300 ${isClicked ? "text-white" : ""}`}
                style={{ backgroundColor: isClicked ? color : '#FFFFFF' }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onClick={onClick}
            >
                <Image src={icon} alt={label} className='w-20 p-2' />
                <p className='capitalize'>{label}</p>
            </motion.button>
        </div>
    )
}

