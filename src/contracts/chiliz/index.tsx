import { FAN_BATTLE_ABI } from '@/abi/FAN_BATTLE_ABI';
import { FAN_TOKEN_ABI } from '@/abi/FAN_TOKEN_ABI';
import { M2E_FITNESS_ABI } from '@/abi/M2E_FITNESS_ABI';

import {
    FAN_BATTLE_CONTRACT_ADDRESS,
    FAN_TOKEN_CONTRACT_ADDRESS,
    MOVE_TO_EARN_CONTRACT_ADDRESS_CHILIZ,
} from '@/config/addresses';
import { ethers } from 'ethers';
import { encodeFunctionData } from 'viem';

export async function recordWorkoutWithSigner(
    signer: string,
    providerUrl: string
) {
    try {
        const moveToEarnAddress = MOVE_TO_EARN_CONTRACT_ADDRESS_CHILIZ;

        // Create the encoded transaction data
        const workoutTx = encodeFunctionData({
            abi: M2E_FITNESS_ABI,
            functionName: 'recordDailyWorkout',
            args: [],
        });
        console.log(workoutTx);

        const workoutTransaction = {
            to: moveToEarnAddress,
            data: workoutTx,
        };
        console.log(`Workout Transaction Data: ${workoutTransaction.data}`);

        // Initialize a provider and a signer using the private key
        const provider = new ethers.JsonRpcProvider(providerUrl);
        const wallet = new ethers.Wallet(signer, provider);

        // Send the transaction using the wallet
        console.log('Sending transaction through private key signer...');
        const transactionResponse = await wallet.sendTransaction(
            workoutTransaction
        );
        console.log('Transaction sent, waiting for confirmation...');

        const receipt = await transactionResponse.wait();
        console.log('Transaction receipt:', receipt);

        return { hash: receipt?.hash };
    } catch (error) {
        console.error('Error in recordWorkoutWithPrivateKey', error);
    }
}
export async function joinTeamWithSigner(
    signer: string,
    providerUrl: string,
    teamName: string
) {
    try {
        const fanBattleAddress = FAN_BATTLE_CONTRACT_ADDRESS;

        // Create the encoded transaction data for joinTeam
        const joinTeamTx = encodeFunctionData({
            abi: FAN_BATTLE_ABI,
            functionName: 'joinTeam',
            args: [teamName],
        });
        console.log(joinTeamTx);

        const joinTeamTransaction = {
            to: fanBattleAddress,
            data: joinTeamTx,
        };
        console.log(`Join Team Transaction Data: ${joinTeamTransaction.data}`);

        // Initialize a provider and wallet using the private key
        const provider = new ethers.JsonRpcProvider(providerUrl);
        const wallet = new ethers.Wallet(signer, provider);

        // Send the transaction using the wallet
        console.log(
            'Sending joinTeam transaction through private key signer...'
        );
        const transactionResponse = await wallet.sendTransaction(
            joinTeamTransaction
        );
        console.log('Transaction sent, waiting for confirmation...');

        const receipt = await transactionResponse.wait();
        console.log('Transaction receipt:', receipt);

        return receipt;
    } catch (error) {
        console.error('Error in joinTeamWithSigner', error);
    }
}

export async function getFanTokenBalance(userAddress: string | null) {
    console.log(`Getting FanToken balance for user: ${userAddress}`);

    try {
        const provider = new ethers.JsonRpcProvider(
            'https://spicy-rpc.chiliz.com/'
        ); // chiliz rpc

        // Create an instance of the FanToken contract
        const fanTokenContract = new ethers.Contract(
            FAN_TOKEN_CONTRACT_ADDRESS,
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

export async function sendTestTokensChiliz(address: string | null) {
    const provider = new ethers.JsonRpcProvider(
        'https://spicy-rpc.chiliz.com/'
    );
    console.log(`Getting test funds for address: ${address}`);

    // Setup a third-party provider with its own signer to send transactions
    const thirdPartyProvider = new ethers.Wallet(
        process.env.NEXT_PUBLIC_P_KEY || '',
        provider
    );
    console.log('Third party provider:', thirdPartyProvider);
    // Sending CHZ to the signer address
    console.log('Sending CHZ to the signer address...');
    const ethSendPromise = await thirdPartyProvider.sendTransaction({
        to: address,
        value: ethers.parseUnits('5', 18), // Sending 5 CHZ
    });
    await ethSendPromise.wait();
    console.log(
        `CHZ transfer successful, transaction hash: ${ethSendPromise.hash}`
    );

    return { trxhash: ethSendPromise.hash };
}
