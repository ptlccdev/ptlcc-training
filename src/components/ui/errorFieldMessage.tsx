import React from 'react'

const ErrorFieldMessage = ({ message }: { message: string | undefined }) => {
    if (!message) {
        return null
    }

    return <span className='text-xs font-medium text-red-700'>{message}</span>
}

export { ErrorFieldMessage }
