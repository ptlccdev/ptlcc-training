'use server'
import { cookies } from 'next/headers'
import {
    UsersPermissionsLoginInput,
    UsersPermissionsRegisterInput,
} from '@/graphql/types'
import { getClient } from '@/lib/apolloClient'
import { Login, Register } from '@/graphql/mutations'
import { simplify } from '@/lib/utils'
import { COOKIES } from '@/lib/constants'
import { encryptData, decryptData } from '@/lib/crypto'
// import { decrypt, encrypt, encryptData, decryptData } from '@/lib/crypto'
import { LoginPayload, RegistationPayload, Session } from '@/types'
import { redirect } from 'next/navigation'
import { GetUserProfile } from './graphql/queries'
import { GraphQLError } from 'graphql'
import { revalidatePath } from 'next/cache'

export async function registrationHandler(variables: RegistationPayload) {
    console.log('createParticipant', {
        variables,
    })
    const { data, errors } = await getClient().mutate({
        mutation: Register,
        variables,
        errorPolicy: 'all',
    })
    if (data) {
        const { customRegister } = simplify(data)
        const encryptedSession = await encryptData(
            JSON.stringify({ ...customRegister })
        )
        cookies().set(COOKIES.SESSION, encryptedSession, {
            secure: true,
            expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        })
        redirect('/profile')
    }

    if (errors) {
        throw new Error('Failed to register')
    }
}

export async function getSessionData(): Promise<Session> {
    const currentEncryptedSession = cookies().get(COOKIES.SESSION)?.value
    if (!currentEncryptedSession) {
        throw new Error('Session not exist')
    }

    return JSON.parse(
        await decryptData(currentEncryptedSession!)
    ) as unknown as Session
}

// export async function fetchProfile(id: string): Promise<GetUserProfileQuery> {
//     const client = await getClient()

//     const { data, errors } = await client.query({
//         query: GetUserProfile,
//         variables: { usersPermissionsUserId: id },
//     })

//     return data
// }

export async function loginHandler(
    loginVariable: LoginPayload
): Promise<GraphQLError[] | undefined> {
    const { data, errors } = await getClient().mutate({
        mutation: Login,
        variables: loginVariable,
        errorPolicy: 'all',
    })

    if (errors) {
        return [...errors]
    }

    if (data) {
        const { login } = simplify(data)
        const encryptedSession = await encryptData(JSON.stringify({ ...login }))
        cookies().set(COOKIES.SESSION, encryptedSession, {
            secure: true,
            expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        })
        revalidatePath(`/profile`)
        redirect(`/profile`)
    }

    return undefined
}

export async function logoutHandler(): Promise<void> {
    cookies().delete(COOKIES.SESSION)
    redirect('/login')
}
