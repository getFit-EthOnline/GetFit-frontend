import type { CachedConversation } from "@xmtp/react-sdk";
import { isValidAddress, useSendMessage } from "@xmtp/react-sdk";
import { ChangeEvent, useCallback, useState } from "react";

export const SendMessage: React.FC<{ conversation: CachedConversation }> = ({
    conversation,
}) => {
    const [peerAddress, setPeerAddress] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const { sendMessage } = useSendMessage();

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

    const handleSendMessage = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (peerAddress && isValidAddress(peerAddress) && message) {
                debugger
                const s = await sendMessage(conversation, message);
                debugger
            }
        },
        [message, peerAddress, sendMessage],
    );

    return (
        <form onSubmit={handleSendMessage}>
            <input
                name="addressInput"
                type="text"
                onChange={handleAddressChange}
                disabled={isSending}
            />
            <input
                name="messageInput"
                type="text"
                onChange={handleMessageChange}
                disabled={isSending}
            />
            <button type="submit">Send Message</button>
        </form>
    );
};