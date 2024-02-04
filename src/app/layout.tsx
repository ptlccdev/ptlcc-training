import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'

import '@/styles/globals.css'
import WEB_METADATA from '@/config/metadata'
import { ApolloWrapper, Toaster } from '@/components/providers'

export const metadata: Metadata = WEB_METADATA

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' className={GeistSans.className}>
            <body className='bg-background font-geist-sans min-h-screen antialiased'>
                <ApolloWrapper>{children}</ApolloWrapper>
                <Toaster />
            </body>
        </html>
    )
}
