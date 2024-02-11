import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    ComponentParticipantPersonalDetails,
    GetProfileQuery,
} from '@/graphql/types'
import { SimpleType } from '@/lib/utils'
import { PersonalDetails } from '@/types'
import { format } from 'date-fns'
import React from 'react'

interface PersonalDetailsCardProps {
    personalDetails: PersonalDetails
}

const PersonalDetailsCard = ({ personalDetails }: PersonalDetailsCardProps) => {
    return (
        <Card className='h-[calc(100%-4rem)] w-full py-8 shadow-lg'>
            <CardContent className='flex h-full flex-col'>
                <CardTitle className='mb-2 w-full text-lg'>
                    Personal Details
                </CardTitle>
                <div className='flex h-full w-full flex-row flex-wrap items-start justify-between gap-y-4 px-2 leading-6'>
                    <div className='w-6/12'>
                        <div className='text-md font-semibold'>First Name</div>
                        <div>{personalDetails?.firstName}</div>
                    </div>
                    <div className='w-6/12'>
                        <div className='text-md font-semibold'>Last Name</div>
                        <div>{personalDetails?.lastName}</div>
                    </div>
                    <div className=' w-full '>
                        <div className='text-md font-semibold'>Full Name</div>
                        <div>{personalDetails?.fullName}</div>
                    </div>
                    <div className='w-6/12'>
                        <div className='text-md font-semibold'>Gender</div>
                        <div>{personalDetails?.gender}</div>
                    </div>
                    <div className='w-6/12'>
                        <div className='text-md font-semibold'>
                            Date of Birth
                        </div>
                        <div>{format(personalDetails?.dob, 'dd/MM/yyyy')}</div>
                    </div>
                    <div className='w-6/12'>
                        <div className='text-md font-semibold'>
                            Phone Number
                        </div>
                        <div>{personalDetails?.phoneNumber}</div>
                    </div>
                    <div className='w-6/12'>
                        <div className='text-md font-semibold'>Home Number</div>
                        <div>{personalDetails?.homeNumber}</div>
                    </div>
                </div>
                <Separator className='my-4' />
                <CardTitle className='w-full text-lg'>
                    Residential Address
                </CardTitle>
                <div className='flex h-full w-full flex-row flex-wrap items-start justify-between leading-6'>
                    <div className='w-full'>
                        <div>
                            {personalDetails?.residentialAddress?.addressLine1}
                        </div>
                    </div>
                    <div className='w-full'>
                        <div>
                            {personalDetails?.residentialAddress?.addressLine2}
                        </div>
                    </div>
                    <div className='w-full'>
                        <div>
                            {personalDetails?.residentialAddress?.city}
                            ,&nbsp;
                            {personalDetails?.residentialAddress?.postalCode}
                        </div>
                    </div>
                    <div className='w-full'>
                        <div>{personalDetails?.residentialAddress?.state}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PersonalDetailsCard
