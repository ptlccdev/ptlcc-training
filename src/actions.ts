'use server'
import { cookies } from 'next/headers'
import { getClient } from '@/lib/apolloClient'
import { Login, Register, ResetPassword } from '@/graphql/mutations'
import { simplify } from '@/lib/utils'
import { COOKIES, GENERIC_MESSAGE } from '@/constants'
import { encryptData, decryptData } from '@/lib/crypto'
import { LoginPayload, Payload, RegistationPayload, Session } from '@/types'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import ForgotPassword from './graphql/mutations/ForgotPassword'

// =================================================================================================
//                                  QUERY HANDLERS
// =================================================================================================

export async function getSessionData(): Promise<Payload<Session>> {
    try {
        const currentEncryptedSession = cookies().get(COOKIES.SESSION)?.value

        if (!currentEncryptedSession) {
            throw Error('No session found')
        }
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

export async function registrationHandler({
    input,
}: RegistationPayload): Promise<Payload<string>> {
    const { data, errors } = await getClient().mutate({
        mutation: Register,
        variables: {
            input,
        },
        errorPolicy: 'all',
    })

    if (errors) {
        return {
            message: errors[0].message,
            success: false,
            status: 500,
        }
    }

    const { register } = simplify(data!)
    const encryptedSession = await encryptData(JSON.stringify({ ...register }))
    cookies().set(COOKIES.SESSION, encryptedSession, {
        secure: process.env['NODE_ENV'] === 'production',
        // expires: new Date(Date.now() + 60 * 1 * 1000),
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        httpOnly: true,
        sameSite: process.env['NODE_ENV'] === 'production' ? 'none' : 'lax',
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
        secure: process.env['NODE_ENV'] === 'production',
        // expires: new Date(Date.now() + 60 * 1 * 1000),
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        httpOnly: true,
        sameSite: process.env['NODE_ENV'] === 'production' ? 'none' : 'lax',
    })
    revalidatePath(`/profile`)
    redirect(`/profile`)
}

export async function logoutHandler(): Promise<void> {
    cookies().delete(COOKIES.SESSION)
    redirect('/login')
}

export async function forgotPasswordHandler({
    email,
}: {
    email: string
}): Promise<Payload<boolean>> {
    const { data, errors } = await getClient().mutate({
        mutation: ForgotPassword,
        variables: {
            email,
        },
        errorPolicy: 'all',
    })
    const simplifiedData = simplify(data)

    if (errors) {
        return {
            message: errors[0].message,
            success: false,
            status: 500,
        }
    }

    if (simplifiedData && !simplifiedData.forgotPassword?.ok) {
        return {
            message: GENERIC_MESSAGE.ERROR,
            success: false,
            status: 500,
        }
    }

    return {
        data: simplifiedData?.forgotPassword?.ok,
        message: GENERIC_MESSAGE.SUCCESS,
        success: true,
        status: 200,
    }
}

export async function resetPasswordHandler({
    code,
    password,
    passwordConfirmation,
}: {
    code: string
    password: string
    passwordConfirmation: string
}): Promise<Payload<string>> {
    const { data, errors } = await getClient().mutate({
        mutation: ResetPassword,
        variables: {
            code,
            password,
            passwordConfirmation,
        },
        errorPolicy: 'all',
    })

    if (errors) {
        return {
            message: errors[0].message,
            success: false,
            status: 500,
        }
    }
    const simplifiedData = simplify(data!)

    return {
        data: simplifiedData!.resetPassword!.user!.email!,
        message: GENERIC_MESSAGE.SUCCESS,
        success: true,
        status: 200,
    }
}
