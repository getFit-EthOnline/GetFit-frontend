import Image from 'next/image';
import React from 'react';
import { devonLarratt, johnbrzenkarmwrestling } from '../../../../public';
import { motion } from 'framer-motion';
import { extractData } from '@/utils/predictionExractor';
const MatchComparison = ({ stats }: { stats: string }) => {
    console.log(stats);
    const extractedData = extractData(stats);
    const devonStats = {
        name: 'Floyd Mayweather Jr.',
        wins: extractedData?.probabilities?.floydMayweather,
        losses: 7,
        draws: 2,
        lastMatch: 'Win by pin',
        totalMatches: 54,
        weightClass: 'Heavyweight',
        country: 'Canada',
        yearsActive: 20,
        height: '6\'5"',
        reach: '78 inches',
        image: devonLarratt,
    };

    const johnStats = {
        name: 'Conor McGregor',
        wins: extractedData?.probabilities?.conorMcGregor,
        losses: 5,
        draws: 1,
        lastMatch: 'Loss by pin',
        totalMatches: 61,
        weightClass: 'Heavyweight',
        country: 'USA',
        yearsActive: 30,
        height: '6\'1"',
        reach: '76 inches',
        image: johnbrzenkarmwrestling,
    };
    return (
        <motion.div
            initial={{ y: 200, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center w-full   bg-gray-100"
        >
            <div className="flex w-full h-full bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Devon Larratt */}
                <div className="w-1/3 flex flex-col  justify-start p-4">
                    <div className=" flex gap-x-4 ">
                        <Image
                            src={devonStats.image}
                            alt={devonStats.name}
                            className="rounded-full w-16 h-16 object-cover mb-4"
                        />
                        <div className=" flex flex-col items-start">
                            <h3 className="text-lg font-bold">
                                {devonStats.name}
                            </h3>

                            <div className=" flex gap-x-2">
                                <p className=" flex  flex-col  items-center">
                                    Wins<span>{devonStats.wins}</span>
                                </p>
                                <p className=" flex  flex-col items-center">
                                    Losses <span>{devonStats.wins}</span>
                                </p>
                                <p className=" flex  flex-col items-center">
                                    Draws <span>{devonStats.wins}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <table className="min-w-full border  border-gray-300">
                        <tbody>
                            <tr className="bg-gray-100  ">
                                <td className="px-1  py-2 border-b border-gray-300 font-semibold">
                                    Last Match:
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {devonStats.lastMatch}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-1 py-2 border-b border-gray-300 font-semibold">
                                    Total Matches:
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {devonStats.totalMatches}
                                </td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="px-1 py-2 border-b border-gray-300 font-semibold">
                                    Weight Class:
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {devonStats.weightClass}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-1 py-2 border-b border-gray-300 font-semibold">
                                    Country:
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {devonStats.country}
                                </td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="px-1 py-2 border-b border-gray-300 font-semibold">
                                    Years Active:
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {devonStats.yearsActive}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-1 py-2 border-b border-gray-300 font-semibold">
                                    Height:
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {devonStats.height}
                                </td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="px-1 py-2 font-semibold">
                                    Reach:
                                </td>
                                <td className="px-4 py-2">
                                    {devonStats.reach}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Divider */}
                <div className="w-1/3 flex flex-col justify-center items-center bg-blue-200 hover:bg-red-300 transition ease-in-out duration-300 ">
                    <h3 className="text-xl font-bold mb-2">Match Comparison</h3>
                    <div className="w-full h-[1px] bg-gray-400 my-4"></div>
                    <p className="text-sm mb-4">Record Comparison</p>
                    <div className="flex justify-around w-full mt-4">
                        <div className="flex flex-col items-center">
                            <h4 className="text-md font-bold">
                                {devonStats.wins}
                            </h4>
                            <p>Wins</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h4 className="text-md font-bold">
                                {johnStats.wins}
                            </h4>
                            <p>Wins</p>
                        </div>
                    </div>
                </div>

                {/* John Brzenk */}
                <div className="w-1/3 flex flex-col  justify-start p-4">
                    <div className=" flex gap-x-4 ">
                        <Image
                            src={johnStats.image}
                            alt={johnStats.name}
                            className="rounded-full w-16 h-16 object-cover mb-4"
                        />
                        <div className=" flex flex-col items-start">
                            <h3 className="text-lg font-bold">
                                {johnStats.name}
                            </h3>

                            <div className=" flex gap-x-2">
                                <p className=" flex  flex-col  items-center">
                                    Wins<span>{devonStats.wins}</span>
                                </p>
                                <p className=" flex  flex-col items-center">
                                    Losses <span>{devonStats.wins}</span>
                                </p>
                                <p className=" flex  flex-col items-center">
                                    Draws <span>{devonStats.wins}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <table className="min-w-full border  border-gray-300">
                        <tbody>
                            <tr className="bg-gray-100  ">
                                <td className="px-1  py-2 border-b border-gray-300 font-semibold">
                                    Last Match:
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {devonStats.lastMatch}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-1 py-2 border-b border-gray-300 font-semibold">
                                    Total Matches:
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {johnStats.totalMatches}
                                </td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="px-1 py-2 border-b border-gray-300 font-semibold">
                                    Weight Class:
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {devonStats.weightClass}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-1 py-2 border-b border-gray-300 font-semibold">
                                    Country:
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {johnStats.country}
                                </td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="px-1 py-2 border-b border-gray-300 font-semibold">
                                    Years Active:
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {devonStats.yearsActive}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-1 py-2 border-b border-gray-300 font-semibold">
                                    Height:
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {devonStats.height}
                                </td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="px-1 py-2 font-semibold">
                                    Reach:
                                </td>
                                <td className="px-4 py-2">
                                    {devonStats.reach}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default MatchComparison;
