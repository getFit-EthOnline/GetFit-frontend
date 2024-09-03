import { BETTING_CONTRACT_ABI } from "@/abi/BETTING_CONTRACT_ABI";
import { USDC_ABI } from "@/abi/USDC_ABI";
import { BETTING_CONTRACT_ADDRESS, USDC_ADDRESS } from "@/config/addresses";
import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseUnits } from "viem";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body = await req.json();
  console.log(body, "body");

  const { isValid } = await getXmtpFrameMessage(body);
  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const approvalUsdcAmount = body.priceInUsd;
  const approvePriceInUsdc = parseUnits("1", 6);

  const approvalData = encodeFunctionData({
    abi: USDC_ABI,
    functionName: "approve",
    args: [BETTING_CONTRACT_ADDRESS, approvePriceInUsdc],
  });

  const approvalTransaction = {
    to: USDC_ADDRESS,
    data: approvalData,
  };

  const betData = encodeFunctionData({
    abi: BETTING_CONTRACT_ABI,
    functionName: "placeBet",
    args: ["john", approvePriceInUsdc],
  });

  const betTransaction = {
    to: BETTING_CONTRACT_ADDRESS,
    data: betData,
  };

  const txs: {
    to: string;
    data: `0x${string}`;
  }[] = [approvalTransaction, betTransaction];

  return NextResponse.json({ transactions: txs });
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
