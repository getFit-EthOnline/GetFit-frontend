import type { Conversation } from "@xmtp/react-sdk";
import { useStreamConversations } from "@xmtp/react-sdk";
import { useCallback, useState } from "react";
import { SendMessage } from "./SendMessage";

export const NewConversations: React.FC = () => {
    // track streamed conversations
    const [streamedConversations, setStreamedConversations] = useState<
        Conversation[]
    >([]);

    // callback to handle incoming conversations
    const onConversation = useCallback(
        (conversation: Conversation) => {
            setStreamedConversations((prev) => [...prev, conversation]);
        },
        [],
    );
    const { error } = useStreamConversations(onConversation);
    console.log(streamedConversations, "stream");

    console.log(error, "error");
    if (error) {
        return "An error occurred while streaming conversations";
    }



    return (
        <div>
            {streamedConversations.map((conversation: any) => (
                <div key={conversation.peerAddress}>{conversation.peerAddress}

                </div>
            ))}
        </div>
    );
};