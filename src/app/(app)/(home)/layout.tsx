import Footer from '@/components/home/Footer';
import Navbar from '@/components/home/Navbar';
import { SearchFilters } from '@/components/search-filters';
import { getPayload } from 'payload'
import configPromise from "@payload-config"
import React from 'react'
import { Category } from '@/payload-types';

interface HomeLayoutProps {
    children: React.ReactNode;
}

const HomeLayout = async ({ children }: HomeLayoutProps) => {

    const payload = await getPayload({
        config: configPromise,
    })
    
    const data = await payload.find({
        collection: "categories",
        depth: 1,
        pagination: false,
        where: {
            parent: {
                exists: false
            }
        },
        sort: "name"
    })

    const formattedData = data.docs.map((doc)=>({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc)=>({
            ...(doc as Category),
            subcategories: undefined
        }))
    }))

    console.log({data,formattedData})

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar/>
            <SearchFilters data={formattedData}/>
            <div className='flex-1 bg-[#F4F4F0]'>
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default HomeLayout;