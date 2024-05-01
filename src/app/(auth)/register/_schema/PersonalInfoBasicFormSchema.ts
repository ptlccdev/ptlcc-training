import { z } from 'zod'
import { BASIC_INFO_FIELDS, RESIDENTIAL_ADDRESS_FIELDS } from '@/constants'

export const PersonalInfoBasicFormSchema = z.object({
    [`${BASIC_INFO_FIELDS.FIRST_NAME}`]: z
        .string()
        .trim()
        .min(1, 'Please enter your first name')
        .regex(/^[a-z ,.'-]*$/i, 'Please enter a valid name'),
    [`${BASIC_INFO_FIELDS.LAST_NAME}`]: z
        .string({ required_error: 'Please enter your last name' })
        .trim()
        .min(1, 'Please enter your last name')
        .regex(/^[a-z ,.'-]*$/i, 'Please enter a valid name'),
    [`${BASIC_INFO_FIELDS.GENDER}`]: z.string({
        required_error: 'Please select your gender',
    }),
    [`${BASIC_INFO_FIELDS.DOB}`]: z.date({
        required_error: 'Please set your date of birth',
    }),
    [`${BASIC_INFO_FIELDS.PHONE_NUMBER}`]: z
        .string()
        .min(1, 'Please enter your phone number')
        .regex(
            /^6?(?:01[02346-9]\d{7}|011\d{8}|015\d{8}|03\d{8}|0[4-9]\d{7})$/,
            'Please enter a valid phone number'
        ),
    [`${BASIC_INFO_FIELDS.HOME_NUMBER}`]: z.string().refine(value => {
        return (
            value.length === 0 ||
            /^6?(?:01[02346-9]\d{7}|011\d{8}|015\d{8}|03\d{8}|0[4-9]\d{7})$/.test(
                value
            )
        )
    }, 'Please enter a valid phone number'),
    [`${RESIDENTIAL_ADDRESS_FIELDS.ADDRESS_LINE_1}`]: z
        .string()
        .min(1, 'Please enter your street address'),
    [`${RESIDENTIAL_ADDRESS_FIELDS.ADDRESS_LINE_2}`]: z.string().optional(),
    [`${RESIDENTIAL_ADDRESS_FIELDS.POSTAL_CODE}`]: z
        .string()
        .min(1, 'Please enter your postal code')
        .max(5, 'Please enter a valid postal code')
        .regex(/^[0-9]+$/, 'Please enter a valid postal code'),
    [`${RESIDENTIAL_ADDRESS_FIELDS.CITY}`]: z
        .string()
        .min(1, 'Please enter your city'),
    [`${RESIDENTIAL_ADDRESS_FIELDS.STATE}`]: z.string({
        required_error: 'Please select your state',
    }),
})

export type PersonalInfoBasicFormSchemaType = z.infer<
    typeof PersonalInfoBasicFormSchema
>
