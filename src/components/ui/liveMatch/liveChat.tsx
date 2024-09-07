// @ts-nocheck
"use client";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import useWeb3AuthWrapper from "@/web3auth/useWeb3AuthWrapper";
import { Client } from "@xmtp/xmtp-js";
import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import Chat from "./Chat";

export const PEER_ADDRESS = "0x6250f33239D70BebA96cBd170E98bC0aD0e50285";

function LiveChat() {
    useWeb3AuthWrapper()
    const [messages, setMessages] = useState(null);
    const convRef = useRef(null);
    const clientRef = useRef(null);
    const signer = useEthersSigner();
    const { connect, connectors } = useConnect();
    const [isOnNetwork, setIsOnNetwork] = useState(false);
    const { address, isConnected } = useAccount();

    const newConversation = async function (xmtp_client, addressTo) {
        if (await xmtp_client?.canMessage(addressTo)) {
            const conversation = await xmtp_client.conversations.newConversation(
                addressTo
            );
            convRef.current = conversation;
            const messages = await conversation.messages();
            setMessages(messages);
        } else {
            console.log("cant message because is not on the network.");
        }
    };

    useEffect(() => {
        if (isOnNetwork && convRef.current) {
            const streamMessages = async () => {
                const newStream = await convRef.current.streamMessages();
                for await (const msg of newStream) {
                    const exists = messages.find((m) => m.id === msg.id);
                    if (!exists) {
                        setMessages((prevMessages) => {
                            const msgsnew = [...prevMessages, msg];
                            return msgsnew;
                        });
                    }
                }
            };
            streamMessages();
        }
    }, [messages, isConnected, isOnNetwork]);

    return (
        <div className="flex flex-col h-full w-full  rounded-md bg-white p-4">
            <h1 className=" text-slate-600 font-bold sticky top-0 py-4 bg-white ">
                Live Chats
            </h1>
            {!isConnected && (
                <div className="w-full h-full flex items-center min-h-[400px] justify-center">
                    <button
                        onClick={() => {
                            connect({ connector: connectors[0] });
                        }}
                        className="ml-2 p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Connect Wallet
                    </button>
                </div>
            )}
            {isConnected && !isOnNetwork && (
                <div className="w-full h-full flex items-center min-h-[400px] justify-center">
                    <button
                        onClick={async () => {
                            const xmtp = await Client.create(signer, { env: "production" });
                            newConversation(xmtp, PEER_ADDRESS);
                            setIsOnNetwork(!!xmtp.address);
                            clientRef.current = xmtp;
                            console.log("initXmtp");
                        }}
                        className="ml-2 p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Connect to XMTP
                    </button>
                </div>
            )}
            {isConnected && isOnNetwork && messages && (
                <Chat
                    client={clientRef.current}
                    conversation={convRef.current}
                    messageHistory={messages}
                />
            )}
        </div>
    );
}

export default LiveChat;
