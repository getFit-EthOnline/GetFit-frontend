import Image from 'next/image';
import React from 'react';

const ProfileCard = ({
    name,
    role,
    text,
    image,
    className,
    profilePic,
}: {
    name: string;
    role: string;
    text: string;
    image: any;
    className?: string;
    profilePic: any;
}) => (
    <div className={`flex flex-col items-start mb-4 ${className}`}>
        <div className=" flex items-center justify-center gap-x-2">
            <Image
                src={profilePic}
                alt={name}
                className="w-14 h-14 rounded-full"
            />
            <div className="flex flex-col">
                <h4 className="text-md font-bold">{name}</h4>
                <p className="text-sm text-gray-600">{role}</p>
            </div>
        </div>
        <div className="">
            <p className="text-[18px]  mt-2">{text}</p>
            {image && (
                <Image src={image} alt="Battle" className="mt-2  rounded-md" />
            )}
        </div>
    </div>
);
export default ProfileCard;
