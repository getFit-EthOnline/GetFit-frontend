import type { Signer } from "@xmtp/react-sdk";
import { Client, useClient } from "@xmtp/react-sdk";
import { ComponentProps, useEffect } from "react";

export const CreateClientWithKeys: React.FC<ComponentProps<"div"> & { signer: Signer }> = ({ signer, children }) => {
    const { initialize } = useClient();

    const initXmtpWithKeys = async () => {
        const options = {
            env: "dev" as const
        };
        const address = await signer.getAddress()
        let keys = loadKeys(address);
        if (!keys) {
            keys = await Client.getKeys(signer, {
                ...options,
                skipContactPublishing: true,
                persistConversations: false,
            });
            storeKeys(address, keys);
        }
        await initialize({ keys, options, signer });
    };

    useEffect(() => {
        void initXmtpWithKeys();
    }, []);

    return <div>{children}</div>;
};

const ENCODING = "binary";

export const getEnv = (): "dev" | "production" | "local" => {
    return "production";
};

export const buildLocalStorageKey = (walletAddress: string) =>
    walletAddress ? `xmtp:${getEnv()}:keys:${walletAddress}` : "";

export const loadKeys = (walletAddress: string): Uint8Array | null => {
    const val = localStorage.getItem(buildLocalStorageKey(walletAddress));
    return val ? Buffer.from(val, ENCODING) : null;
};

export const storeKeys = (walletAddress: string, keys: Uint8Array) => {
    localStorage.setItem(
        buildLocalStorageKey(walletAddress),
        Buffer.from(keys).toString(ENCODING),
    );
};

export const wipeKeys = (walletAddress: string) => {
    localStorage.removeItem(buildLocalStorageKey(walletAddress));
};