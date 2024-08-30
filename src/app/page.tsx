"use client";
import useChilizFanBattle from "@/hooks/useChilizFanBattle";
import useGlobalStore from "@/store";
import useWeb3AuthWrapper from "@/web3auth/useWeb3AuthWrapper";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";

const MainPage = () => {
  const { address, connector, isConnected, chain } = useAccount();
  const [isMounted, setIsMounted] = useState(false)
  const { chains, switchChain, error } = useSwitchChain()
  useWeb3AuthWrapper();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const { participateInBattle } = useChilizFanBattle()
  const { smartAccount, smartAddress } = useGlobalStore()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="min-w-screen min-h-screen bg-black h-[100px]">
      <div className="bg-orange-300 text-black text-end w-full h-[100px]">
        Address: {isMounted && address ? address : ''}
        <br />
        Smart Address: {isMounted && smartAddress ? smartAddress : ''}
        <br />
        {isMounted && chain ? chain?.id : ''}
      </div>
      {connectors.map((connector) => {
        return (
          <button className="text-white" key={connector.id} onClick={() => connect({ connector })}>
            {connector.name}
          </button>
        );
      })}
      <button onClick={() => disconnect()} className="bg-red-300 text-black text-end px-10 h-[100px]">Disconnect</button>
      <button onClick={() => participateInBattle("Goggins")} className="bg-red-300 text-black text-end px-10 h-[100px]">Join Team</button>
      <div className="flex items-center space-x-3 justify-center">
        {
          chains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => switchChain({ chainId: chain.id })}
              className="bg-red-300 text-black text-end px-10 h-[100px]"
            >
              {chain.name}<br />
              {chain.id}
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default MainPage