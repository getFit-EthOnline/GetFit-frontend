import { useClient } from "@xmtp/react-sdk";
import { Signer } from "ethers";
import { useCallback } from "react";
import { useWalletClient } from "wagmi";

export const CreateClient: React.FC<{ signer: Signer }> = ({ signer }) => {
    const { client, error, isLoading, initialize } = useClient();
    const { data: walletClient } = useWalletClient();

    const handleConnect = useCallback(async () => {
        const options = {
            persistConversations: true,
            env: "dev" as const,
        };
        try {
            const client = await initialize({ options, signer: walletClient });
            console.log(client, "client")
        } catch (error) {
            console.error("Failed to initialize XMTP client:", error);
            // You might want to handle the error more specifically here,
            // such as setting an error state or displaying a user-friendly message
        }
    }, [initialize, walletClient]);

    if (error) {
        return "An error occurred while initializing the client";
    }

    if (isLoading) {
        return "Awaiting signatures...";
    }

    console.log(client, "client", error);


    if (!client) {
        return (
            <button type="button" onClick={handleConnect}>
                Connect to XMTP
            </button>
        );
    }

    return "Connected to XMTP";
};

export default CreateClient;