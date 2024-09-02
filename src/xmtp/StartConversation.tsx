import { isValidAddress, useStartConversation } from "@xmtp/react-sdk";
import { ChangeEvent, useCallback, useState } from "react";

export const StartConversation: React.FC = () => {
    const [peerAddress, setPeerAddress] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { startConversation } = useStartConversation();

    const handleAddressChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setPeerAddress(e.target.value);
        },
        [],
    );

    const handleMessageChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setMessage(e.target.value);
        },
        [],
    );

    const handleStartConversation = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (peerAddress && message) {
                setIsLoading(true);
                const conversation = await startConversation(peerAddress, message);
                debugger
                setIsLoading(false);
            }
        },
        [message, peerAddress, startConversation],
    );

    return (
        <div className="h-[300px] w-full flex flex-col bg-black">
            <form onSubmit={handleStartConversation}>
                <div className="bg-orange-500 w-full h-[100px]">
                    <input
                        name="addressInput"
                        type="text"
                        onChange={handleAddressChange}
                        disabled={isLoading}
                    />
                </div>
                <input
                    name="messageInput"
                    type="text"
                    onChange={handleMessageChange}
                    disabled={isLoading || !isValidAddress(peerAddress)}
                />
                <button className="mt-3 w-[100px] bg-orange-300">
                    sends
                </button>
            </form>
        </div>
    );
};