import { useState, useEffect, useRef, MutableRefObject, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InputPassword } from '@/components/ui/inputPassword'
import { ErrorFieldMessage } from '@/components/ui/errorFieldMessage'
import { ACCOUNT_FIELDS, CUSTOM_FIELDS, REQUEST_TYPE } from '@/constants'
import { debounce, manualFetchGraphQL, simplify } from '@/lib/utils'
import { registrationHandler } from '@/actions'
import { RegistationPayload } from '@/types'
import {
    Enum_Componentcommonaddress_State,
    Enum_Componentparticipantpersonaldetails_Gender,
} from '@/graphql/types'
import { useToast } from '@/hooks'

import { useRegistrationFormStore } from '../../_store/RegistrationFromStore'
import { AccountFieldsSchema, AccountFieldsSchemaType } from '../../_schema'
import { CheckEmailExists } from '@/graphql/queries'

interface AccountFormProps {
    formId: string
}
const AccountForm = ({ formId }: AccountFormProps) => {
    const { toast } = useToast()
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {
        account: { username, email, password, confirmPassword },
        personalInfo,
        jobInfo,
        setFormIsValid,
        updateFormData,
        setActiveFormRef,
        setIsSubmitting,
    } = useRegistrationFormStore()
    const formRef = useRef<HTMLFormElement>(null)

    const {
        register,
        getValues,
        trigger,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm<AccountFieldsSchemaType>({
        mode: 'all',
        resolver: zodResolver(AccountFieldsSchema),
        defaultValues: {
            username,
            email,
            password,
            confirmPassword,
            passwordStrength: '',
        },
    })

    // =============================================================================================
    //                                       HELPERS
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
    const { onChange: usernameOnChange, ...usernameFormProps } = register(
        ACCOUNT_FIELDS.USERNAME
    )
    const { onChange: emailOnChange, ...emailFormProps } = register(
        ACCOUNT_FIELDS.EMAIL
    )

    // =============================================================================================
    //                                       EFFECTS
    // =============================================================================================

    useEffect(() => {
        if (formRef.current) {
            formRef.current.trigger = trigger
            formRef.current.getValues = getValues
            formRef.current.isValid = isValid
            setActiveFormRef(
                formId,
                formRef as MutableRefObject<HTMLFormElement>
            )
        }
    }, [formId, getValues, isValid, setActiveFormRef, trigger])

    useEffect(() => {
        setFormIsValid(!formIsInvalid)
    }, [formIsInvalid, setFormIsValid])

    // ==============================================================================================
    //                                        HANDLERS
    // ==============================================================================================

    const onSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        const isValid = await trigger([
            ACCOUNT_FIELDS.USERNAME,
            ACCOUNT_FIELDS.EMAIL,
            ACCOUNT_FIELDS.PASSWORD,
            ACCOUNT_FIELDS.CONFIRM_PASSWORD,
        ])
        if (isValid) {
            const data = getValues()

            updateFormData(formId, data)
            const { username, email, password } = data
            const {
                firstName,
                lastName,
                gender,
                dob,
                phoneNumber,
                homeNumber,
                ...residentialAddress
            } = personalInfo
            const {
                company,
                titlePosition,
                workEmail,
                workPhone,
                ...workAddress
            } = jobInfo
            const fullName = `${firstName} ${lastName}`

            const payload: RegistationPayload = {
                input: {
                    username,
                    email,
                    password,
                    data: {
                        fullName,
                        personalDetails: {
                            firstName,
                            lastName,
                            gender: gender as Enum_Componentparticipantpersonaldetails_Gender,
                            dob: (dob && format(dob, 'yyyy-MM-dd')) || '',
                            phoneNumber,
                            homeNumber,
                            residentialAddress: {
                                ...residentialAddress,
                                state: residentialAddress.state as Enum_Componentcommonaddress_State,
                            },
                        },
                        jobInformation: {
                            company,
                            titlePosition,
                            workEmail,
                            workPhone,
                            workAddress: {
                                ...workAddress,
                                state: workAddress.state as Enum_Componentcommonaddress_State,
                            },
                        },
                    },
                },
            }
            setIsSubmitting(true)
            const { status, message } = await registrationHandler(payload)
            if (status) {
                toast({
                    variant: 'default',
                    title: 'Registration Success',
                    description: 'Successfully created an account!',
                })
                router.replace('/profile')
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: message,
                })
            }
            setIsSubmitting(false)
        }
    }

    // =============================================================================================
    //                                       RENDER
    // =============================================================================================

    return (
        <form id={formId} onSubmit={async e => await onSignUp(e)} ref={formRef}>
            <div className='grid w-full grid-cols-6 items-start gap-4 px-4 py-4'>
                <div className='col-span-6 flex flex-col space-y-1.5'>
                    <Label htmlFor={ACCOUNT_FIELDS.USERNAME}>Username</Label>
                    <Input
                        id={ACCOUNT_FIELDS.USERNAME}
                        placeholder='Enter your prefered username'
                        error={!!errors.username}
                        onChange={debounce(usernameOnChange, 1000)}
                        {...usernameFormProps}
                        // {...register(ACCOUNT_FIELDS.USERNAME)}
                    />
                    <ErrorFieldMessage message={errors.username?.message} />
                </div>
                <div className='col-span-6 flex flex-col space-y-1.5'>
                    <Label htmlFor={ACCOUNT_FIELDS.EMAIL}>Email Address</Label>
                    <Input
                        id={ACCOUNT_FIELDS.EMAIL}
                        placeholder='Enter your personal email address'
                        error={!!errors.email}
                        onChange={debounce(emailOnChange, 1000)}
                        {...emailFormProps}
                    />
                    <ErrorFieldMessage message={errors.email?.message} />
                </div>
                <InputPassword
                    showPassword={showPassword}
                    errorMessage={errors.password?.message}
                    passwordStrengthJSONString={
                        errors.passwordStrength?.message
                    }
                    toggleShowPassword={setShowPassword}
                    iconClassName='inset-y-[22px]'
                    containerClassName='col-span-6 flex flex-col space-y-1.5 md:col-span-3'
                    labelComponent={
                        <Label htmlFor={ACCOUNT_FIELDS.PASSWORD}>
                            Password
                        </Label>
                    }
                    inputProps={{
                        id: ACCOUNT_FIELDS.PASSWORD,
                        className: 'pr-12',
                        placeholder: 'Create your password',
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
                    iconClassName='inset-y-[22px]'
                    containerClassName='col-span-6 flex flex-col space-y-1.5 md:col-span-3'
                    labelComponent={
                        <Label htmlFor={ACCOUNT_FIELDS.CONFIRM_PASSWORD}>
                            Confirm Password
                        </Label>
                    }
                    inputProps={{
                        id: ACCOUNT_FIELDS.CONFIRM_PASSWORD,
                        className: 'pr-12',
                        placeholder: 'Confirm your password',
                        error: !!errors.confirmPassword,
                        onChange: debounce(confirmPasswordOnChange, 500),
                        ...confirmPasswordFormProps,
                    }}
                />
            </div>
        </form>
    )
}

export default AccountForm
