import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { GetProfileQuery } from '@/graphql/types'
import { SimpleType } from '@/lib/utils'
import { JobInformations } from '@/types'
import { format } from 'date-fns'
import React from 'react'

interface JobInformationProps {
    jobInformation: JobInformations
}

const JobInformation = ({ jobInformation }: JobInformationProps) => {
    return (
        <Card className='h-[calc(100%-4rem)] w-full py-8 shadow-lg'>
            <CardContent className='flex h-full flex-col'>
                <CardTitle className='mb-2 w-full text-lg'>
                    Job Informations
                </CardTitle>
                <div className='flex h-full w-full flex-row flex-wrap items-start justify-between gap-y-4 px-2 leading-6'>
                    <div className='w-full'>
                        <div className='text-md font-semibold'>Company</div>
                        <div>{jobInformation?.company}</div>
                    </div>
                    <div className='w-full'>
                        <div className='text-md font-semibold'>
                            Title/Position
                        </div>
                        <div>{jobInformation?.titlePosition}</div>
                    </div>
                    <div className='w-6/12'>
                        <div className='text-md font-semibold'>Work Email</div>
                        <div>{jobInformation?.workEmail}</div>
                    </div>
                    <div className='w-6/12'>
                        <div className='text-md font-semibold'>Work Phone</div>
                        <div>{jobInformation?.workPhone}</div>
                    </div>
                </div>
                <Separator className='my-4' />
                <CardTitle className='w-full text-lg'>Work Address</CardTitle>
                <div className='w-full'>
                    <div>{jobInformation?.workAddress?.addressLine1}</div>
                </div>
                <div className='w-full'>
                    <div>{jobInformation?.workAddress?.addressLine2}</div>
                </div>
                <div className='w-full'>
                    <div>
                        {jobInformation?.workAddress?.city}
                        ,&nbsp;
                        {jobInformation?.workAddress?.postalCode}
                    </div>
                </div>
                <div className='w-full'>
                    <div>{jobInformation?.workAddress?.state}</div>
                </div>
            </CardContent>
        </Card>
    )
}

export default JobInformation
