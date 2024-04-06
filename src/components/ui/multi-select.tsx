import * as React from 'react'
import { cn } from '@/lib/utils'

import { Check, X, ChevronsUpDown, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

export type OptionType = {
    label: string
    value: string
}

interface MultiSelectProps {
    options: OptionType[]
    selected: string[]
    onChange: (selected: string[]) => void
    className?: string
}

function MultiSelect({
    options,
    selected,
    onChange,
    className,
    ...props
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)

    const handleUnselect = (item: string) => {
        onChange(selected.filter(i => i !== item))
    }

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <div className='xs:flex-row flex flex-col gap-2'>
                    <div
                        aria-expanded={open}
                        className={cn(
                            'hover:bg-red relative inline-flex min-h-9 w-full cursor-pointer items-center justify-between whitespace-nowrap rounded-md border border-dashed border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-300',
                            `hover:bg-red min-h-9 w-full justify-between`
                        )}
                        onClick={() => setOpen(!open)}
                    >
                        <div className='flex flex-wrap items-center gap-1'>
                            <span className='mr-2'>
                                Type{selected.length > 0 && ':'}
                            </span>
                            {selected.map(item => (
                                <Badge
                                    variant='default'
                                    key={item}
                                    className='mr-1 gap-1 py-[3px]'
                                    onClick={() => handleUnselect(item)}
                                >
                                    {item.replace(/_/g, ' ')}
                                    <button
                                        className='ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2'
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') {
                                                handleUnselect(item)
                                            }
                                        }}
                                        onMouseDown={e => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }}
                                        onClick={() => handleUnselect(item)}
                                    >
                                        <X
                                            className='text-muted-foreground hover:text-foreground h-4 w-4 rounded-full bg-slate-400 p-[3px] text-black'
                                            strokeWidth={4}
                                        />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                        <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
                    </div>
                    {selected.length > 0 && (
                        <div
                            className='flex w-20 cursor-pointer flex-row items-center rounded-lg p-2 hover:bg-red-500 hover:bg-opacity-10'
                            onClick={e => {
                                e.stopPropagation()
                                onChange([])
                            }}
                        >
                            <Trash2
                                size={18}
                                className='hover mr-1'
                                color='rgb(239 68 68)'
                                strokeWidth={2.5}
                            />
                            <span className='text-center font-bold text-red-500 '>
                                Clear
                            </span>
                        </div>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0' align='start'>
                <Command className={className}>
                    <CommandInput placeholder='Search ...' />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup className='max-h-64 overflow-auto'>
                        {options.map(option => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => {
                                    onChange(
                                        selected.includes(option.value)
                                            ? selected.filter(
                                                  item => item !== option.value
                                              )
                                            : [...selected, option.value]
                                    )
                                    setOpen(true)
                                }}
                            >
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        selected.includes(option.value)
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export { MultiSelect }
