'use client';
import Image from 'next/image';
import { logoWhite } from '../../../public/index';
import { WalletConnectButton } from './navBar';
import Link from 'next/link';

const navContents = [
    {
        id: 1,
        title: 'Market Prediction',
        link: '/prediction',
    },
    {
        id: 2,
        title: 'Fantasy Fitness Leagues',
        link: '/fantasyFitnessLeagues',
    },
    {
        id: 3,
        title: 'Move To Earn',
        link: '/move-to-earn',
    },
    {
        id: 4,
        title: 'Tickets',
        link: '/tickets',
    },
    {
        id: 5,
        title: 'Membership',
        link: '/membership',
    },
    {
        id: 6,
        title: 'Token Battles',
        link: '/tokenBattles',
    },
    {
        id: 7,
        title: 'Marketplaces',
        link: '/marketplaces',
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
                        <Link href={item.link} key={item.id}>
                            <div className=" flex items-center gap-x-1 justify-center ">
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
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default HomeNav;
