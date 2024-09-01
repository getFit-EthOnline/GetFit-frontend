'use client';
import React, { useState } from 'react';
import ChatMessages from './chatMessages';
import useGlobalStore from '@/store';
import Image from 'next/image';
import Bell from '../../../../public/icons/bell.png';
import useWeb3Auth from '@/hooks/useWeb3Auth';
const ChatButton = ({ chatId }: { chatId: number }) => {
    const [open, setOpen] = useState(false);
    const { userAgent } = useGlobalStore();
    const { provider } = useWeb3Auth();
    return (
        <div className="fixed bottom-0 right-0 w-[400px]   overflow-hidden   ">
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
                    <ChatMessages chatId={chatId} provider={provider} />
                </div>
            )}
        </div>
    );
};

export default ChatButton;
