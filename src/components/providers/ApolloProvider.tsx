'use client'

import { PropsWithChildren } from 'react'
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { ApolloLink, HttpLink } from '@apollo/client'
import { STRAPI_URL } from '@/lib/constants'

const makeClient = () => {
    const httpLink = new HttpLink({
        uri: STRAPI_URL,
    })

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      httpLink,
                  ])
                : httpLink,
    })
}

const ApolloWrapper = ({ children }: PropsWithChildren) => {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    )
}

export { ApolloWrapper }
