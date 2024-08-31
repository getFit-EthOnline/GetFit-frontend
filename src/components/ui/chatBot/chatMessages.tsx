"use client"
import React, { useEffect, useState } from 'react'

const ChatMessages = () => {
    const [messages, setMessages] = useState<{ type: string; text: string; options?: string[] }[]>([]);
    const [userResponse, setUserResponse] = useState('');
    const [step, setStep] = useState(0);


    console.log(userResponse)
    useEffect(() => {
        // Greet the user with a motivational quote
        setMessages([
            { type: 'bot', text: ' "The only way to do great work is to love what you do." - Steve Jobs' },
            { type: 'bot', text: 'What is your age?' },
        ]);
    }, []);

    const handleUserResponse = (response: string) => {
        setMessages((prevMessages) => [...prevMessages, { type: 'user', text: response }]);

        if (step === 0) {
            setStep(1);
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'bot', text: 'Awesome! Please select your gender?', options: ['M', 'F'] },
            ]);
        } else if (step === 1) {
            setStep(2);
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'bot', text: 'Thank you! What is your height in cm?' },
            ]);
        }
        else if (step === 2) {
            setStep(3);
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'bot', text: 'Great! What is your weight in kg?' },
            ]);
        } else if (step === 3) {
            setStep(4);
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'bot', text: 'Awesome! What is your fitness goal?', options: ['Muscle Building', 'Fat Loss', 'Others'] },
            ]);
        } else if (step === 4) {
            if (response === "Others") {
                setStep(5);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { type: "bot", text: "Please specify your fitness goal:" },
                ]);
            } else {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        type: "bot",
                        text: `Thank you! Your fitness goal is ${response}. Let's get started!`,
                    },
                ]);
                setStep(6);

            }
        } else if (step === 5) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'bot', text: `Thank you! Your specified fitness goal is ${response}. Let's get started!` },
            ]);
            setStep(7);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserResponse(e.target.value);
    };

    const handleSend = () => {
        if (userResponse.trim() !== '') {
            handleUserResponse(userResponse.trim());
            setUserResponse('');
        }
    };

    const handleOptionClick = (option: string) => {
        handleUserResponse(option);
    };

    return (
        <div className="flex flex-col items-center h-full ">

            <div className=" w-full mb-10 space-y-3">
                {messages.map((message, index) => (
                    <div key={index} className={`w-fit ${message.type === 'bot' ? 'm-0' : 'ml-[80%]'} py-2 rounded-md ${message.type === 'bot' ? 'bg-blue-100' : 'bg-green-200'}`}>
                        <p className="text-gray-800  px-4 mx-2 text-sm">{message.text}</p>
                        {message.options && (
                            <div className="flex justify-center  space-x-2 ">
                                {message.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionClick(option)}
                                        className="bg-blue-500 text-white  p-1 px-2 w-fit text-xs rounded-md hover:bg-blue-600"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {(step === 0 || step === 3 || step === 2 || step === 5) && (
                <div className=" flex absolute bottom-0 w-[18em] items-center  ">
                    <input
                        type="text"
                        value={userResponse}
                        onChange={handleInputChange}
                        placeholder="Type your response..."
                        className="w-full px-4 py-2 border rounded-l-md focus:outline-none  focus:ring-blue-400"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>

                    </button>
                </div>
            )}

        </div>
    );
}

export default ChatMessages
