import { ethers } from "ethers";
import { M2E_FITNESS_ABI } from "@/abi/M2E_FITNESS_ABI";
import { MOVE_TO_EARN_CONTRACT_ADDRESS_CHILIZ } from "@/config/addresses";
import { encodeFunctionData } from "viem";

export async function recordWorkoutWithSigner(signer: ethers.Signer) {
  console.log(signer);
  console.log("Starting recordWorkoutWithSigner");

  try {
    const moveToEarnAddress = MOVE_TO_EARN_CONTRACT_ADDRESS_CHILIZ;

    // Create the encoded transaction data
    const workoutTx = encodeFunctionData({
      abi: M2E_FITNESS_ABI,
      functionName: "recordDailyWorkout",
      args: [],
    });
    console.log(workoutTx);

    const workoutTransaction = {
      to: moveToEarnAddress,
      data: workoutTx,
    };
    console.log(`Workout Transaction Data: ${workoutTransaction.data}`);

    // Send the transaction using the signer
    console.log("Sending transaction through signer...");
    const transactionResponse = await signer.sendTransaction(
      workoutTransaction
    );
    console.log("Transaction sent, waiting for confirmation...");

    const receipt = await transactionResponse.wait();
    console.log("Transaction receipt:", receipt);

    return receipt;
  } catch (error) {
    console.error("Error in recordWorkoutWithSigner", error);
  }
}
