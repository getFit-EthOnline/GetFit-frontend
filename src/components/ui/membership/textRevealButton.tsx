import Image, { StaticImageData } from 'next/image';
import React, { SetStateAction } from 'react';
const TextRevealButton = ({
    title,
    image,
    setSelectedChain,
}: {
    title: string;
    image: StaticImageData;
    setSelectedChain: React.Dispatch<SetStateAction<string>>;
}) => {
    return (
        <button
            onClick={() => setSelectedChain(title)}
            className="group/button relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full  font-medium text-white transition-all duration-300 hover:w-24"
        >
            <p className="inline-flex whitespace-nowrap text-xs opacity-0 transition-all duration-200 group-hover/button:-translate-x-2.5 group-hover/button:opacity-100">
                {title}
            </p>
            <div className={` absolute   right-1.5 `}>
                <Image
                    src={image}
                    alt={title}
                    className=" w-5 h-5 rounded-full"
                />
            </div>
        </button>
    );
};
export default TextRevealButton;
