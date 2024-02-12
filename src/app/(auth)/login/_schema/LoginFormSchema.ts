import { z } from 'zod'
import { ACCOUNT_FIELDS } from '@/constants'

export const LoginFormSchema = z.object({
    [`${ACCOUNT_FIELDS.EMAIL}`]: z
        .string()
        .min(1, 'Please enter your email address')
        .email('Please enter a valid email'),
    [`${ACCOUNT_FIELDS.PASSWORD}`]: z
        .string()
        .trim()
        .min(1, 'Please enter your password'),
})

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>
