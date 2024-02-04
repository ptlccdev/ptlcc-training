import { z } from 'zod'
import { ACCOUNT_FIELDS } from '@/lib/constants'
import { passwordStrength } from 'check-password-strength'

import { simplify, manualFetchGraphQL } from '@/lib/utils'
import {
    CheckEmailExistsQuery,
    CheckEmailExistsQueryVariables,
} from '@/graphql/types'
import { CheckEmailExists } from '@/graphql/queries/CheckEmailExists'

export const AccountFieldsSchema = z
    .object({
        [`${ACCOUNT_FIELDS.USERNAME}`]: z
            .string()
            .min(1, 'Please set your username')
            .min(8, 'Username must be between 8 and 30 characters long')
            .max(30, 'Username must be between 8 and 30 characters long')
            .regex(
                /^[A-Za-z][A-Za-z0-9_]{7,29}$/,
                'Username should only include letters, numbers, and underscores'
            ),
        [`${ACCOUNT_FIELDS.EMAIL}`]: z
            .string()
            .min(1, 'Please enter your personal email address')
            .email('Please enter a valid email')
            .refine(async value => {
                const data = await manualFetchGraphQL<
                    CheckEmailExistsQuery,
                    CheckEmailExistsQueryVariables
                >(CheckEmailExists, {
                    filters: { email: { eq: value } },
                })
                const { usersPermissionsUsers } = simplify(data)
                return usersPermissionsUsers?.length === 0 ? true : false
            }, 'Email address is already in use. Please register with a different email or log in to your existing account.'),
        [`${ACCOUNT_FIELDS.PASSWORD}`]: z
            .string()
            .trim()
            .min(1, 'Please set your password'),
        [`${ACCOUNT_FIELDS.CONFIRM_PASSWORD}`]: z
            .string()
            .trim()
            .min(1, 'Please confirm your password'),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: [`${ACCOUNT_FIELDS.CONFIRM_PASSWORD}`],
                message: 'Passwords do not match. Please try again',
            })
        }
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [`${ACCOUNT_FIELDS.PASSWORD}`, 'passwordStrength'],
            message: JSON.stringify(passwordStrength(password)),
        })
    })

export type AccountFieldsSchemaType = z.infer<typeof AccountFieldsSchema>

// =================================================================================================
//                          TODOs
// =================================================================================================
// .refine(data => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ['confirmPassword'], // path of error
// })
