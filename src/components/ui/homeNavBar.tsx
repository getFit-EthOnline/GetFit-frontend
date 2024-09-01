'use client';
import React from 'react';
import { logoWhite } from '../../../public/index';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useWeb3Auth from '@/hooks/useWeb3Auth';
import useGlobalStore from '@/store';
import { getBalance } from '@/contracts/galadriel';

const navContents = [
    {
        id: 1,
        title: 'Market Prediction',
    },
    {
        id: 2,
        title: 'Fantasy Fitness Leagues',
    },
    {
        id: 3,
        title: 'Move To Earn',
    },
    {
        id: 4,
        title: 'Tickets',
    },
    {
        id: 5,
        title: 'Membership',
    },
    {
        id: 6,
        title: 'Token Battles',
    },
    {
        id: 7,
        title: 'Marketplaces',
    },
];

const HomeNav = () => {
    return (
        <>
            <div className=" flex shadow-lg  justify-between bg-[#1E1E1E] items-center py-2 px-10 ">
                <div className=" flex  items-center w-1/2">
                    <Image src={logoWhite} alt="GetFit" className="w-32 " />
                </div>

                <div className=" items-center flex justify-end gap-x-5  w-1/2">
                    <div className=" relative ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="absolute  translate-x-1/3 translate-y-1 size-6 text-slate-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>

                        <input
                            className=" rounded-md bg-[#313131] py-1 text-center "
                            placeholder=" Search here"
                        />
                    </div>
                    <WalletConnectButton />
                </div>
                <div></div>
            </div>
            <div className=" py-3 text-white  flex bg-[#313131] w-full  items-center  justify-center gap-x-16">
                {navContents.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className=" flex items-center gap-x-1 justify-center "
                        >
                            <p className="capitalize">{item.title}</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default HomeNav;

const WalletConnectButton = () => {
    const { login, logout } = useWeb3Auth();
    const { address } = useGlobalStore();
    const handleLogin = async () => {
        const res = await login();
        if (res) {
            await getBalance(res);
        }
    };
    return (
        <motion.button
            className="inline-flex overflow-hidden rounded-lg bg-[linear-gradient(120deg,#063434_calc(var(--shimmer-button-x)-25%),#063434_var(--shimmer-button-x),#063434_calc(var(--shimmer-button-x)+25%))] [--shimmer-button-x:0%] "
            initial={
                {
                    scale: 1,
                    '--shimmer-button-x': '-100%',
                } as any
            }
            onClick={() => (address ? logout : handleLogin())}
            animate={
                {
                    '--shimmer-button-x': '200%',
                } as any
            }
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
        >
            <span className="m-[0.125rem] text-[#063434] rounded-[calc(0.5rem-0.125rem)] bg-[#B8FE22] px-4 py-1   backdrop-blur-sm">
                {address ? address : 'connect wallet'}
            </span>
        </motion.button>
    );
};
