"use client";
import { createSmartAccountClient } from "@biconomy/account";
import { useQuery } from "@tanstack/react-query";

import BICONOMY_CONFIG from "@/config/biconomy";
import { galadriel_devnet } from "@/config/chains";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import useSendTestFundsMutation from "@/hooks/useSendTestFunds";
import useGlobalStore from "@/store";
import { spicy } from "viem/chains";
import { useAccount } from "wagmi";

function useWeb3AuthWrapper() {
  const { chainId, chain } = useAccount()
  const signer = useEthersSigner()
  const { mutateAsync } = useSendTestFundsMutation({ chain: chain })
  const { setSmartAccount, setSmartAddress, smartAccount } = useGlobalStore()

  return useQuery({
    queryKey: [!!signer, chainId, !!smartAccount],
    enabled: !!signer || chainId !== galadriel_devnet.id,
    queryFn: async () => {
      if (!chain) return
      if (signer && chainId) {
        if (chainId === galadriel_devnet.id || chainId === spicy.id ||
          !process.env.NEXT_PUBLIC_SMART_ACCOUNT_ENABLED ||
          smartAccount) {
          await mutateAsync()
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
        debugger
        setSmartAddress(address)
        await mutateAsync()
      }
    }
  })
}

export default useWeb3AuthWrapper;
