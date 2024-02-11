import { cn } from '@/lib/utils'
import React from 'react'

interface ErrorFieldMessageProps {
    message?: string
    className?: string
}

const ErrorFieldMessage = ({ message, className }: ErrorFieldMessageProps) => {
    if (!message) {
        return null
    }

    return (
        <span className={cn('text-xs font-medium text-red-700', className)}>
            {message}
        </span>
    )
}

export { ErrorFieldMessage }
