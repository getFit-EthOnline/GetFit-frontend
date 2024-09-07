import {
    getUsdcBalance,
    sendUsdcCrossChainSubscription,
} from '@/contracts/chainlink';
import useGlobalStore from '@/store';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
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
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    function close() {
        setOpen(false);
    }
    const { balance, smartAddress, setBalance, smartAccount } =
        useGlobalStore();
    const [duration, setDuration] = useState(3);
    const [selectedInterval, setSelectedInterval] = useState(1);
    const smartBalanceFetch = async () => {
        const balance: any = await getUsdcBalance(smartAddress);
        const finalBalance = balance / 10 ** 6;
        setBalance(finalBalance.toString());
    };
    useEffect(() => {
        if (smartAddress) {
            smartBalanceFetch();
        }
    }, []);
    const handleAutoPay = async () => {
        const res = await sendUsdcCrossChainSubscription(
            smartAddress,
            '0x0F284B92d59C8b59E11409495bE0c5e7dBe0dAf9',
            Math.floor(Date.now() / 1000),
            5,
            1,
            smartAccount,
            '10344971235874465080',
            '0x7899070557CF9758b8be4E0BE9dfF5a200D5ef6d',
            duration
        );
        console.log(res);
    };
    return (
        <div>
            <Dialog
                open={open}
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/1 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle
                                as="h3"
                                className="text-base/7 capitalize font-medium text-white"
                            >
                                Select Influencer
                            </DialogTitle>
                            <div className="flex items-center justify-between">
                                asdfasdf
                            </div>
                            {balance === '0' && (
                                <div>
                                    <a
                                        href="https://faucet.circle.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline"
                                    >
                                        Get test fund
                                    </a>
                                    <p>Powered by web3auth fieat onramp</p>
                                </div>
                            )}
                            <div className="flex items-center gap-x-4">
                                {INTERVAL.map((item, index) => {
                                    return (
                                        <div
                                            className={`border  p-2 rounded-lg cursor-pointer ${
                                                selectedInterval === item.id
                                                    ? 'border-green-200'
                                                    : 'border-red-200'
                                            } `}
                                            key={index}
                                            onClick={() => {
                                                setDuration(item.value);
                                                setSelectedInterval(item.id);
                                            }}
                                        >
                                            {item.title}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-4  ">
                                <Button
                                    onClick={handleAutoPay}
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 p-1 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                >
                                    <p>Autopay</p>
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default SubscribeModal;
