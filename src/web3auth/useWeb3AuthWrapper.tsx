import { createSmartAccountClient } from "@biconomy/account";
import { useQuery } from "@tanstack/react-query";

import BICONOMY_CONFIG from "@/config/biconomy";
import { galadriel_devnet, spicy } from "@/config/chains";
import { sendTestFunds } from "@/hooks/sendFunds";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import useGlobalStore from "@/store";
import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";

function useWeb3AuthWrapper() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const { chainId, chain, address } = useAccount()
  const publicClient = usePublicClient()
  const signer = useEthersSigner()
  const { setSmartAccount, setSmartAddress, smartAccount } = useGlobalStore()


  return useQuery({
    queryKey: [!!signer, chainId, !!smartAccount],
    enabled: isClient && !!signer || chainId !== galadriel_devnet.id,
    queryFn: async () => {
      if (!chain) return
      if (signer && chainId) {
        if (chainId === spicy.id) {
          await sendTestFunds({
            chain,
            address: address,
            publicClient: publicClient,
          })
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
        const smartAddress = await smartAccountCreationg.getAccountAddress();
        setSmartAddress(smartAddress)
        await sendTestFunds({
          chain,
          smartAccount: smartAccountCreationg,
          smartAddress: smartAddress,
          address: smartAddress,
          publicClient: publicClient
        })
      }
    }
  })
}

export default useWeb3AuthWrapper;
