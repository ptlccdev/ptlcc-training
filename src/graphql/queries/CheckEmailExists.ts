import { graphql } from '@/graphql/gql'

export default graphql(`
    query CheckEmailExists($email: String!) {
        usersPermissionsUsers(filters: { email: { eq: $email } }) {
            data {
                attributes {
                    email
                }
            }
        }
    }
`)
