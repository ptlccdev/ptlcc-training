'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

const SendRequestButton = () => {
    // const SendRequestButton = ({ email }: { email: string }) => {
    const router = useRouter()

    return (
        <Button
            className='h-12 w-full px-4 font-extrabold'
            variant='default'
            // disabled={email == undefined}
            onClick={() => router.push(`/reset-password?email=tipu@gmail.com`)}
        >
            Send Request
            <ChevronRightIcon className='ml-auto h-4 w-4' />
        </Button>
    )
}

export default SendRequestButton
