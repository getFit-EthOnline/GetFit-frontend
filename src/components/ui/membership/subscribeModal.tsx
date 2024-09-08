import {
    getUsdcBalance,
    sendUsdcCrossChainSubscription,
} from '@/contracts/chainlink';
import useGlobalStore from '@/store';
import { toastStyles } from '@/utils/utils';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { Client } from '@xmtp/xmtp-js';
import axios from 'axios';
import { Wallet } from 'ethers';
import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import { RiExternalLinkLine } from 'react-icons/ri';
import { useAccount, useChainId } from 'wagmi';
import { Base, Sepolia, UsdcIcon } from '../../../../public';
import { getButtonCTA } from '../navBar';
import TextRevealButton from './textRevealButton';
const chainShownData = [
    {
        id: 1,
        name: 'Base',
        icon: Base,
    },
    {
        id: 2,
        name: 'Sepolia',
        icon: Sepolia,
    },
];
const userAddress = '0x0F284B92d59C8b59E11409495bE0c5e7dBe0dAf9';
const INTERVAL = [
    {
        id: 1,
        title: '3 months',
        value: 3,
    },
    {
        id: 2,
        title: '6 months',
        value: 6,
    },
    {
        id: 3,
        title: '12 months',
        value: 12,
    },
];
const SubscribeModal = ({
    name,
    description,
    profilePic,
    fees,
}: {
    name: string;
    description: string;
    profilePic: StaticImageData;
    fees: number;
}) => {
    let [isOpen, setIsOpen] = useState(false);
    function open() {
        setIsOpen(true);
    }
    function close() {
        setIsOpen(false);
    }
    const [paymentLink, setPaymentLink] = useState('');
    const { userEmail, balance, smartAddress, setBalance, smartAccount } =
        useGlobalStore();
    const [selectedChain, setSelectedChain] = useState('Base');
    const [duration, setDuration] = useState(3);
    const [selectedInterval, setSelectedInterval] = useState(1);
    const [state, setState] = useState('Subscribe to access');
    const [loader, setLoader] = useState('Autopay');
    const chainID = useChainId();
    const handleSender = async () => {
        try {
            const response = await fetch('/api/subscription-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    smartAccountAddress: smartAddress,
                    email: userEmail,
                    gogginsWalletAddress: '0x232342',
                }),
            });
            if (response.ok) {
                console.log('Subscription saved successfully');
            } else {
                console.error('Error saving subscription');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const smartBalance = async () => {
        const balance = await getUsdcBalance(smartAddress, chainID);
        if (balance) {
            const finalBalance = balance / BigInt(10 ** 6);
            setBalance(finalBalance.toString());
        }
    };

    const { address } = useAccount()

    const { data } = useQuery({
        queryKey: ['creator-subscription', address, name],
        enabled: !!address,
        queryFn: async () => await axios.get<{ found: boolean }>('/api/creator-subscription', {
            params: {
                address,
                creator: name
            }
        })
    })

    const newConversation = async function (xmtp_client: Client, addressTo: string) {
        if (await xmtp_client?.canMessage(addressTo)) {
            const conversation = await xmtp_client.conversations.newConversation(
                addressTo
            );
            await conversation.send("Thanks for subscribing to my plan, we will send you daily updates on your email everyday");
        } else {
            console.log("cant message because is not on the network.");
        }
    };

    const handleSubscribe = async () => {
        if (!address || !userEmail || data?.data.found) {
            return;
        }
        toast.loading("Subscribing...", toastStyles);
        try {
            const signer = new Wallet('0x780f70a93655617c793a5758455f01014391666b87810908afabb121d7b097d5');
            const xmtp = await Client.create(signer, { env: "production" });
            await newConversation(xmtp, address);

            await axios.post('/api/creator-subscription', {
                address,
                email: userEmail,
                creator: name
            });

            toast.success("Subscription successful", toastStyles);
        } catch (error) {
            console.error("Subscription failed:", error);
            toast.error("Subscription failed", toastStyles);
        } finally {
            toast.remove();
        }
    };

    const handleAutoPay = async () => {
        setLoader('Purchasing subscription...');
        const res = await sendUsdcCrossChainSubscription(
            smartAddress,
            '0x0F284B92d59C8b59E11409495bE0c5e7dBe0dAf9',
            Math.floor(Date.now() / 1000),
            5,
            1,
            smartAccount,
            chainID === 11155111
                ? '10344971235874465080'
                : '16015286601757825753',
            chainID === 11155111
                ? '0x7899070557CF9758b8be4E0BE9dfF5a200D5ef6d'
                : '0x36A0C6ad26868FFA23D512AD8E0ee9E090122161',
            duration,
            chainID
        );
        debugger
        if (res?.transactionHash) {
            setPaymentLink(res.transactionHash);
            setState('Membership Subscribed');
            setLoader('Autopay success');
            smartBalance();
            handleSender();
            handleSubscribe()
            setLoader('Subscription successful');
        }

    };
    React.useEffect(() => {
        if (isOpen) {
            smartBalance();
        }
    }, [isOpen]);
    return (
        <>
            <Button
                onClick={open}
                className=" w-full bg-lime-400 hover:bg-lime-500 text-white font-bold  rounded-lg"
            >
                {state}
            </Button>
            <div>
                <Dialog
                    open={isOpen}
                    as="div"
                    className="relative z-10 focus:outline-none"
                    onClose={close}
                >
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                                transition
                                className="w-full max-w-md rounded-xl bg-neutral-950 bg-opacity-[40%] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 space-y-4"
                            >
                                <DialogTitle
                                    as="h3"
                                    className="text-base/7 capitalize font-medium text-white"
                                >
                                    Select Subscription Plan
                                </DialogTitle>
                                <div className="flex items-center  gap-x-3">
                                    <Image
                                        src={profilePic}
                                        alt={name}
                                        className=" w-24 h-24 rounded-full"
                                    />
                                    <div className="flex flex-col gap-y-1 ">
                                        <span className=" text-xl font-semibold">
                                            {' '}
                                            {name}
                                        </span>
                                        <span className=" text-xs font-semibold">
                                            {' '}
                                            {description}
                                        </span>
                                        <div className="  gap-2">
                                            <div className=" flex gap-x-2 items-center">
                                                <span className="  w-fit rounded-md">
                                                    {getButtonCTA({
                                                        isLoading: false,
                                                        text: userAddress
                                                            ? userAddress.slice(
                                                                0,
                                                                5
                                                            ) +
                                                            '...' +
                                                            userAddress.slice(
                                                                -5
                                                            )
                                                            : '',
                                                    })}
                                                </span>
                                                <Image
                                                    src={Base}
                                                    alt="usdc icon"
                                                    className=" w-5 rounded-full h-5"
                                                />
                                            </div>

                                            <span className="flex mt-2 items-center gap-x-2">
                                                {fees}{' '}
                                                <Image
                                                    src={UsdcIcon}
                                                    alt="usdc icon"
                                                    className=" w-5 rounded-full h-5"
                                                />{' '}
                                            </span>
                                        </div>
                                    </div>
                                </div>{' '}
                                <div className="flex items-center gap-x-2">
                                    <div className="text-sm text-gray-200">
                                        {' '}
                                        Your chains:
                                    </div>
                                    {chainShownData.map((data) => {
                                        return (
                                            <TextRevealButton
                                                key={data.id}
                                                title={data.name}
                                                image={data.icon}
                                                setSelectedChain={
                                                    setSelectedChain
                                                }
                                            />
                                        );
                                    })}
                                </div>
                                <div className="flex items-center gap-x-4">
                                    {INTERVAL.map((item, index) => {
                                        return (
                                            <div
                                                className={`active:scale-95 hover:scale-105 transition ease-in-out shadow-sm  p-1 mt-3 rounded-lg cursor-pointer ${selectedInterval === item.id
                                                    ? 'bg-lime-400'
                                                    : 'bg-slate-300'
                                                    } `}
                                                key={index}
                                                onClick={() => {
                                                    setDuration(item.value);
                                                    setSelectedInterval(
                                                        item.id
                                                    );
                                                }}
                                            >
                                                {item.title}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-4  ">
                                    {loader === 'Autopay success' ? (
                                        <Button
                                            className="flex items-center justify-center gap-2 rounded-md bg-gray-700 p-1 text-sm/6 font-semibold text-white shadow-inner shadow-white/10  w-full
                                    focus:outline-none data-[hover]
                                :bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 "
                                        >
                                            <a
                                                className="cursor-pointer flex items-center gap-x-2"
                                                href={`https://ccip.chain.link/tx/${paymentLink}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {loader}
                                                <RiExternalLinkLine size={20} />
                                            </a>
                                        </Button>
                                    ) : loader ===
                                        'Purchasing subscription...' ? (
                                        <Button
                                            onClick={handleAutoPay}
                                            className="flex items-center justify-center gap-2 rounded-md bg-gray-700 p-1 text-sm/6 font-semibold text-white shadow-inner shadow-white/10  w-full
                                    focus:outline-none data-[hover]
                                :bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 "
                                        >
                                            {loader}{' '}
                                            <ImSpinner2 className="animate-spin" />
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    if (balance !== '0') {
                                                        handleAutoPay();
                                                    } else {
                                                        window.open(
                                                            'https://faucet.circle.com',
                                                            '_blank'
                                                        );
                                                        close();
                                                    }
                                                }}
                                                className="flex items-center justify-center gap-2 rounded-md bg-gray-700 p-1 text-sm/6 font-semibold text-white shadow-inner shadow-white/10  w-full
                                    focus:outline-none data-[hover]
                                :bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 "
                                            >
                                                {balance === '0'
                                                    ? 'Get Test Funds'
                                                    : loader}
                                            </Button>
                                            {balance === '0' ? (
                                                <p className="text-xs text-end pt-2 text-gray-300">
                                                    Powered by Web3Auth Fiat On
                                                    Ramp
                                                </p>
                                            ) : selectedChain === 'Sepolia' ? (
                                                <p className="text-xs text-start pt-2 text-gray-300">
                                                    You are doing a cross-chain
                                                    trasaction it may take a
                                                    upto minute
                                                </p>
                                            ) : null}
                                        </>
                                    )}
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    );
};

export default SubscribeModal;
