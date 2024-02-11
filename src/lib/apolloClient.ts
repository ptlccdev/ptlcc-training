import { HttpLink } from '@apollo/client'
import {
    NextSSRInMemoryCache,
    NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { setContext } from '@apollo/client/link/context'
import https from 'https'
import { STRAPI_GRAPHQL_URL } from './constants'
import { getAuthToken } from './utils'

export const { getClient } = registerApolloClient(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    console.log('NODE_ENV', process.env.NODE_ENV)
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
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: authLink.concat(httpLink),
    })
})
