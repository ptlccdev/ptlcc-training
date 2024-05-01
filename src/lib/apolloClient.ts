import { HttpLink } from '@apollo/client'
import {
    NextSSRInMemoryCache,
    NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { onError } from '@apollo/client/link/error'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { setContext } from '@apollo/client/link/context'
import https from 'https'
import { STRAPI_GRAPHQL_URL } from '../constants'
import { getSessionData } from '@/actions'

export const { getClient } = registerApolloClient(() => {
    if (process.env.NODE_ENV === 'development') {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    }

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            )
        if (networkError)
            console.error(
                `[Network error]: ${JSON.stringify(networkError, undefined, 4)} \n[stack]: ${networkError.stack}`
            )
    })

    const httpLink = new HttpLink({
        uri: STRAPI_GRAPHQL_URL,
        fetchOptions: {
            cache: 'no-store',
            ...(process.env.NODE_ENV === 'development' && {
                agent: new https.Agent({ rejectUnauthorized: false }),
            }),
        },
    })
    const authLink = setContext(async (_, { headers }) => {
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
        link: authLink.concat(errorLink).concat(httpLink),
    })
})
