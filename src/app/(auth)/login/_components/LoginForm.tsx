'use client'
import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { EnterIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { InputPassword } from '@/components/ui/inputPassword'
import { useForm } from 'react-hook-form'
import {
    LoginFormSchema,
    LoginFormSchemaType,
} from '../_schema/LoginFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ACCOUNT_FIELDS } from '@/lib/constants'
import { ErrorFieldMessage } from '@/components/ui/errorFieldMessage'
import { loginHandler } from '@/actions'
import { LoginPayload } from '@/types'

import { useFormState } from 'react-dom'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import LoadingSpinner from '@/components/svgs/LoadingSpinner'

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [generalError, setGeneralError] = useState(false)
    const [isPending, startTransition] = useTransition()

    const {
        register,
        getValues,
        trigger,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormSchemaType>({
        mode: 'all',
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onLoginHandler = (data: any) => {
        console.log('onLoginHandler', data)
        const payload: LoginPayload = {
            input: {
                identifier: data.email,
                password: data.password,
            },
        }
        startTransition(async () => {
            const test = await loginHandler(payload)
            console.log('onLoginHandler finish', test)
            if (test) {
                setGeneralError(true)
            }
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onLoginHandler)}
            className='mt-4 grid w-10/12 grid-cols-6 items-center gap-4 py-4'
        >
            {generalError && (
                <Alert variant='destructive' className='col-span-6'>
                    <ExclamationTriangleIcon
                        className='h-5 w-5'
                        color='white'
                    />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        The email/password you entered did not match our records
                    </AlertDescription>
                </Alert>
            )}
            <div className='col-span-6 flex flex-col space-y-2'>
                <Label htmlFor='first-name'>Email Address</Label>
                <Input
                    id='login-first-name'
                    className='h-14 md:h-12'
                    error={!!errors.email}
                    {...register(ACCOUNT_FIELDS.EMAIL)}
                />
                <ErrorFieldMessage message={errors.email?.message} />
            </div>
            <InputPassword
                showPassword={showPassword}
                toggleShowPassword={setShowPassword}
                errorMessage={errors.password?.message}
                iconClassName='inset-y-[27px]'
                containerClassName='col-span-6 flex flex-col space-y-1'
                labelComponent={<Label htmlFor='first-name'>Password</Label>}
                inputProps={{
                    id: 'login-password',
                    className: 'md:h-12 h-14 pr-12',
                    error: !!errors.password,
                    ...register(ACCOUNT_FIELDS.PASSWORD),
                }}
            />
            <Link
                href='/forgot-password'
                className='col-span-6 ml-auto mt-1 flex flex-col font-medium underline hover:font-bold'
            >
                Forgot Password?
            </Link>
            <div className='col-span-6 mt-1 flex flex-col'>
                <Button
                    className='h-11 w-full px-6 font-extrabold md:h-12'
                    type='submit'
                >
                    Login{' '}
                    {isPending ? (
                        <LoadingSpinner className='ml-auto h-5 w-5' />
                    ) : (
                        <EnterIcon className='ml-auto h-4 w-4' />
                    )}
                </Button>
            </div>
        </form>
    )
}

export default LoginForm
