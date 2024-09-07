import { ethers } from "ethers";
import { AUTOPAY_ABI } from "@/abi/AUTOPAY_ABI";
import { ERC20_ABI } from "@/abi/FAN_TOKEN_ABI";
import {
  AUTOPAY_CONTRACT_ADDRESS_SEPOLIA,
  USDC_TOKEN_ADDRESS,
} from "@/config/addresses";

export async function sendUsdcCrossChainSubscription(
  userAddress: string,
  coachAddress: string,
  startTime: number,
  interval: number,
  cost: number,
  smartAccount: any,
  destinationChainSelector: number,
  receiverAddress: string
) {
  console.log("Starting sendUsdcCrossChainSubscription for Sepolia");

  try {
    const provider = new ethers.JsonRpcProvider("https://sepolia.rpc-url");
    console.log("Provider initialized for Sepolia", provider);

    // Set up the contract instance for autopay
    const autopayInstance = new ethers.Contract(
      AUTOPAY_CONTRACT_ADDRESS_SEPOLIA,
      AUTOPAY_ABI,
      provider
    );
    console.log("Autopay Contract instance created for Sepolia");

    // Set up the contract instance for USDC
    const usdcContract = new ethers.Contract(
      USDC_TOKEN_ADDRESS,
      ERC20_ABI,
      provider
    );
    console.log("USDC Contract instance created");

    // Approve USDC for transfer to the autopay contract
    const approveUsdcTx = usdcContract.interface.encodeFunctionData("approve", [
      AUTOPAY_CONTRACT_ADDRESS_SEPOLIA,
      cost,
    ]);
    console.log(`Encoded USDC approval data: ${approveUsdcTx}`);

    const approveTransaction = {
      to: USDC_TOKEN_ADDRESS,
      data: approveUsdcTx,
    };

    // Encode the subscription data for the autopay contract
    const subscriptionData = autopayInstance.interface.encodeFunctionData(
      "sendUsdcCrossChainSubscription",
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
      to: AUTOPAY_CONTRACT_ADDRESS_SEPOLIA,
      data: subscriptionData,
    };
    console.log(
      `Subscription Transaction Data: ${subscriptionTransaction.data}`
    );

    // Bundle both approval and subscription transactions
    const transactions = [approveTransaction, subscriptionTransaction];
    console.log("Bundling USDC approval and subscription transactions");

    //  Send the transactions using SmartAccount
    console.log("Sending bundled transactions through SmartAccount...");
    const bundleTransaction = await smartAccount.sendTransaction(transactions, {
      paymasterServiceData: { mode: "SPONSORED" },
    });
    console.log("Bundled transaction sent");

    // Wait for the transaction to be confirmed
    const userOpReceipt = await bundleTransaction.wait();
    console.log("UserOp receipt", userOpReceipt);

    if (userOpReceipt.success === "true") {
      console.log("UserOp receipt", userOpReceipt);
      console.log("Transaction receipt", userOpReceipt.receipt);
    }

    return userOpReceipt.receipt;
  } catch (error) {
    console.error("Error in sendUsdcCrossChainSubscription", error);
  }
}
