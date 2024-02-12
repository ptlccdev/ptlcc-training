import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { nanoid } from 'nanoid'
import { PTLCC } from '@/components/svgs'
import { UserIcon } from '@/components/icons'
import { FileTextIcon, PersonIcon } from '@radix-ui/react-icons'
import NavItem from './NavItem'
import { TrainTrack } from 'lucide-react'
import { getSessionData } from '@/actions'
import { Separator } from '@/components/ui/separator'

interface DrawerProps {
    drawerWidth: number
}

const Drawer = async ({ drawerWidth }: DrawerProps) => {
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

    const { data: session } = await getSessionData()

    return (
        <div
            className='fixed z-30 h-full bg-primaryColor'
            style={{ width: `${drawerWidth}rem` }}
        >
            <ScrollArea className='h-full w-full'>
                <div className='px-6 py-6'>
                    <div className='font-medium text-white'>
                        PTLCC Dashboard
                    </div>
                    <div className='text-sm text-slate-400'>
                        {session?.user.email}
                    </div>
                </div>
                {/* <Separator className='mb-6 bg-slate-600' /> */}
                <div className='flex h-full w-full flex-col items-start justify-start px-4'>
                    <div className='flex w-full flex-col gap-1'>
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

// <div className='w-full pb-4 pl-0 pt-5 text-2xl font-bold text-primaryColor'>
//     {/* <PTLCC className='h-14 w-32' /> */}
//     {/* <PTLCC className='h-24 w-52' /> */}

// </div>
