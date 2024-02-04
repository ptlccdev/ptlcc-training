import { useRef, useEffect } from 'react'

const useIsFirstRender = () => {
    const isFirstRender = useRef(true)

    useEffect(() => {
        isFirstRender.current = false // After the first render, update the flag
    }, []) // An empty dependency array ensures this effect runs only once after the initial render

    return isFirstRender.current // Return the current value (true on first render, false afterwards)
}

export default useIsFirstRender
