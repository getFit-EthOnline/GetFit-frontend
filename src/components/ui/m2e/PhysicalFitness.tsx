'use client';
import { recordWorkoutGaslessBundle } from '@/contracts/morph';
import useGlobalStore from '@/store';
import { toastStyles } from '@/utils/utils';
import useWeb3AuthWrapper from '@/web3auth/useWeb3AuthWrapper';
import Image from 'next/image';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    m2eImage1,
    m2eImage2,
    m2eImage3,
    m2eImage4,
    m2eImage5,
    m2eImage6,
    m2eImage7,
} from '../../../../public';
const workouts = [
    {
        id: 1,
        image: m2eImage1,
        title: 'Power Shred: Active Arms - Day 1',
        description: 'Cut fat and build power at home.',
        duration: '35 mins',
        trainer: 'Centr Team',
        trainerImage: m2eImage1,
        tags: ['Muscle-building', 'Dumbbells'],
    },
    {
        id: 2,
        image: m2eImage2,
        title: 'Elevate: Day 2',
        description:
            'Take your functional performance to new heights with the second workout from Centr Circuit: Elevate.',
        duration: '35 mins',
        trainer: 'Luke Zocchi',
        trainerImage: m2eImage2,
        tags: ['Functional Training', 'Dumbbells'],
    },
    {
        id: 3,
        image: m2eImage3,
        title: 'Functional Movement Challenge: Day 3',
        description:
            'Start moving better in everyday life with the third workout from our 6-week program. Dumbbells ready?',
        duration: '30 mins',
        trainer: 'Maricris Lapaix',
        trainerImage: m2eImage3,
        tags: ['Dumbbells', 'Basic equipment'],
    },
    {
        id: 4,
        image: m2eImage4,
        title: 'Glute Strength - Day 4',
        description:
            "Hit your glutes with this workout from Ingrid's body-part target series. All you need is dumbbells.",
        duration: '17 mins',
        trainer: 'Ingrid Clay',
        trainerImage: m2eImage4,
        tags: ['HIRT', 'Strength', 'Dumbbells'],
    },
    {
        id: 5,
        image: m2eImage5,
        title: 'Cardio Burst: Burn Fat Fast - Day 5',
        description:
            'A high-intensity cardio workout designed to burn fat and boost endurance.',
        duration: '25 mins',
        trainer: 'Sammy Clark',
        trainerImage: m2eImage5,
        tags: ['Cardio', 'No Equipment'],
    },
    {
        id: 6,
        image: m2eImage6,
        title: 'Core Strength - Day 6',
        description:
            'Build a stronger core with this stability-focused routine.',
        duration: '20 mins',
        trainer: 'Michael Morelli',
        trainerImage: m2eImage6,
        tags: ['Core', 'Stability', 'No Equipment'],
    },
    {
        id: 7,
        image: m2eImage7,
        title: 'Full Body Burnout - Day 7',
        description:
            'Target all major muscle groups with this full-body strength session.',
        duration: '45 mins',
        trainer: 'Emily Skye',
        trainerImage: m2eImage7,
        tags: ['Full Body', 'Strength', 'Dumbbells'],
    },
];
const categories = [
    'All',
    'Move with Chris',
    'HIIT',
    'Strength',
    'Yoga & Pilates',
    'Build muscle',
    'Beginner',
    'Trending',
    'Core training',
];

const PhysicalFitness = () => {
    const swiperRef = useRef(null);

    const { smartAccount } = useGlobalStore();
    useWeb3AuthWrapper();
    const [streak, setStreak] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    const [alertShown, setAlertShown] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]);

    const scrollLeft = () => {
        if (swiperRef.current && (swiperRef.current as any).swiper) {
            (swiperRef.current as any).swiper.slidePrev();
        }
    };

    const scrollRight = () => {
        if (swiperRef.current && (swiperRef.current as any).swiper) {
            (swiperRef.current as any).swiper.slideNext();
        }
    };
    const startWorkout = async (index: number) => {
        if (index > 0 && !streak[index - 1]) {
            toast.success(
                'Please complete your previous workout goal before starting this one.',
                toastStyles
            );
            setAlertShown((prev) => {
                const newAlertShown = [...prev];
                newAlertShown[index] = true;
                return newAlertShown;
            });
            return;
        }
        if (!streak[index]) {
            const resp = await recordWorkoutGaslessBundle(smartAccount);
            console.log(resp);
            setStreak((prevStreak) => {
                const newStreak = [...prevStreak];
                newStreak[index] = true; // Set the streak for this index to true (completed)
                return newStreak;
            });

            toast.success(
                `You have started ${workouts[index].title}`,
                toastStyles
            );
        }
    };
    return (
        <div className="w-full py-10 p-4  bg-gray-300">
            <h2 className="text-2xl font-bold mb-4">
                Training that will make you sweat.
            </h2>

            <div className=" flex justify-between items-center ">
                <p className="text-gray-600 mb-4">
                    GetFit members have over 4,000 workouts at their fingertips.
                    Try one now.
                </p>
                <div className="flex  items-center justify-center gap-x-2 mr-20">
                    <span className=" font-bold uppercase  text-neutral-500 ">
                        your streak
                    </span>
                    {streak.map((completed, index) => (
                        <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            fill={completed ? '#B8FE22' : 'none'}
                            viewBox="0 0 24 24"
                            strokeWidth={completed ? '.5' : '1'}
                            stroke="currentColor"
                            className="size-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                            />
                        </svg>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-full border ${
                                index === 0
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-700 border-gray-300'
                            } hover:bg-gray-200 focus:outline-none`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-center gap-x-5">
                    <button
                        onClick={scrollLeft}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 focus:outline-none z-10"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={scrollRight}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 focus:outline-none z-10"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <Swiper
                ref={swiperRef}
                slidesPerView={4}
                spaceBetween={30}
                navigation={{
                    prevEl: '.prev-btn',
                    nextEl: '.next-btn',
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                {workouts.map((workout, idx) => (
                    <SwiperSlide
                        key={workout.id}
                        className="bg-white min-h-[480px] relative p-4 rounded-lg shadow-md flex-shrink-0 flex flex-col justify-between"
                    >
                        <Image
                            src={workout.image}
                            alt={workout.title}
                            width={300}
                            height={200}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <div className="flex items-center mb-2">
                            <Image
                                src={workout.trainerImage}
                                alt={workout.trainer}
                                width={300}
                                height={200}
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="text-sm text-gray-600">
                                {workout.trainer}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                            {workout.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {workout.description}
                        </p>
                        <div className="text-sm text-gray-500 mb-4">
                            {workout.duration}
                        </div>
                        <div className="flex gap-2 mt-auto mb-4">
                            {workout.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="absolute bottom-1 m-2 right-0">
                            <button
                                onClick={() => startWorkout(idx)}
                                className="group/button relative w-full  overflow-hidden rounded-md border border-black bg-black px-4 py-1 text-xs font-medium text-white transition-all duration-150 hover:border-[#B8FE22] active:scale-95"
                            >
                                <span className="absolute bottom-0 left-0 z-0 h-0 w-full bg-gradient-to-t from-[#B8FE22] to-[#a8f10a] transition-all duration-500 group-hover/button:h-full" />
                                <span className="relative z-10 transition-all duration-500 group-hover/button:text-white">
                                    Start Your Workout
                                </span>
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PhysicalFitness;
