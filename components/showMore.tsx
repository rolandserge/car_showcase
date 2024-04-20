"use client"

import { ShowMoreProps } from '@/types'
import React from 'react'
import CustomButton from './customButton'
import { updateSearchParams } from '@/utils'
import { useRouter } from 'next/navigation'

export default function ShowMore({ pageNumber, isNext, setLimit }: ShowMoreProps) {

    // const router = useRouter()

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 10
        // const newPathName = updateSearchParams("limit", `${newLimit}`)
        // router.push(newPathName)
        setLimit(newLimit)
    }

    return (
        <div className='w-full flex-center gap-5 mt-10'>
            {!isNext && (
                <CustomButton
                    title='Show more'
                    btnType='button'
                    containerStyles='bg-primary-blue rounded-full text-white'
                    handleClick={handleNavigation}
                />
            )}
        </div>
    )
}
