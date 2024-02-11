import { graphql } from '@/graphql/gql'

export default graphql(`
    query GetProfile($usersPermissionsUserId: ID) {
        usersPermissionsUser(id: $usersPermissionsUserId) {
            data {
                attributes {
                    participant {
                        data {
                            attributes {
                                personalDetails {
                                    firstName
                                    lastName
                                    fullName
                                    gender
                                    dob
                                    residentialAddress {
                                        addressLine1
                                        addressLine2
                                        postalCode
                                        city
                                        state
                                    }
                                    homeNumber
                                    phoneNumber
                                }
                                jobInformation {
                                    titlePosition
                                    company
                                    workEmail
                                    workAddress {
                                        addressLine1
                                        addressLine2
                                        postalCode
                                        city
                                        state
                                    }
                                    workPhone
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`)
