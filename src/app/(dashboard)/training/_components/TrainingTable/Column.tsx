'use client'

import { Button } from '@/components/ui/button'
import { Trainings, Unpacked } from '@/types'
import {
    DownloadIcon,
    CodeSandboxLogoIcon,
    RocketIcon,
    CalendarIcon,
    IdCardIcon,
    ReaderIcon,
} from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { STRAPI_GRAPHQL } from '@/constants'
import { Badge } from '@/components/ui/badge'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { format } from 'date-fns'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

export type TrainingColumn = NonNullable<
    NonNullable<Trainings[number]>
>['training'] & {
    certificate: NonNullable<NonNullable<Trainings[number]>>['certificate']
}
const processColumn = (): ColumnDef<Unpacked<Trainings>>[] => {
    const handleClick = async (fileUrl: string, name: string) => {
        const response = await fetch(`${STRAPI_GRAPHQL}${fileUrl}`)

        if (response.status !== 200) {
            console.error(response.status, response.statusText)
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = name
        link.click()
    }

    return [
        {
            id: 'code',
            accessorKey: 'training.code',
            header: () => {
                return (
                    <div className='flex flex-row items-center justify-start'>
                        <CodeSandboxLogoIcon className='mr-2 inline h-6 w-6 text-secondaryColor' />
                        Code
                    </div>
                )
            },
            cell: ({ row: { original } }) => {
                return (
                    <div className='flex items-center justify-start'>
                        <Badge className='bg-primaryColor'>
                            {original?.training?.code}
                        </Badge>
                    </div>
                )
            },
        },
        {
            id: 'name',
            accessorKey: 'training.name',
            header: ({ column }) => {
                return (
                    <div className='flex flex-row items-center'>
                        <RocketIcon className='mr-2 inline h-6 w-6 text-secondaryColor' />
                        Name
                        <ArrowUpDown
                            className='ml-2 inline h-4 w-4 cursor-pointer text-slate-600 transition duration-300 ease-out hover:scale-110 hover:text-slate-100'
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === 'asc'
                                )
                            }
                        />
                    </div>
                )
            },
        },
        {
            id: 'dateValidity',
            accessorKey: 'training.dateValidity',
            header: ({ column }) => {
                return (
                    <div className='flex flex-row items-center justify-center'>
                        <CalendarIcon className='mr-2 inline h-6 w-6 text-secondaryColor' />
                        Date Validity
                        <ArrowUpDown
                            className='ml-2 inline h-4 w-4 cursor-pointer text-slate-600 transition duration-300 ease-out hover:scale-110 hover:text-slate-100'
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === 'asc'
                                )
                            }
                        />
                    </div>
                )
            },
            cell: ({ row: { original } }) => {
                return (
                    <>
                        {original?.training?.dateValidity &&
                            format(
                                original?.training?.dateValidity,
                                'dd/MM/yyyy'
                            )}
                    </>
                )
            },
            meta: {
                align: 'center',
            },
        },
        {
            id: 'type',
            accessorKey: 'training.type',
            header: () => {
                return (
                    <div className='flex flex-row items-center justify-center'>
                        <IdCardIcon className='mr-3 inline h-6 w-6 text-secondaryColor' />
                        Type
                    </div>
                )
            },
            meta: {
                align: 'center',
            },
        },
        {
            id: 'certificate',
            accessorKey: 'certificate.name',
            header: () => {
                return (
                    <div className='flex flex-row items-center'>
                        <ReaderIcon className='mr-2 inline h-6 w-6 text-secondaryColor' />
                        Certificate
                    </div>
                )
            },
            cell: ({ row: { original } }) => {
                return (
                    <div className='flex flex-row items-center justify-start gap-7'>
                        <div className='w-40 overflow-hidden text-ellipsis whitespace-nowrap'>
                            <a
                                className='cursor-pointer hover:text-secondaryColor hover:underline'
                                href={`${STRAPI_GRAPHQL}${original?.certificate?.url}`}
                                target='_blank'
                            >
                                {original?.certificate?.name!}
                            </a>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className='shrink-0 grow-0 cursor-pointer text-black transition duration-300 ease-out hover:scale-125 hover:text-secondaryColor'>
                                        <DownloadIcon
                                            className='h-4 w-4'
                                            onClick={async () =>
                                                await handleClick(
                                                    original?.certificate?.url!,
                                                    original?.certificate?.name!
                                                )
                                            }
                                        />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Download the certificate</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                )
            },
        },
    ]
}

export const columns: ColumnDef<Unpacked<Trainings>>[] = [...processColumn()]
