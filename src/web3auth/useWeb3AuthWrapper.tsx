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
    const { setSmartAccount, setSmartAddress } = useGlobalStore()

    return useQuery({
        queryKey: [!!signer, chainId],
        enabled: !!signer || chainId !== galadriel_devnet.id,
        queryFn: async () => {
            if (signer && chainId) {
                if (chainId === galadriel_devnet.id) {
                    return
                }
                if (!process.env.NEXT_SMART_ACCOUNT_ENABLED) {
                    return
                }
                const biconomy_config = BICONOMY_CONFIG[chainId as keyof typeof BICONOMY_CONFIG];
                const smartAccount = await createSmartAccountClient({
                    signer: signer,
                    bundler: biconomy_config.bundler,
                    paymasterUrl: biconomy_config.paymasterUrl,
                    biconomyPaymasterApiKey: biconomy_config.paymasterApiKey
                });
                setSmartAccount(smartAccount)
                const address = await smartAccount.getAccountAddress();
                setSmartAddress(address)
            }

        }
    })
}

export default useWeb3AuthWrapper;