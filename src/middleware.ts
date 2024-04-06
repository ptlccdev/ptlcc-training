import { NextResponse, NextRequest } from 'next/server'
import { COOKIES } from './constants'
import { decryptData } from './lib/crypto'
import { Session } from './types'
export async function middleware(request: NextRequest) {
    // URL and Pathname
    const url = new URL(request.nextUrl)
    const pathname = url.pathname

    if (pathname === '/') {
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    // Session validation
    const currentEncryptedSession = request.cookies.get(COOKIES.SESSION)?.value
    if (currentEncryptedSession) {
        try {
            const decryptedSession = JSON.parse(
                await decryptData(currentEncryptedSession)
            ) as Session

            if (decryptedSession && decryptedSession.jwt) {
                // Modify request headers (if required for your logic) here or perform other tasks
                const requestHeaders = new Headers(request.headers)
                requestHeaders.set('x-url', request.url)
                requestHeaders.set('x-origin', url.origin)
                requestHeaders.set('x-pathname', pathname)

                // Proceeding with the original request if session is valid
                return NextResponse.next({
                    request: {
                        headers: requestHeaders,
                    },
                })
            }
        } catch (error) {
            console.error('Session decryption failed:', error)
        }
    }

    // Redirect to login if session is invalid or non-existent
    return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
    matcher:
        '/((?!api|_next/static|_next/image|login|register|forgot-password|reset-password|favicon.ico).*)',
}
