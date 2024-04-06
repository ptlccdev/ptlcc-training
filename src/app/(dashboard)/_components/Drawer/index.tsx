'use client'
import React, { useEffect } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { nanoid } from 'nanoid'
import { PersonIcon } from '@radix-ui/react-icons'
import NavItem from './NavItem'
import { ChevronLeft, ChevronRight, TrainTrack } from 'lucide-react'
import { Session } from '@/types'
import { cn } from '@/lib/utils'
// import { useMediaQuery } from '@uidotdev/usehooks'
import { useMedia } from 'react-use'
import { useDashboardRootLayoutStore } from '../../_stores/DashboardRootLayoutStore'

interface DrawerProps {
    session?: Session
}

const Drawer = ({ session }: DrawerProps) => {
    const navItemList = [
        {
            title: 'User',
            Icon: <PersonIcon className='inline h-6 w-6' />,
            route: '/profile',
        },
        {
            title: 'Training',
            Icon: <TrainTrack className='inline h-6 w-6' />,
            route: '/training',
        },
    ]

    const {
        drawerExpanded,
        drawerWidth,
        toggleDrawer,
        toggleDrawerVisibility,
    } = useDashboardRootLayoutStore()

    const isLg = useMedia('only screen and (min-width: 1024px)', false)

    useEffect(() => {
        toggleDrawerVisibility(isLg)
    }, [isLg, toggleDrawerVisibility])

    return (
        <div
            className={cn(
                'fixed z-30 hidden h-full bg-primaryColor transition-all duration-300 ease-out lg:block'
            )}
            style={{ width: `${drawerWidth}rem` }}
        >
            <ScrollArea className='h-full w-full'>
                {drawerExpanded && (
                    <div className='px-6 pt-6'>
                        <div className='font-medium text-white'>
                            PTLCC Dashboard
                        </div>
                        <div className='text-sm text-slate-400'>
                            {session?.user.email}
                        </div>
                    </div>
                )}
                <div
                    className='flex h-full flex-col items-start justify-start px-4 pt-5 transition-all duration-300 ease-out'
                    style={{ width: `${drawerWidth}rem` }}
                >
                    <div className='flex w-full flex-col gap-1'>
                        {navItemList.map(props => (
                            <NavItem key={nanoid()} {...props} />
                        ))}
                    </div>
                </div>
            </ScrollArea>
            <div
                className={`fixed bottom-5 cursor-pointer rounded-full border bg-white transition-all duration-300 ease-out hover:bg-slate-100`}
                style={{ left: `calc(${drawerWidth}rem - 12px)` }}
                onClick={() => {
                    toggleDrawer()
                }}
            >
                {drawerExpanded ? (
                    <ChevronLeft className='pr-[2px]' strokeWidth={2.5} />
                ) : (
                    <ChevronRight className='pl-[2px]' strokeWidth={2.5} />
                )}
            </div>
        </div>
    )
}

export default Drawer
