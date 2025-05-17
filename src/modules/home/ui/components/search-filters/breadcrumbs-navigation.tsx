import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import React from 'react'

interface Props {
    activeCategoryName?: string | null;
    activeCategory?: string | null;
    activeSubCategoryName?: string | null;
}

const BreadCrumbNavigation = ({activeCategoryName,activeCategory,activeSubCategoryName}: Props) => {

    if(!activeCategoryName || activeCategory === "all") return null;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {activeSubCategoryName ? (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild className='text-xl font-medium underline text-primary'>
                                <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className='text-primary font-medium text-lg'>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-xl font-medium'>
                                {activeSubCategoryName}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                ) : (
                    <BreadcrumbItem>
                        <BreadcrumbPage className='text-xl font-medium'>
                            {activeCategory}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumbNavigation