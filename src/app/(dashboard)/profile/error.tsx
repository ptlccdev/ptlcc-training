'use client' // Error components must be Client Components

import { InternalServerErrorSvg } from '@/components/svgs'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Error =>', error)
    }, [error])

    return (
        <div className='flex h-full w-full flex-col items-center justify-center p-12'>
            <div className='mb-2 text-4xl font-bold text-gray-800'>
                500 Internal Server Error
            </div>
            <div className='mb-6 text-center text-lg font-normal leading-6 text-slate-400'>
                There was an error, please try again later
            </div>
            <InternalServerErrorSvg className='w-6/12' />
            <Link
                href='/profile'
                className='rouded-s text-md mt-2 h-10 rounded-md bg-slate-900 px-4 py-2 font-medium text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90'
            >
                Go to Home
            </Link>
        </div>
    )
}
