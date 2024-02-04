import React from 'react'
import Link from 'next/link'
import LoginForm from './_components/LoginForm'
import { LoginIllustration } from '@/components/svgs'

const LoginPage = () => {
    return (
        <div className='grid h-screen w-screen grid-cols-5'>
            <div
                className='m-2 hidden items-center justify-center rounded-md bg-white lg:col-span-3 lg:flex'
                style={{
                    backgroundImage:
                        'linear-gradient(to top, #09203f 0%, #537895 100%)',
                    // 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
            >
                <LoginIllustration />
            </div>
            <div className=' col-span-5 flex flex-1 flex-col items-center px-4 py-40 lg:col-span-2'>
                <h1 className='flex w-10/12  text-2xl font-bold leading-none  tracking-tight text-backgroundColor md:text-4xl'>
                    Sign in to PTLCC Training
                </h1>
                <div className='mt-1 w-10/12 items-center'>
                    New participant?&nbsp;
                    <Link
                        href='/register'
                        className='cursor-pointer font-medium text-primaryColor underline hover:font-bold hover:underline'
                    >
                        Create an account
                    </Link>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage
