'use server'
import { cookies } from 'next/headers'
import {
    UsersPermissionsLoginInput,
    UsersPermissionsRegisterInput,
} from '@/graphql/types'
import { getClient } from '@/lib/apolloClient'
import { Login, Register } from '@/graphql/mutations'
import { simplify } from '@/lib/utils'
import { COOKIES, GENERIC_MESSAGE } from '@/constants'
import { encryptData, decryptData } from '@/lib/crypto'
// import { decrypt, encrypt, encryptData, decryptData } from '@/lib/crypto'
import { LoginPayload, Payload, RegistationPayload, Session } from '@/types'
import { redirect } from 'next/navigation'
import { GetUserProfile } from './graphql/queries'
import { GraphQLError } from 'graphql'
import { revalidatePath } from 'next/cache'

// =================================================================================================
//                                  QUERY HANDLERS
// =================================================================================================

export async function getSessionData(): Promise<Payload<Session>> {
    try {
        const currentEncryptedSession = cookies().get(COOKIES.SESSION)?.value

        const currentSession = JSON.parse(
            await decryptData(currentEncryptedSession!)
        )

        return {
            data: currentSession,
            message: GENERIC_MESSAGE.SUCCESS,
            success: true,
            status: 200,
        }
    } catch (_) {
        return {
            message: 'Failed to decrypt session',
            success: false,
            status: 500,
        }
    }
}

// =================================================================================================
//                                  MUTATION HANDLERS
// =================================================================================================

export async function registrationHandler(
    variables: RegistationPayload
): Promise<Payload<string>> {
    const { data, errors } = await getClient().mutate({
        mutation: Register,
        variables,
        errorPolicy: 'all',
    })

    if (errors) {
        return {
            message: errors[0].message,
            success: false,
            status: 500,
        }
    }

    const { customRegister } = simplify(data!)
    const encryptedSession = await encryptData(
        JSON.stringify({ ...customRegister })
    )
    cookies().set(COOKIES.SESSION, encryptedSession, {
        secure: true,
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    })

    return {
        message: GENERIC_MESSAGE.SUCCESS,
        success: true,
        status: 200,
    }
}

export async function loginHandler(
    loginVariable: LoginPayload
): Promise<Payload<string>> {
    const { data, errors } = await getClient().mutate({
        mutation: Login,
        variables: loginVariable,
        errorPolicy: 'all',
    })

    if (errors) {
        return {
            message: errors[0].message,
            success: false,
            status: 500,
        }
    }

    const { login } = simplify(data!)
    const encryptedSession = await encryptData(JSON.stringify({ ...login }))
    cookies().set(COOKIES.SESSION, encryptedSession, {
        secure: true,
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    })
    revalidatePath(`/profile`)
    redirect(`/profile`)
}

export async function logoutHandler(): Promise<void> {
    cookies().delete(COOKIES.SESSION)
    redirect('/login')
}
