import { graphql } from '@/graphql/gql'

export default graphql(`
    mutation Register($input: UsersPermissionsRegisterInput!) {
        register(input: $input) {
            jwt
            user {
                username
                email
                id
            }
        }
    }
`)
