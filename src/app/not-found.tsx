import { PageNotFoundSvg } from '@/components/svgs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='fixed inset-0 flex h-full w-full flex-col items-center justify-center'>
            <div className='mb-4 text-4xl font-bold text-gray-800'>
                Sorry, page not found!
            </div>
            <div className='mb-8 text-center text-lg font-normal leading-6 text-slate-400'>
                Sorry, we couldn&apos;t find the page/resource you&apos;re
                looking for. <br /> Perhaps you&apos;ve mistyped the URL? Be
                sure to check your spelling.
            </div>
            <PageNotFoundSvg className='w-6/12' />
            <Link
                href='/profile'
                className='rouded-s text-md mt-8 h-10 rounded-md bg-slate-900 px-4 py-2 font-medium text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90'
            >
                Go to Home
            </Link>
        </div>
    )
}
