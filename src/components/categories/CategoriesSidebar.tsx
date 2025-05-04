import React, { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Category } from '@/payload-types';
import { ScrollArea } from '../ui/scroll-area';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: any;
}

const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {

    const router = useRouter();

    const [parentCategory,setParentCategory] = useState<Category[]|null>(null);
    const [selectedCategory,setSelectedCategory] = useState<Category|null>(null);

    const currentCategories = parentCategory ?? data ?? [];

    const handleOpenChange = (open: boolean) => {
        setSelectedCategory(null);
        setParentCategory(null);
        onOpenChange(open);
    }

    const handleCategoryClick = (category: Category) => {
        if(category.subcategories && category.subcategories.length>0) {
            setParentCategory(category.subcategories as Category[])
            setSelectedCategory(category);
        } else {
            if(parentCategory && selectedCategory) {
                router.push(`/${selectedCategory.slug}/${category.slug}`);
            } else {
                if(category.slug === "all") {
                    router.push("/");
                } else {
                    router.push(`/${category.slug}`)
                }
            }
            handleOpenChange(false);
        }
    }

    const backgroundColor = selectedCategory?.color || "white";

    const handleBackClick = () => {
        if(parentCategory) {
            setParentCategory(null);
            setSelectedCategory(null);
        }
    }

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent
            side='left'
            className='p-0 transition-none'
            style={{backgroundColor}}
            >
                <SheetHeader className='p-4 border-b'>
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className='flex flex-col overflow-y-auto h-full pb-2'>
                    {parentCategory && (
                        <button
                        onClick={handleBackClick}
                        className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer'
                        >
                            <ChevronLeftIcon className='size-4 mr-2'/>
                            Back
                        </button>
                    )}
                    {currentCategories.map((category)=>(
                        <button
                        onClick={()=>handleCategoryClick(category)}
                        key={category.slug}
                        className='w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer'
                        >
                            {category.name}
                            {category.subcategories && category.subcategories.length>0 && (
                                <ChevronRightIcon className='size-4'/>
                            )}
                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

export default CategoriesSidebar