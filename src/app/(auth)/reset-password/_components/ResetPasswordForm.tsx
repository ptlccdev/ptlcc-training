'use client'
import { useState } from 'react'

import { Input } from '@/components/ui/input'

import { InputPassword } from '@/components/ui/inputPassword'
import Passcode from './Passcode'

const ResetPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    return (
        <form>
            <div className='grid w-full items-center gap-4'>
                <div className='col-span-6 mb-4 mt-8 flex flex-row items-center justify-center gap-2'>
                    <Passcode inputClassName='md:h-16 text-center md:text-2xl font-bold text-xl h-12' />
                </div>
                <InputPassword
                    showPassword={showPassword}
                    toggleShowPassword={setShowPassword}
                    iconClassName='inset-y-[1px]'
                    containerClassName='col-span-6 flex flex-col space-y-3'
                    inputProps={{
                        id: 'confirm-password',
                        className: 'h-12 pr-12',
                        placeholder: 'Password',
                    }}
                />
                <InputPassword
                    showPassword={showConfirmPassword}
                    toggleShowPassword={setShowConfirmPassword}
                    iconClassName='inset-y-[1px]'
                    containerClassName='col-span-6 flex flex-col space-y-3'
                    inputProps={{
                        id: 'confirm-password',
                        className: 'h-12 pr-12',
                        placeholder: 'Password',
                    }}
                />
            </div>
        </form>
    )
}

export default ResetPasswordForm
