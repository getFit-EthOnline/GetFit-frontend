import { Contract, ethers, TransactionReceipt, Wallet } from 'ethers';
import Web3 from 'web3';
import { FITNESS_ABI } from '../../abi/FITNESS_ABI';
import {
    addMessageProps,
    Message,
    startFitnessRunProps,
} from '../../types/types';
import { FITNESS_AGENT_ADDRESS } from '@/config/addresses';
// Contract address for the FitnessAgent

// Function to start a new fitness run
export async function startFitnessRun({
    message,
    provider,
}: startFitnessRunProps) {
    if (!provider) {
        throw new Error('Provider not found');
    }
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const fitnessAgentContract = new web3.eth.Contract(
        FITNESS_ABI,
        FITNESS_AGENT_ADDRESS
    );

    console.log('Starting fitness run...');
    const startFitnessRunTx: any = await fitnessAgentContract.methods
        .startFitnessRun(message)
        .send({ from: accounts[0] });
    console.log(
        'Fitness run started successfully:',
        startFitnessRunTx.transactionHash
    );

    // Extract runId from the transaction receipt
    const runId = getAgentRunId(startFitnessRunTx);
    console.log(`Created fitness run ID: ${runId}`);

    return { dispatch: startFitnessRunTx.transactionHash, runId };
}

// Function to add a new message to an existing fitness run
export async function addMessage({
    message,
    agentRunID,
    provider,
}: addMessageProps) {
    if (!provider) {
        throw new Error('Provider not found');
    }
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();

    const fitnessAgentContract = new web3.eth.Contract(
        FITNESS_ABI,
        FITNESS_AGENT_ADDRESS
    );

    console.log('Adding message to fitness run...');
    const addMessageTx: any = await fitnessAgentContract.methods
        .addMessage(message, agentRunID)
        .send({ from: accounts[0] });

    console.log('Message added successfully:', addMessageTx.transactionHash);

    return { dispatch: addMessageTx.transactionHash };
}

function getAgentRunId(receipt: TransactionReceipt) {
    let agentRunID;
    const provider = new ethers.JsonRpcProvider(
        'https://devnet.galadriel.com/'
    );
    const wallet = new Wallet(process.env.NEXT_PUBLIC_P_KEY || '', provider);
    const contract = new Contract(FITNESS_AGENT_ADDRESS, FITNESS_ABI, wallet);
    for (const log of receipt.logs) {
        try {
            const parsedLog = contract.interface.parseLog(log);
            if (parsedLog && parsedLog.name === 'FitnessRunCreated') {
                console.log(parsedLog, parsedLog.name);
                // Second event argument
                agentRunID = ethers.toNumber(parsedLog.args[1]);
            }
        } catch (error) {
            // This log might not have been from your contract, or it might be an anonymous log
            console.log('Could not parse log:', log);
        }
    }
    return agentRunID;
}

export async function getNewMessages(
    agentRunID: number,
    currentMessagesCount: number
): Promise<Message[]> {
    const provider = new ethers.JsonRpcProvider(
        'https://devnet.galadriel.com/'
    );
    const wallet = new Wallet(process.env.NEXT_PUBLIC_P_KEY || '', provider);
    const contract = new Contract(FITNESS_AGENT_ADDRESS, FITNESS_ABI, wallet);
    const messages = await contract.getMessageHistory(agentRunID);

    const newMessages: Message[] = [];
    messages.forEach((message: any, i: number) => {
        if (i >= currentMessagesCount) {
            console.log(message);
            newMessages.push({
                role: message.role,
                content: message.content[0].value,
            });
        }
    });
    return newMessages;
}
export async function sendTestTokens() {
    const provider = new ethers.JsonRpcProvider(
        'https://devnet.galadriel.com/'
    );
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    console.log(`Getting test funds for address: ${signerAddress}`);

    // Setup a third-party provider with its own signer to send transactions
    const thirdPartyProvider = new ethers.Wallet(
        process.env.NEXT_PUBLIC_P_KEY || '',
        provider
    );
    // Sending ETH to the signer address
    console.log('Sending ETH to the signer address...');
    const ethSendPromise = await thirdPartyProvider.sendTransaction({
        to: signerAddress,
        value: ethers.parseUnits('0.01', 18), // Sending 0.01 ETH
    });
    await ethSendPromise.wait();
    console.log(
        `ETH transfer successful, transaction hash: ${ethSendPromise.hash}`
    );

    return { trxhash: ethSendPromise.hash };
}
export const getBalance = async (address: string | null) => {
    console.log(address);
    const provider = new ethers.JsonRpcProvider(
        'https://devnet.galadriel.com/'
    );

    const balance = await provider.getBalance(address || '');
    const balanceInEth = ethers.formatEther(balance);
    console.log(balanceInEth);
    if (parseInt(balanceInEth) < 0.01) {
        const tokens = await sendTestTokens();
        console.log(tokens);
    }
};
