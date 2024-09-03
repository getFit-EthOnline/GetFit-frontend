'use client';
import useGlobalStore from '@/store';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Bell from '../../../../public/icons/bell.png';
import ChatMessages from './chatMessages';
import { RiExternalLinkLine } from 'react-icons/ri';
export interface Message {
    type: 'bot' | 'user' | 'loading';
    text?: string | null;
    options?: string[];
    isComponent?: boolean;
    component?: React.ReactNode;
}
const ChatButton = ({ chatId }: { chatId: number }) => {
    const [open, setOpen] = useState(false);
    const { userAgent, agentFirstMessage, fitnessRunTrx, balance } =
        useGlobalStore();
    const [messages, setMessages] = useState<Message[]>([]);
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
    return (
        <div className="fixed bottom-0 right-0 w-[400px]   overflow-hidden z-50  ">
            <div
                onClick={() => setOpen(!open)}
                className="  transition-all ease-in-out duration-100 rounded-md rounded-b-none min-h-11  bg-slate-400  hover:bg-slate-500  mx-1  py-2 px-4"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-3">
                        <Image
                            src={userAgent?.profilePic || ''}
                            alt="chat-bot"
                            className="rounded-full"
                            height={50}
                            width={50}
                        />
                        <p>{userAgent?.name}</p>
                        <Image
                            src={Bell}
                            alt="notification"
                            height={20}
                            width={20}
                        />
                        {fitnessRunTrx && (
                            <a
                                className="cursor-pointer"
                                href={`https://explorer.galadriel.com/tx/${fitnessRunTrx}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <RiExternalLinkLine size={20} />
                            </a>
                        )}
                    </div>
                    <div>
                        {!open ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                                />
                            </svg>
                        ) : (
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
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        )}
                    </div>
                </div>
            </div>
            {open && (
                <div className=" no-scrollbar overflow-x-hidden overflow-y-scroll transition-all ease-in-out duration-200  min-h-[calc(100vh-300px)]  max-h-[calc(100vh-300px)] bg-slate-100  mx-1 p-2">
                    <ChatMessages
                        chatId={chatId}
                        messages={messages}
                        setMessages={setMessages}
                    />
                </div>
            )}
        </div>
    );
};

export default ChatButton;
