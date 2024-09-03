'use client';

import { addMessage, getNewMessages } from '@/contracts/galadriel';
import useGlobalStore from '@/store';
import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '@/styles/chat.css';
import axios from 'axios';
import { Message } from './chatbutton';
import { RiExternalLinkLine } from 'react-icons/ri';

const ChatMessages = ({
    chatId,
    messages,
    setMessages,
}: {
    chatId: number;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) => {
    const [downloadUrl, setDownloadUrl] = useState('');
    const [downloadUrlDiet, setDownloadUrlDiet] = useState('');

    const [userResponse, setUserResponse] = useState<string>('');
    const [step, setStep] = useState<number>(0);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for chat container
    const inputRef = useRef<HTMLInputElement>(null); // Ref for input

    const [userProfile, setUserProfile] = useState<{
        age: string;
        gender: string;
        height: string;
        weight: string;
        goal: string;
        dietRequired: string;
    }>({
        age: '',
        gender: '',
        height: '',
        weight: '',
        goal: '',
        dietRequired: '',
    });

    const { provider } = useGlobalStore();
    useEffect(() => {
        // Focus on the input when component mounts
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        // Scroll to the latest message
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth', // Add smooth scrolling
        });
    }, [messages, isTyping]);

    const fetchMessages = async (type: string | undefined, trx: string) => {
        setTimeout(async () => {
            const newMessages = await getNewMessages(chatId, 0);
            console.log(newMessages);
            const resp = newMessages[newMessages.length - 1].content;
            if (type) {
                if (resp) {
                    handleGeneratePDFDiet(resp, trx);
                }
            } else {
                if (resp) {
                    handleGeneratePDF(resp, trx);
                }
            }
        }, 20000);
    };
    const generateUserReport = async (
        formattedProfile: string,
        type?: string
    ) => {
        try {
            const response = await addMessage({
                message: formattedProfile,
                agentRunID: chatId,
                provider,
            });
            if (response.dispatch) {
                await fetchMessages(type, response.dispatch);
            }
        } catch (error) {
            console.error('Error generating user report:', error);
        }
    };
    const handleGeneratePDFDiet = async (text: string, trx: string) => {
        try {
            const response = await axios.post('/api/generate-pdf', { text });
            if (response.data.url) {
                setDownloadUrlDiet(response.data.url);

                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        type: 'bot',
                        text: "Here's your personalized diet plan!",
                    },
                    {
                        type: 'bot',
                        isComponent: true,
                        component: (
                            <div className="flex items-center gap-x-4">
                                <a
                                    href={downloadUrlDiet}
                                    download="report.pdf"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Download as PDF
                                </a>

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
                        ),
                    },
                ]);
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    const handleGeneratePDF = async (text: string, trx: string) => {
        try {
            const response = await axios.post('/api/generate-pdf', { text });
            if (response.data.url) {
                setDownloadUrl(response.data.url);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        type: 'bot',
                        text: "Here's your personalized fitness plan!",
                    },
                    {
                        type: 'bot',
                        isComponent: true,
                        component: (
                            <div className="flex items-center gap-x-3">
                                <a
                                    href={downloadUrl}
                                    download="report.pdf"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Download as PDF
                                </a>

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
                        ),
                    },
                    {
                        type: 'bot',
                        text: `Do you want a diet plan for above details?`,
                        options: ['Vegan', 'Veg', 'Non-Veg'],
                    },
                ]);
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    const handleUserResponse = async (response: string) => {
        let newProfile = { ...userProfile };
        let newStep = step;
        let newMessages: Message[] = [];

        // Store user response
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'user', text: response },
        ]);

        setIsTyping(true); // Start loader

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
                break;
            case 6:
                newProfile.dietRequired = response;
                newStep = 7;
                newMessages = [
                    {
                        type: 'bot',
                        text: `Thank you! We are generating your diet plan please wait...`,
                    },
                ];
                if (newProfile.dietRequired) {
                    await generateUserReport(
                        `Send the diet schedule for above workout with ${newProfile.dietRequired} diet`,
                        'diet'
                    );
                }
                break;
        }

        // Simulate typing delay
        setTimeout(() => {
            setIsTyping(false); // Stop loader
            setStep(newStep);
            setUserProfile(newProfile);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        }, 4000); // 4-second delay before showing the bot's response
    };
    // if (reportMsg) {
    //     handleGeneratePDF(reportMsg);
    // }
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
        <div className="flex flex-col no-scrollbar items-center ">
            <div
                ref={chatContainerRef}
                className="w-full   h-[calc(100vh-4rem)]"
            >
                <TransitionGroup className="mb-5">
                    {messages.map((message, index) => (
                        <CSSTransition
                            key={index}
                            timeout={500}
                            classNames="fade"
                        >
                            <div
                                className={`w-fit mt-2   ${
                                    message.type === 'bot' ? 'm-0' : 'ml-[80%]'
                                }  rounded-md ${
                                    message.type === 'bot'
                                        ? 'bg-blue-100'
                                        : 'bg-green-200'
                                }`}
                            >
                                {message.type === 'bot' ? (
                                    message.isComponent ? (
                                        <>{message.component}</>
                                    ) : (
                                        <p className="text-gray-800 p-1 mx-1 text-sm">
                                            {message.text}
                                        </p>
                                    )
                                ) : (
                                    <p className="text-gray-800 p-1 mx-1 text-sm">
                                        {message.text}
                                    </p>
                                )}
                                {message.options && (
                                    <div className="flex justify-center space-x-2 p-2">
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
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                {isTyping && (
                    <CSSTransition timeout={500} classNames="fade">
                        <div className="w-fit m-0 py-2 rounded-md ">
                            <div className="flex items-center justify-center space-x-2">
                                <div className="h-4 w-4 animate-bounce rounded-full bg-[#B8FE22] [animation-delay:-0.3s]"></div>
                                <div className="h-4 w-4 animate-bounce rounded-full  bg-[#B8FE22] [animation-delay:-0.13s]"></div>
                                <div className="h-4 w-4 animate-bounce rounded-full  bg-[#B8FE22]"></div>
                            </div>
                        </div>
                    </CSSTransition>
                )}
            </div>

            {(step === 0 || step === 2 || step === 3 || step === 5) && (
                <div className="flex absolute bottom-0 w-[24em] items-center">
                    <input
                        ref={inputRef} // Ref for input field
                        type="text"
                        value={userResponse}
                        onChange={handleInputChange}
                        placeholder="Type your response..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-l-md"
                    />
                    <button
                        onClick={handleSend}
                        className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
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
