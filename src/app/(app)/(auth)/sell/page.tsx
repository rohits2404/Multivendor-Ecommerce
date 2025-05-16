import { SellView } from '@/modules/auth/ui/views/sell-view'
import { caller } from '@/trpc/server';
import { redirect } from 'next/navigation';
import React from 'react'

const SellingPage = async () => {

    const session = await caller.auth.session();
    
    if(session.user) {
        redirect("/")
    }
    
    return (
        <SellView/>
    )
}

export default SellingPage