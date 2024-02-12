import { z } from 'zod'
import { passwordStrength } from 'check-password-strength'

import { ACCOUNT_FIELDS, CUSTOM_FIELDS } from '@/constants'
import { simplify, manualFetchGraphQL } from '@/lib/utils'
import { CheckEmailExists } from '@/graphql/queries'

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
                const data = await manualFetchGraphQL(CheckEmailExists, {
                    email: value,
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
        [`${CUSTOM_FIELDS.PASSWORD_STRENGTH}`]: z.string(),
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
            path: [`${CUSTOM_FIELDS.PASSWORD_STRENGTH}`],
            message: JSON.stringify(passwordStrength(password)),
        })
    })

export type AccountFieldsSchemaType = z.infer<typeof AccountFieldsSchema>
