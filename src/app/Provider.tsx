'use client';
import React, { ReactNode } from 'react';
import {
    Web3AuthProvider,
    Web3AuthInnerContext,
} from '@web3auth/modal-react-hooks';

import { WalletServicesProvider } from '@web3auth/wallet-services-plugin-react-hooks';
import { web3AuthContextConfig } from './hooks/web3AuthProviderProps';
const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <Web3AuthProvider config={web3AuthContextConfig}>
            <WalletServicesProvider context={Web3AuthInnerContext}>
                {children}
            </WalletServicesProvider>
        </Web3AuthProvider>
    );
};

export default Provider;
