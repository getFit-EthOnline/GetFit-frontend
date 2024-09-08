import { AUTOPAY_ABI } from '@/abi/AUTOPAY_ABI';
import { ERC20_ABI } from '@/abi/ERC20_ABI';
import {
    AUTOPAY_CONTRACT_ADDRESS_BASE,
    AUTOPAY_CONTRACT_ADDRESS_SEPOLIA,
    USDC_TOKEN_ADDRESS_BASE,
    USDC_TOKEN_ADDRESS_SEPOLIA,
} from '@/config/addresses';
import { ethers } from 'ethers';

export async function sendUsdcCrossChainSubscription(
    userAddress: string | null,
    coachAddress: string,
    startTime: number,
    interval: number,
    cost: number,
    smartAccount: any,
    destinationChainSelector: string,
    receiverAddress: string,
    duration: number,
    chainId: number
) {
    console.log('Starting sendUsdcCrossChainSubscription for Sepolia');
    try {
        const providerUrl =
            chainId === 11155111
                ? 'https://1rpc.io/sepolia'
                : 'https://sepolia.base.org';
        const provider = new ethers.JsonRpcProvider(providerUrl);
        const CONTRACT_ADDRESS =
            chainId === 11155111
                ? AUTOPAY_CONTRACT_ADDRESS_SEPOLIA
                : AUTOPAY_CONTRACT_ADDRESS_BASE;
        const USDC_TOKEN_ADDRESS =
            chainId === 11155111
                ? USDC_TOKEN_ADDRESS_SEPOLIA
                : USDC_TOKEN_ADDRESS_BASE;
        console.log('Provider initialized for Sepolia', provider);

        // Set up the contract instance for autopay
        const autopayInstance = new ethers.Contract(
            CONTRACT_ADDRESS,
            AUTOPAY_ABI,
            provider
        );
        console.log('Autopay Contract instance created for Sepolia');

        // Set up the contract instance for USDC
        const usdcContract = new ethers.Contract(
            USDC_TOKEN_ADDRESS,
            ERC20_ABI,
            provider
        );
        console.log('USDC Contract instance created');

        // Approve USDC for transfer to the autopay contract
        const approveUsdcTx = usdcContract.interface.encodeFunctionData(
            'approve',
            [CONTRACT_ADDRESS, cost * duration]
        );
        console.log(`Encoded USDC approval data: ${approveUsdcTx}`);

        const approveTransaction = {
            to: USDC_TOKEN_ADDRESS,
            data: approveUsdcTx,
        };

        // Encode the subscription data for the autopay contract
        const subscriptionData = autopayInstance.interface.encodeFunctionData(
            'sendUsdcCrossChainSubscription',
            [
                destinationChainSelector, // Selector for destination chain
                receiverAddress, // The address of the contract on the destination chain
                userAddress, // The user initiating the subscription
                coachAddress, // The coach assigned
                startTime, // Start time of the fitness schedule
                interval, // The interval of the fitness schedule
                cost, // The cost of the fitness schedule
                cost, // USDC amount (same as cost)
            ]
        );
        console.log(`Encoded subscription data: ${subscriptionData}`);

        const subscriptionTransaction = {
            to: CONTRACT_ADDRESS,
            data: subscriptionData,
        };
        console.log(
            `Subscription Transaction Data: ${subscriptionTransaction.data}`
        );

        // Bundle both approval and subscription transactions
        const transactions = [approveTransaction, subscriptionTransaction];
        console.log('Bundling USDC approval and subscription transactions');

        //  Send the transactions using SmartAccount
        console.log('Sending bundled transactions through SmartAccount...');
        const bundleTransaction = await smartAccount.sendTransaction(
            transactions,
            {
                paymasterServiceData: { mode: 'SPONSORED' },
            }
        );
        console.log('Bundled transaction sent');

        // Wait for the transaction to be confirmed
        const userOpReceipt = await bundleTransaction.wait();
        console.log('UserOp receipt', userOpReceipt);

        if (userOpReceipt.success === 'true') {
            console.log('UserOp receipt', userOpReceipt);
            console.log('Transaction receipt', userOpReceipt.receipt);
        }

        return userOpReceipt.receipt;
    } catch (error) {
        console.error('Error in sendUsdcCrossChainSubscription', error);
    }
}

export async function getUsdcBalance(
    userAddress: string | null,
    chainId: number
) {
    console.log(`Getting Usdc balance for user: ${userAddress}`);
    const providerUrl =
        chainId === 11155111
            ? 'https://1rpc.io/sepolia'
            : 'https://sepolia.base.org';
    const USDC_TOKEN_ADDRESS =
        chainId === 11155111
            ? USDC_TOKEN_ADDRESS_SEPOLIA
            : USDC_TOKEN_ADDRESS_BASE;
    try {
        const provider = new ethers.JsonRpcProvider(providerUrl);

        const usdcTokenContract = new ethers.Contract(
            USDC_TOKEN_ADDRESS,
            ERC20_ABI,
            provider
        );

        const balance = await usdcTokenContract.balanceOf(userAddress);
        console.log(`Usdc Balance: ${balance.toString()}`);

        return balance;
    } catch (error) {
        console.error('Error in getBalance', error);
    }
}
