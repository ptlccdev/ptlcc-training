import { ExitIcon } from '@radix-ui/react-icons'
import { getSessionData } from '@/actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import React from 'react'
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

interface HeaderProps {
    drawerWidth: number
    headerHeight: number
}

const Header = async ({ drawerWidth, headerHeight }: HeaderProps) => {
    const { data: session } = await getSessionData()
    return (
        <div
            className={`sticky top-0 z-10 w-full border border-x-0 border-slate-200 bg-white`}
            style={{
                width: `calc(100% - ${drawerWidth}rem)`,
                height: `${headerHeight}rem`,
                left: `${drawerWidth}rem`,
            }}
        >
            <div className='flex h-full w-full flex-row items-center p-4'>
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
