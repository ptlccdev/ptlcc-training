import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'
import WEB_METADATA from '@/config/metadata'
import { ApolloWrapper, Toaster } from '@/components/providers'

export const metadata: Metadata = WEB_METADATA
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' className={inter.className}>
            <body className='bg-background font-geist-sans min-h-screen antialiased'>
                <ApolloWrapper>{children}</ApolloWrapper>
                <Toaster />
            </body>
        </html>
    )
}
