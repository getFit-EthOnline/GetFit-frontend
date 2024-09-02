import { useConversations } from "@xmtp/react-sdk";
import { SendMessage } from "./SendMessage";

export const ListConversations: React.FC = () => {
    const { conversations, error, isLoading } = useConversations();

    if (error) {
        return "An error occurred while loading conversations";
    }

    if (isLoading) {
        return "Loading conversations...";
    }

    console.log(conversations, "conversations");

    return (
        <div>
            {conversations.map((conversation: any) => (
                <div key={conversation.peerAddress}>{conversation.peerAddress}
                    <br />
                    <h1>Messages</h1>
                    {/* <Messages conversation={conversation} /> */}
                    <br />
                    <div className="h-[300px] bg-red-500">
                        <SendMessage conversation={conversation} />
                    </div>
                </div>
            ))}
        </div>
    );
};