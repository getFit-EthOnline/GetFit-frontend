'use client';
import useGlobalStore from '@/store';
import Image from 'next/image';
import { useState } from 'react';
import {
    anatolyProfilePic,
    davidGogginsProfilePic,
    davidPlan1,
    larryWheelsProfilePic,
    RibbleAvatar,
} from '../../../../public';
import { addMessage, getBalance, getNewMessages } from '@/contracts/galadriel';
import { RiExternalLinkLine } from 'react-icons/ri';
import WorkoutModal from '@/components/ui/chatBot/WorkoutModal';
const ProfileScreen = () => {
    const [week1Completed, setWeek1Completed] = useState(false);

    const [generatedPrompt, setGeneratedPrompt] = useState(''); // state for AI-generated prompt
    const {
        userName,
        userEmail,
        userAgent,
        userProfile,
        provider,
        chatId,
        address,
        setBalance,
    } = useGlobalStore();
    const creatorName = localStorage.getItem('creatorName');
    const parsedCreatorName = creatorName ? JSON.parse(creatorName) : null;
    const [isOpenWorkout, setIsOpenWorkout] = useState(false);
    const [trx, setTrx] = useState('');
    const [state, setState] = useState('Create New Workout Plan');
    const profiles =
        parsedCreatorName === 'david goggins'
            ? davidGogginsProfilePic
            : parsedCreatorName === 'anatoly'
            ? anatolyProfilePic
            : parsedCreatorName === 'larry Wheels'
            ? larryWheelsProfilePic
            : RibbleAvatar;
    const creators =
        parsedCreatorName === 'david goggins'
            ? 'david goggins'
            : parsedCreatorName === 'anatoly'
            ? 'anatoly'
            : parsedCreatorName === 'larry Wheels'
            ? 'larry Wheels'
            : 'Creating Your AI fitness trainer';
    const handleCheckboxChange = () => {
        setWeek1Completed(!week1Completed);
    };
    const [workoutResp, setWorkoutResp] = useState('');
    const retryFetch = async (retriesLeft: number) => {
        if (retriesLeft === 0) {
            return;
        }
        console.log('calling after 10 seconds');
        // If there are retries left, attempt fetching again after 10 seconds
        setTimeout(async () => {
            await getNewMessages(chatId, 0);

            retriesLeft--;
        }, 10000); // 10-second delay before retry
    };
    const fetchMessages = async () => {
        setTimeout(async () => {
            const newMessages = await getNewMessages(chatId, 0);
            console.log(newMessages);
            const resp = newMessages[newMessages.length - 1];
            console.log(resp);
            if (resp.role === 'user') {
                await retryFetch(2);
            } else {
                setState('New Workout Plan Created!');
                setWorkoutResp(resp.content);
            }
        }, 20000);
    };
    const handleGeneratePrompt = async () => {
        if (week1Completed) {
            setGeneratedPrompt(
                'Congratulations on completing Week 1! Keep up the great work with your fitness goals.'
            );
        } else {
            setGeneratedPrompt(
                'Let’s get started with Week 1 to reach your fitness goals!'
            );
            return;
        }
        setState('Creating Workout Plan for next week...');
        const formattedProfile = `Age ${userProfile.age}, Sex ${userProfile.gender}, height ${userProfile.height} cm, weight ${userProfile.weight} kg, fitness goal ${userProfile.goal}. Create the weekly workout schedule for the attached profile for 1 week.`;
        const response = await addMessage({
            message: formattedProfile,
            agentRunID: chatId,
            provider,
        });
        if (response.dispatch) {
            const balance = await getBalance(address);
            setBalance(balance);
            setTrx(response.dispatch);
            await fetchMessages();
        }
    };

    return (
        <>
            {isOpenWorkout && (
                <WorkoutModal
                    isOpen={isOpenWorkout}
                    setIsOpen={setIsOpenWorkout}
                    workoutResp={workoutResp}
                    userProfile={userProfile}
                />
            )}
            <div className="min-h-screen bg-gray-100 py-10">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-4">
                        <Image
                            src={davidPlan1} // replace with actual profile image
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {userName}
                            </h1>
                            <div className="">
                                <p className="text-gray-500">
                                    Email : {userEmail}
                                </p>
                                <p className="text-gray-500">
                                    Age : {userProfile.age}
                                </p>
                            </div>
                            <div className="py-2">
                                <p className="text-gray-500">
                                    Gender : {userProfile.gender}
                                </p>
                                <p className="text-gray-500">
                                    Height : {userProfile.height}
                                </p>
                            </div>
                            <div className=" py-2">
                                <p className="text-gray-500">
                                    Weight : {userProfile.weight}
                                </p>
                                <p className="text-gray-500">
                                    Goal : {userProfile.goal}
                                </p>
                            </div>
                            <p className="text-gray-500 py-2 flex items-center gap-x-2">
                                Trainer:{' '}
                                <Image
                                    src={profiles}
                                    alt="creator"
                                    height={50}
                                    width={50}
                                    className="rounded-full"
                                />
                                {creators}
                            </p>
                        </div>
                    </div>

                    {/* Fitness Analytics Section */}
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Fitness Analytics
                        </h2>

                        {/* Week 1 Progress */}
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">
                                    Week 1
                                </h3>
                                <p className="text-gray-500">
                                    Strength Training & Cardio
                                </p>
                            </div>
                            <div className="flex items-center">
                                {/* Circular Progress Bar */}
                                <div className="relative">
                                    <svg
                                        className="w-16 h-16 transform -rotate-90"
                                        viewBox="0 0 36 36"
                                    >
                                        <path
                                            className="text-gray-300"
                                            strokeWidth="3.8"
                                            stroke="currentColor"
                                            fill="none"
                                            d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className={`${
                                                week1Completed
                                                    ? 'stroke-green-500'
                                                    : 'stroke-gray-300'
                                            } transition-all duration-700 ease-out`}
                                            strokeDasharray={
                                                week1Completed
                                                    ? '100, 100'
                                                    : '0, 100'
                                            }
                                            strokeWidth="3.8"
                                            strokeLinecap="round"
                                            fill="none"
                                            stroke="currentColor"
                                            d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800">
                                        {week1Completed ? '100%' : '0%'}
                                    </span>
                                </div>
                                <div className="ml-4 flex items-center">
                                    <label
                                        htmlFor="week1"
                                        className="text-gray-700 mr-2"
                                    >
                                        Completed
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="week1"
                                        checked={week1Completed}
                                        onChange={handleCheckboxChange}
                                        className="h-6 w-6 text-green-500 border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Weeks - Example for Week 2 */}
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm mt-4">
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">
                                    Week 2
                                </h3>
                                <p className="text-gray-500">
                                    Endurance Training
                                </p>
                            </div>
                            <div className="flex items-center">
                                <label
                                    htmlFor="week2"
                                    className="text-gray-700 mr-2"
                                >
                                    Complete
                                </label>
                                <input
                                    type="checkbox"
                                    id="week2"
                                    disabled
                                    className="h-6 w-6 text-gray-300 border-gray-300 rounded"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm mt-4">
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">
                                    Week 3
                                </h3>
                                <p className="text-gray-500">
                                    High Endurance Training
                                </p>
                            </div>
                            <div className="flex items-center">
                                <label
                                    htmlFor="week2"
                                    className="text-gray-700 mr-2"
                                >
                                    Complete
                                </label>
                                <input
                                    type="checkbox"
                                    id="week2"
                                    disabled
                                    className="h-6 w-6 text-gray-300 border-gray-300 rounded"
                                />
                            </div>
                        </div>

                        {/* Add more weeks as needed */}
                    </div>

                    {/* AI Prompt Generation */}
                    <div className="mt-10">
                        <button
                            onClick={handleGeneratePrompt}
                            className="mt-4 w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 focus:outline-none"
                        >
                            {state}
                        </button>
                        {generatedPrompt && (
                            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <p className="mt-2 text-gray-600">
                                    {generatedPrompt}
                                </p>
                                {workoutResp && (
                                    <div className="flex items-center gap-x-2">
                                        <div
                                            onClick={() =>
                                                setIsOpenWorkout(true)
                                            }
                                            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
                                        >
                                            View Workout for next week
                                        </div>
                                        {trx && (
                                            <a
                                                className="cursor-pointer"
                                                href={`https://explorer.galadriel.com/tx/${trx}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <RiExternalLinkLine size={20} />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileScreen;
