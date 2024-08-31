'use client';
import ChatButton from '@/components/ui/chatBot/chatbutton';
import NavBar from '@/components/ui/navBar';
import Onboarding from '@/components/ui/onboarding/onbarding';

export default function Home() {
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
