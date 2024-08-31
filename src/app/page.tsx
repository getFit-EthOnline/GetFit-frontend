'use client';
import ChatButton from '@/components/ui/chatBot/chatbutton';
import useWeb3Auth from '../hooks/useWeb3Auth';
import NavBar from '@/components/ui/navBar';
import Onboarding from '@/components/ui/onboarding/onbarding';

export default function Home() {
    const { login, loggedIn, logout, getUserInfo, getAccounts } = useWeb3Auth();
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
        <div className=" ">
            <NavBar />
            <Onboarding />
            {/* <div className="grid relative">
                {loggedIn ? loggedInView : unloggedInView}
            </div>
            <div id="console" style={{ whiteSpace: 'pre-line' }}>
                <p style={{ whiteSpace: 'pre-line' }}></p>
            </div> */}
            <ChatButton />
        </div>
    );
}
