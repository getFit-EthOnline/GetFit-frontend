import Web3 from 'web3';

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
  // Add other function and event definitions as needed
];

// Contract address for the FitnessAgent contract
const fitnessAgentAddress = "0x57eB75Df7f17aA5351f850040EeD5c66F945dF32";

// Function to start a new fitness run
export async function startFitnessRun({
    message,
    imageUrls,
    web3
}) {
    const accounts = await web3.eth.getAccounts();
    const fitnessAgentContract = new web3.eth.Contract(fitnessAgentAbi, fitnessAgentAddress);

    console.log('Starting fitness run...');
    const startFitnessRunTx = await fitnessAgentContract.methods.startFitnessRun(message, imageUrls).send({ from: accounts[0] });
    console.log('Fitness run started successfully:', startFitnessRunTx.transactionHash);

    // Extract runId from the transaction receipt
    const runId = getRunId(startFitnessRunTx, fitnessAgentContract);
    console.log(`Created fitness run ID: ${runId}`);

    return { dispatch: startFitnessRunTx.transactionHash, runId };
}

// Function to add a message to an existing fitness run
export async function addMessage({
    message,
    runId,
    web3
}) {
    const accounts = await web3.eth.getAccounts();
    const fitnessAgentContract = new web3.eth.Contract(fitnessAgentAbi, fitnessAgentAddress);

    console.log('Adding message to fitness run...');
    const addMessageTx = await fitnessAgentContract.methods.addMessage(message, runId).send({ from: accounts[0] });
    console.log('Message added successfully:', addMessageTx.transactionHash);

    return { dispatch: addMessageTx.transactionHash };
}

// Helper function to extract runId from the transaction receipt
export function getRunId(receipt, contract) {
    let runId;
    for (const log of receipt.logs) {
        try {
            const parsedLog = contract._decodeEventABI.call({ name: log.topics[0] }, log);
            if (parsedLog && parsedLog.event === "FitnessRunCreated") {
                runId = parsedLog.returnValues[1];
            }
        } catch (error) {
            console.log("Could not parse log:", log);
        }
    }
    return runId;
}

// Helper function to fetch new messages from the contract
export async function getNewMessages({
    web3,
    runId,
    currentMessagesCount
}) {
    const fitnessAgentContract = new web3.eth.Contract(fitnessAgentAbi, fitnessAgentAddress);
    const messages = await fitnessAgentContract.methods.getMessageHistory(runId).call();

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
