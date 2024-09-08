'use client';
import { galadriel_devnet } from '@/config/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { base, morphHolesky, sepolia, spicy } from 'viem/chains';
import { WagmiProvider, createConfig, http } from 'wagmi';
import Web3AuthConnectorInstance from './Web3AuthConnectorInstance';

const queryClient = new QueryClient();

export const config = createConfig({
    chains: [galadriel_devnet, spicy, morphHolesky, sepolia, base],
    transports: {
        [galadriel_devnet.id]: http(),
        [spicy.id]: http(),
        [morphHolesky.id]: http(),
        [sepolia.id]: http(),
        [base.id]: http(),
    },
    connectors: [
        Web3AuthConnectorInstance([
            galadriel_devnet,
            spicy,
            morphHolesky,
            sepolia,
            base,
        ]),
    ],
});

const Providers: React.FC<ComponentProps<'div'>> = ({ children }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default Providers;
