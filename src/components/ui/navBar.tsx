'use client';
import useWeb3Auth from '@/hooks/useWeb3Auth';
import useGlobalStore from '@/store';
import { cn, toastStyles } from '@/utils/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { logo } from '../../../public/index';

import toast from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';

const NavBar = () => {
    return (
        <div className=" flex shadow-lg  justify-between items-center py-4 ">
            <div className=" flex justify-center items-center w-1/4">
                <Image src={logo} alt="GetFit" className="w-44 " />
            </div>

            <div className=" items-center flex justify-center  w-1/4">
                <WalletConnectButton />
            </div>
        </div>
    );
};
export default NavBar;
export const WalletConnectButton = () => {
    const { login, logout } = useWeb3Auth();
    const { address, balance } = useGlobalStore();
    const handleCopy = (address: string) => {
        navigator.clipboard
            .writeText(address)
            .then(() => {
                toast.success('Address copied to clipboard!', toastStyles);
            })
            .catch(() => {
                toast.success('Something went wrong', toastStyles);
            });
    };
    return (
        <div className="flex justify-center gap-x-4  items-center ">
            <motion.button
                className="inline-flex overflow-hidden rounded-lg bg-[linear-gradient(120deg,#063434_calc(var(--shimmer-button-x)-25%),#063434_var(--shimmer-button-x),#063434_calc(var(--shimmer-button-x)+25%))] [--shimmer-button-x:0%] "
                initial={
                    {
                        scale: 1,
                        '--shimmer-button-x': '-100%',
                    } as any
                }
                onClick={() => (address ? handleCopy(address || '') : login())}
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
                <span className=" bg-[#B8FE22] px-2 py-1">
                    {getButtonCTA({
                        isLoading: false,
                        text: address
                            ? // ? address.slice(0, 4) + '...' + address.slice(4, 7)
                              address.slice(0, 4) +
                              '...' +
                              address.slice(-4) +
                              ' ' +
                              parseFloat(balance || '0').toFixed(3) +
                              ' ' +
                              'ETH'
                            : 'Connect wallet',
                    })}
                </span>
            </motion.button>
            {address && (
                <svg
                    onClick={() => logout()}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className=" text-slate-500 size-6 hover:text-slate-300 cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                    />
                </svg>
            )}
        </div>
    );
};

const getButtonCTA = ({
    isLoading,
    text,
}: {
    isLoading: boolean;
    text: string;
}) => {
    if (isLoading) {
        return (
            <span
                className={cn(
                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                )}
            >
                <ImSpinner2 className="animate-spin" />
            </span>
        );
    }
    return text;
};
