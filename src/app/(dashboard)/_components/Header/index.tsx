'use client'
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import LogoutButton from './LogoutButton'
import { useDashboardRootLayoutStore } from '../../_stores/DashboardRootLayoutStore'
import { Session } from '@/types'
import { Menu, TrainTrack } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { nanoid } from 'nanoid'
import NavItem from '../Drawer/NavItem'
import { PTLCC } from '@/components/svgs'
import { useMedia } from 'react-use'

interface HeaderProps {
    session?: Session
}

const Header = ({ session }: HeaderProps) => {
    const { drawerWidth, headerHeight } = useDashboardRootLayoutStore()
    const isLg = useMedia('only screen and (min-width: 1024px)', false)
    const [open, setOpen] = useState(false)

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

    return (
        <div
            className={`sticky top-0 z-10 w-full border border-x-0 border-slate-200 bg-white transition-all duration-300 ease-out`}
            style={{
                width: `calc(100% - ${drawerWidth}rem)`,
                height: `${headerHeight}rem`,
                left: `${drawerWidth}rem`,
            }}
        >
            <div className='flex h-full w-full flex-row items-center p-4'>
                {!isLg && (
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Menu className='mr-2 block cursor-pointer lg:hidden' />
                        </SheetTrigger>
                        <SheetContent
                            side={'left'}
                            className='!max-w-[16rem] border-0 bg-primaryColor px-0'
                        >
                            <SheetHeader className='items-start justify-center px-6'>
                                <SheetTitle className='text-white'>
                                    PTLCC Dashboard
                                </SheetTitle>
                                <SheetDescription className='!mt-0'>
                                    {session?.user.email}
                                </SheetDescription>
                            </SheetHeader>
                            <div className='flex h-full w-full flex-col items-start justify-start px-4 pt-5 transition-all duration-300 ease-out'>
                                <div className='flex w-full flex-col gap-1'>
                                    {navItemList.map(props => (
                                        <NavItem
                                            key={nanoid()}
                                            mobile
                                            setOpen={setOpen}
                                            {...props}
                                        />
                                    ))}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                )}
                <div className='mr-auto w-24 items-center'>
                    <PTLCC
                        className='h-[55px] w-full'
                        viewBox='350 350 900 900'
                    />
                </div>
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className='ml-auto cursor-pointer'>
                                <AvatarImage src='https://ui.shadcn.com/avatars/04.png' />
                                <AvatarFallback>-</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='mr-4 w-56'>
                            <DropdownMenuLabel className='flex flex-col'>
                                {session && session.user.username}
                                <span className='font-normal leading-3 text-gray-400'>
                                    {session && session.user.email}
                                </span>
                            </DropdownMenuLabel>
                            <DialogTrigger asChild>
                                <DropdownMenuItem>
                                    Log out
                                    <DropdownMenuShortcut>
                                        <ExitIcon className='text-slate-500' />
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                You&apos;re about to be logged out
                            </DialogTitle>
                            <DialogDescription>
                                Would you like to continue?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <LogoutButton />
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Header
