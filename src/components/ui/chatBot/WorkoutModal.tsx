import useGlobalStore from '@/store';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import axios from 'axios';
import React from 'react';
import Markdown from 'react-markdown';
type ProfileProps = {
    age: string;
    gender: string;
    height: string;
    weight: string;
    goal: string;
    dietRequired: string;
};
const WorkoutModal = ({
    isOpen,
    setIsOpen,
    workoutResp,
    userProfile,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    workoutResp: string;
    userProfile: ProfileProps;
}) => {
    function close() {
        setIsOpen(false);
    }
    const { userName } = useGlobalStore();
    const [downloadUrl, setDownlaodUrl] = React.useState('');
    const handleDownload = async () => {
        const response = await axios.post('/api/generate-pdf', {
            workoutResp,
        });
        if (response.data.url) {
            setDownlaodUrl(response.data.url);
        }
    };
    console.log(userProfile);
    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-10"
            onClose={close}
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md bg-white rounded-xl p-6 max-h-[90vh] overflow-y-auto">
                    <DialogTitle
                        as="h3"
                        className="text-lg font-medium text-gray-900"
                    >
                        Here is your workout plan{' '}
                        <span className="font-bold">{userName}</span>
                    </DialogTitle>
                    <div className="mt-2">
                        Age:{' '}
                        <span className="font-bold">{userProfile.age}</span>
                    </div>
                    <div className="mt-2">
                        Gender:{' '}
                        <span className="font-bold">{userProfile.gender}</span>
                    </div>
                    <div className="mt-2">
                        Height:{' '}
                        <span className="font-bold">
                            {userProfile.height} {'cm'}
                        </span>
                    </div>
                    <div className="mt-2">
                        Weight:{' '}
                        <span className="font-bold">
                            {userProfile.weight} {'kg'}
                        </span>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-700">
                            <Markdown>{workoutResp}</Markdown>
                        </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button
                            onClick={handleDownload}
                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 p-2 text-sm font-semibold text-white shadow-inner shadow-white/10 hover:bg-gray-600 focus:outline-none"
                        >
                            Download
                        </Button>
                        {downloadUrl && (
                            <a
                                href={downloadUrl}
                                download="report.pdf"
                                className="hidden"
                            >
                                Download PDF
                            </a>
                        )}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default WorkoutModal;
