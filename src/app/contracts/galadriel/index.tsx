import { Contract, ethers, TransactionReceipt, Wallet } from 'ethers';
import { fitnessAgentAbi } from './abi';
import { Message, startFitnessRunProps } from './types';
import Web3 from 'web3';
// Contract address for the FitnessAgent
const fitnessAgentAddress = '0x57eB75Df7f17aA5351f850040EeD5c66F945dF32';

// Function to start a new fitness run
export async function startFitnessRun({
    message,
    imageUrls,
    provider,
}: startFitnessRunProps) {
    if (!provider) {
        throw new Error('Provider not found');
    }
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const fitnessAgentContract = new web3.eth.Contract(
        fitnessAgentAbi,
        fitnessAgentAddress
    );

    console.log('Starting fitness run...');
    const startFitnessRunTx: any = await fitnessAgentContract.methods
        .startFitnessRun(message, imageUrls)
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

function getAgentRunId(receipt: TransactionReceipt) {
    let agentRunID;
    const provider = new ethers.JsonRpcProvider(
        'https://devnet.galadriel.com/'
    );
    const wallet = new Wallet(process.env.NEXT_PUBLIC_P_KEY || '', provider);
    const contract = new Contract(fitnessAgentAddress, fitnessAgentAbi, wallet);
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
    const contract = new Contract(fitnessAgentAddress, fitnessAgentAbi, wallet);
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
