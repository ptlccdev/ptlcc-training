import { getSessionData } from '@/actions'
import { Card } from '@/components/ui/card'
import GetUserTraining from '@/graphql/queries/GetUserTraining'
import { GetUserTrainingQuery } from '@/graphql/types'
import { getClient } from '@/lib/apolloClient'
import { SimpleType, simplify } from '@/lib/utils'
import React from 'react'
import TrainingTable from './_components/TrainingTable'
import { Trainings } from '@/types'
import { notFound } from 'next/navigation'

const fetchUserTraining = async (): Promise<
    SimpleType<GetUserTrainingQuery>
> => {
    const { data: session } = await getSessionData()
    const { data } = await getClient().query({
        query: GetUserTraining,
        variables: { usersPermissionsUserId: session?.user.id },
    })

    return simplify(data)
}

const TrainingPage = async () => {
    const { usersPermissionsUser } = await fetchUserTraining()

    if (!usersPermissionsUser) {
        notFound()
    }

    return (
        <div className='h-full p-8'>
            <h1 className='mb-1 text-2xl font-bold'>Training</h1>
            <div className='mb-10 flex flex-row items-center justify-start gap-3 text-sm font-medium text-slate-600'>
                <div>Dashboard</div>
                <div>•</div>
                <div>Trainings</div>
                <div>•</div>
                <div>List</div>
            </div>
            <div className='flex flex-row items-start justify-center gap-10'>
                <TrainingTable
                    trainingList={
                        usersPermissionsUser?.participant
                            ?.trainings as Trainings
                    }
                />
            </div>
        </div>
    )
}

export default TrainingPage
