import { forwardRef, useMemo } from 'react'
import { Result, passwordStrength } from 'check-password-strength'
import { Input, InputProps } from '@/components/ui/input'
import { EyeOpenIcon, EyeCloseIcon } from '@/components/icons'
import { ErrorFieldMessage } from '@/components/ui/errorFieldMessage'
import { nanoid } from 'nanoid'

import { cn, setFocusToEnd } from '@/lib/utils'

export interface InputPasswordProps {
    showPassword: boolean
    errorMessage?: string
    passwordStrengthJSONString?: string
    toggleShowPassword: (showPassword: boolean) => void
    iconClassName?: string
    containerClassName?: string
    inputProps?: InputProps
    labelComponent?: React.ReactNode
}

export interface PasswordStrengthBarProps {
    showStrengthBar?: boolean
    passwordStrengthJSONString?: string
    generalErrorMessage?: string
}

const PasswordStrengthBar = ({
    passwordStrengthJSONString,
    showStrengthBar,
    generalErrorMessage,
}: PasswordStrengthBarProps) => {
    const { score, strengthColor, strengthMessage } = useMemo(() => {
        const color = [
            'bg-red-500',
            'bg-yellow-500',
            'bg-blue-500',
            'bg-green-500',
        ]
        if (passwordStrengthJSONString) {
            const { id: score, value: message } = JSON.parse(
                passwordStrengthJSONString
            )
            return {
                score,
                strengthColor: color[score],
                strengthMessage: message,
            }
        }

        return {}
    }, [passwordStrengthJSONString])

    if (!showStrengthBar) {
        return null
    }

    return (
        <>
            <div className=' flex h-[4px] flex-row items-center'>
                {[...Array(4)].flatMap((_, index) => [
                    <div
                        key={nanoid()}
                        className={`max-w-full, h-[3px] w-full rounded-full ${index <= score ? strengthColor : 'bg-gray-300'}`}
                    >
                        &nbsp;
                    </div>,
                    index <= 3 && (
                        <div key={nanoid()} className='w-[8px]'>
                            &nbsp;
                        </div>
                    ),
                ])}
            </div>
            <div className='flex justify-between '>
                <div className='text-xs font-medium text-red-700'>
                    {generalErrorMessage}
                </div>
                <div className=' text-xs text-gray-500'> {strengthMessage}</div>
            </div>
        </>
    )
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
    (
        {
            showPassword,
            errorMessage,
            passwordStrengthJSONString,
            toggleShowPassword,
            iconClassName,
            containerClassName,
            inputProps,
            labelComponent,
        },
        ref
    ) => {
        const focusInput = (inputId?: string) => {
            const siblingInput = document.querySelector(
                `#${inputId}`
            ) as HTMLElement
            if (siblingInput && siblingInput.tagName === 'INPUT') {
                siblingInput.focus()
            }
        }
        return (
            <div className={cn('relative', containerClassName)}>
                {labelComponent}
                <Input
                    ref={ref}
                    type={showPassword ? 'text' : 'password'}
                    onFocus={e => setFocusToEnd(e.target)}
                    {...inputProps}
                />
                <div
                    className={cn(
                        'absolute right-4 cursor-pointer items-center',
                        iconClassName
                    )}
                    onClick={() => {
                        toggleShowPassword(!showPassword)
                        focusInput(inputProps?.id)
                    }}
                >
                    {showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
                </div>
                <PasswordStrengthBar
                    passwordStrengthJSONString={passwordStrengthJSONString}
                    showStrengthBar={!!passwordStrengthJSONString}
                    generalErrorMessage={errorMessage}
                />
                <ErrorFieldMessage
                    message={
                        !!!passwordStrengthJSONString ? errorMessage : undefined
                    }
                />
            </div>
        )
    }
)

InputPassword.displayName = 'InputPassword'

export { InputPassword }
