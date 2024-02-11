import { graphql } from '@/graphql/gql'

export default graphql(`
    mutation Login($input: UsersPermissionsLoginInput!) {
        login(input: $input) {
            jwt
            user {
                id
                email
                username
            }
        }
    }
`)
