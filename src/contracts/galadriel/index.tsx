import { Contract, ethers, TransactionReceipt, Wallet } from "ethers";
import Web3 from "web3";
import { GALADRIEL_FITNESS_ABI } from "../../abi/GALADRIEL_FITNESS_ABI";
import { addMessageProps, Message, startFitnessRunProps } from "../../types/types";
import { GALADRIEL_FITNESS_AGENT_ADDRESS } from "@/config/addresses";
// Contract address for the FitnessAgent

// Function to start a new fitness run
export async function startFitnessRun({
  message,
  provider,
}: startFitnessRunProps) {
  if (!provider) {
    throw new Error("Provider not found");
  }
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  const fitnessAgentContract = new web3.eth.Contract(
    GALADRIEL_FITNESS_ABI,
    GALADRIEL_FITNESS_AGENT_ADDRESS
  );

  console.log("Starting fitness run...");
  const startFitnessRunTx: any = await fitnessAgentContract.methods
    .startFitnessRun(message)
    .send({ from: accounts[0] });
  console.log(
    "Fitness run started successfully:",
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
    throw new Error("Provider not found");
  }

  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();

  const fitnessAgentContract = new web3.eth.Contract(
    GALADRIEL_FITNESS_ABI,
    GALADRIEL_FITNESS_AGENT_ADDRESS
  );

  console.log("Adding message to fitness run...");
  const addMessageTx: any = await fitnessAgentContract.methods
    .addMessage(message, agentRunID)
    .send({ from: accounts[0] });

  console.log("Message added successfully:", addMessageTx.transactionHash);

  return { dispatch: addMessageTx.transactionHash };
}

function getAgentRunId(receipt: TransactionReceipt) {
  let agentRunID;
  const provider = new ethers.JsonRpcProvider("https://devnet.galadriel.com/");
  const wallet = new Wallet(process.env.NEXT_PUBLIC_P_KEY || "", provider);
  const contract = new Contract(GALADRIEL_FITNESS_AGENT_ADDRESS, GALADRIEL_FITNESS_ABI, wallet);
  for (const log of receipt.logs) {
    try {
      const parsedLog = contract.interface.parseLog(log);
      if (parsedLog && parsedLog.name === "FitnessRunCreated") {
        console.log(parsedLog, parsedLog.name);
        // Second event argument
        agentRunID = ethers.toNumber(parsedLog.args[1]);
      }
    } catch (error) {
      // This log might not have been from your contract, or it might be an anonymous log
      console.log("Could not parse log:", log);
    }
  }
  return agentRunID;
}

export async function getNewMessages(
  agentRunID: number,
  currentMessagesCount: number
): Promise<Message[]> {
  const provider = new ethers.JsonRpcProvider("https://devnet.galadriel.com/");
  const wallet = new Wallet(process.env.NEXT_PUBLIC_P_KEY || "", provider);
  const contract = new Contract(GALADRIEL_FITNESS_AGENT_ADDRESS, GALADRIEL_FITNESS_ABI, wallet);
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
