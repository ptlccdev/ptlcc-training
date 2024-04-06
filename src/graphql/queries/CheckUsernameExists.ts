import { graphql } from '@/graphql/gql'

export default graphql(`
    query CheckUsernameExists($username: String!) {
        usersPermissionsUsers(filters: { username: { eq: $username } }) {
            data {
                attributes {
                    username
                }
            }
        }
    }
`)
