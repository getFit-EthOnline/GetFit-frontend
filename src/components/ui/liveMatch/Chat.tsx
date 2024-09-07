// @ts-nocheck
import { spicy } from "@/config/chains";
import { useEthersProvider } from "@/hooks/useEthersProvider";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import useGlobalStore from "@/store";
import { PaymasterMode } from "@biconomy/account";
import { useQueryClient } from "@tanstack/react-query";
import { FramesClient } from "@xmtp/frames-client";
import { Client, Conversation, DecodedMessage } from "@xmtp/xmtp-js";
import { useEffect, useRef, useState } from "react";
import Markdown from 'react-markdown';
import { morphHolesky } from "viem/chains";
import { useAccount, useWalletClient } from "wagmi";
import { Frame } from "./Frames/Frame";
import { getFrameTitle, getOrderedButtons, isValidFrame, isXmtpFrame } from "./Frames/FrameInfo";
import { fetchFrameFromUrl, urlRegex } from "./Frames/utils";
import { PEER_ADDRESS } from "./liveChat";

// Define types for props
interface ChatProps {
    client: Client;
    messageHistory: DecodedMessage[];
    conversation: Conversation;
}

const Chat: React.FC<ChatProps> = ({ refetch, client, messageHistory, conversation }) => {
    const [inputValue, setInputValue] = useState("");
    const chatRef = useRef(null);

    // Function to handle sending a message
    const handleSend = async () => {
        if (inputValue) {
            await onSendMessage(inputValue);
            // if (chatRef.current) {
            //     (chatRef.current as HTMLDivElement).scrollTop = (chatRef.current as HTMLDivElement).scrollHeight;
            // }
            setInputValue("");
        }
    };


    const onSendMessage = async (value) => {
        return conversation.send(value);
    };

    // MessageList component to render the list of messages
    const MessageList = ({ messages }) => {
        // Filter messages by unique id
        messages = messages.filter(
            (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
        );

        return (
            <div className="flex-grow overflow-y-auto pr-2" ref={chatRef}>
                {messages.map((msg, index) => (
                    msg && (
                        <MessageItem msg={msg} key={index} index={index} client={client} inputValue={inputValue} />
                    )
                ))}
            </div>
        );
    };

    const handleInputChange = (event) => {
        if (event.key === "Enter") {
            handleSend();
        } else {
            setInputValue(event.target.value);
        }
    };

    return (
        <>
            <MessageList messages={messageHistory} />
            <div className="bg-white sticky bottom-0">
                <div className="flex  py-4">
                    <input
                        type="text"
                        onChange={handleInputChange}
                        value={inputValue}
                        placeholder="Type your message here..."
                        className="flex-grow p-2 rounded bg-gray-100 text-gray-800 focus:outline-none"
                    />
                    <button
                        onClick={handleSend}
                        className="ml-2 p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    );
}

export default Chat;


interface MessageItemProps {
    msg: DecodedMessage;
    index: number;
    client: Client;
    inputValue: string;
}

export const MessageItem: React.FC<MessageItemProps> = ({ msg, index, client, inputValue }) => {
    const { data: walletClient } = useWalletClient()
    const { smartAccount } = useGlobalStore()
    const { chain, chainId, address } = useAccount()
    const queryClient = useQueryClient()

    const [txHash, setTxHash] = useState('')
    const provider = useEthersProvider()
    const signer = useEthersSigner()
    const [isLoading, setIsLoading] = useState(true);
    const [frameMetadata, setFrameMetadata] = useState();
    const [frameButtonUpdating, setFrameButtonUpdating] = useState(0);

    const handleFrameButtonClick = async (buttonIndex, action = "post") => {
        try {
            if (action === "post_redirect") {
                if (chainId === spicy.id) {
                    window.open('https://spicy.io/tx/' + txHash, "_blank");
                }
                if (chainId === morphHolesky.id) {
                    window.open('https://explorer-holesky.morphl2.io/tx/' + txHash, "_blank");
                }
                return
            }
            const metadata = await fetchFrameFromUrl(msg);
            const frameMetadata = metadata
            const urlParams = new URLSearchParams(new URL(frameMetadata.url).search);
            const amount = urlParams.get("amount");
            const name = urlParams.get("player");
            if (!frameMetadata || !client || !walletClient || !frameMetadata?.frameInfo?.buttons) {
                return;
            }
            const { frameInfo, url: frameUrl } = frameMetadata;
            if (!frameInfo.buttons) {
                return;
            }
            const button = frameInfo.buttons[buttonIndex];
            console.log(button);
            setFrameButtonUpdating(buttonIndex);
            const framesClient = new FramesClient(client);
            const postUrl = button.target || frameInfo.postUrl || frameUrl;
            const payload = await framesClient.signFrameAction({
                frameUrl,
                inputText: inputValue || undefined,
                buttonIndex,
                conversationTopic: msg.conversation.topic,
                participantAccountAddresses: [PEER_ADDRESS, client.address],
                address: client.address,
                state: {
                    ...frameInfo.state,
                    name: name,
                    amount: amount,
                    chain: chain?.id
                },
            });
            if (action === "tx") {
                const transactionInfo = await framesClient.proxy.postTransaction(
                    button.target,
                    payload,
                );
                console.log("Transaction info", transactionInfo);

                if (transactionInfo.method === "eth_personalSign") {
                    const { value } = transactionInfo.params;
                    const signature = await walletClient.signMessage({
                        account: client,
                        message: value,
                    });

                    const payloadWithTxId = await framesClient.signFrameAction({
                        frameUrl,
                        inputText: inputValue || undefined,
                        buttonIndex,
                        conversationTopic: msg.conversation.topic,
                        participantAccountAddresses: [PEER_ADDRESS, client.address],
                        address: client.address,
                        state: frameInfo.state,
                        transactionId: signature,
                    });

                    const completeTransactionMetadata = await framesClient.proxy.post(
                        button.postUrl,
                        payloadWithTxId,
                    );
                    setFrameMetadata(completeTransactionMetadata);
                } else {
                    try {
                        if (chain.id === spicy.id) {
                            const tx = await signer?.sendTransaction(transactionInfo.transactions[0])
                            const receipt = await tx?.wait()
                            const tx1 = await signer?.sendTransaction(transactionInfo.transactions[1])
                            const receipt1 = await tx1?.wait()
                            return
                        }
                        const bundleTransaction = await smartAccount.sendTransaction(transactionInfo.transactions, {
                            paymasterServiceData: { mode: PaymasterMode.SPONSORED },
                        });
                        const { transactionHash } = await bundleTransaction.waitForTxHash();
                        queryClient.invalidateQueries({ queryKey: ["balanceOf", address] })
                        setTxHash(transactionHash)
                        const buttonPostUrl =
                            frameMetadata.extractedTags["fc:frame:button:1:post_url"];
                        const completeTransactionMetadata = await framesClient.proxy.post(
                            buttonPostUrl,
                            {
                                ...payload,
                                transactionId: transactionHash,
                            },
                        );
                        setFrameMetadata(completeTransactionMetadata);
                    } catch (e) {
                        console.log("Transaction error", e);
                    }
                }
            } else if (action === "post") {
                const updatedFrameMetadata = await framesClient.proxy.post(
                    postUrl,
                    payload,
                );
                setFrameMetadata(updatedFrameMetadata);
            } else if (action === "post_redirect") {
                if (chainId === spicy.id) {
                    window.open('https://spicy.io/tx/' + txHash, "_blank");
                }
                if (chainId === morphHolesky.id) {
                    window.open('https://explorer-holesky.morphl2.io/tx/' + txHash, "_blank");
                }
                // const { redirectedTo } = await framesClient.proxy.postRedirect(
                //     postUrl,
                //     payload,
                // );
                // window.open(redirectedTo, "_blank");
            } else if (action === "link" && button?.target) {
                window.open(button.target, "_blank");
            }
            setFrameButtonUpdating(0);
        } catch (e) {
            //setShowAlert(true);
            //setAlertMessage(e.message);
            //alert("Error: " + e.message);
            console.error(e);
        }
    };
    const [isXmtpFrameInitial, setIsXmtpFrameInitial] = useState(false); // Add this line

    useEffect(() => {
        const fetchMetadata = async () => {
            setIsLoading(true);
            let isUrl = false;
            try {
                isUrl = !!msg.content.match(urlRegex)?.[0];
            } catch (error) {
                console.error("Error checking URL:", error);
            }
            if (isUrl) {
                const metadata = await fetchFrameFromUrl(msg);
                setFrameMetadata(metadata);
                setIsXmtpFrameInitial(isXmtpFrame(metadata)); // Set the initial isXmtpFrame value here
                setIsLoading(false);
            }
        };
        fetchMetadata();
    }, [msg, msg.content]);

    const showFrame = isValidFrame(frameMetadata);

    return (
        <>
            {showFrame && frameMetadata?.frameInfo ? (
                <>
                    {isLoading && (
                        <div>{"Loading..."}</div>
                    )}
                    <Frame
                        image={frameMetadata?.frameInfo?.image.content}
                        title={getFrameTitle(frameMetadata)}
                        buttons={getOrderedButtons(frameMetadata)}
                        handleClick={handleFrameButtonClick}
                        frameButtonUpdating={frameButtonUpdating}
                        showAlert={false}
                        alertMessage={"Hello"}
                        onClose={() => console.log(false)}
                        interactionsEnabled={isXmtpFrameInitial}
                        textInput={frameMetadata?.frameInfo?.textInput?.content}
                        onTextInputChange={() => {
                            console.log("onTextInputChange");
                        }}
                        txHash={txHash}
                        frameUrl={frameMetadata?.url}
                    />
                </>
            ) : msg.content !== "" ? <div
                key={msg.id || index}
                className={`p-2 mb-2 rounded-md ${msg.senderAddress === PEER_ADDRESS
                    ? 'bg-blue-400 italic'
                    : msg.senderAddress === client.address
                        ? 'bg-red-400 font-bold'
                        : msg.user === 'You'
                            ? 'bg-green-600 text-right'
                            : 'bg-gray-100'
                    }`}
            >
                <div className="flex flex-col">
                    <div>
                        <span className="font-bold mr-2">{msg.senderAddress === client.address ? "You" : "Bot"}</span>
                        <Markdown>{msg.content}</Markdown>
                    </div>
                    <span className="text-gray-500 text-xs mt-1">{msg.sent.toLocaleTimeString()}</span>
                </div>
            </div> : null}
        </>
    )
}
