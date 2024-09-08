// pages/api/saveSubscription.ts
import { connectToDatabase } from "@/utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { smartAccountAddress, email, gogginsWalletAddress } = req.body;
  if (!smartAccountAddress || !email || !gogginsWalletAddress) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("subscriptions");
    await collection.insertOne({
      smartAccountAddress,
      email,
      gogginsWalletAddress,
    });

    res.status(200).json({
      message: "Subscription saved successfully",
    });
  } catch (error) {
    console.error("Error saving subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
