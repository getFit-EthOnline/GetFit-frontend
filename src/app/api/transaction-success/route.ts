import { confirmationFrameHtml } from "@/utils/frames";
import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  delete body.untrustedData.state;
  const { isValid } = await getXmtpFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(confirmationFrameHtml);
}
export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
