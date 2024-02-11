import { graphql } from '@/graphql/gql'

export default graphql(`
    mutation Register($customRegisterInput: UsersPermissionsRegisterInput!) {
        customRegister(input: $customRegisterInput) {
            jwt
            user {
                username
                email
                id
            }
        }
    }
`)
