import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import NavBar from '@/components/ui/navBar';
import HomeNav from '@/components/ui/homeNavBar';

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
                <div>  {children}</div>
            </body>
        </html>
    );
}
