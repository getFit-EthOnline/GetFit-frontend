'use client';
import useWeb3Auth from './hooks/useWeb3Auth';

export default function Home() {
    const { login } = useWeb3Auth();
    return (
        <div onClick={login} className="p-10 w-fit">
            Connect
        </div>
    );
}
