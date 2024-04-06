import React from 'react'
import Drawer from './_components/Drawer'
import Header from './_components/Header'
import { getSessionData } from '@/actions'
import Content from './_components/Content'

const DashboardLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const { data: session } = await getSessionData()
    return (
        <div className={`fixed inset-0 overflow-auto`}>
            <Drawer session={session} />
            <Header session={session} />
            <Content>{children}</Content>
        </div>
    )
}

export default DashboardLayout
