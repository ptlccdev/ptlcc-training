import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { TablePageSize } from '@/constants'
import { Trainings, Unpacked } from '@/types'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { nanoid } from 'nanoid'
import React from 'react'

interface PaginationProps<TData> {
    table: Table<TData>
}
const Pagination = <TData,>({ table }: PaginationProps<TData>) => {
    return (
        <div className='flex flex-col items-end justify-end gap-2 px-4 py-4 text-sm font-medium sm:flex-row sm:items-center sm:gap-12'>
            <div className='flex flex-row items-center '>
                <div>Rows per page &nbsp;</div>
                <Select
                    onValueChange={value => table.setPageSize(+value)}
                    defaultValue={TablePageSize.Small}
                >
                    <SelectTrigger className='w-[60px]'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Object.values(TablePageSize).map(value => (
                                <SelectItem key={nanoid()} value={value}>
                                    {value}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className='flex flex-row items-center justify-center gap-2'>
                <div>
                    Page {table.getState().pagination.pageIndex + 1} of &nbsp;
                    {table.getPageCount()}
                </div>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon />
                </Button>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRightIcon />
                </Button>
            </div>
        </div>
    )
}

export default Pagination
