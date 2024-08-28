import { Web3AuthContextConfig } from '@web3auth/modal-react-hooks';
import { Web3AuthOptions } from '@web3auth/modal';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { WalletServicesPlugin } from '@web3auth/wallet-services-plugin';

export const chainConfig = {
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
    config: {
        chainConfig,
    },
});

const web3AuthOptions: Web3AuthOptions = {
    chainConfig,
    clientId:
        'BOZXvB8YZOmaHlxETldZRrA91mqa3UiLz46eonVOL627eJX0QQ2Ncct_7cNWUDI20n-EAY2f4_vs_szOXocmmBI',
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    uiConfig: {
        uxMode: 'redirect',
        appName: 'Get Fit',
        appUrl: 'https://web3auth.io/',
        theme: {
            primary: '#7ed6df',
        },
        logoLight:
            'https://avatars.githubusercontent.com/u/179255662?s=200&v=4',
        logoDark: 'https://avatars.githubusercontent.com/u/179255662?s=200&v=4',
        defaultLanguage: 'en', // en, de, ja, ko, zh, es, fr, pt, nl, tr
        mode: 'auto', // whether to enable dark mode. defaultValue: auto
        useLogoLoader: true,
    },
    privateKeyProvider: privateKeyProvider,
    sessionTime: 86400, // 1 day
    // useCoreKitKey: true,
};

const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
        uxMode: 'popup',
        whiteLabel: {
            appName: 'Get Fit',
            appUrl: 'https://web3auth.io',
            logoLight:
                'https://avatars.githubusercontent.com/u/179255662?s=200&v=4',
            logoDark:
                'https://avatars.githubusercontent.com/u/179255662?s=200&v=4',
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

const walletServicesPlugin = new WalletServicesPlugin({
    wsEmbedOpts: {},
    walletInitOptions: { whiteLabel: { showWidgetButton: true } },
});

export const web3AuthContextConfig: Web3AuthContextConfig = {
    web3AuthOptions,
    adapters: [openloginAdapter],
    plugins: [walletServicesPlugin],
};
