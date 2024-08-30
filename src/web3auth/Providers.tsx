'use client'
import { galadriel_devnet } from '@/config/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { WagmiProvider, createConfig, http, useAccount, useConnect, useDisconnect } from "wagmi";
import Web3AuthConnectorInstance from "./Web3AuthConnectorInstance";

const queryClient = new QueryClient()

const config = createConfig({
    chains: [galadriel_devnet],
    transports: {
        [galadriel_devnet.id]: http(),
    },
    connectors: [
        Web3AuthConnectorInstance([galadriel_devnet]),
    ],
});

function Profile() {
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
            </div>
        );
    } else {
        return (
            <div className="main">
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
                <Profile />
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default Providers;