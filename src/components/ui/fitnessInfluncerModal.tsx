'use client';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import {
    anatolyProfilePic,
    davidGogginsProfilePic,
    larryWheelsProfilePic,
} from '../../../public';
import Image from 'next/image';
import useGlobalStore, { userAgentProps } from '@/store';
import { startFitnessRun } from '@/contracts/galadriel';
import useWeb3Auth from '@/hooks/useWeb3Auth';
const InfluencerDetails = [
    {
        id: 1,
        name: 'david goggins',
        profilePic: davidGogginsProfilePic,
    },
    {
        id: 2,
        name: 'anatoly',
        profilePic: anatolyProfilePic,
    },
    {
        id: 3,
        name: 'larry Wheels',
        profilePic: larryWheelsProfilePic,
    },
];

const InfluencerModal = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedInfluencer, setSelectedInfluencer] =
        useState<userAgentProps | null>(null);
    const { provider } = useWeb3Auth();
    const { setUserAgnet } = useGlobalStore();
    useEffect(() => {
        const hasModalBeenShown = localStorage.getItem('hasModalBeenShown');
        if (hasModalBeenShown) {
            setIsOpen(false);
        }
    }, []);
    const closeModal = () => {
        setUserAgnet(selectedInfluencer);
        // startFitnessRun({
        //     message:
        //         'Age 43, Sex M, fitness goal muscle gain, diet vegan. Create the weekly workout schedule',
        //     provider,
        // });

        localStorage.setItem('hasModalBeenShown', 'true');
        setIsOpen(false);
    };
    return (
        <div>
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={() => { }}
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
                                {InfluencerDetails.map((influencer) => {
                                    return (
                                        <div
                                            key={influencer.id}
                                            onClick={() =>
                                                setSelectedInfluencer(
                                                    influencer
                                                )
                                            }
                                            className="flex flex-col items-center  mt-4"
                                        >
                                            <div className={` rounded-full ${selectedInfluencer?.name === influencer.name ? "bg-[#B8FE22]" : ""} `}>
                                                <Image
                                                    src={influencer.profilePic}
                                                    alt={influencer.name}
                                                    className="w-14 h-14 object-fill p-0.5 shadow-lg  rounded-full "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="text-lg/1 font-semibold capitalize text-slate-900">
                                                    {influencer.name}
                                                </h1>
                                                <p className="text-sm/6 text-slate-500">
                                                    Influencer
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    disabled={!selectedInfluencer}
                                    onClick={closeModal}
                                >
                                    Start your fitness journey now
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default InfluencerModal;
