'use client'
import { FormEvent, useMemo, useState, useTransition } from 'react'
import { z } from 'zod'
import { passwordStrength } from 'check-password-strength'
import { InputPassword } from '@/components/ui/inputPassword'
import { Label } from '@/components/ui/label'
import { ACCOUNT_FIELDS, CUSTOM_FIELDS } from '@/constants'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { debounce } from '@/lib/utils'
import { Check, PenLine } from 'lucide-react'
import { resetPasswordHandler } from '@/actions'
import LoadingSpinner from '@/components/svgs/LoadingSpinner'

export const ResetPasswordFormSchema = z
    .object({
        [`${ACCOUNT_FIELDS.PASSWORD}`]: z
            .string()
            .trim()
            .min(1, 'Please set your new password'),
        [`${ACCOUNT_FIELDS.CONFIRM_PASSWORD}`]: z
            .string()
            .trim()
            .min(1, 'Please confirm your password'),
        [`${CUSTOM_FIELDS.PASSWORD_STRENGTH}`]: z.string(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: [`${ACCOUNT_FIELDS.CONFIRM_PASSWORD}`],
                message: 'Passwords do not match. Please try again',
            })
        }
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [`${CUSTOM_FIELDS.PASSWORD_STRENGTH}`],
            message: JSON.stringify(passwordStrength(password)),
        })
    })

export type ResetPasswordFormSchemaType = z.infer<
    typeof ResetPasswordFormSchema
>

interface ResetPasswordFormProps {
    code: string
}
const ResetPasswordForm = ({ code }: ResetPasswordFormProps) => {
    const { toast } = useToast()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        register,
        getValues,
        trigger,
        formState: { errors },
    } = useForm<ResetPasswordFormSchemaType>({
        mode: 'all',
        resolver: zodResolver(ResetPasswordFormSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
            passwordStrength: '',
        },
    })

    // =============================================================================================
    //                                      HELPERS
    // =============================================================================================

    const passwordIsWeak = useMemo(() => {
        if (!!errors?.passwordStrength?.message) {
            const { id: score } = JSON.parse(errors?.passwordStrength.message)
            return score <= 1
        }
        return false
    }, [errors?.passwordStrength])
    const formIsInvalid =
        passwordIsWeak ||
        Object.keys(errors).filter(
            key => CUSTOM_FIELDS.PASSWORD_STRENGTH !== key
        ).length > 0
    const { onChange: confirmPasswordOnChange, ...confirmPasswordFormProps } =
        register(ACCOUNT_FIELDS.CONFIRM_PASSWORD)

    // =============================================================================================
    //                                      HANDLERS
    // =============================================================================================

    const onResetPasswordHandler = async (e: FormEvent) => {
        e.preventDefault()

        const isValid = await trigger([
            ACCOUNT_FIELDS.PASSWORD,
            ACCOUNT_FIELDS.CONFIRM_PASSWORD,
        ])
        if (isValid) {
            startTransition(async () => {
                const { status, message } = await resetPasswordHandler({
                    code,
                    password: getValues(ACCOUNT_FIELDS.PASSWORD),
                    passwordConfirmation: getValues(
                        ACCOUNT_FIELDS.CONFIRM_PASSWORD
                    ),
                })
                if (status === 200) {
                    toast({
                        variant: 'default',
                        title: 'Password reset successfully!',
                        description: (
                            <div className=''>
                                <Check className='mr-2 inline' color='green' />
                                You can now login with your new password
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
    }

    return (
        <form onSubmit={async e => await onResetPasswordHandler(e)}>
            <div className='grid w-full items-center gap-4'>
                <InputPassword
                    showPassword={showPassword}
                    toggleShowPassword={setShowPassword}
                    iconClassName='inset-y-[28px]'
                    containerClassName='col-span-6 flex flex-col space-y-2'
                    errorMessage={errors.password?.message}
                    passwordStrengthJSONString={
                        errors.passwordStrength?.message
                    }
                    labelComponent={
                        <Label htmlFor={ACCOUNT_FIELDS.PASSWORD}>
                            New Password
                        </Label>
                    }
                    inputProps={{
                        id: ACCOUNT_FIELDS.PASSWORD,
                        className: 'h-12 pr-12 !mt-2',
                        placeholder: 'New Password',
                        error: !!errors.password || passwordIsWeak,
                        ...register(ACCOUNT_FIELDS.PASSWORD, {
                            deps: [
                                ACCOUNT_FIELDS.CONFIRM_PASSWORD,
                                CUSTOM_FIELDS.PASSWORD_STRENGTH,
                            ],
                        }),
                    }}
                />
                <InputPassword
                    showPassword={showConfirmPassword}
                    errorMessage={errors.confirmPassword?.message}
                    toggleShowPassword={setShowConfirmPassword}
                    iconClassName='inset-y-[28px]'
                    containerClassName='col-span-6 flex flex-col space-y-2'
                    labelComponent={
                        <Label htmlFor={ACCOUNT_FIELDS.CONFIRM_PASSWORD}>
                            Confirm Password
                        </Label>
                    }
                    inputProps={{
                        id: ACCOUNT_FIELDS.CONFIRM_PASSWORD,
                        className: 'h-12 pr-12 !mt-2',
                        placeholder: 'Confirm password',
                        error: !!errors.confirmPassword,
                        onChange: debounce(confirmPasswordOnChange, 500),
                        ...confirmPasswordFormProps,
                    }}
                />
                <Button
                    className='col-span-6 mt-4 h-12 w-full px-4 font-extrabold'
                    variant='default'
                    disabled={formIsInvalid}
                >
                    Change Password
                    {isPending ? (
                        <LoadingSpinner className='ml-auto h-5 w-5' />
                    ) : (
                        <PenLine className='ml-auto' size={20} />
                    )}
                </Button>
            </div>
        </form>
    )
}

export default ResetPasswordForm
