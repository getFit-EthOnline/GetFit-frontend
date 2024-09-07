'use client';
import useGlobalStore from '@/store';
import Image from 'next/image';
import React from 'react';
import {
    anatolyProfilePic,
    davidGogginsProfilePic,
    larryWheelsProfilePic,
    RibbleAvatar,
} from '../../../../public';
import { addMessage, getBalance, getNewMessages } from '@/contracts/galadriel';
const Profile = () => {
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
    const [updatedStats, setUpdatedStats] = React.useState(userProfile);
    const [weight, setWeight] = React.useState('');
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
    const fetchMessages = async () => {
        setTimeout(async () => {
            const messages = await getNewMessages(chatId, 0);
            console.log(messages);
        }, 20000);
    };
    const generateAnlysis = async () => {
        const formattedProfile = `Earlier i was ${updatedStats.weight} kg and now i am ${weight} kg please create a workout plan for a week`;
        const response = await addMessage({
            message: formattedProfile,
            agentRunID: chatId,
            provider,
        });
        if (response.dispatch) {
            const balance = await getBalance(address);
            setBalance(balance);
            await fetchMessages();
        }
    };
    return (
        <div className="w-full h-[85vh] px-20">
            <div className="py-10 p-4 w-full flex items-start ">
                <div className="w-[40%]">
                    <div className="flex items-center gap-x-3">
                        Name : {userName}{' '}
                    </div>
                    <div>Email : {userEmail}</div>
                    <div>Age : {updatedStats.age}</div>
                    <div>Gender : {updatedStats.gender}</div>
                    <div>Height : {updatedStats.height}</div>
                    <div>Weight : {updatedStats.weight}</div>
                    <div>Goal : {updatedStats.goal}</div>
                    <div>Assigned AI fitness traniner</div>
                    <div>
                        <Image
                            src={userAgent?.profilePic || profiles}
                            alt="chat-bot"
                            className="rounded-full"
                            height={50}
                            width={50}
                        />
                        {userAgent?.name || creators}
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex items-start gap-x-32">
                        <div>
                            Week 1{' '}
                            <div>
                                <input
                                    value={weight}
                                    onChange={(e) =>
                                        // setUpdatedStats({
                                        //     ...updatedStats,
                                        //     weight: e.target.value,
                                        // })
                                        setWeight(e.target.value)
                                    }
                                    placeholder="Current weight"
                                    className="p-2 rounded-md w-32"
                                />
                            </div>
                            <div className="pt-2" onClick={generateAnlysis}>
                                Analyse
                            </div>
                        </div>
                        <div>Week 2</div>
                        <div>Week 3</div>
                    </div>
                    <div className="mt-4 bg-slate-500 rounded-md p-4 h-full">
                        asdf
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
