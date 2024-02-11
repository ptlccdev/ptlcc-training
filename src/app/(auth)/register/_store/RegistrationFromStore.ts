import { MutableRefObject } from 'react'
import { create } from 'zustand'
import {
    BASIC_INFO_FIELDS,
    RESIDENTIAL_ADDRESS_FIELDS,
    EMPLOYMENT_INFO_FIELDS,
    WORK_ADDRESS_FIELDS,
    ACCOUNT_FIELDS,
} from '@/lib/constants'

// =================================================================================================
//                                       TYPES
// =================================================================================================

export type PersonalInfo = {
    [key in BASIC_INFO_FIELDS | RESIDENTIAL_ADDRESS_FIELDS]?: string
}

export type JobInfo = {
    [key in EMPLOYMENT_INFO_FIELDS | WORK_ADDRESS_FIELDS]?: string
}

export type Account = {
    [key in ACCOUNT_FIELDS]?: string
}

export type ActiveForm = {
    id: string
    ref?: MutableRefObject<HTMLFormElement>
    isValid: boolean
}

export type RegistrationFormStore = {
    personalInfo: PersonalInfo
    jobInfo: JobInfo
    account: Account
    activeForm: ActiveForm
    updateFormData: (
        id: string,
        latestData: PersonalInfo | JobInfo | Account
    ) => void
    setFormIsValid: (status: boolean) => void
    setActiveFormRef: (
        id: string,
        activeFormRef: MutableRefObject<HTMLFormElement>
    ) => void
    reset: () => void
}

// =================================================================================================
//                                       INITIAL STATE
// =================================================================================================

const initialState = {
    personalInfo: {
        firstName: '',
        lastName: '',
        fullName: '',
        dob: '',
        gender: '',
        phoneNumber: '',
        homeNumber: '',
        addressLine1: '',
        addressLine2: '',
        postalCode: '',
        city: '',
        state: '',
    },
    jobInfo: {
        company: '',
        titlePosition: '',
        workEmail: '',
        workPhone: '',
        addressLine1: '',
        addressLine2: '',
        postalCode: '',
        city: '',
        state: '',
    },
    account: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    activeForm: {
        id: '',
        ref: undefined,
        isValid: true,
    },
}

// =================================================================================================
//                                       STORE
// =================================================================================================

export const useRegistrationFormStore = create<RegistrationFormStore>(set => ({
    ...initialState,
    updateFormData: (
        id: string,
        latestData: PersonalInfo | JobInfo | Account
    ) => set(state => ({ ...state, [`${id}`]: { ...latestData } })),
    setFormIsValid: (status: boolean) =>
        set(state => ({
            ...state,
            activeForm: { ...state.activeForm, isValid: status },
        })),
    setActiveFormRef: (
        id: string,
        activeFormRef: MutableRefObject<HTMLFormElement>
    ) =>
        set(state => ({
            ...state,
            activeForm: { ...state.activeForm, id, ref: activeFormRef },
        })),
    reset: () => {
        set(initialState)
    },
}))
