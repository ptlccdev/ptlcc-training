import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { nanoid } from 'nanoid'
import { PTLCC } from '@/components/svgs'
import { UserIcon } from '@/components/icons'
import Link from 'next/link'
import { FileTextIcon, ExitIcon, PersonIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import NavItem from './NavItem'

interface DrawerProps {
    drawerWidth: number
}

const Drawer = ({ drawerWidth }: DrawerProps) => {
    const headersList = headers()
    const pathname = headersList.get('x-pathname')
    console.log('pathname', pathname)
    const navItemList = [
        {
            title: 'User',
            Icon: <PersonIcon className='inline h-6 w-6' />,
            route: '/profile',
        },
        {
            title: 'Trainings',
            Icon: <FileTextIcon className='inline h-6 w-6' />,
            route: '/training',
        },
    ]

    return (
        <div
            className='fixed z-30 h-full border border-y-0 border-l-0 border-slate-200 bg-primaryColor'
            style={{ width: `${drawerWidth}rem` }}
        >
            <ScrollArea className='h-full w-full'>
                <div className='flex h-full w-full flex-col items-start justify-start px-4'>
                    <div className='w-full pb-6 pl-4 pt-5 text-2xl font-bold text-white'>
                        PTLCC Training
                    </div>
                    <div className='flex w-full flex-col gap-1'>
                        {/* {Array.from({ length: 40 }).map(_ => ( */}
                        {navItemList.map(props => (
                            <NavItem key={nanoid()} {...props} />
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

export default Drawer
