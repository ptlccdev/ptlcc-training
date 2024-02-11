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
    customRegisterInput: UsersPermissionsRegisterInput
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

export type Trainings = NonNullable<
    NonNullable<
        NonNullable<
            SimpleType<GetUserTrainingQuery>['usersPermissionsUser']
        >['participant']
    >['trainings']
>

export type Unpacked<T> = T extends (infer U)[] ? U : T
