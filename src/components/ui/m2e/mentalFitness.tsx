"use client";
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import toast from 'react-hot-toast';
import { toastStyles } from '@/utils/utils';
import { m2ementalFitness1, m2ementalFitness2, m2ementalFitness3, m2ementalFitness4, m2ementalFitness5, m2ementalFitness6, m2ementalFitness7 } from '../../../../public';

const mentalExercises = [
    {
        id: 1,
        image: m2ementalFitness1,
        title: 'Sleep visualization: For beginners',
        description: 'Try this meditation at bedtime to follow Chris\'s voice into a deep sleep.',
        duration: '16 mins',
        trainer: 'Chris Hemsworth',
        trainerImage: m2ementalFitness1,
        tags: ['Sleep Visualization', 'Meditation'],
    },
    {
        id: 2,
        image: m2ementalFitness2,
        title: 'Meditation: Basic box breathing',
        description: 'Discover a simple technique to find focus in high-stress situations.',
        duration: '4 mins',
        trainer: 'Tahl Rinsky',
        trainerImage: m2ementalFitness2,
        tags: ['Breathwork', 'Focus'],
    },
    {
        id: 3,
        image: m2ementalFitness3,
        title: 'Mindfulness: Five senses exercise',
        description: 'Engage your senses to bring your awareness to the present moment.',
        duration: '5 mins',
        trainer: 'Emma Stone',
        trainerImage: m2ementalFitness3,
        tags: ['Mindfulness', 'Awareness'],
    },
    {
        id: 4,
        image: m2ementalFitness4,
        title: 'Gratitude journaling',
        description: 'Spend a few minutes writing down things you are grateful for each day.',
        duration: '10 mins',
        trainer: 'Oprah Winfrey',
        trainerImage: m2ementalFitness4,
        tags: ['Journaling', 'Gratitude'],
    },
    {
        id: 5,
        image: m2ementalFitness5,
        title: 'Guided imagery: Relaxation',
        description: 'Visualize a peaceful place to promote relaxation and reduce stress.',
        duration: '15 mins',
        trainer: 'Dr. Joe Dispenza',
        trainerImage: m2ementalFitness5,
        tags: ['Guided Imagery', 'Relaxation'],
    },
    {
        id: 6,
        image: m2ementalFitness6,
        title: 'Affirmations for confidence',
        description: 'Repeat positive affirmations to boost self-esteem and confidence.',
        duration: '7 mins',
        trainer: 'Brené Brown',
        trainerImage: m2ementalFitness6,
        tags: ['Affirmations', 'Self-Esteem'],
    },
    {
        id: 7,
        image: m2ementalFitness7,
        title: 'Emotional release technique',
        description: 'Learn to identify and release pent-up emotions through movement.',
        duration: '20 mins',
        trainer: 'Tony Robbins',
        trainerImage: m2ementalFitness7,
        tags: ['Emotional Release', 'Movement'],
    },
];


const mentalCategories = [
    'All',
    'Sleep Visualization',
    'Soundscape',
    'Meditation',
    'Kids',
    'Breathwork',
];

const MentalFitness = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef(null);

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

    const startExercise = (index: number) => {
        toast.success(`You have started ${mentalExercises[index].title}`, toastStyles);
    };

    return (
        <div className="w-full py-10 p-4 ">
            <h2 className="text-2xl font-bold mb-4">Build a stronger mind with a mental fitness routine that sticks.</h2>

            <div className="flex items-center justify-between mb-6">
                <div className='flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide'>
                    {mentalCategories.map((category, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-full border ${index === 0 ? 'bg-black text-white' : 'bg-white text-gray-700 border-gray-300'
                                } hover:bg-gray-200 focus:outline-none`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className='flex items-center justify-center gap-x-5'>
                    <button
                        onClick={scrollLeft}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 focus:outline-none z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>

                    </button>
                    <button
                        onClick={scrollRight}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 focus:outline-none z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
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
                {mentalExercises.map((exercise, idx) => (
                    <SwiperSlide
                        key={exercise.id}
                        className="bg-white min-h-[480px] relative p-4 rounded-lg shadow-md flex-shrink-0 flex flex-col justify-between"
                    >
                        <Image
                            src={exercise.image}
                            alt={exercise.title}
                            width={300}
                            height={200}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <div className="flex items-center mb-2">
                            <Image
                                src={exercise.trainerImage}
                                alt={exercise.trainer}
                                width={300}
                                height={200}
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="text-sm text-gray-600">{exercise.trainer}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{exercise.title}</h3>
                        <p className="text-gray-600 mb-4">{exercise.description}</p>
                        <div className="text-sm text-gray-500 mb-4">{exercise.duration}</div>
                        <div className="flex gap-2 mt-auto mb-4">
                            {exercise.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className='absolute bottom-1 m-3 right-0'>
                            <button onClick={() => startExercise(idx)} className="group/button relative w-full overflow-hidden rounded-md border border-black bg-black px-4 py-1 text-xs font-medium text-white transition-all duration-150 hover:border-[#B8FE22] active:scale-95">
                                <span className="absolute bottom-0 left-0 z-0 h-0 w-full bg-gradient-to-t from-[#B8FE22] to-[#a8f10a] transition-all duration-500 group-hover/button:h-full" />
                                <span className="relative z-10 transition-all duration-500 group-hover/button:text-white">
                                    Start Your Exercise
                                </span>
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MentalFitness;
