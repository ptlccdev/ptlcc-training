'use client'

import { Button } from '@/components/ui/button'
import { Trainings, Unpacked } from '@/types'
import { DownloadIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { STRAPI_GRAPHQL } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

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

        // const link = document.createElement('a')
        // link.href = `https://ptlcc-training-strapi-backend.orb.local${url}`
        // link.download = name
        // link.target = '_blank'
        // link.rel = 'noopener noreferrer'
        // link.click()
    }

    return [
        {
            accessorKey: 'training.code',
            header: 'Code',
            cell: ({ row: { original } }) => {
                return (
                    <div className='flex items-center justify-start'>
                        <Badge>{original?.training?.code}</Badge>
                    </div>
                )
            },
        },
        {
            accessorKey: 'training.name',
            header: 'Name',
        },
        {
            accessorKey: 'training.dateValidity',
            header: 'Date Validity',
            cell: ({ row: { original } }) => {
                return (
                    <>
                        {format(original?.training?.dateValidity, 'dd/MM/yyyy')}
                    </>
                )
            },
        },
        {
            accessorKey: 'training.type',
            header: 'Type',
        },
        {
            accessorKey: 'certificate.name',
            header: 'Certificate',
            cell: ({ row: { original } }) => {
                return (
                    <Button
                        className='h-8 w-12 text-white'
                        onClick={async () =>
                            await handleClick(
                                original?.certificate?.url!,
                                original?.certificate?.name!
                            )
                        }
                    >
                        <DownloadIcon />
                    </Button>
                )
            },
        },
    ]
}

export const columns: ColumnDef<Unpacked<Trainings>>[] = [...processColumn()]
