import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SentEmailSvg } from '@/components/svgs'

import ResetPasswordForm from './_components/ResetPasswordForm'

const ResetPasswordPage = ({
    searchParams: { email },
}: {
    searchParams: { email: string }
}) => {
    return (
        <div
            className='flex h-screen w-screen items-center justify-center'
            style={{
                backgroundImage:
                    'linear-gradient(to top, #09203f 0%, #537895 100%)',
            }}
        >
            <Card className='flex h-[95%] w-[90%] flex-col justify-center overflow-auto px-2 py-4 shadow-2xl md:w-[550px]'>
                <div className='flex items-center justify-center px-2 pt-4'>
                    <SentEmailSvg className='mt-12 md:mt-0' />
                </div>
                <CardHeader className='pb-0 pt-0'>
                    <CardTitle className='text-center text-2xl font-extrabold md:text-3xl'>
                        Request sent successfully!
                    </CardTitle>
                    <CardDescription className='text-center'>
                        We&apos;ve sent a 6-digit confirmation code to your
                        email <span className='font-bold'>**{email}</span>.
                        Please enter the code below for confirmation to reset
                        your password
                    </CardDescription>
                </CardHeader>
                <CardContent className='mt-0'>
                    <ResetPasswordForm />
                </CardContent>
                <CardFooter className='flex flex-col items-center'>
                    <Button
                        className='h-12 w-full px-4 font-extrabold'
                        variant='default'
                    >
                        Update Password
                    </Button>
                    <div className='mt-8 text-sm text-gray-600'>
                        Don&apos;t have a code?
                        <Link href={'/login'} className=''>
                            <span className='font-medium text-primaryColor hover:font-bold hover:underline'>
                                &nbsp; Resend code
                            </span>
                        </Link>
                    </div>
                    <Link
                        href={'/login'}
                        className='row mt-4 flex items-center '
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

export default ResetPasswordPage
