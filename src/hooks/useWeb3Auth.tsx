'use client';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
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
        uxMode: 'redirect',
        redirectUrl: 'http://localhost:3000/home',
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
        loginConfig: {
            // Google login
            google: {
                verifier: 'google-getfit',
                typeOfLogin: 'google',
                clientId:
                    '820609215104-m8issl84ttq2mmcjmntav0ev9pq0hso5.apps.googleusercontent.com',
            },
            // Discord login
            discord: {
                verifier: 'discord-getfit',
                typeOfLogin: 'discord',
                clientId: '1276989969352888381',
            },
        },
    },
    privateKeyProvider,
});
web3auth.configureAdapter(openloginAdapter);
function useWeb3Auth() {
    const [provider, setProvider] = useState<IProvider | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [address, setAddress] = useState<string | null>('');
    useEffect(() => {
        if (loggedIn) {
            getAccounts();
        }
    }, [loggedIn]);
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
        setAddress('');
    };

    const getAccounts = async () => {
        if (!provider) {
            return;
        }
        const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider.getSigner();
        const addr = signer.getAddress();
        const address = await addr;
        setAddress(address);
    };
    const getUserInfo = async () => {
        const user = await web3auth.getUserInfo();
        console.log(user);
    };
    return { login, loggedIn, logout, address, getUserInfo, provider };
}
export default useWeb3Auth;
