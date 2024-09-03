import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import NavBar from '@/components/ui/navBar';
import HomeNav from '@/components/ui/homeNavBar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={` bg-black ${inter.className}`}>
                <HomeNav />
                <div className="bg-gray-300">
                    <div className=" mx-auto">
                        <Toaster position="top-center" reverseOrder={false} />
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
