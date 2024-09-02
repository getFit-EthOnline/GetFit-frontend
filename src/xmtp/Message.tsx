import type { CachedConversation, DecodedMessage } from "@xmtp/react-sdk";
import { useMessages } from "@xmtp/react-sdk";
import { useCallback } from "react";

export const Messages: React.FC<{
    conversation: CachedConversation;
}> = ({ conversation }) => {
    // error callback
    const onError = useCallback((err: Error) => {
        // handle error
    }, []);

    // messages callback
    const onMessages = useCallback((msgs: DecodedMessage[]) => {
        // do something with messages
    }, []);

    const { error, messages, isLoading } = useMessages(conversation, {
        onError,
        onMessages,
    });


    if (error) {
        return "An error occurred while loading messages";
    }

    if (isLoading) {
        return "Loading messages...";
    }

    return (
        <div>
            {messages.map((message) => (
                <div key={message.id}>{message.content}</div>
            ))}
        </div>
    );
};