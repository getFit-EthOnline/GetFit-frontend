'use client';
import useGlobalStore from '@/store';
import { toastStyles } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { Client } from '@xmtp/xmtp-js';
import axios from 'axios';
import { Wallet } from 'ethers';
import Image, { StaticImageData } from 'next/image';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';
import {
    anatolyBanner,
    anatolyProfilePic2,
    davidBanner,
    davidPlan1,
    davidPlan2,
    davidPlan3,
    davidPlan4,
    davidProfilePic,
    lazarBanner,
    lazarPlan1,
    lazarPlan2,
    lazarPlan3,
    lazarPlan4,
    lazarProfilePic,
} from '../../../../public';

type Plan = {
    id: number;
    title: string;
    description: string;
    image: StaticImageData; // Assuming you're using Next.js Image component
};

type InfluencerProfile = {
    id: number;
    fees: number;
    bannerImage: StaticImageData;
    profilePic: StaticImageData;
    name: string;
    category: string;
    about: string;
    plans: Plan[];
};

const influencerProfile: InfluencerProfile[] = [
    {
        id: 1,
        bannerImage: davidBanner,
        profilePic: davidProfilePic,
        fees: 1,
        name: 'David Goggins',
        category: 'Stamina & Mental Toughness Coach',
        about: 'a former Navy SEAL, is known for extreme mental toughness. His program builds both physical endurance and mental resilience, emphasizing discipline and grit.',
        plans: [
            {
                id: 1,
                title: 'Endurance focused workouts',
                description:
                    'Access long-distance running, ultra-endurance, and stamina-building routines.',
                image: davidPlan1,
            },
            {
                id: 2,
                title: 'Mindset & Motivation',
                description:
                    'Goggins’ content includes motivational talks and strategies to develop mental toughness and discipline.',
                image: davidPlan2,
            },
            {
                id: 3,
                title: 'Extreme Challenges',
                description:
                    'Participate in high-intensity challenges designed to test both your body and mind, pushing you to the next level.',
                image: davidPlan3,
            },
            {
                id: 4,
                title: 'Consistency & Discipline',
                description:
                    'Learn how to build a lifestyle of consistent, relentless effort towards your fitness goals.',
                image: davidPlan4,
            },
        ],
    },
    {
        id: 2,
        bannerImage: lazarBanner,
        profilePic: lazarProfilePic,
        fees: 1,
        name: 'Lazar Angelov',
        category: 'Bodybuilding Expert Coach',
        about: ' is a famous bodybuilder known for his sculpted physique. His programs focus on muscle building, hypertrophy, and perfecting form. Lazar’s workouts use high-intensity and strength exercises to help users gain muscle and achieve their fitness goals.',
        plans: [
            {
                id: 1,
                title: 'Exclusive Muscle-Building Plans',
                description:
                    'Achieve muscle growth with tailored workout plans for all levels.',
                image: lazarPlan1,
            },
            {
                id: 2,
                title: 'Progressive Overload Techniques',
                description:
                    'Master progressive overload for consistent strength and size gains.',
                image: lazarPlan2,
            },
            {
                id: 3,
                title: 'Personalized Nutrition Advice',
                description:
                    'Get customized diet plans to optimize your muscle-building journey.',
                image: lazarPlan3,
            },
            {
                id: 4,
                title: 'Tips from Professionals',
                description:
                    'Learn key training tips from top athletes to maximize results.',
                image: lazarPlan4,
            },
        ],
    },
    {
        id: 3,
        bannerImage: anatolyBanner,
        profilePic: anatolyProfilePic2,
        fees: 1,
        name: 'Anatoly',
        category: 'Powerlifting & Strength Training Coach',
        about: 'a powerlifting champion, focuses on building strength with compound lifts like squats, bench presses, and deadlifts. His programs prioritize form and progressive strength gains',
        plans: [
            {
                id: 1,
                title: 'Strength-Focused Routines',
                description:
                    'Anatoly’s programs are tailored to those who want to lift heavier and grow stronger, with a focus on functional strength.',
                image: davidPlan1,
            },
            {
                id: 2,
                title: 'Powerlifting Techniques',
                description:
                    'Learn proper techniques for powerlifting and avoid common mistakes that lead to injury.',
                image: davidPlan2,
            },
            {
                id: 3,
                title: 'Weekly Progress Tracking',
                description:
                    'Track your strength gains and receive expert guidance on how to adjust your training to keep improving.',
                image: davidPlan3,
            },
            {
                id: 4,
                title: 'Advanced Lifting Tips',
                description:
                    'Anatoly provides insights on how to break through plateaus and continually increase your lifting capacity.',
                image: davidPlan4,
            },
        ],
    },
];

const InfluencerProfile = () => {
    return (
        <div className=" flex flex-col gap-y-10  ">
            {influencerProfile.map((profile, index) => (
                <ProfileCard profile={profile} key={index} />
            ))}
        </div>
    );
};

export default InfluencerProfile

const ProfileCard = ({ profile }: { profile: InfluencerProfile }) => {

    const { address } = useAccount()
    const { userEmail } = useGlobalStore()

    const { data } = useQuery({
        queryKey: ['creator-subscription', address, profile.name],
        enabled: !!address,
        queryFn: async () => await axios.get<{ found: boolean }>('/api/creator-subscription', {
            params: {
                address,
                creator: profile.name
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

    return (
        <div
            key={profile.id}
            className="bg-white shadow-lg p-6 rounded-lg max-w-3xl mx-auto"
        >
            {/* Banner Section */}
            <div className="relative">
                <Image
                    src={profile.bannerImage}
                    alt="banner"
                    width={400}
                    height={150}
                    className="w-full  object-cover rounded-t-lg"
                />
                {/* Profile Image */}
                <Image
                    src={profile.profilePic}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-20 h-20   absolute left-0 -bottom-10"
                />
            </div>

            {/* Profile Details */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold">
                    {profile.name}
                </h2>
                <p className="text-gray-500">{profile.category}</p>
                <p className="text-gray-700 mt-2">
                    <span className=" font-semibold">
                        {profile.name}{' '}
                    </span>
                    {profile.about}
                </p>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-4 gap-4 mt-6">
                {profile.plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-gray-100 relative rounded-md group   text-center"
                    >
                        <Image
                            src={plan.image}
                            alt={plan.title}
                            className="mx-auto rounded-md"
                        />

                        <h3 className=" group-hover:opacity-0 w-full max-h-12  min-h-12 absolute bottom-0 rounded-b-md bg-slate-300 bg-opacity-[80%]  font-medium mt-2">
                            {plan.title}
                        </h3>
                        <div className="absolute  flex-col inset-0 bg-[#DCE0D9] bg-opacity-[80%] text-black p-2 flex items-center justify-center gap-y-2  opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300 rounded-lg">
                            <span className="text-xl leading-4 font-bold">
                                {' '}
                                {plan.title}{' '}
                            </span>
                            <span className=" text-xs font-semibold">
                                {' '}
                                {plan.description}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Subscribe Button */}
            <button
                disabled={data?.data.found}
                className="mt-6 w-full bg-lime-400 hover:bg-lime-500 text-white font-bold py-2 rounded-lg"
                onClick={async () => {
                    if (!address || !userEmail || data?.data.found) {
                        return;
                    }
                    toast.loading("Subscribing...", toastStyles)
                    debugger
                    const signer = new Wallet('0x780f70a93655617c793a5758455f01014391666b87810908afabb121d7b097d5')
                    const xmtp = await Client.create(signer, { env: "production" });
                    await newConversation(xmtp, address);
                    await axios.post('/api/creator-subscription', {
                        address,
                        email: userEmail,
                        creator: profile.name
                    })
                    toast.remove()
                    toast.success("Subscription successful", toastStyles)
                }}
            >
                {data?.data.found ? "Already Subscribed" : "Subscribe to access"}
            </button>
        </div>
    )
}
