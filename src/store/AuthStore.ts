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

export type User = {
    name: string
}

export type AuthStore = {
    user?: User
    isLoading: boolean
    setUser: (user: User) => void
}

// =================================================================================================
//                                       INITIAL STATE
// =================================================================================================

const initialState = {
    user: undefined,
    isLoading: false,
    setUser: (user: User) => {},
}

// =================================================================================================
//                                       STORE
// =================================================================================================

export const useAuthStore = create<AuthStore>(set => ({
    ...initialState,
    setUser: (user: User) => set(state => ({ ...state, user })),
    logout: () => {
        set(initialState)
    },
}))
