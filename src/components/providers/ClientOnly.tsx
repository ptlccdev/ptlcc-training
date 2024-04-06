'use client'
import { useState, useEffect, ReactNode } from 'react'

type ClientOnlyProps = {
    children: ReactNode
    [key: string]: any
}

function ClientOnly({ children, ...delegated }: ClientOnlyProps) {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) {
        return null
    }

    return <div {...delegated}>{children}</div>
}

export default ClientOnly
