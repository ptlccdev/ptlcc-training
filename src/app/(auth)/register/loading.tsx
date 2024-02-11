import LoadingSpinner from '@/components/svgs/LoadingSpinner'
import React from 'react'

const loading = () => {
    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <LoadingSpinner className='h-24 w-24' />
            <span className='text-md font-md mt-2'>Loading...</span>
        </div>
    )
}

export default loading
