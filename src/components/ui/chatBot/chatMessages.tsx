'use client';

import { addMessage, getNewMessages } from '@/contracts/galadriel';
import useGlobalStore from '@/store';
import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '@/styles/chat.css';
import axios from 'axios';
interface Message {
    type: 'bot' | 'user' | 'loading';
    text: string | null;
    options?: string[];
}

const ChatMessages = ({ chatId }: { chatId: number }) => {
    const [downloadUrl, setDownloadUrl] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
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
    }>({
        age: '',
        gender: '',
        height: '',
        weight: '',
        goal: '',
    });

    const { provider, agentFirstMessage } = useGlobalStore();

    useEffect(() => {
        setMessages([
            {
                type: 'bot',
                text:
                    agentFirstMessage ||
                    '"From the time you take your first breath, you become eligible to die. You also become eligible to find your greatness and become the one warrior"',
            },
            { type: 'bot', text: 'What is your age?' },
        ]);
    }, [agentFirstMessage]);

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

    const fetchMessages = async () => {
        setTimeout(async () => {
            const newMessages = await getNewMessages(chatId, 0);
            console.log(newMessages);
            const resp = newMessages[newMessages.length - 2].content;
            if (resp) {
                handleGeneratePDF(resp);
            }
        }, 15000);
    };

    const generateUserReport = async (formattedProfile: string) => {
        try {
            const response = await addMessage({
                message: formattedProfile,
                agentRunID: chatId,
                provider,
            });

            if (response.dispatch) {
                await fetchMessages();
            }
        } catch (error) {
            console.error('Error generating user report:', error);
        }
    };

    const handleGeneratePDF = async (text: string) => {
        try {
            const response = await axios.post('/api/generate-pdf', { text });
            if (response.data.url) {
                setDownloadUrl(response.data.url);
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
                    newMessages.push({
                        type: 'bot',
                        text: "Here's your personalized fitness plan!",
                    });
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
                    text: "Here's your personalized fitness plan!",
                });
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
                className="w-full   h-[calc(100vh-6rem)]"
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
                                <p className="text-gray-800 p-1 mx-1 text-sm">
                                    {message.text}
                                </p>
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

                {messages.length > 0 &&
                    messages[messages.length - 1].text ===
                        "Here's your personalized fitness plan!" &&
                    downloadUrl && (
                        <a
                            href={downloadUrl}
                            download="report.pdf"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Download as PDF
                        </a>
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
