'use client';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { useEffect, useState } from 'react';

const clientId =
    'BOZXvB8YZOmaHlxETldZRrA91mqa3UiLz46eonVOL627eJX0QQ2Ncct_7cNWUDI20n-EAY2f4_vs_szOXocmmBI';

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0xaa36a7',
    rpcTarget: 'https://rpc.ankr.com/eth_sepolia',
    displayName: 'Ethereum Sepolia Testnet',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    ticker: 'ETH',
    tickerName: 'Ethereum',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
};
const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
});

const web3auth = new Web3Auth({
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    privateKeyProvider,
});

const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
        uxMode: 'popup',
        whiteLabel: {
            appName: 'Get Fit',
            appUrl: 'https://web3auth.io',
            logoLight: 'https://web3auth.io/images/web3auth-logo.svg',
            logoDark: 'https://web3auth.io/images/web3auth-logo---Dark.svg',
            defaultLanguage: 'en',
            mode: 'dark',
            theme: {
                primary: '#00D1B2',
            },
            useLogoLoader: true,
        },
    },
    privateKeyProvider,
});
web3auth.configureAdapter(openloginAdapter);
function useWeb3Auth() {
    const [provider, setProvider] = useState<IProvider | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const init = async () => {
            try {
                // IMP START - SDK Initialization
                await web3auth.initModal();
                // IMP END - SDK Initialization
                setProvider(web3auth.provider);

                if (web3auth.connected) {
                    setLoggedIn(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        init();
    }, []);
    const login = async () => {
        // IMP START - Login
        const web3authProvider = await web3auth.connect();
        // IMP END - Login
        setProvider(web3authProvider);
        if (web3auth.connected) {
            setLoggedIn(true);
        }
    };

    const logout = async () => {
        // IMP START - Logout
        await web3auth.logout();
        // IMP END - Logout
        setProvider(null);
        setLoggedIn(false);
    };

    return { login, loggedIn, logout };
}
export default useWeb3Auth;
