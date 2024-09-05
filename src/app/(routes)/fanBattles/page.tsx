import { title } from 'process';
import React from 'react';
import {
    anatolyProfilePic,
    davidGogginsProfile,
    jeoWicksProfilePic,
    lazazAngeloProfilePic,
    postPic,
    postPic2,
    previousBattle1,
    previousBattle2,
    previousBattle3,
} from '../../../../public';
import ProfileCard from '@/components/ui/tokenBattles/ProfileCard';
import ChallengeCard from '@/components/ui/tokenBattles/ChallengeCard';

const challangeList = [
    {
        id: 1,
        subHeading: 'Previous Challenge',
        title: 'Step count showdown',
        description: 'Most steps in a single day',
        image: previousBattle1,
        winner: 'Team Goggins',
    },
    {
        id: 2,
        subHeading: 'Upcoming Challenge',
        title: 'Plank Endurance Challenge',
        description: 'Hold a plank position for the longest Duration',
        image: previousBattle2,
        winner: null,
    },
    {
        id: 3,
        subHeading: 'Upcoming Challenge',
        title: 'Flexibility Showdown Challenge',
        description: 'Perform and hold the most challenging yoga poses',
        image: previousBattle3,
        winner: null,
    },
];

const page = () => {
    return (
        <div className="w-full mx-auto max-w-7xl  gap-x-10  flex  justify-center rounded-md p-4 ">
            <div className="flex  max-w-[60%] gap-y-4  flex-col ">
                <div className="border-b h-fit   bg-white p-10 rounded-md ">
                    <ProfileCard
                        name="David Goggins"
                        role="Fitness coach"
                        text="Team Goggins ready for battle! Time to show Team Lazar who is the real boss."
                        image={null}
                        profilePic={davidGogginsProfile}
                    />
                    <ProfileCard
                        className="border rounded-md border-slate-500 p-10"
                        profilePic={lazazAngeloProfilePic}
                        name="Lazar Angelo"
                        role="Fitness coach"
                        text="Squat Warriors: Lets see who can do the most squats within 5 minutes"
                        image={postPic}
                    />
                    <div className=" flex items-center justify-between">
                        <span className=" text-xl">
                            Want to compete in this Challenge ?
                        </span>
                        <button className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-[#B8FE22] px-4 py-1.5 text-xs font-normal text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[#B8FE22]/30">
                            <span className="text-sm font-bold text-[#063434] ">
                                Register Now
                            </span>
                            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                                <div className="relative h-full w-8 bg-white/20" />
                            </div>
                        </button>
                    </div>
                </div>
                <div className="border-b h-fit bg-white p-10 rounded-md">
                    <ProfileCard
                        name="Joe Wicks"
                        role="Fitness coach"
                        text="Team Wicks is ready to crush the Crunches Challenge!"
                        image={null}
                        profilePic={jeoWicksProfilePic}
                    />
                    <ProfileCard
                        className="border rounded-md border-slate-500 p-10"
                        profilePic={anatolyProfilePic}
                        name="Anatoly"
                        role="Fitness coach"
                        text="Crunches Challenge: Let's see who can do the most crunches in 10 minutes!"
                        image={postPic2}
                    />
                    <div className="flex items-center justify-between">
                        <span className="text-xl">
                            Ready to join the Crunches Challenge?
                        </span>
                        <button className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-[#B8FE22] px-4 py-1.5 text-xs font-normal text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[#B8FE22]/30">
                            <span className="text-sm font-bold text-[#063434] ">
                                Register Now
                            </span>
                            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                                <div className="relative h-full w-8 bg-white/20" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col max-w-[40%]  ">
                {challangeList.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="bg-white rounded-md p-4 shadow-md mb-4"
                        >
                            <ChallengeCard item={item} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default page;
