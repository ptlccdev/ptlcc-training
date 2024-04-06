import { graphql } from '../gql'

export default graphql(`
    mutation ResetPassword(
        $password: String!
        $passwordConfirmation: String!
        $code: String!
    ) {
        resetPassword(
            password: $password
            passwordConfirmation: $passwordConfirmation
            code: $code
        ) {
            user {
                email
            }
        }
    }
`)
