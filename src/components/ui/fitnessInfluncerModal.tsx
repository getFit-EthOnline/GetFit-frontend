// @ts-nocheck
'use client';
import { getNewMessages, startFitnessRun } from '@/contracts/galadriel';
import useGlobalStore, { userAgentProps } from '@/store';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
    anatolyProfilePic,
    davidGogginsProfilePic,
    larryWheelsProfilePic,
} from '../../../public';
import SpiralLoader from './loader';
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

const InfluencerModal = ({
    setChatId,
}: {
    setChatId: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedInfluencer, setSelectedInfluencer] =
        useState<userAgentProps | null>(null);
    const { setUserAgnet, setAgentFirstMessage, provider } = useGlobalStore();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const hasModalBeenShown = localStorage.getItem('hasModalBeenShown');
        if (hasModalBeenShown) {
            setIsOpen(false);
        }
    }, []);
    const fetchMessages = async (resp: number) => {
        setTimeout(async () => {
            const messages = await getNewMessages(resp, 0);
            setAgentFirstMessage(messages[1].content);
            localStorage.setItem('hasModalBeenShown', 'true');
            setLoading(false);
            setIsOpen(false);
        }, 20000);
    };
    const closeModal = async () => {
        setUserAgnet(selectedInfluencer);
        setLoading(true);
        const resp = await startFitnessRun({
            message: `Create a fitness motivational quote from the influencer ${selectedInfluencer?.name}`,
            provider: provider,
        });
        if (resp.runId) {
            setChatId(resp.runId);
            fetchMessages(resp.runId);
        }
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
                                            <div
                                                className={` rounded-full ${selectedInfluencer?.name ===
                                                    influencer.name
                                                    ? 'bg-[#B8FE22]'
                                                    : ''
                                                    } `}
                                            >
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
                            <div className="mt-4  ">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 p-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    disabled={!selectedInfluencer}
                                    onClick={closeModal}
                                >
                                    <p> Start your fitness journey now</p>
                                    {loading && <SpiralLoader />}
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
