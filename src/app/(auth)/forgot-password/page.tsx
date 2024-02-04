import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import SendRequestButton from './_components/SendRequestButton'
import { ForgotPasswordSvg } from '@/components/svgs'

const ForgotPasswordPage = () => {
    return (
        <div
            className='flex h-screen w-screen items-center justify-center'
            style={{
                backgroundImage:
                    'linear-gradient(to top, #09203f 0%, #537895 100%)',
            }}
        >
            <Card className='flex h-[90%] w-[90%] flex-col justify-center overflow-auto px-2 py-4 shadow-2xl md:w-[453px]'>
                <div className='flex items-center justify-center'>
                    <ForgotPasswordSvg
                        className='h-[250px] w-[350px]'
                        viewBox='360 400 700 700'
                    />
                </div>
                <CardHeader>
                    <CardTitle className='text-center text-2xl font-extrabold md:text-3xl'>
                        Forgot your password?
                    </CardTitle>
                    <CardDescription className='text-center'>
                        Please enter the email address associated with your
                        account, and we&apos;ll email you a 6-digit confirmation
                        code to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent className='mt-4'>
                    <form>
                        <div className='grid w-full items-center gap-4'>
                            <div className='flex flex-col space-y-1.5'>
                                <Input
                                    id='name'
                                    className='h-12'
                                    placeholder='Email address'
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className='flex flex-col items-center'>
                    <SendRequestButton />
                    <Link
                        href={'/login'}
                        className='row mt-8 flex items-center '
                    >
                        <ChevronLeftIcon className='h-6 w-6 pr-2' />
                        <span className='text-sm font-medium hover:font-bold hover:underline'>
                            Return to sign in
                        </span>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ForgotPasswordPage
