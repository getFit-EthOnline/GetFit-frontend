import { ethers } from "ethers";

// ABI for the FitnessAgent contract
const fitnessAgentAbi = [
  {
    "inputs": [
      {
        "name": "message",
        "type": "string"
      },
      {
        "name": "imageUrls",
        "type": "string[]"
      }
    ],
    "name": "startFitnessRun",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "message",
        "type": "string"
      },
      {
        "name": "runId",
        "type": "uint256"
      }
    ],
    "name": "addMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Contract address for the FitnessAgent 
const fitnessAgentAddress = "0x57eB75Df7f17aA5351f850040EeD5c66F945dF32";

// Function to start a new fitness run
export async function startFitnessRun({
    message,
    imageUrls,
    provider
}) {
    const signer = provider.getSigner();
    const fitnessAgentContract = new ethers.Contract(fitnessAgentAddress, fitnessAgentAbi, signer);

    console.log('Starting fitness run...');
    const startFitnessRunTx = await fitnessAgentContract.startFitnessRun(message, imageUrls);
    const receipt = await startFitnessRunTx.wait();
    console.log('Fitness run started successfully:', receipt.hash);

    // Extract runId from the transaction receipt
    const runId = getRunId(receipt, fitnessAgentContract);
    console.log(`Created fitness run ID: ${runId}`);

    return { dispatch: receipt.hash, runId };
}

// Function to add a message to an existing fitness run
export async function addMessage({
    message,
    runId,
    provider
}) {
    const signer = provider.getSigner();
    const fitnessAgentContract = new ethers.Contract(fitnessAgentAddress, fitnessAgentAbi, signer);

    console.log('Adding message to fitness run...');
    const addMessageTx = await fitnessAgentContract.addMessage(message, runId);
    const receipt = await addMessageTx.wait();
    console.log('Message added successfully:', receipt.hash);

    return { dispatch: receipt.hash };
}

// Helper function to extract runId from the transaction receipt
export function getRunId(receipt, contract) {
    let runId;
    for (const log of receipt.logs) {
        try {
            const parsedLog = contract.interface.parseLog(log);
            if (parsedLog && parsedLog.name === "FitnessRunCreated") {
                runId = parsedLog.args[1].toNumber();
            }
        } catch (error) {
            console.log("Could not parse log:", log);
        }
    }
    return runId;
}

// Helper function to fetch new messages from the contract
export async function getNewMessages({
    contract,
    runId,
    currentMessagesCount
}) {
    const messages = await contract.getMessageHistory(runId);

    const newMessages = [];
    messages.forEach((message, i) => {
        if (i >= currentMessagesCount) {
            newMessages.push({
                role: message.role,
                content: message.content[0].value,
            });
        }
    });
    return newMessages;
}
