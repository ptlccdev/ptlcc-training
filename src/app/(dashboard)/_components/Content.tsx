'use client'
import React, { Children } from 'react'
import { useDashboardRootLayoutStore } from '../_stores/DashboardRootLayoutStore'

interface ContentProps {
    children: React.ReactNode
}
const Content = ({ children }: ContentProps) => {
    const { drawerWidth, headerHeight } = useDashboardRootLayoutStore()
    return (
        <div
            className={`w-full overflow-y-scroll transition-all duration-300 ease-out`}
            style={{
                paddingLeft: `${drawerWidth}rem`,
                height: `calc(100% - ${headerHeight}rem)`,
            }}
        >
            {children}
        </div>
    )
}

export default Content
