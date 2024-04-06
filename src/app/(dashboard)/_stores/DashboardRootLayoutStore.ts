import { create } from 'zustand'
import { DRAWER_WIDTH, HEADER_HEIGHT } from '@/constants'

// =================================================================================================
//                                       TYPES
// =================================================================================================

export type DashboardRootLayoutStore = {
    drawerExpanded: boolean
    drawerWidth: number
    headerHeight: number
    toggleDrawer: () => void
    toggleDrawerVisibility: (isLg: boolean) => void
}

// =================================================================================================
//                                       INITIAL STATE
// =================================================================================================

const initialState = {
    drawerExpanded: true,
    drawerWidth: DRAWER_WIDTH,
    headerHeight: HEADER_HEIGHT,
}

// =================================================================================================
//                                       STORE
// =================================================================================================

export const useDashboardRootLayoutStore = create<DashboardRootLayoutStore>(
    set => ({
        ...initialState,
        toggleDrawer: () =>
            set(state => ({
                ...state,
                drawerExpanded: !state.drawerExpanded,
                drawerWidth: !state.drawerExpanded ? DRAWER_WIDTH : 5,
            })),
        toggleDrawerVisibility: (isLg: boolean) =>
            set(state => ({
                ...state,
                drawerExpanded: isLg ? true : false,
                drawerWidth: isLg ? DRAWER_WIDTH : 0,
            })),
    })
)
