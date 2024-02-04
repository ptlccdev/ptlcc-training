import { ToasterToast } from '@/hooks/useToast'

// =================================================================================================
//                                       STRAPI
// =================================================================================================

export const STRAPI_URL =
    'https://ptlcc-training-strapi-backend.orb.local/graphql'

// =================================================================================================
//                                       PERSONAL INFO FORM CONSTANTS
// =================================================================================================

export enum BASIC_INFO_FIELDS {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    FULL_NAME = 'fullName',
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

export enum GENDER {
    male = 'Male',
    female = 'Female',
}

// =================================================================================================
//                                       JOB INFO FORM CONSTANTS
// =================================================================================================

export enum EMPLOYMENT_INFO_FIELDS {
    COMPANY = 'company',
    TITLE_POSITION = 'titlePosition',
    WORK_EMAIL = 'workEmail',
    WORK_NUMBER = 'workNumber',
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

// =================================================================================================
//                                      GENERAL REGISTRATION CONSTANTS
// =================================================================================================

export enum STATE {
    Johor = 'Johor',
    Kedah = 'Kedah',
    Kelantan = 'Kelantan',
    Melaka = 'Melaka',
    NegeriSembilan = 'Negeri Sembilan',
    Pahang = 'Pahang',
    Penang = 'Penang',
    Perak = 'Perak',
    Perlis = 'Perlis',
    Sabah = 'Sabah',
    Sarawak = 'Sarawak',
    Selangor = 'Selangor',
    Terengganu = 'Terengganu',
    WilayahPersekutuanKualaLumpur = 'Wilayah Persekutuan Kuala Lumpur',
    WilayahPersekutuanLabuan = 'Wilayah Persekutuan Labuan',
    WilayahPersekutuanPutrajaya = 'Wilayah Persekutuan Putrajaya',
}

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
