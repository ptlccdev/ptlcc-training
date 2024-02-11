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
                'flex h-full w-full flex-row items-center px-4 py-2 text-sm text-slate-400',
                `${isActive && 'rounded-lg bg-white bg-opacity-5 text-white transition duration-500 ease-out'}`,
                'hover:rounded-lg hover:bg-white hover:bg-opacity-5'
            )}
        >
            <span className={`mr-2 ${isActive && 'text-secondaryColor'}`}>
                {Icon}
            </span>
            <span className='font-semibold'>{title}</span>
        </Link>
    )
}

export default NavItem
