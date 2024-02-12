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
import { getAuthToken } from './utils'

export const { getClient } = registerApolloClient(() => {
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
        fetchOptions: {
            ...(process.env.NODE_ENV === 'development' && {
                agent: new https.Agent({ rejectUnauthorized: false }),
            }),
        },
    })
    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = getAuthToken()
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        }
    })

    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: authLink.concat(errorLink).concat(httpLink),
    })
})
