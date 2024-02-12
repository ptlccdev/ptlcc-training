import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Drawer from './_components/Drawer'
import Header from './_components/Header'

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const HEADER_HEIGHT = 4
    const DRAWER_WIDTH = 16
    return (
        <div className={`fixed inset-0 overflow-auto`}>
            <Drawer drawerWidth={DRAWER_WIDTH} />
            <Header drawerWidth={DRAWER_WIDTH} headerHeight={HEADER_HEIGHT} />
            <div
                className={`w-full overflow-y-scroll`}
                style={{
                    paddingLeft: `${DRAWER_WIDTH}rem`,
                    height: `calc(100% - ${HEADER_HEIGHT}rem)`,
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
