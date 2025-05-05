import Footer from '@/components/home/Footer';
import Navbar from '@/components/home/Navbar';
import { SearchFilters, SearchFiltersSkeleteon } from '@/components/search-filters';
import React, { Suspense } from 'react'
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface HomeLayoutProps {
    children: React.ReactNode;
}

const HomeLayout = async ({ children }: HomeLayoutProps) => {

    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(
        trpc.categories.getMany.queryOptions()
    );

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar/>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<SearchFiltersSkeleteon/>}>
                    <SearchFilters/>
                </Suspense>
            </HydrationBoundary>
            <div className='flex-1 bg-[#F4F4F0]'>
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default HomeLayout;