import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { GetProfileQuery } from '@/graphql/types'
import { SimpleType } from '@/lib/utils'
import { JobInformations } from '@/types'
import { format } from 'date-fns'
import { Briefcase } from 'lucide-react'
import React from 'react'

interface JobInformationProps {
    jobInformation: JobInformations
}

const JobInformation = ({ jobInformation }: JobInformationProps) => {
    return (
        <Card className='mb-6 w-full shadow-xl lg:w-[calc(50%-0.75rem)]'>
            <CardTitle className='text-md flex w-full flex-row items-center justify-start rounded-t-xl p-6 py-4 text-lg text-black'>
                <Briefcase className='mr-2 inline h-6 w-6 text-primaryColor' />
                Job Info
            </CardTitle>
            <CardContent className='grid w-full grid-cols-2 gap-4 p-6 pt-0'>
                <div className='col-span-2 md:col-span-1'>
                    <div className='text-md font-semibold'>Company</div>
                    <Input
                        className='w-full font-medium text-gray-500'
                        readOnly
                        defaultValue={jobInformation?.company || ''}
                    />
                </div>
                <div className='col-span-2 md:col-span-1'>
                    <div className='text-md font-semibold'>Title/Position</div>
                    <Input
                        className='w-full font-medium text-gray-500'
                        readOnly
                        defaultValue={jobInformation?.titlePosition || ''}
                    />
                </div>
                <div className='col-span-2'>
                    <div className='text-md font-semibold'>Work Email</div>
                    <Input
                        className='w-full font-medium text-gray-500'
                        readOnly
                        defaultValue={jobInformation?.workEmail || ''}
                    />
                </div>
                <div className='col-span-2 md:col-span-1'>
                    <div className='text-md font-semibold'>
                        Work Phone Number
                    </div>
                    <Input
                        className='w-full font-medium text-gray-500'
                        readOnly
                        defaultValue={jobInformation?.workPhone || ''}
                    />
                </div>
                <div className='col-span-2'>
                    <div className='text-md font-semibold'>Work Address</div>
                    <div className='flex w-full flex-row flex-wrap items-start justify-between rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm font-medium leading-[1.2rem] text-gray-500 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300'>
                        <div className='w-full'>
                            <div>
                                {jobInformation?.workAddress?.addressLine1}
                            </div>
                        </div>
                        <div className='w-full'>
                            <div>
                                {jobInformation?.workAddress?.addressLine2}
                            </div>
                        </div>
                        <div className='w-full'>
                            <div>
                                {jobInformation?.workAddress?.city}
                                ,&nbsp;
                                {jobInformation?.workAddress?.postalCode}
                            </div>
                        </div>
                        <div className='w-full'>
                            <div>
                                {jobInformation?.workAddress?.state.replace(
                                    /_/g,
                                    ' '
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default JobInformation
