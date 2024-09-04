'use client';
import LiveChat from '@/components/ui/liveMatch/liveChat';
import PlayerAnalysis from '@/components/ui/liveMatch/playerAnalysis';
import { addMessage, getBalance, getNewMessages } from '@/contracts/galadriel';
import useGlobalStore from '@/store';
import { motion } from 'framer-motion';
import React from 'react';
import { FaLock } from 'react-icons/fa';
import { RiExternalLinkLine } from 'react-icons/ri';
const Page = () => {
    const [predictionEnabled, setPredictionEnabled] = React.useState(false);
    const [paymentLink, setPaymentLink] = React.useState('');
    const [btnState, setBtnState] = React.useState('Get your prediction');
    const [stas, setStats] = React.useState('');
    const { provider, address, setBalance } = useGlobalStore();
    const fetchMessages = async (resp: number) => {
        setTimeout(async () => {
            const messages = await getNewMessages(resp, 0);
            console.log(messages);
            const msgs = messages[messages.length - 2].content;
            setStats(msgs);
            setPredictionEnabled(true);
            setBtnState('Predictions available');
        }, 20000);
    };
    const handlePrediction = async () => {
        setBtnState('Getting predictions please wait...');

        const response = await addMessage({
            message:
                'Please share all the stats and winning percentage of Floyd Mayweather vs Conor McGregor',
            agentRunID: 92,
            provider,
        });
        if (response.dispatch) {
            setPaymentLink(response.dispatch);
            const balance = await getBalance(address);
            setBalance(balance);
            fetchMessages(92);
        }
    };
    const videoId = '91w2-Zs0XuU';
    const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    return (
        <div className="flex flex-col lg:flex-row w-full px-4 lg:px-16 py-10 gap-y-10 lg:gap-x-16">
            <div className="flex flex-col gap-y-10 items-center w-full lg:max-w-[60%]">
                <div className=" ">
                    <iframe
                        width="860"
                        height="415"
                        src={url}
                        title="YouTube video player"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                </div>
                <motion.button
                    initial={
                        {
                            scale: 1,
                            '--shimmer-button-x': '-100%',
                        } as any
                    }
                    animate={
                        {
                            '--shimmer-button-x': '200%',
                        } as any
                    }
                    onClick={handlePrediction}
                    disabled={predictionEnabled}
                    transition={{
                        stiffness: 500,
                        damping: 20,
                        type: 'spring',
                        '--shimmer-button-x': {
                            duration: 3,
                            repeat: Infinity,
                            ease: [0.445, 0.05, 0.55, 0.95],
                        },
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    whileHover={{
                        scale: 1.05,
                    }}
                    className="bg-blue-400 rounded-lg w-full p-2 flex items-center gap-x-2 justify-center"
                >
                    {btnState}
                    {predictionEnabled ? (
                        <a
                            className="cursor-pointer"
                            href={`https://explorer.galadriel.com/tx/${paymentLink}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <RiExternalLinkLine />
                        </a>
                    ) : (
                        <FaLock />
                    )}
                </motion.button>
                {predictionEnabled && <PlayerAnalysis stats={stas} />}
            </div>
            <div className="w-full lg:w-[40%] max-h-[calc(100vh-10px)] shadow-lg">
                <LiveChat />
            </div>
        </div>
    );
};

export default Page;
