'use client';
import { cn, toastStyles } from '@/utils/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { logo } from '../../../public/index';

import toast from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

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
    const { chain } = useAccount()
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
            <span className=' text-slate-500'>{chain?.id}</span>
            <div className=" items-center flex justify-center  w-1/4">
                <WalletConnectButton />
            </div>
        </div>
    );
};
export default NavBar;
export const WalletConnectButton = () => {
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { address } = useAccount();
    const handleLogin = async () => {
        const res = await connect({ connector: connectors[0] });
        debugger
        console.log(res);
        // if (res) {
        //     await getBalance(res);
        // }
    };

    const handleCopyToClipboard = () => {
        if (address) {
            navigator.clipboard.writeText(address);
            alert('Address copied to clipboard!');
        }
    };

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
        <>
            <motion.button
                className="inline-flex overflow-hidden rounded-lg bg-[linear-gradient(120deg,#063434_calc(var(--shimmer-button-x)-25%),#063434_var(--shimmer-button-x),#063434_calc(var(--shimmer-button-x)+25%))] [--shimmer-button-x:0%] "
                initial={
                    {
                        scale: 1,
                        '--shimmer-button-x': '-100%',
                    } as any
                }
                onClick={() => (address ? handleCopy(address || '') : handleLogin())}
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
                <span className=' bg-[#B8FE22] px-2 py-1'>
                    {getButtonCTA({
                        isLoading: false,
                        text: address
                            ? // ? address.slice(0, 4) + '...' + address.slice(4, 7)
                            address.slice(0, 4) + '...' + address.slice(-4)
                            : 'Connect wallet',
                    })}
                </span>


            </motion.button>
            {address && <svg onClick={() => disconnect()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-slate-500 size-6 hover:text-slate-300 cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
            </svg>}

        </>
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
                <ImSpinner2 className='animate-spin' />
            </span>
        );
    }
    return text;
};