'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Dispatch } from 'react'
import { useDashboardRootLayoutStore } from '../../_stores/DashboardRootLayoutStore'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface NavItemProps {
    title: string
    Icon: React.JSX.Element
    route: string
    mobile?: boolean
    setOpen?: Dispatch<React.SetStateAction<boolean>>
}
const NavItem = ({
    title,
    Icon,
    route,
    mobile = false,
    setOpen = () => {},
}: NavItemProps) => {
    const pathname = usePathname()
    const { drawerExpanded } = useDashboardRootLayoutStore()
    const isActive = pathname === route
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Link
                        onClick={() => setTimeout(() => setOpen(false), 200)}
                        href={`${route}`}
                        className={cn(
                            'flex h-full w-full flex-row items-center rounded-lg px-4 py-2 text-sm text-slate-500',
                            `${isActive && 'duration-400 bg-drawerBgActive bg-opacity-50 text-slate-100 transition ease-out'}`,
                            `${!isActive && 'hover:bg-slate-800'}`,
                            `${!drawerExpanded && !mobile && 'justify-center'}`
                        )}
                    >
                        <span
                            className={cn(
                                'duration-400 transition ease-out',
                                `${isActive && 'text-slate-100'}`
                            )}
                        >
                            {Icon}
                        </span>
                        {(drawerExpanded || mobile) && (
                            <span className='ml-2 font-semibold'>{title}</span>
                        )}
                    </Link>
                </TooltipTrigger>
                <TooltipContent
                    side='right'
                    className={cn(
                        'ml-4 border bg-white font-semibold text-slate-700 shadow-md',
                        `${drawerExpanded && !mobile && 'hidden'}`
                    )}
                >
                    {title}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default NavItem
