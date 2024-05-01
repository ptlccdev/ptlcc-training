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
import {
    ArrowUpDown,
    CalendarRange,
    ExternalLink,
    MoreHorizontal,
    TicketCheck,
} from 'lucide-react'
import { addYears, format, isWithinInterval } from 'date-fns'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

// export type TrainingColumn = NonNullable<
//     NonNullable<Trainings[number]>
// >['training'] & {
//     certificate: NonNullable<NonNullable<Trainings[number]>>['certificate']
// }
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
            accessorKey: 'code',
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
                            {original?.code}
                        </Badge>
                    </div>
                )
            },
        },
        {
            id: 'name',
            accessorKey: 'name',
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
            id: 'date',
            accessorKey: 'trainingDate',
            header: ({ column }) => {
                return (
                    <div className='flex flex-row items-center justify-center text-nowrap'>
                        <CalendarIcon className='mr-2 inline h-6 w-6 text-secondaryColor' />
                        Training Date
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
                        {original?.trainingDate &&
                            format(original?.trainingDate, 'dd/MM/yyyy')}
                    </>
                )
            },
            meta: {
                align: 'center',
            },
        },
        {
            id: 'type',
            accessorKey: 'type',
            header: () => {
                return (
                    <div className='flex flex-row items-center justify-center text-nowrap'>
                        <IdCardIcon className='mr-3 inline h-6 w-6 text-secondaryColor' />
                        Type
                    </div>
                )
            },
            filterFn: ({ original }, _, filterValue) => {
                if (
                    filterValue.length === 0 ||
                    filterValue.includes(original?.type)
                ) {
                    return true
                }

                return false
            },
            cell: ({ row: { original } }) => (
                <>{original?.type?.replace(/_/g, ' ')}</>
            ),
            meta: {
                align: 'center',
            },
        },
        {
            id: 'validity',
            accessorKey: 'validity',
            header: () => {
                return (
                    <div className='flex flex-row items-center justify-center'>
                        <TicketCheck className='mr-3 inline h-6 w-6 text-secondaryColor' />
                        Validity
                    </div>
                )
            },
            cell: ({ row: { original } }) => {
                const isValid = isWithinInterval(new Date(), {
                    start: new Date(original?.certificate.issuedDate),
                    end: addYears(
                        new Date(original?.certificate.issuedDate),
                        original?.certificate.validityPeriod
                    ),
                })
                return (
                    <div className='flex items-center justify-center'>
                        <Badge
                            className={`px-3 py-1 font-bold ${isValid ? 'bg-green-600' : 'bg-red-600'}`}
                        >
                            {isValid ? 'Valid' : 'Invalid'}
                        </Badge>
                    </div>
                )
            },
            meta: {
                align: 'center',
            },
        },
        {
            id: 'validityPeriod',
            header: ({ column }) => {
                return (
                    <div className='flex flex-row items-center justify-center text-nowrap'>
                        <CalendarRange className='mr-2 inline h-6 w-6 text-secondaryColor' />
                        Validity Period
                    </div>
                )
            },
            cell: ({ row: { original } }) => {
                const start = format(
                    original.certificate.issuedDate,
                    'dd/MM/yyyy'
                )
                const end = format(
                    addYears(
                        new Date(original?.certificate.issuedDate),
                        original?.certificate.validityPeriod
                    ),
                    'dd/MM/yyyy'
                )

                return (
                    <div className='flex flex-row items-center justify-center'>
                        <Badge variant={'outline'}>{start}</Badge>
                        <div className='mx-1'>-</div>
                        <Badge variant={'outline'}>{end}</Badge>
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
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <TooltipProvider>
                            <Tooltip delayDuration={400}>
                                <TooltipTrigger asChild>
                                    <div className='shrink-0 grow-0 cursor-pointer text-black transition duration-300 ease-out hover:scale-125 hover:text-secondaryColor'>
                                        <a
                                            className='cursor-pointer hover:text-secondaryColor hover:underline'
                                            href={`${STRAPI_GRAPHQL}${original?.certificate?.url}`}
                                            target='_blank'
                                        >
                                            <ExternalLink className='h-4 w-4' />
                                        </a>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Open</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip delayDuration={400}>
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
                                    <p>Download</p>
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
