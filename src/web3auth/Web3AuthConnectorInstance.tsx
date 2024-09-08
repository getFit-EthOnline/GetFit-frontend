// Web3Auth Libraries
import {
    CHAIN_NAMESPACES,
    WALLET_ADAPTERS,
    WEB3AUTH_NETWORK,
} from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { Web3Auth } from '@web3auth/modal';
import { WalletServicesPlugin } from '@web3auth/wallet-services-plugin';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import { Chain } from 'wagmi/chains';

export default function Web3AuthConnectorInstance(chains: Chain[]) {
    const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: '0x' + chains[0].id.toString(16),
        rpcTarget: chains[0].rpcUrls.default.http[0],
        displayName: chains[0].name,
        tickerName: chains[0].nativeCurrency?.name,
        ticker: chains[0].nativeCurrency?.symbol,
        blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string,
    };

    console.log(chainConfig, 'chainConfig');

    const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig },
    });

    const web3AuthInstance = new Web3Auth({
        clientId:
            'BOZXvB8YZOmaHlxETldZRrA91mqa3UiLz46eonVOL627eJX0QQ2Ncct_7cNWUDI20n-EAY2f4_vs_szOXocmmBI',
        chainConfig,
        privateKeyProvider,
        uiConfig: {
            appName: 'Get Fit',
            loginMethodsOrder: ['google'],
            defaultLanguage: 'en',
            modalZIndex: '2147483647',
            appUrl: 'https://getfit-ethonline.vercel.app',
            logoLight:
                'https://avatars.githubusercontent.com/u/179255662?s=200&v=4',
            logoDark:
                'https://avatars.githubusercontent.com/u/179255662?s=200&v=4',
            uxMode: 'redirect',
            mode: 'light',
        },

        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        enableLogging: true,
    });

    const walletServicesPlugin = new WalletServicesPlugin({
        walletInitOptions: {
            whiteLabel: {
                showWidgetButton: true,
            },
        },
    });
    web3AuthInstance.addPlugin(walletServicesPlugin);

    const modalConfig = {
        [WALLET_ADAPTERS.OPENLOGIN]: {
            label: 'openlogin',
            loginMethods: {
                facebook: {
                    // it will hide the facebook option from the Web3Auth modal.
                    name: 'facebook login',
                    showOnModal: false,
                },
            },
            // setting it to false will hide all social login methods from modal.
            showOnModal: true,
        },
    };

    return Web3AuthConnector({
        web3AuthInstance,
        modalConfig,
    });
}
