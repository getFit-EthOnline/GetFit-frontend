import { ethers } from "ethers";
import { M2E_FITNESS_ABI } from "@/abi/M2E_FITNESS_ABI";
import { MOVE_TO_EARN_CONTRACT_ADDRESS_CHILIZ } from "@/config/addresses";
import { encodeFunctionData } from "viem";
import { FAN_BATTLE_ABI } from "@/abi/FAN_BATTLE_ABI";
import { FAN_BATTLE_CONTRACT_ADDRESS } from "@/config/addresses";
import { FAN_TOKEN_ABI } from "@/abi/FAN_TOKEN_ABI";
import { FAN_TOKEN_CONTRACT_ADDRESS } from "@/config/addresses";

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

export async function joinTeamWithSigner(
  signer: ethers.Signer,
  teamName: string
) {
  console.log(signer);
  console.log("Starting joinTeamWithSigner");

  try {
    const fanBattleAddress = FAN_BATTLE_CONTRACT_ADDRESS;

    // Create the encoded transaction data for joinTeam
    const joinTeamTx = encodeFunctionData({
      abi: FAN_BATTLE_ABI,
      functionName: "joinTeam",
      args: [teamName],
    });
    console.log(joinTeamTx);

    const joinTeamTransaction = {
      to: fanBattleAddress,
      data: joinTeamTx,
    };
    console.log(`Join Team Transaction Data: ${joinTeamTransaction.data}`);

    // Send the transaction using the signer
    console.log("Sending joinTeam transaction through signer...");
    const transactionResponse = await signer.sendTransaction(
      joinTeamTransaction
    );
    console.log("Transaction sent, waiting for confirmation...");

    const receipt = await transactionResponse.wait();
    console.log("Transaction receipt:", receipt);

    return receipt;
  } catch (error) {
    console.error("Error in joinTeamWithSigner", error);
  }
}

export async function getFanTokenBalance(userAddress: string) {
  console.log(`Getting FanToken balance for user: ${userAddress}`);

  try {
    const provider = new ethers.JsonRpcProvider(
      "https://spicy-rpc.chiliz.com/"
    ); // chiliz rpc

    // Create an instance of the FanToken contract
    const fanTokenContract = new ethers.Contract(
      FAN_TOKEN_CONTRACT_ADDRESS,
      FAN_TOKEN_ABI,
      provider
    );

    const balance = await fanTokenContract.balanceOf(userAddress);
    console.log(`FanToken Balance: ${balance.toString()}`);

    return balance;
  } catch (error) {
    console.error("Error in getFanTokenBalance", error);
  }
}
