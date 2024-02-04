'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const labelVariants = cva(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

interface LabelProps extends VariantProps<typeof labelVariants> {
    error?: boolean
    required?: boolean
}

const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & LabelProps
>(({ className, children, error, required, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants(), className, `${error && 'text-red-700'}`)}
        {...props}
    >
        {children} {required && <span className='text-red-700'>*</span>}
    </LabelPrimitive.Root>
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }