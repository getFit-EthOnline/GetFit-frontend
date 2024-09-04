'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { m2eImage1 } from '../../../../public';
const Page = () => {
    const [isFollowing, setIsFollowing] = useState(false);
    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        console.log(isFollowing ? 'Unfollowed' : 'Followed');
    };
    return (
        <div className="flex max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Left Section */}
            <div className="flex-1 p-4">
                <header className="flex flex-col items-center">
                    <Image
                        src={m2eImage1}
                        alt="Influencer"
                        className=" w-96 h-32 mb-4 "
                    />
                    <h1 className="text-2xl font-bold">John Doe</h1>
                    <p className="text-lg text-gray-600">
                        Certified Fitness Coach
                    </p>
                    <blockquote className="mt-2 italic text-gray-500">
                        {`“Fitness is not about being better than someone else;
                        it’s about being better than you used to be.“`}
                    </blockquote>
                </header>
                <section className="mt-6">
                    <h2 className="text-xl font-semibold">About Me</h2>
                    <p className="mt-2 text-gray-700">
                        I am a fitness enthusiast with a passion for helping
                        others achieve their health and wellness goals. My
                        journey began 10 years ago, and I have dedicated my life
                        to inspiring others through fitness.
                    </p>
                </section>
                <section className="mt-6">
                    <h2 className="text-xl font-semibold">
                        Career Information
                    </h2>
                    <ul className="mt-2 list-disc list-inside text-gray-700">
                        <li>Certified Personal Trainer (2015)</li>
                        <li>Nutrition Specialist (2018)</li>
                        <li>5x Marathon Finisher</li>
                    </ul>
                </section>
            </div>
            {/* Right Section */}
            <div className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-inner">
                <div className="mb-4">
                    <button
                        onClick={handleFollow}
                        className={`w-full px-4 py-2 rounded text-white ${
                            isFollowing ? 'bg-red-500' : 'bg-blue-500'
                        } hover:bg-opacity-80`}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                </div>
                <section className="mt-6">
                    <h2 className="text-xl font-semibold">Follow Me</h2>
                    <div className="mt-2 flex space-x-4">
                        <a href="#" className="text-blue-500 hover:underline">
                            Instagram
                        </a>
                        <a href="#" className="text-blue-500 hover:underline">
                            YouTube
                        </a>
                        <a href="#" className="text-blue-500 hover:underline">
                            Facebook
                        </a>
                    </div>
                </section>
                <section className="mt-6">
                    <h2 className="text-xl font-semibold">
                        Client Testimonials
                    </h2>
                    <blockquote className="mt-2 italic text-gray-600">
                        {`“John transformed my fitness journey! I couldn't have
                        done it without him.”`}
                    </blockquote>
                </section>
                <footer className="mt-6">
                    <h2 className="text-xl font-semibold">Contact Me</h2>
                    <form className="mt-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                        />
                        <textarea
                            placeholder="Your Message"
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                        />
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Send
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};
export default Page;
