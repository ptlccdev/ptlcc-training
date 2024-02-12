import React from 'react'
import Link from 'next/link'

import { LoginIllustration, PTLCC } from '@/components/svgs'
import { Card } from '@/components/ui/card'

import LoginForm from './_components/LoginForm'

const LoginPage = async () => {
    const LoginContent = () => (
        <>
            <div className='mb-4 w-10/12 items-center'>
                <PTLCC className='h-[150px] w-full' viewBox='350 350 900 900' />
            </div>

            <h1 className='flex w-10/12 text-xl font-bold leading-none tracking-tight text-backgroundColor md:text-4xl'>
                Sign in to PTLCC Training
            </h1>
            <div className='items-cent mt-1 w-10/12'>
                New participant?&nbsp;
                <Link
                    href='/register'
                    className='cursor-pointer font-medium text-primaryColor underline hover:font-bold hover:underline'
                >
                    Create an account
                </Link>
            </div>
            <LoginForm />
        </>
    )
    return (
        <div className='grid h-screen w-screen grid-cols-5 bg-custom-gradient lg:bg-white lg:bg-none'>
            <div className='m-2 hidden items-center justify-center rounded-md bg-white bg-custom-gradient lg:col-span-3 lg:flex'>
                <LoginIllustration />
            </div>
            <div className='hidden flex-1 flex-col items-center justify-center px-4 pb-8 pt-2 lg:col-span-2 lg:flex'>
                <LoginContent />
            </div>
            <div className='col-span-5 flex flex-1 flex-col items-center justify-center lg:hidden'>
                <Card className='flex h-[95%] w-[90%] flex-col items-center justify-center shadow-2xl'>
                    <LoginContent />
                </Card>
            </div>
        </div>
    )
}

export default LoginPage
