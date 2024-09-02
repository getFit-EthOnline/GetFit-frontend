'use client'
import { galadriel_devnet } from '@/config/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { defineChain } from 'viem';
import { morphHolesky } from 'viem/chains';
import { WagmiProvider, createConfig, http, useAccount, useChainId, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import Web3AuthConnectorInstance from "./Web3AuthConnectorInstance";
const queryClient = new QueryClient()


export const spicy = defineChain({
    id: 88_882,
    name: 'Chiliz Spicy Testnet',
    network: 'chiliz-spicy-Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'CHZ',
        symbol: 'CHZ',
    },
    rpcUrls: {
        default: {
            http: [
                'https://chiliz-spicy-rpc.publicnode.com',
            ],
            webSocket: [
                'wss://spicy-rpc-ws.chiliz.com',
                'wss://chiliz-spicy-rpc.publicnode.com',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'Chiliz Explorer',
            url: 'http://spicy-explorer.chiliz.com',
            apiUrl: 'http://spicy-explorer.chiliz.com/api',
        },
    },
    testnet: true,
})

const config = createConfig({
    chains: [galadriel_devnet, spicy, morphHolesky],
    transports: {
        [galadriel_devnet.id]: http(),
        [spicy.id]: http(),
        [morphHolesky.id]: http(),
    },
    connectors: [
        Web3AuthConnectorInstance([galadriel_devnet, spicy, morphHolesky]),
    ],
});


export function SwitchChain() {
    const chainId = useChainId()
    const { chains, switchChain, error } = useSwitchChain()

    return (
        <div className='flex flex-col'>
            <h2>Switch Chain</h2>
            <h3>Connected to {chainId}</h3>
            <div className='flex flex-col space-y-2'>
                {chains.map((chain) => (
                    <button
                        disabled={chainId === chain.id}
                        key={chain.id}
                        className='w-[200px] bg-blac'
                        onClick={() => switchChain({ chainId: chain.id })}
                        type="button"
                    >
                        {chain.name}
                    </button>
                ))}
            </div>
            {error?.message}
        </div>
    )
}

export function Profile() {
    const { address, connector, isConnected, chain } = useAccount();
    const { connect, connectors, error } = useConnect();
    const { disconnect } = useDisconnect();

    if (isConnected) {
        return (
            <div className="main">
                <div className="title">Connected to {connector?.name}</div>
                <div>{address}</div>
                <button className="card" onClick={disconnect as any}>
                    Disconnect{chain?.id}
                </button>
                <div className='h-[100px]'></div>
                <SwitchChain />
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-center h-[100px] space-x-2">
                {connectors.map((connector) => {
                    return (
                        <button className="card" key={connector.id} onClick={() => connect({ connector })}>
                            {connector.name}
                        </button>
                    );
                })}
                {error && <div>{error.message}</div>}
            </div>
        );
    }
}

const Providers: React.FC<ComponentProps<"div">> = ({ children }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default Providers;