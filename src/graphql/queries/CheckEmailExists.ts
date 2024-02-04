import { gql } from '@apollo/client'

export const CheckEmailExists = gql`
    query CheckEmailExists($filters: UsersPermissionsUserFiltersInput) {
        usersPermissionsUsers(filters: $filters) {
            data {
                attributes {
                    email
                }
            }
        }
    }
`
