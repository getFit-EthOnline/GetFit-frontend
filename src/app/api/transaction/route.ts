import { CHILIZ_FAN_BATTLE_ABI } from "@/abi/CHILIZ_FAN_BATTLE_ABI";
import { CHILIZ_FAN_BATTLE_ADDRESS } from "@/config/addresses";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData } from "viem";

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

  const txData: FrameTransactionResponse = {
    chainId: `eip155:11155111`,
    method: "eth_sendTransaction",
    params: {
      abi: CHILIZ_FAN_BATTLE_ABI,
      to: CHILIZ_FAN_BATTLE_ADDRESS,
      value: "Goggins",
      data,
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
