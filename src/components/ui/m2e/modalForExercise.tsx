import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Image from 'next/image';
import { useState } from 'react';
import {
    BackExercise,
    chestExercise,
    legsExercise,
    shoulderExercise,
} from '../../../../public';
const bodyParts = [
    {
        category: 'Chest',
        image: chestExercise,
        exercises: [
            {
                name: 'Push-ups',
                details:
                    '3 sets of 15 reps. Works your chest, shoulders, and triceps.',
            },
            {
                name: 'Bench Press',
                details: '4 sets of 12 reps. Focuses on your chest muscles.',
            },
            {
                name: 'Chest Fly',
                details:
                    '3 sets of 15 reps. Isolates the chest for definition.',
            },
            {
                name: 'Incline Press',
                details: ' 4 sets of 10 reps. Targets the upper chest.',
            },
        ],
    },
    {
        category: 'Legs',
        image: legsExercise,
        exercises: [
            {
                name: 'Squats',
                details:
                    '3 sets of 20 reps. Works your glutes, quads, and hamstrings.',
            },
            {
                name: 'Lunges',
                details:
                    '3 sets of 12 reps per leg. Strengthens legs and balance.',
            },
            {
                name: 'Leg Press',
                details: '4 sets of 15 reps. Targets quads and hamstrings.',
            },
            {
                name: 'Deadlifts',
                details: '4 sets of 10 reps. Works your posterior chain.',
            },
        ],
    },
    {
        category: 'Back',
        image: BackExercise,
        exercises: [
            {
                name: 'Pull-ups',
                details:
                    '3 sets of 10 reps. Works lats, biceps, and upper back.',
            },
            {
                name: 'Bent-over Rows',
                details: ' 4 sets of 12 reps. Strengthens the back and core.',
            },
            {
                name: 'Lat Pulldown',
                details: 'Lat 4 sets of 10 reps. Targets the lat muscles.',
            },
            {
                name: 'Deadlifts',
                details:
                    ' 4 sets of 10 reps. A full-body exercise focusing on the back.',
            },
        ],
    },
    {
        category: 'Shoulders',
        image: shoulderExercise,
        exercises: [
            {
                name: 'Shoulder Press',
                details: '3 sets of 12 reps. Strengthens your shoulders.',
            },
            {
                name: 'Lateral Raises',
                details: ' 3 sets of 15 reps. Focuses on the shoulder muscles.',
            },
            {
                name: 'Front Raises',
                details: '3 sets of 12 reps. Targets the front deltoids.',
            },
            {
                name: 'Arnold Press',
                details:
                    '4 sets of 10 reps. Engages the entire shoulder region.',
            },
        ],
    },
];
export default function ExcerciseModal({
    title,
    description,
    startWorkout,
    idx,
    state,
}: {
    title: string;
    description: string;
    startWorkout: (idx: number) => void;
    idx: number;
    state: string;
}) {
    let [isOpen, setIsOpen] = useState(false);
    let [selectedBodyPart, setSelectedBodyPart] = useState(bodyParts[0]);

    function open() {
        setIsOpen(true);
    }

    async function close() {
        setIsOpen(false);
    }
    const handleStart = async () => {
        await startWorkout(idx);
        close();
    };
    return (
        <>
            <button onClick={open} className="px-4 py-[0.5px]">
                {state}
            </button>

            <Dialog
                open={isOpen}
                as="div"
                className="relative z-10"
                onClose={close}
            >
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                    aria-hidden="true"
                />
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                {title || "Today's Workout Plan"}
                            </DialogTitle>
                            <p className="mt-2 text-sm text-gray-500">
                                {description ||
                                    "A quick overview of the exercises in today's session."}
                            </p>

                            {/* Workout Image Grid */}
                            <div className="grid grid-cols-4 gap-x-3  py-3 overflow-hidden">
                                {bodyParts.map((part) => {
                                    return (
                                        <div
                                            key={part.category}
                                            className="relative cursor-pointer"
                                            onClick={() =>
                                                setSelectedBodyPart(part)
                                            }
                                        >
                                            <Image
                                                src={part.image}
                                                className="h-32 w-full object-cover rounded-lg"
                                                alt={part.category}
                                            />
                                            <div className="absolute bottom-0 rounded-b-lg left-0 w-full text-center bg-black/70 text-white text-sm py-1">
                                                {part.category}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Display Exercises for Selected Body Part */}
                            {selectedBodyPart && (
                                <div className="mt-4 space-y-2">
                                    <h4 className="text-lg font-semibold">
                                        Exercises for{' '}
                                        {selectedBodyPart.category}
                                    </h4>
                                    {selectedBodyPart.exercises.map(
                                        (exercise) => (
                                            <div
                                                key={exercise.name}
                                                className="cursor-pointer gap-x-2 flex"
                                            >
                                                <p className="text-black font-bold">
                                                    {exercise.name}
                                                </p>
                                                <p className="text-gray-500">
                                                    {exercise.details}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Footer Buttons */}
                            <div className="mt-4 flex justify-end gap-4">
                                <button
                                    onClick={handleStart}
                                    className="px-4 py-1 text-white flex gap-x-2 bg-black rounded-md hover:bg-gray-800"
                                >
                                    {state === 'Start Your Workout'
                                        ? 'Complete Workout'
                                        : state}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#B8FE22"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="Black"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
