'use client';
import React from 'react';
import { logo } from '../../../public/index';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useWeb3Auth from '@/hooks/useWeb3Auth';

const navContents = [
    {
        id: 1,
        title: 'fan tokens',
    },
    {
        id: 2,
        title: 'Rewards',
    },
    {
        id: 3,
        title: 'Marketplace',
    },
];

const NavBar = () => {
    return (
        <div className=" flex shadow-lg  justify-between items-center py-4 ">
            <div className=" flex justify-center items-center w-1/4">
                <Image src={logo} alt="GetFit" className="w-44 " />
            </div>
            <div className=" w-1/3 flex  items-center justify-around">
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
            <div className=" items-center flex justify-center  w-1/4">
                <WalletConnectButton label="connect wallet" />
            </div>
        </div>
    );
};

export default NavBar;

const WalletConnectButton = ({ label }: { label: string }) => {
    const { login } = useWeb3Auth();
    return (
        <motion.button
            onClick={login}
            className="inline-flex overflow-hidden rounded-lg bg-[linear-gradient(120deg,#063434_calc(var(--shimmer-button-x)-25%),#063434_var(--shimmer-button-x),#063434_calc(var(--shimmer-button-x)+25%))] [--shimmer-button-x:0%] "
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
                {label}
            </span>
        </motion.button>
    );
};
