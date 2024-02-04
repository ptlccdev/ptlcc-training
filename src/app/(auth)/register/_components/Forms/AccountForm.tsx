import {
    useState,
    useEffect,
    useRef,
    MutableRefObject,
    useMemo,
    FormEventHandler,
} from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FieldError } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InputPassword } from '@/components/ui/inputPassword'
import { ErrorFieldMessage } from '@/components/ui/errorFieldMessage'
import { ACCOUNT_FIELDS } from '@/lib/constants'
import { debounce } from '@/lib/utils'

import { useRegistrationFormStore } from '../../_store/RegistrationFromStore'
import { AccountFieldsSchema, AccountFieldsSchemaType } from '../../_schema'

interface CustomFieldError extends FieldError {
    passwordStrength?: {
        message: string
    }
}
interface AccountFormProps {
    formId: string
}
const AccountForm = ({ formId }: AccountFormProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {
        account: { username, email, password, confirmPassword },
        personalInfo,
        jobInfo,
        setFormIsValid,
        updateFormData,
        setActiveFormRef,
    } = useRegistrationFormStore()
    const formRef = useRef<HTMLFormElement>(null)

    const {
        register,
        getValues,
        trigger,
        formState: { errors, isValid },
    } = useForm<AccountFieldsSchemaType>({
        mode: 'all',
        resolver: zodResolver(AccountFieldsSchema),
        defaultValues: {
            username,
            email,
            password,
            confirmPassword,
        },
    })

    // =============================================================================================
    //                                       HELPERS
    // =============================================================================================

    const passwordError = errors.password as CustomFieldError
    const passwordIsWeak = useMemo(() => {
        if (!!passwordError?.passwordStrength) {
            const { id: score } = JSON.parse(
                passwordError?.passwordStrength.message
            )
            return score <= 1
        }
        return false
    }, [passwordError?.passwordStrength])
    const passwordIsInvalid = passwordIsWeak || !!errors.password?.message
    const formIsInvalid =
        passwordIsInvalid ||
        Object.keys(errors).filter(key => ACCOUNT_FIELDS.PASSWORD !== key)
            .length > 0
    const { onChange: confirmPasswordOnChange, ...confirmPasswordFormProps } =
        register(ACCOUNT_FIELDS.CONFIRM_PASSWORD, {
            deps: [ACCOUNT_FIELDS.PASSWORD],
        })
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

    const onSignUp = (e: React.FormEvent) => {
        e.preventDefault()
        trigger()
        if (!formIsInvalid) {
            const data = getValues()

            console.log('All fields validated!', data)
            updateFormData(formId, data)
            const payload = {
                personalInfo,
                jobInfo,
                account: data,
            }

            console.log('Final Payload', payload)
        }
    }

    // =============================================================================================
    //                                       RENDER
    // =============================================================================================

    // console.log('wtf', errors)
    return (
        <form id={formId} onSubmit={onSignUp} ref={formRef}>
            <div className='grid w-full grid-cols-6 items-start gap-4 px-4 py-4'>
                <div className='col-span-6 flex flex-col space-y-1.5'>
                    <Label htmlFor={ACCOUNT_FIELDS.USERNAME}>Username</Label>
                    <Input
                        id={ACCOUNT_FIELDS.USERNAME}
                        placeholder='Enter your prefered username'
                        error={!!errors.username}
                        {...register(ACCOUNT_FIELDS.USERNAME)}
                    />
                    <ErrorFieldMessage message={errors.username?.message} />
                </div>
                <div className='col-span-6 flex flex-col space-y-1.5'>
                    <Label htmlFor={ACCOUNT_FIELDS.EMAIL}>Email Address</Label>
                    <Input
                        id={ACCOUNT_FIELDS.EMAIL}
                        placeholder='Enter your personal email address'
                        error={!!errors.email}
                        onChange={debounce(confirmPasswordOnChange, 2000)}
                        {...emailFormProps}
                    />
                    <ErrorFieldMessage message={errors.email?.message} />
                </div>
                <InputPassword
                    showPassword={showPassword}
                    errorMessage={errors.password?.message}
                    passwordStrengthJSONString={
                        passwordError?.passwordStrength?.message
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
                        error: passwordIsInvalid,
                        ...register(ACCOUNT_FIELDS.PASSWORD, {
                            deps: [ACCOUNT_FIELDS.CONFIRM_PASSWORD],
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
