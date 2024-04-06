'use client'

import { PropsWithChildren } from 'react'
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { ApolloLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { STRAPI_GRAPHQL_URL } from '@/constants'
import { onError } from '@apollo/client/link/error'
import { getSessionData } from '@/actions'

const makeClient = () => {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            )
        if (networkError) console.error(`[Network error]: ${networkError}`)
    })

    const httpLink = new HttpLink({
        uri: STRAPI_GRAPHQL_URL,
    })

    const authLink = setContext(async (_, { headers }) => {
        // get the authentication token from local storage if it exists
        const { data: session } = await getSessionData()
        const token = session?.jwt
        return {
            headers: {
                ...headers,
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        }
    })

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      authLink,
                      errorLink,
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
