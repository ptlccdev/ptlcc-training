'use client'
import { UserIcon } from '@/components/icons'
import PTLCC from '@/components/svgs/PTLCC'
import { cn } from '@/lib/utils'
import { FileTextIcon, PersonIcon } from '@radix-ui/react-icons'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

interface NavItemProps {
    title: string
    Icon: React.JSX.Element
    route: string
    // isActive: boolean
}
const NavItem = ({ title, Icon, route }: NavItemProps) => {
    const pathname = usePathname()
    const isActive = pathname === route
    return (
        <Link
            replace
            href={`${route}`}
            className={cn(
                'flex h-full w-full flex-row items-center rounded-lg px-4 py-2 text-sm text-slate-500',
                `${isActive && 'duration-400 bg-drawerBgActive bg-opacity-50 text-slate-100 transition ease-out'}`,
                `${!isActive && 'hover:bg-slate-800'}`
            )}
        >
            <span className={`mr-2 ${isActive && 'text-slate-100'}`}>
                {Icon}
            </span>
            <span className='font-semibold'>{title}</span>
        </Link>
    )
}

export default NavItem
