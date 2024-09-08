import { ethers } from 'ethers';
import { M2E_FITNESS_ABI } from '@/abi/M2E_FITNESS_ABI';
import {
    MOVE_TO_EARN_CONTRACT_ADDRESS_MORPH,
    REWARD_TOKEN_MORPH_ADDRESS,
} from '@/config/addresses';
import { encodeFunctionData } from 'viem';
import { FAN_TOKEN_ABI } from '@/abi/FAN_TOKEN_ABI';
export async function recordWorkoutGaslessBundle(smartAccount: any) {
    console.log(smartAccount);
    console.log('Starting recordWorkoutGaslessBundle');
    try {
        const moveToEarnAddress = MOVE_TO_EARN_CONTRACT_ADDRESS_MORPH;
        const provider = new ethers.JsonRpcProvider(
            'https://rpc-quicknode-holesky.morphl2.io'
        ); // MORPH RPC
        console.log('Provider initialized', provider);

        const moveToEarnInstance: any = new ethers.Contract(
            moveToEarnAddress,
            M2E_FITNESS_ABI,
            provider
        );
        console.log('MoveToEarn Contract instance created');
        console.log(await moveToEarnInstance);
        const workoutTx = encodeFunctionData({
            abi: M2E_FITNESS_ABI,
            functionName: 'recordDailyWorkout', //joinFitnessChallenge
            args: [],
        });
        console.log(workoutTx);
        // Create the transaction for calling `recordDailyWorkout`
        // const workoutTx =
        //     await moveToEarnInstance.populateTransaction.recordDailyWorkout();
        // console.log('Workout transaction created');

        const workoutTransaction = {
            to: moveToEarnAddress,
            data: workoutTx,
        };
        console.log(`Workout Transaction Data: ${workoutTransaction.data}`);

        // Send the transaction using SmartAccount
        console.log('Sending transaction through SmartAccount...');
        const bundleTransaction = await smartAccount.sendTransaction(
            [workoutTransaction],
            {
                paymasterServiceData: { mode: 'SPONSORED' },
            }
        );
        console.log('Transaction sent');

        const userOpReceipt = await bundleTransaction.wait();
        console.log('UserOp receipt', userOpReceipt);
        if (userOpReceipt.success == 'true') {
            console.log('UserOp receipt', userOpReceipt);
            console.log('Transaction receipt', userOpReceipt.receipt);
        }
        return userOpReceipt.receipt;
    } catch (error) {
        console.error('Error in recordWorkoutGaslessBundle', error);
    }
}
export async function getRewardTokenBalance(userAddress: string | null) {
    console.log(`Getting reward token balance for user: ${userAddress}`);

    try {
        const provider = new ethers.JsonRpcProvider(
            'https://rpc-quicknode-holesky.morphl2.io'
        );

        const fanTokenContract = new ethers.Contract(
            REWARD_TOKEN_MORPH_ADDRESS,
            FAN_TOKEN_ABI,
            provider
        );

        const balance = await fanTokenContract.balanceOf(userAddress);
        console.log(`FanToken Balance: ${balance.toString()}`);

        return parseInt(balance);
    } catch (error) {
        console.error('Error in getFanTokenBalance', error);
    }
}
