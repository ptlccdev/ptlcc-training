import { ToasterToast } from '@/hooks/useToast'

// =================================================================================================
//                                       STRAPI
// =================================================================================================

export const STRAPI_GRAPHQL_URL =
    process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL || ''
export const STRAPI_GRAPHQL = process.env.NEXT_PUBLIC_STRAPI_URL

// =================================================================================================
//                                       PERSONAL INFO FORM CONSTANTS
// =================================================================================================

export enum BASIC_INFO_FIELDS {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    GENDER = 'gender',
    DOB = 'dob',
    PHONE_NUMBER = 'phoneNumber',
    HOME_NUMBER = 'homeNumber',
}

export enum RESIDENTIAL_ADDRESS_FIELDS {
    ADDRESS_LINE_1 = 'addressLine1',
    ADDRESS_LINE_2 = 'addressLine2',
    POSTAL_CODE = 'postalCode',
    CITY = 'city',
    STATE = 'state',
}

// =================================================================================================
//                                       JOB INFO FORM CONSTANTS
// =================================================================================================

export enum EMPLOYMENT_INFO_FIELDS {
    COMPANY = 'company',
    TITLE_POSITION = 'titlePosition',
    WORK_EMAIL = 'workEmail',
    WORK_NUMBER = 'workPhone',
}

export enum WORK_ADDRESS_FIELDS {
    ADDRESS_LINE_1 = 'addressLine1',
    ADDRESS_LINE_2 = 'addressLine2',
    POSTAL_CODE = 'postalCode',
    CITY = 'city',
    STATE = 'state',
}

// =================================================================================================
//                                       ACCOUNT FORM CONSTANTS
// =================================================================================================

export enum ACCOUNT_FIELDS {
    USERNAME = 'username',
    EMAIL = 'email',
    PASSWORD = 'password',
    CONFIRM_PASSWORD = 'confirmPassword',
}

export enum CUSTOM_FIELDS {
    PASSWORD_STRENGTH = 'passwordStrength',
}

// =================================================================================================
//                                      GENERAL REGISTRATION CONSTANTS
// =================================================================================================

// export enum STATE {
//     Johor = 'Johor',
//     Kedah = 'Kedah',
//     Kelantan = 'Kelantan',
//     Melaka = 'Melaka',
//     NegeriSembilan = 'Negeri Sembilan',
//     Pahang = 'Pahang',
//     Penang = 'Penang',
//     Perak = 'Perak',
//     Perlis = 'Perlis',
//     Sabah = 'Sabah',
//     Sarawak = 'Sarawak',
//     Selangor = 'Selangor',
//     Terengganu = 'Terengganu',
//     WilayahPersekutuanKualaLumpur = 'Wilayah Persekutuan Kuala Lumpur',
//     WilayahPersekutuanLabuan = 'Wilayah Persekutuan Labuan',
//     WilayahPersekutuanPutrajaya = 'Wilayah Persekutuan Putrajaya',
// }

export enum SIGN_UP_ACCORDIANS {
    BASIC_INFO = 'basic-info',
    RESIDENTIAL_ADDRESS = 'residential-address',
    EMPLOYMENT_INFO = 'employment-info',
    WORK_ADDRESS = 'work-address',
}

export enum FORM_ID {
    PersonalInfoForm = 'personalInfo',
    JobInfoForm = 'jobInfo',
    AccountForm = 'account',
}

export const SIGNUP_STEPS = [
    { label: 'Personal Info' },
    { label: 'Job Info' },
    { label: 'Create Account' },
]

export const SIGNUP_FORM_ERROR_TOAST = {
    variant: 'destructive',
    title: 'Uh oh! Something went wrong.',
    description:
        'Please review the form and correct any highlighted errors to proceed',
} as ToasterToast

// =================================================================================================
//                                       COOKIES KEYS
// =================================================================================================

export enum COOKIES {
    SESSION = 'session',
}

// =================================================================================================
//
// =================================================================================================

export enum TablePageSize {
    Small = '10',
    Medium = '20',
    Large = '30',
    XLarge = '40',
    XXLarge = '50',
    XXXLarge = '70',
    XXXXLarge = '100',
}

export enum GENERIC_MESSAGE {
    SUCCESS = 'success',
    ERROR = 'error',
}

export const HEADER_HEIGHT = 4
export const DRAWER_WIDTH = 16

export enum REQUEST_TYPE {
    PUBLIC = 'public',
    AUTHENTICATED = 'authenticated',
}
