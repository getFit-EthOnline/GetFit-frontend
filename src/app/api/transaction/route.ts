import { CHILIZ_FAN_BATTLE_ABI } from "@/abi/CHILIZ_FAN_BATTLE_ABI";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData } from "viem";
import { morphHolesky } from "viem/chains";

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
    chainId: `eip155:${morphHolesky.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: CHILIZ_FAN_BATTLE_ABI,
      // to: CHILIZ_FAN_BATTLE_ADDRESS,
      to: "0x4a95E7e42c968A6c7BFBBb2F2AA908463B46059E",
      value: "0",
      data,
    },
  };

  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
