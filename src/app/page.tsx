'use client';
import Web3 from 'web3';
import { getNewMessages, startFitnessRun } from './contracts/galadriel';
import useWeb3Auth from './hooks/useWeb3Auth';

export default function Home() {
    const { login, loggedIn, logout, getUserInfo, getAccounts, provider } =
        useWeb3Auth();
    const loggedInView = (
        <>
            <button onClick={logout}>Log Out</button>{' '}
            <button onClick={getUserInfo} className="card">
                Get User Info
            </button>
            <button onClick={getAccounts} className="card">
                Get Accounts
            </button>
        </>
    );
    const unloggedInView = (
        <button onClick={login} className="card">
            Login
        </button>
    );

    const handleDelay = (id: number) => {
        setTimeout(async () => {
            const data = await getNewMessages(id, 0);
            console.log(data);
        }, 15000);
    };
    return (
        <>
            <div className="grid">
                {loggedIn ? loggedInView : unloggedInView}
            </div>
            <div id="console" style={{ whiteSpace: 'pre-line' }}>
                <p style={{ whiteSpace: 'pre-line' }}></p>
            </div>
            <div
                onClick={async () => {
                    const res = await startFitnessRun({
                        message: 'Weightloss',
                        imageUrls: [
                            'https://avatars.githubusercontent.com/u/179255662?s=200&v=4',
                        ],
                        provider,
                    });
                    if (res.runId) {
                        handleDelay(res.runId);
                    }
                }}
            >
                start fitness
            </div>
        </>
    );
}
