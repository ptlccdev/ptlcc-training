import { z } from 'zod'
import { EMPLOYMENT_INFO_FIELDS, WORK_ADDRESS_FIELDS } from '@/constants'

export const JobInfoFormSchema = z.object({
    [`${EMPLOYMENT_INFO_FIELDS.COMPANY}`]: z
        .string()
        .trim()
        .min(1, 'Please enter your company name'),
    [`${EMPLOYMENT_INFO_FIELDS.TITLE_POSITION}`]: z
        .string()
        .trim()
        .min(1, 'Please enter your title/position'),
    [`${EMPLOYMENT_INFO_FIELDS.WORK_EMAIL}`]: z
        .string()
        .trim()
        .email('Please enter a valid email'),
    [`${EMPLOYMENT_INFO_FIELDS.WORK_NUMBER}`]: z.string().refine(value => {
        return (
            value.length === 0 ||
            /^6?(?:01[02346-9]\d{7}|011\d{8}|015\d{8}|03\d{8}|0[4-9]\d{7})$/.test(
                value
            )
        )
    }, 'Please enter a valid phone number'),
    [`${WORK_ADDRESS_FIELDS.ADDRESS_LINE_1}`]: z
        .string()
        .min(1, 'Please enter your work street address'),
    [`${WORK_ADDRESS_FIELDS.ADDRESS_LINE_2}`]: z.string().optional(),
    [`${WORK_ADDRESS_FIELDS.POSTAL_CODE}`]: z
        .string()
        .min(1, 'Please enter your work postal code')
        .max(5, 'Please enter a valid postal code')
        .regex(/^[0-9]+$/, 'Please enter a valid postal code'),
    [`${WORK_ADDRESS_FIELDS.CITY}`]: z
        .string()
        .min(1, 'Please enter your work city'),
    [`${WORK_ADDRESS_FIELDS.STATE}`]: z.string({
        required_error: 'Please select your work state',
    }),
})

export type JobInfoFormSchemaType = z.infer<typeof JobInfoFormSchema>
