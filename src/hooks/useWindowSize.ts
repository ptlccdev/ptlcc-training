import { useState, useEffect } from 'react'

type Breakpoints = {
    '2xl': number
    xl: number
    lg: number
    md: number
    sm: number
    [key: string]: number
}

const breakpoints: Breakpoints = {
    '2xl': 1536,
    xl: 1280,
    lg: 1024,
    md: 768,
    sm: 640,
}

type WindowSize = {
    width: number | undefined
    height: number | undefined
    size: string | undefined
}

function getDeviceConfig(width: number): string {
    if (width >= breakpoints['2xl']) return '2xl'
    if (width >= breakpoints.xl) return 'xl'
    if (width >= breakpoints.lg) return 'lg'
    if (width >= breakpoints.md) return 'md'
    if (width >= breakpoints.sm) return 'sm'
    return 'xs'
}

function useWindowSize(): WindowSize {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: undefined,
        height: undefined,
        size: undefined,
    })

    useEffect(() => {
        const handleResize = () => {
            const size = getDeviceConfig(window.innerWidth)

            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
                size,
            })
        }

        if (typeof window !== 'undefined') {
            handleResize() // Call on mount to get initial size

            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [])

    return windowSize
}

export default useWindowSize
