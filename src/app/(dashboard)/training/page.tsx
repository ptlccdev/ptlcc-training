import { getSessionData } from '@/actions'
import { Card } from '@/components/ui/card'
import GetUserTraining from '@/graphql/queries/GetUserTraining'
import { GetUserTrainingQuery } from '@/graphql/types'
import { getClient } from '@/lib/apolloClient'
import { SimpleType, simplify } from '@/lib/utils'
import React from 'react'
import TrainingTable from './_components/TrainingTable'
import { Trainings } from '@/types'

const fetchUserTraining = async (): Promise<
    SimpleType<GetUserTrainingQuery>
> => {
    const session = await getSessionData()
    const { data } = await getClient().query({
        query: GetUserTraining,
        variables: { usersPermissionsUserId: session.user.id },
    })
    return simplify(data)!
}

const TrainingPage = async () => {
    const { usersPermissionsUser } = await fetchUserTraining()

    return (
        <div className='h-full'>
            <h1 className='mb-4 text-3xl font-bold'>Trainings</h1>
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
