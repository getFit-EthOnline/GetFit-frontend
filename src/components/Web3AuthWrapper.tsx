"use client"
import useWeb3AuthWrapper from '@/web3auth/useWeb3AuthWrapper';
import { ComponentProps } from 'react';

const Web3AuthWrapper: React.FC<ComponentProps<"div">> = ({ children }) => {
    useWeb3AuthWrapper();
    return children
};

export default Web3AuthWrapper;