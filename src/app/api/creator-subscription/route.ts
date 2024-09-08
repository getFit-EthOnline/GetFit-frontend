import { createClient } from "@redis/client";
import { NextRequest, NextResponse } from "next/server";

const client = createClient({
  url: "redis://default:kbfbEOsotLmdeAOAmJstkvVJOZCgkHpI@junction.proxy.rlwy.net:13528",
});

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    if (!client.isOpen) {
      await client.connect();
    }
    const res = await client.set(
      body.address,
      JSON.stringify({
        email: body.email,
        creator: body.creator,
      })
    );
    return NextResponse.json({ message: res }, { status: 200 });
  } catch (error) {
    console.log(error, "err");

    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    const creator = searchParams.get("creator");
    if (!address) {
      return NextResponse.json(
        { error: "Missing address or email parameter" },
        { status: 400 }
      );
    }
    if (!client.isOpen) {
      await client.connect();
    }
    const res = await client.get(address);
    if (!res)
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 404 }
      );
    const parsedRes = JSON.parse(res);
    console.log(
      creator?.toLowerCase() === parsedRes.creator.toLowerCase(),
      creator,
      "creator"
    );

    return NextResponse.json(
      { found: creator?.toLowerCase() === parsedRes.creator.toLowerCase() },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
