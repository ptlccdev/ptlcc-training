import { graphql } from '@/graphql/gql'

export default graphql(`
    mutation CreateParticipant($data: ParticipantInput!) {
        createParticipant(data: $data) {
            data {
                id
            }
        }
    }
`)
