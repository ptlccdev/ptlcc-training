'use client'
import { useState } from 'react'
import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import Pagination from './Pagination'
import { TablePageSize } from '@/constants'
import { Trainings, Unpacked } from '@/types'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { MultiSelect } from '@/components/ui/multi-select'

interface DataTableProps<Trainings, TValue> {
    columns: ColumnDef<Trainings, TValue>[]
    data: Trainings[]
}

const DataTable = <TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
        state: {
            sorting,
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: +TablePageSize.Small,
            },
        },

        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
    })

    const [selected, setSelected] = useState<string[]>([])
    const TYPE_FILTER_OPTIONS = [
        { label: 'Laboratory', value: 'Laboratory' },
        { label: 'Laboratory Competency', value: 'Laboratory_Competency' },
    ]

    const onChange = (selected: string[]) => {
        table.getColumn('type')?.setFilterValue(selected)
        setSelected(selected)
    }

    return (
        <div className='w-min-[1400px] w-full overflow-y-scroll rounded-lg border shadow-lg'>
            <div className='flex flex-col items-start justify-start gap-3 px-4 py-6 text-sm font-medium'>
                <div className='relative w-full'>
                    <Input
                        className='h-12 pr-10'
                        placeholder='Search trainings...'
                        value={
                            (table
                                .getColumn('name')
                                ?.getFilterValue() as string) ?? ''
                        }
                        onChange={event =>
                            table
                                .getColumn('name')
                                ?.setFilterValue(event.target.value)
                        }
                    />
                    <Search className='absolute right-3 top-2 hidden text-slate-400 md:block' />
                </div>
                <div className='mt-4'>
                    <span className='pl-1 font-bold'>
                        {table.getFilteredRowModel().rows.length}
                    </span>
                    &nbsp;
                    <span className='text-slate-500'>results found</span>
                </div>
                <div>
                    <MultiSelect
                        options={TYPE_FILTER_OPTIONS}
                        selected={selected}
                        onChange={onChange}
                    />
                </div>
            </div>
            <Table className='w-full' containerClassName=''>
                <TableHeader className='bg-primaryColor'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow
                            key={headerGroup.id}
                            className='hover:bg-primaryColor'
                        >
                            {headerGroup.headers.map(header => {
                                return (
                                    <TableHead
                                        className='text-md px-6 py-5 font-medium text-white'
                                        key={header.id}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <TableCell
                                            className='border-b px-6 py-4 font-medium'
                                            key={cell.id}
                                            align={
                                                (
                                                    cell.column.columnDef
                                                        .meta as any
                                                )?.align
                                            }
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className='h-24 text-center'
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination table={table} />
        </div>
    )
}

export default DataTable
