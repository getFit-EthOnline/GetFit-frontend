import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import { Metadata } from "next";

const frameMetadata = getFrameMetadata({
    accepts: { xmtp: "2024-02-09" },
    isOpenFrame: true,
    buttons: [
        {
            label: "Make batch transaction",
            action: "tx",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/bundled-transaction`,
            postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction-success`,
        },
    ],
    image: `https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg`,
});

export const metadata: Metadata = {
    title: "Transaction Frame",
    description: "A frame to demonstrate transactions",
    other: {
        ...frameMetadata,
    },
};

export default function Home() {
    return <h1>Open Frames Tx Frame Updated</h1>
}