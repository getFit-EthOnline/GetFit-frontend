import { ethers } from "ethers";
import { M2E_FITNESS_ABI } from "@/abi/M2E_FITNESS_ABI";
import { MOVE_TO_EARN_CONTRACT_ADDRESS_MORPH } from "@/config/addresses";

export async function recordWorkoutGaslessBundle(smartAccount: any) {
  console.log("Starting recordWorkoutGaslessBundle");
  try {
    const moveToEarnAddress = MOVE_TO_EARN_CONTRACT_ADDRESS_MORPH;
    const provider = new ethers.JsonRpcProvider(""); // MORPH RPC
    console.log("Provider initialized");

    const moveToEarnInstance = new ethers.Contract(
      moveToEarnAddress,
      M2E_FITNESS_ABI,
      provider
    );
    console.log("MoveToEarn Contract instance created");

    // Create the transaction for calling `recordDailyWorkout`
    const workoutTx =
      await moveToEarnInstance.populateTransaction.recordDailyWorkout();
    console.log("Workout transaction created");

    const workoutTransaction = {
      to: moveToEarnAddress,
      data: workoutTx.data,
    };
    console.log(`Workout Transaction Data: ${workoutTransaction.data}`);

    // Send the transaction using SmartAccount
    console.log("Sending transaction through SmartAccount...");
    const bundleTransaction = await smartAccount?.sendUserOperation({
      transactions: [workoutTransaction],
      paymasterData: { mode: "SPONSORED" },
    });
    console.log("Transaction sent");

    const transactionHash = await bundleTransaction.waitForTransactionHash();
    console.log("Final Transaction Hash", transactionHash);

    if (transactionHash) {
      return { hash: transactionHash };
    }
  } catch (error) {
    console.error("Error in recordWorkoutGaslessBundle", error);
  }
}
