'use client'
import React, { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { forgotPasswordHandler } from '@/actions'
import LoadingSpinner from '@/components/svgs/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { ErrorFieldMessage } from '@/components/ui/errorFieldMessage'
import { Input } from '@/components/ui/input'
import { ACCOUNT_FIELDS } from '@/constants'
import { CheckEmailExists } from '@/graphql/queries'
import { useToast } from '@/hooks/useToast'
import { debounce, manualFetchGraphQL, simplify } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export const ForgotPasswordSchema = z.object({
    [`${ACCOUNT_FIELDS.EMAIL}`]: z
        .string()
        .min(1, 'Please enter your personal email address')
        .email('Please enter a valid email')
        .refine(async value => {
            const data = await manualFetchGraphQL(CheckEmailExists, {
                email: value,
            })
            const { usersPermissionsUsers } = simplify(data)
            return usersPermissionsUsers?.length === 0 ? false : true
        }, 'The email address you entered did not match our records'),
})

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>

const ForgotPasswordForm = () => {
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ForgotPasswordSchemaType>({
        mode: 'all',
        resolver: zodResolver(ForgotPasswordSchema),
    })

    const { onChange: emailOnChange, ...emailFormProps } = register(
        ACCOUNT_FIELDS.EMAIL
    )

    const onForgotPasswordHandler = async (data: any) => {
        startTransition(async () => {
            const { status, message } = await forgotPasswordHandler({
                email: data.email,
            })
            if (status === 200) {
                toast({
                    variant: 'default',
                    title: ' Request sent successfully!',
                    description: (
                        <div className=''>
                            <Check className='mr-2 inline' color='green' />
                            We&apos;ve sent a reset link to your email
                            <span className='font-bold'> {data.email}</span>
                        </div>
                    ),
                })
                router.replace('/login')
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: message,
                })
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onForgotPasswordHandler)}>
            <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                    <Input
                        id='name'
                        className='h-12'
                        placeholder='Email address'
                        onChange={debounce(emailOnChange, 1000)}
                        {...emailFormProps}
                    />
                    <ErrorFieldMessage message={errors.email?.message} />
                </div>
                <div>
                    <Button
                        className='h-12 w-full px-4 font-extrabold'
                        variant='default'
                        type='submit'
                        disabled={!isValid}
                    >
                        Send Request
                        {isPending ? (
                            <LoadingSpinner className='ml-auto h-5 w-5' />
                        ) : (
                            <ChevronRight
                                className='ml-auto h-5 w-5'
                                strokeWidth={3}
                            />
                        )}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default ForgotPasswordForm
