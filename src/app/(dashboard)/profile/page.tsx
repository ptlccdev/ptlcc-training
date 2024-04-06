import { getSessionData } from '@/actions'
import { GetUserProfile } from '@/graphql/queries'
import { GetProfileQuery } from '@/graphql/types'
import { getClient } from '@/lib/apolloClient'
import { SimpleType, simplify } from '@/lib/utils'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import PersonalDetailsCard from './_components/PersonalDetailsCard'
import { JobInformations, PersonalDetails } from '@/types'
import JobInformationCard from './_components/JobInformationCard'

const fetchUserProfile = async () => {
    const { data: session } = await getSessionData()
    const { data, error } = await getClient().query({
        query: GetUserProfile,
        variables: { usersPermissionsUserId: session?.user.id || '' },
    })

    if (error) {
        throw new Error('Failed to fetch user profile')
    }

    return simplify(data)
}

const ProfilePage = async () => {
    const { usersPermissionsUser } = await fetchUserProfile()

    if (!usersPermissionsUser) {
        notFound()
    }

    return (
        <div className='h-full p-8'>
            <h1 className='mb-1 text-2xl font-bold'>Profile</h1>
            <div className='mb-10 flex flex-row items-center justify-start gap-3 text-sm font-medium text-slate-600'>
                <div>Dashboard</div>
                <div>•</div>
                <div>User</div>
                <div>•</div>
                <div>Profile</div>
            </div>
            <div className='flex h-full w-full flex-row flex-wrap items-start justify-between gap-6'>
                <PersonalDetailsCard
                    personalDetails={
                        usersPermissionsUser?.participant
                            ?.personalDetails as PersonalDetails
                    }
                />
                <JobInformationCard
                    jobInformation={
                        usersPermissionsUser?.participant
                            ?.jobInformation as JobInformations
                    }
                />
            </div>
        </div>
    )
}

export default ProfilePage
