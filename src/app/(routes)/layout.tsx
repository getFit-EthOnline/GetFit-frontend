import HomeNav from '@/components/ui/homeNavBar';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import '../globals.css';

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
