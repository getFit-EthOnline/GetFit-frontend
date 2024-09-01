import { CHILIZ_FAN_BATTLE_ABI } from "@/abi/CHILIZ_FAN_BATTLE_ABI";
import { CHILIZ_FAN_BATTLE_ADDRESS } from "@/config/addresses";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";
import { Contract, ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { spicy } from "viem/chains";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body = await req.json();
  const { isValid } = await getXmtpFrameMessage(body);
  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const data = encodeFunctionData({
    abi: CHILIZ_FAN_BATTLE_ABI,
    functionName: "joinTeam",
    args: ["Goggins"],
  });

  // const gasPrice = (await ethers.getDefaultProvider().getFeeData()).gasPrice;

  // const contract = new Contract(
  //   CHILIZ_FAN_BATTLE_ADDRESS,
  //   CHILIZ_FAN_BATTLE_ABI,
  //   ethers.getDefaultProvider()
  // );

  // // @ts-ignore
  // const gasUnits = await contract.estimateGas.joinTeam("Goggins");

  // const transactionFee = BigInt(gasPrice?.toString() || "0") * BigInt(gasUnits);

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${spicy.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: CHILIZ_FAN_BATTLE_ABI,
      to: CHILIZ_FAN_BATTLE_ADDRESS,
      value: parseEther("0.0000032", "wei").toString(),
      data,
    },
  };

  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
