import { graphql } from '@/graphql/gql'

export default graphql(`
    query GetUserTraining(
        $filters: TrainingFiltersInput
        $sessionsFilters2: ComponentCommonTrainingSessionFiltersInput
        $participantsFilters2: ComponentCommonTrainingParticipantsFiltersInput
        $pagination: PaginationArg
    ) {
        trainings(filters: $filters, pagination: $pagination) {
            data {
                attributes {
                    Sessions(filters: $sessionsFilters2) {
                        certificateInfo {
                            issuedDate
                            validityPeriod
                        }
                        date
                        Participants(filters: $participantsFilters2) {
                            Certificate {
                                data {
                                    attributes {
                                        url
                                        name
                                    }
                                }
                            }
                        }
                    }
                    code
                    name
                    type
                }
            }
        }
    }
`)
// export default graphql(`
//     query GetUserTraining($usersPermissionsUserId: ID) {
//         usersPermissionsUser(id: $usersPermissionsUserId) {
//             data {
//                 attributes {
//                     participant {
//                         data {
//                             attributes {
//                                 trainings {
//                                     training {
//                                         data {
//                                             attributes {
//                                                 code
//                                                 name
//                                                 type
//                                             }
//                                         }
//                                     }
//                                     certificate {
//                                         data {
//                                             attributes {
//                                                 name
//                                                 size
//                                                 url
//                                             }
//                                         }
//                                     }
//                                     date
//                                     validity
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `)
