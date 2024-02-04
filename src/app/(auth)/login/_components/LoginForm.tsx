'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { EnterIcon } from '@radix-ui/react-icons'
import { InputPassword } from '@/components/ui/inputPassword'

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <form className='mt-4 grid w-10/12 grid-cols-6 items-center gap-4 py-4'>
            <div className='col-span-6 flex flex-col space-y-3'>
                <Label htmlFor='first-name'>Email Address</Label>
                <Input id='first-name' className='h-12' />
            </div>
            <InputPassword
                showPassword={showPassword}
                toggleShowPassword={setShowPassword}
                iconClassName='inset-y-[27px]'
                containerClassName='col-span-6 flex flex-col space-y-3'
                labelComponent={<Label htmlFor='first-name'>Password</Label>}
                inputProps={{
                    id: 'password',
                    className: 'h-12 pr-12',
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
                    className='h-12 w-full px-6 font-extrabold'
                    variant='default'
                >
                    Login <EnterIcon className='ml-auto h-4 w-4' />
                </Button>
            </div>
        </form>
    )
}

export default LoginForm
