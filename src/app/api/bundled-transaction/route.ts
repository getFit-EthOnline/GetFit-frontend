import { BETTING_CONTRACT_ABI } from "@/abi/BETTING_CONTRACT_ABI";
import { USDC_ABI } from "@/abi/USDC_ABI";
import { getAddressesForChain } from "@/config/addresses";
import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseUnits } from "viem";
import { morphHolesky } from "viem/chains";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body = await req.json();
  const state = body.untrustedData.state;
  delete body.untrustedData.state;

  const chain = state.chain;
  const { isValid } = await getXmtpFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }
  const addresses = getAddressesForChain(chain ?? morphHolesky.id);

  const approvalUsdcAmount = state.amount;
  const approvePriceInUsdc = parseUnits(approvalUsdcAmount, 6);

  const approvalData = encodeFunctionData({
    abi: USDC_ABI,
    functionName: "approve",
    args: [addresses.BETTING_CONTRACT_ADDRESS, approvePriceInUsdc],
  });

  const approvalTransaction = {
    to: addresses.USDC_TOKEN_ADDRESS,
    data: approvalData,
  };

  const betData = encodeFunctionData({
    abi: BETTING_CONTRACT_ABI,
    functionName: "placeBet",
    args: [state.name, approvePriceInUsdc],
  });

  const betTransaction = {
    to: addresses.BETTING_CONTRACT_ADDRESS,
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
