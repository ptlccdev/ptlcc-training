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
import { ResetPasswordSvg } from '@/components/svgs'

import ResetPasswordForm from './_components/ResetPasswordForm'

const ResetPasswordPage = ({
    searchParams: { code },
}: {
    searchParams: { code: string }
}) => {
    console.log('code', code)
    return (
        <div
            className='flex h-screen w-screen items-center justify-center'
            style={{
                backgroundImage:
                    'linear-gradient(to top, #09203f 0%, #537895 100%)',
            }}
        >
            <Card className='flex flex-col justify-center gap-4 overflow-auto px-2 py-4 shadow-2xl'>
                <div className='flex items-center justify-center px-2 pt-4'>
                    <ResetPasswordSvg className='mt-12 h-56 w-56 md:mt-0' />
                </div>
                <CardHeader className='pb-0 pt-0'>
                    <CardTitle className='text-center text-2xl font-extrabold md:text-3xl'>
                        Reset your password
                    </CardTitle>
                    <CardDescription className='text-center'>
                        Enter a new password below to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent className='mt-4'>
                    <ResetPasswordForm code={code} />
                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPasswordPage
