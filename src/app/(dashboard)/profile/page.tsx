import { getSessionData } from '@/actions'
import { GetUserProfile } from '@/graphql/queries'
import { GetProfileQuery } from '@/graphql/types'
import { getClient } from '@/lib/apolloClient'
import { SimpleType, simplify } from '@/lib/utils'
import React from 'react'
import PersonalDetailsCard from './_components/PersonalDetailsCard'
import { JobInformations, PersonalDetails } from '@/types'
import JobInformationCard from './_components/JobInformationCard'

const fetchUserProfile = async (): Promise<SimpleType<GetProfileQuery>> => {
    const session = await getSessionData()
    const { data } = await getClient().query({
        query: GetUserProfile,
        variables: { usersPermissionsUserId: session?.user.id },
    })
    return simplify(data)
}

const ProfilePage = async () => {
    const { usersPermissionsUser } = await fetchUserProfile()

    return (
        <div className='h-full'>
            <h1 className='mb-4 text-3xl font-bold'>Profile</h1>
            <div className=''></div>
            <div className='flex flex-row items-start justify-center gap-10'>
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
