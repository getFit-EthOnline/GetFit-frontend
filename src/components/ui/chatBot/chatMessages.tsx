'use client';

import { addMessage, getNewMessages } from '@/contracts/galadriel';
import useGlobalStore from '@/store';
import React, { useEffect, useState } from 'react';

interface Message {
    type: 'bot' | 'user';
    text: string | null;
    options?: string[];
}

const ChatMessages = ({
    chatId,
    provider,
}: {
    chatId: number;
    provider: any;
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [reportMsg, setReportMsg] = useState<string>('');
    const [userResponse, setUserResponse] = useState<string>('');
    const [step, setStep] = useState<number>(0);

    const [userProfile, setUserProfile] = useState<{
        age: string;
        gender: string;
        height: string;
        weight: string;
        goal: string;
    }>({
        age: '',
        gender: '',
        height: '',
        weight: '',
        goal: '',
    });

    const { agentFirstMessage } = useGlobalStore();

    useEffect(() => {
        setMessages([
            { type: 'bot', text: agentFirstMessage },
            { type: 'bot', text: 'What is your age?' },
        ]);
    }, [agentFirstMessage]);

    const fetchMessages = () => {
        setTimeout(async () => {
            const messages = await getNewMessages(chatId, 0);
            console.log(messages);
            const resp = messages[messages.length - 2].content;
            setReportMsg(resp);
        }, 15000);
    };

    const generateUserReport = async (formattedProfile: string) => {
        try {
            const response = await addMessage({
                message: formattedProfile,
                agentRunID: chatId,
                provider,
            });
            console.log(response);
            if (response.dispatch) {
                fetchMessages();
            }
        } catch (error) {
            console.error('Error generating user report:', error);
        }
    };
    //     setMessages((prevMessages) => {
    //         // Avoid adding duplicate user responses
    //         if (
    //             prevMessages.length > 0 &&
    //             prevMessages[prevMessages.length - 1].type === 'user' &&
    //             prevMessages[prevMessages.length - 1].text === response
    //         ) {
    //             return prevMessages;
    //         }

    //         // Update user profile and bot messages based on the current step
    //         let newProfile = { ...userProfile };
    //         let newMessages: Message[] = [];
    //         let newStep = step;

    //         switch (step) {
    //             case 0:
    //                 newProfile.age = response;
    //                 newStep = 1;
    //                 newMessages = [
    //                     {
    //                         type: 'bot',
    //                         text: 'Awesome! Please select your gender?',
    //                         options: ['M', 'F'],
    //                     },
    //                 ];
    //                 break;
    //             case 1:
    //                 newProfile.gender = response;
    //                 newStep = 2;
    //                 newMessages = [
    //                     {
    //                         type: 'bot',
    //                         text: 'Thank you! What is your height in cm?',
    //                     },
    //                 ];
    //                 break;
    //             case 2:
    //                 newProfile.height = response;
    //                 newStep = 3;
    //                 newMessages = [
    //                     {
    //                         type: 'bot',
    //                         text: 'Great! What is your weight in kg?',
    //                     },
    //                 ];
    //                 break;
    //             case 3:
    //                 newProfile.weight = response;
    //                 newStep = 4;
    //                 newMessages = [
    //                     {
    //                         type: 'bot',
    //                         text: 'Awesome! What is your fitness goal?',
    //                         options: ['Muscle Building', 'Fat Loss', 'Others'],
    //                     },
    //                 ];
    //                 break;
    //             case 4:
    //                 if (response === 'Others') {
    //                     newStep = 5;
    //                     newMessages = [
    //                         {
    //                             type: 'bot',
    //                             text: 'Please specify your fitness goal',
    //                         },
    //                     ];
    //                 } else {
    //                     newProfile.goal = response;
    //                     newStep = 6;
    //                     const formattedProfile = formatUserProfile(newProfile);
    //                     setMessages((prevMessages) => [
    //                         ...prevMessages,
    //                         {
    //                             type: 'bot',
    //                             text: `Thank you! Your fitness goal is ${response}. We are generating your weekly fitness plan.`,
    //                         },
    //                     ]);
    //                     setMessages((prevMessages) => [
    //                         ...prevMessages,
    //                         {
    //                             type: 'bot',
    //                             text: 'msg',
    //                         },
    //                     ]);
    //                     setIsChatting(true);
    //                 }
    //                 break;
    //             case 5:
    //                 newProfile.goal = response;
    //                 newStep = 6;
    //                 const formattedProfile = formatUserProfile(newProfile);
    //                 generateUserReport(formattedProfile);
    //                 newMessages = [
    //                     {
    //                         type: 'bot',
    //                         text: `Thank you! Your specified fitness goal is ${response}. We are generating your weekly fitness plan.`,
    //                     },
    //                     {
    //                         type: 'bot',
    //                         text: reportMsg,
    //                     },
    //                 ];
    //                 setIsChatting(true);
    //                 break;
    //             default:
    //                 break;
    //         }

    //         setStep(newStep);
    //         setUserProfile(newProfile);
    //         return [
    //             ...prevMessages,
    //             { type: 'user', text: response },
    //             ...newMessages,
    //         ];
    //     });
    // };
    const handleUserResponse = async (response: string) => {
        let newProfile = { ...userProfile };
        let newStep = step;
        let newMessages: Message[] = [];

        // Store user response
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'user', text: response },
        ]);

        // Update profile and determine next step and messages
        switch (step) {
            case 0:
                newProfile.age = response;
                newStep = 1;
                newMessages = [
                    {
                        type: 'bot',
                        text: 'Awesome! Please select your gender?',
                        options: ['M', 'F'],
                    },
                ];
                break;
            case 1:
                newProfile.gender = response;
                newStep = 2;
                newMessages = [
                    {
                        type: 'bot',
                        text: 'Thank you! What is your height in cm?',
                    },
                ];
                break;
            case 2:
                newProfile.height = response;
                newStep = 3;
                newMessages = [
                    { type: 'bot', text: 'Great! What is your weight in kg?' },
                ];
                break;
            case 3:
                newProfile.weight = response;
                newStep = 4;
                newMessages = [
                    {
                        type: 'bot',
                        text: 'Awesome! What is your fitness goal?',
                        options: ['Muscle Building', 'Fat Loss', 'Others'],
                    },
                ];
                break;
            case 4:
                if (response === 'Others') {
                    newProfile.goal = response;
                    newStep = 5;
                    newMessages = [
                        {
                            type: 'bot',
                            text: 'Please specify your fitness goal:',
                        },
                    ];
                } else {
                    newProfile.goal = response;
                    newStep = 6;
                    newMessages = [
                        {
                            type: 'bot',
                            text: `Thank you! Your fitness goal is ${response}. We are generating your weekly fitness plan.`,
                        },
                    ];

                    // Format profile and generate report
                    const formattedProfile = formatUserProfile(newProfile);
                    await generateUserReport(formattedProfile);

                    newMessages.push({
                        type: 'bot',
                        text: reportMsg,
                    });

                    setStep(newStep);
                    setUserProfile(newProfile);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        ...newMessages,
                    ]);
                    return;
                }
                break;
            case 5:
                newProfile.goal = response;
                newStep = 6;
                newMessages = [
                    {
                        type: 'bot',
                        text: `Thank you! Your specified fitness goal is ${response}. We are generating your weekly fitness plan.`,
                    },
                ];

                // Format profile and generate report
                const formattedProfile = formatUserProfile(newProfile);
                await generateUserReport(formattedProfile);

                newMessages.push({
                    type: 'bot',
                    text: reportMsg,
                });

                setStep(newStep);
                setUserProfile(newProfile);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    ...newMessages,
                ]);
                return;
        }

        // Update state for new step and messages
        setStep(newStep);
        setUserProfile(newProfile);
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    };

    const formatUserProfile = (profile: {
        age: string;
        gender: string;
        height: string;
        weight: string;
        goal: string;
    }): string => {
        return `Age ${profile.age}, Sex ${profile.gender}, height ${profile.height} cm, weight ${profile.weight} kg, fitness goal ${profile.goal}. Create the weekly workout schedule for the attached profile.`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserResponse(e.target.value);
    };

    const handleSend = () => {
        if (userResponse.trim()) {
            handleUserResponse(userResponse.trim());
            setUserResponse('');
        }
    };

    const handleOptionClick = (option: string) => {
        handleUserResponse(option);
    };
    return (
        <div className="flex flex-col items-center h-full">
            <div className="w-full mb-10 space-y-3">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`w-fit ${
                            message.type === 'bot' ? 'm-0' : 'ml-[80%]'
                        } py-2 rounded-md ${
                            message.type === 'bot'
                                ? 'bg-blue-100'
                                : 'bg-green-200'
                        }`}
                    >
                        <p className="text-gray-800 px-4 mx-2 text-sm">
                            {message.text}
                        </p>
                        {message.options && (
                            <div className="flex justify-center space-x-2">
                                {message.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() =>
                                            handleOptionClick(option)
                                        }
                                        className="bg-blue-500 text-white p-1 px-2 w-fit text-xs rounded-md hover:bg-blue-600"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}{' '}
            </div>

            {(step === 0 || step === 2 || step === 3 || step === 5) && (
                <div className="flex absolute bottom-0 w-[18em] items-center">
                    <input
                        type="text"
                        value={userResponse}
                        onChange={handleInputChange}
                        placeholder="Type your response..."
                        className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-blue-400"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
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
                                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatMessages;
