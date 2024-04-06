import {
    ComponentParticipantJobInformation,
    ComponentParticipantPersonalDetails,
    GetProfileQuery,
    GetUserTrainingQuery,
    UsersPermissionsLoginInput,
    UsersPermissionsRegisterInput,
} from './graphql/types'
import { SimpleType } from './lib/utils'

export type RegistationPayload = {
    input: UsersPermissionsRegisterInput
}

export type LoginPayload = {
    input: UsersPermissionsLoginInput
}

export type Session = {
    jwt: string
    user: {
        id: string
        username: string
        email: string
    }
}

export type PersonalDetails = NonNullable<
    NonNullable<
        NonNullable<
            SimpleType<GetProfileQuery>['usersPermissionsUser']
        >['participant']
    >['personalDetails']
>

export type JobInformations = NonNullable<
    NonNullable<
        NonNullable<
            SimpleType<GetProfileQuery>['usersPermissionsUser']
        >['participant']
    >['jobInformation']
>

export type SimplifiedTrainings = NonNullable<
    NonNullable<SimpleType<GetUserTrainingQuery>['trainings']>[number]
>[]

export type Trainings = (Omit<SimplifiedTrainings[number], 'Sessions'> & {
    trainingDate: string
    certificate: {
        issuedDate: string
        validityPeriod: number
        url: string
        name: string
    }
})[]

export type Unpacked<T> = T extends (infer U)[] ? U : T

export interface Payload<Data> {
    data?: Data
    success: boolean
    message: string
    status: number
}
