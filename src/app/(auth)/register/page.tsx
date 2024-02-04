import React from 'react'
import Link from 'next/link'
import RegistrationStepper from './_components/RegistrationStepper'
import { JoySvg } from '@/components/svgs'
import { wait } from '@/lib/utils'

const RegisterPage = async () => {
    await wait(1000)
    return (
        <div className='grid h-screen w-screen grid-cols-5'>
            <div className='z-10 col-span-5 flex flex-1 flex-col items-center py-12 md:overflow-auto lg:col-span-3'>
                <h1 className='flex w-10/12 text-center text-4xl font-bold leading-none tracking-tight text-backgroundColor'>
                    Sign Up
                </h1>
                <div className='mt-1 w-10/12 items-center'>
                    Already have an account?&nbsp;
                    <Link
                        href='/login'
                        className='cursor-pointer font-medium text-primaryColor underline hover:font-bold hover:underline'
                    >
                        Sign in
                    </Link>
                </div>
                <RegistrationStepper />
            </div>
            <div className='hidden items-center justify-center bg-white lg:col-span-2 lg:flex lg:flex-col'>
                {/* <div className='hidden items-center justify-center bg-white lg:col-span-2 lg:flex'> */}
                <div className='mb-8 w-full'>
                    <JoySvg />
                </div>
                <div className='text-4xl font-light tracking-tight text-primaryColor'>
                    Sign up and get your certifications
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
