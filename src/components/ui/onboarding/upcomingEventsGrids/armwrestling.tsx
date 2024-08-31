"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../../utils/utils";
import Image from "next/image";
import { weighLifting1, weighLifting2, weighLifting3, weighLifting4, weighLifting5 } from "../../../../../public/index"


export const ArmWrestleGrid = () => {

    const weightLiftingImages = [
        {
            id: 1,
            imageSrc: weighLifting1
        },
        {
            id: 2,
            imageSrc: weighLifting2
        },
        {
            id: 3,
            imageSrc: weighLifting3
        },
        {
            id: 4,
            imageSrc: weighLifting4
        },
        {
            id: 5,
            imageSrc: weighLifting5
        },
    ]


    return (
        <div className=" flex  items-center gap-x-5 max-w-7xl p-10 justify-center">
            <div className="grid grid-cols-2  gap-5 ">
                <div className=" col-span-2 overflow-hidden ">
                    <Image src={weighLifting1} alt="weighLifting" className="rounded-md object-fill hover:scale-110 transition ease-in-out duration-500 " />
                </div>

                <div className="col-span-1  overflow-hidden "> <Image src={weighLifting3} alt="weighLifting" className="rounded-md object-fill  w-full h-full hover:scale-110 transition ease-in-out duration-500 " /></div>
                <div className=" col-span-1 overflow-hidden"> <Image src={weighLifting4} alt="weighLifting" className="rounded-md object-fill w-full h-full hover:scale-110 transition ease-in-out duration-500 " /></div>

            </div>
            <div className="grid grid-flow-row grid-rows-3 gap-5  ">
                <div className="row-span-2 overflow-hidden" > <Image src={weighLifting2} alt="weighLifting" className="rounded-md object-cover w-full h-full hover:scale-110 transition ease-in-out duration-500 " /></div>
                <div className="row-span-1 overflow-hidden" > <Image src={weighLifting5} alt="weighLifting" className="rounded-md object-fill w-full h-full hover:scale-110 transition ease-in-out duration-500 " /></div>
            </div>

        </div >
    );
};



