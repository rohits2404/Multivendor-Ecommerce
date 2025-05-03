import Footer from '@/components/home/Footer';
import Navbar from '@/components/home/Navbar';
import React from 'react'

interface HomeLayoutProps {
    children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar/>
            <div className='flex-1 bg-[#F4F4F0]'>
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default HomeLayout;