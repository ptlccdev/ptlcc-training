import { graphql } from '@/graphql/gql'

export default graphql(`
    query GetUserTraining($usersPermissionsUserId: ID) {
        usersPermissionsUser(id: $usersPermissionsUserId) {
            data {
                attributes {
                    participant {
                        data {
                            attributes {
                                trainings {
                                    training {
                                        data {
                                            attributes {
                                                code
                                                name
                                                dateValidity
                                                type
                                            }
                                        }
                                    }
                                    certificate {
                                        data {
                                            attributes {
                                                name
                                                size
                                                url
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`)
