'use client';
import useWeb3Auth from './hooks/useWeb3Auth';
import useWeb3AuthCore from './hooks/useWeb3AuthCore';

export default function Home() {
    const { login, loggedIn, logout, getUserInfo, getAccounts } = useWeb3Auth();
    const { loginCore, getAccountsCore } = useWeb3AuthCore();
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
    return (
        <>
            <div className="grid">
                {loggedIn ? loggedInView : unloggedInView}
            </div>
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
