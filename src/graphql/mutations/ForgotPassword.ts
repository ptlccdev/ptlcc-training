import { graphql } from '@/graphql/gql'

export default graphql(`
    mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email) {
            ok
        }
    }
`)
