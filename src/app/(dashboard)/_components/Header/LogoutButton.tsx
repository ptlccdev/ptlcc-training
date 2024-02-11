'use client'
import { logoutHandler } from '@/actions'
import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/svgs/LoadingSpinner'

const LogoutItem = () => {
    const [isPending, startTransition] = useTransition()

    return (
        <Button
            type='submit'
            onClick={() => {
                startTransition(async () => {
                    await logoutHandler()
                })
            }}
        >
            Log out
            {isPending && <LoadingSpinner className='ml-4 h-5 w-5' />}
        </Button>
    )
}

export default LogoutItem
