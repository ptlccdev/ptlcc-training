import { z } from 'zod'
import { ACCOUNT_FIELDS } from '@/lib/constants'

import { simplify, manualFetchGraphQL } from '@/lib/utils'
import { CheckEmailExists } from '@/graphql/queries'

export const LoginFormSchema = z.object({
    [`${ACCOUNT_FIELDS.EMAIL}`]: z
        .string()
        .min(1, 'Please enter your email address')
        .email('Please enter a valid email'),
    // .refine(async value => {
    //     const data = await manualFetchGraphQL(CheckEmailExists, {
    //         email: value,
    //     })
    //     const { usersPermissionsUsers } = simplify(data)
    //     return usersPermissionsUsers?.length === 0 ? true : false
    // }, 'Email address is already in use. Please register with a different email or log in to your existing account.'),
    [`${ACCOUNT_FIELDS.PASSWORD}`]: z
        .string()
        .trim()
        .min(1, 'Please enter your password'),
})

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>
