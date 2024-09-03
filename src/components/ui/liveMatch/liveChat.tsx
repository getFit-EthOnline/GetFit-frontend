'use client';
import React, { useState, useEffect, useRef } from 'react';

const initialMessages = [
    {
        id: 1,
        user: 'User1',
        level: 'Pro',
        message: 'Just placed 200 coins on the next round! Feeling lucky 🍀',
        timestamp: '12:08 PM',
    },
    {
        id: 2,
        user: 'User2',
        level: 'VIP',
        message: "Nice bet, User1! Let's see if your luck holds!",
        timestamp: '12:09 PM',
    },
    {
        id: 3,
        user: 'System',
        level: '',
        message: 'User3 just won 500 coins on a 10x multiplier! 🎉',
        timestamp: '12:10 PM',
    },
    {
        id: 4,
        user: 'User4',
        level: 'Beginner',
        message: "How do I place a bet? I'm new here!",
        timestamp: '12:11 PM',
    },
    {
        id: 5,
        user: 'Moderator',
        level: '',
        message: 'Reminder: Be respectful in the chat and enjoy the game!',
        timestamp: '12:12 PM',
    },
    {
        id: 6,
        user: 'User5',
        level: 'Pro',
        message:
            '@User4 Just type your bet amount and select the event. Good luck!',
        timestamp: '12:13 PM',
    },
    {
        id: 7,
        user: 'User1',
        level: 'Pro',
        message: "Oh no, lost that one 😅. But I'm doubling down next round!",
        timestamp: '12:14 PM',
    },
];

const LiveChat = () => {
    const [messages, setMessages] = useState<
        {
            id: number;
            user: string;
            level: string;
            message: string;
            timestamp: string;
        }[]
    >([]);
    const messageIndexRef = useRef(0);
    const [inputMessage, setInputMessage] = useState('');
    const chatRef = useRef(null);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        startMessageLoop();
        return () => clearInterval(intervalIdRef.current || undefined);
    }, []);

    useEffect(() => {
        if (chatRef.current) {
            (chatRef.current as HTMLDivElement).scrollTop = (
                chatRef.current as HTMLDivElement
            ).scrollHeight;
        }
    }, [messages]);

    const startMessageLoop = () => {
        clearInterval(intervalIdRef.current || undefined); // Clear any previous interval
        intervalIdRef.current = setInterval(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                initialMessages[messageIndexRef.current],
            ]);

            messageIndexRef.current =
                (messageIndexRef.current + 1) % initialMessages.length; // Loop continuously
        }, 2000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;

        const newMessage = {
            id: messages.length + 1,
            user: 'You',
            level: 'Player',
            message: inputMessage,
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage('');
        messageIndexRef.current = 0; // Reset message index to restart the loop
        startMessageLoop(); // Restart the loop
    };

    return (
        <>
            <div className="flex flex-col h-full w-full  rounded-md bg-white p-4   ">
                <h1 className=" text-slate-600 font-bold ">Live Chats</h1>
                <div
                    className="flex-grow overflow-y-auto pr-2 no-scrollbar  "
                    ref={chatRef}
                >
                    {messages.map(
                        (msg, index) =>
                            msg && (
                                <div
                                    key={msg.id || index}
                                    className={`p-2 mb-2 rounded-md ${
                                        msg.user === 'System'
                                            ? 'bg-blue-400 italic'
                                            : msg.user === 'Moderator'
                                            ? 'bg-red-400 font-bold'
                                            : msg.user === 'You'
                                            ? 'bg-green-600 text-right'
                                            : 'bg-gray-100'
                                    }`}
                                >
                                    <div className="flex flex-col">
                                        <div>
                                            <span className="font-bold mr-2">
                                                {msg.user}
                                            </span>
                                            {msg.level && (
                                                <span className="text-blue-500 mr-2">
                                                    ({msg.level})
                                                </span>
                                            )}
                                            :
                                            <span className="ml-1">
                                                {msg.message}
                                            </span>
                                        </div>
                                        <span className="text-gray-500 text-xs mt-1">
                                            {msg.timestamp}
                                        </span>
                                    </div>
                                </div>
                            )
                    )}
                </div>
                <div className="flex border-t border-gray-200 pt-4">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={handleInputChange}
                        placeholder="Type your message here..."
                        className="flex-grow p-2 rounded bg-gray-100 text-gray-800 focus:outline-none"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    );
};

export default LiveChat;
