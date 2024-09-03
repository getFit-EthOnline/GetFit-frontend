'use client'
import {
    createSmartAccountClient
} from "@biconomy/account";
import { useQuery } from "@tanstack/react-query";

import BICONOMY_CONFIG from "@/config/biconomy";
import { galadriel_devnet } from "@/config/chains";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import useGlobalStore from "@/store";
import { useAccount } from "wagmi";

function useWeb3AuthWrapper() {
    const { chainId } = useAccount()
    const signer = useEthersSigner()
    const { setSmartAccount, setSmartAddress, smartAccount } = useGlobalStore()

    return useQuery({
        queryKey: [!!signer, chainId, !!smartAccount],
        enabled: !!signer || chainId !== galadriel_devnet.id,
        queryFn: async () => {
            if (signer && chainId) {
                if (chainId === galadriel_devnet.id ||
                    !process.env.NEXT_PUBLIC_SMART_ACCOUNT_ENABLED ||
                    smartAccount) {
                    return;
                }
                const biconomy_config = BICONOMY_CONFIG[chainId as keyof typeof BICONOMY_CONFIG];
                const smartAccountCreationg = await createSmartAccountClient({
                    signer: signer,
                    bundler: biconomy_config.bundler,
                    paymasterUrl: biconomy_config.paymasterUrl,
                    biconomyPaymasterApiKey: biconomy_config.paymasterApiKey
                });
                setSmartAccount(smartAccountCreationg)
                const address = await smartAccountCreationg.getAccountAddress();
                setSmartAddress(address)
            }

        }
    })
}

export default useWeb3AuthWrapper;