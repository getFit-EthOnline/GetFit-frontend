'use client';

import { CHAIN_NAMESPACES } from '@web3auth/base';
import { useWeb3Auth } from '@web3auth/modal-react-hooks';
import { useEffect } from 'react';
import useWeb3AuthCore from './hooks/useWeb3AuthCore';

const newChain = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0xaa289',
    rpcTarget: 'https://devnet.galadriel.com',
    displayName: 'Galadriel Devnet',
    blockExplorerUrl: 'https://explorer.galadriel.com',
    ticker: 'GAL',
    tickerName: 'Galadriel',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
};
export default function Home() {
    // const { login, loggedIn, logout, getUserInfo, getAccounts } = useWeb3Auth();
    const {
        initModal,
        provider,
        web3Auth,
        connect,
        addAndSwitchChain,
        logout,
    } = useWeb3Auth();
    const { loginCore, getAccountsCore } = useWeb3AuthCore();
    // const loggedInView = (
    //     <>
    //         <button onClick={logout}>Log Out</button>{' '}
    //         <button onClick={getUserInfo} className="card">
    //             Get User Info
    //         </button>
    //         <button onClick={getAccounts} className="card">
    //             Get Accounts
    //         </button>
    //     </>
    // );
    // const unloggedInView = (
    //     <button onClick={login} className="card">
    //         Login
    //     </button>
    // );
    useEffect(() => {
        const init = async () => {
            try {
                if (web3Auth) {
                    await initModal();
                }
            } catch (error) {
                console.error(error);
            }
        };

        init();
    }, [connect, initModal, web3Auth]);
    return (
        <>
            {/* <div className="grid">
                {loggedIn ? loggedInView : unloggedInView}
            </div> */}
            <div onClick={connect} className="pb-6">
                Login
            </div>

            <button
                onClick={async () => {
                    try {
                        await addAndSwitchChain(newChain);
                        console.log(provider);
                        console.log('New Chain Added and Switched');
                    } catch (error) {
                        console.log(error);
                    }
                }}
                className="card"
            >
                Switch Chain
            </button>
            <div onClick={() => logout()}>logout</div>
            <div id="console" style={{ whiteSpace: 'pre-line' }}>
                <p style={{ whiteSpace: 'pre-line' }}></p>
            </div>
            <div onClick={loginCore}>login core</div>
            <div onClick={getAccountsCore} className="pt-12">
                Address
            </div>
        </>
    );
}
