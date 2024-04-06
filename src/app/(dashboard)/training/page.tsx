import { getSessionData } from '@/actions'
import { Card } from '@/components/ui/card'
import GetUserTraining from '@/graphql/queries/GetUserTraining'
import { GetUserTrainingQuery } from '@/graphql/types'
import { getClient } from '@/lib/apolloClient'
import { SimpleType, simplify } from '@/lib/utils'
import React from 'react'
import TrainingTable from './_components/TrainingTable'
import { SimplifiedTrainings, Trainings } from '@/types'
import { notFound } from 'next/navigation'

const fetchUserTraining = async (): Promise<Trainings> => {
    const { data: session } = await getSessionData()

    const { data } = await getClient().query({
        query: GetUserTraining,
        variables: {
            filters: {
                Sessions: {
                    Participants: {
                        participant: {
                            auth: {
                                id: {
                                    eq: session?.user.id || '',
                                },
                            },
                        },
                    },
                },
            },
            participantsFilters2: {
                participant: {
                    auth: {
                        id: {
                            eq: session?.user.id || '',
                        },
                    },
                },
            },
            pagination: {
                limit: 200,
            },
        },
        // variables: { usersPermissionsUserId: session?.user.id || '' },
    })

    const simplifiedData = simplify(data)

    const trainings: Trainings = []
    simplifiedData?.trainings?.forEach(training => {
        training?.Sessions?.forEach(session => {
            trainings.push({
                code: training.code,
                name: training.name,
                type: training.type,
                trainingDate: session?.date,
                certificate: {
                    issuedDate: session?.certificateInfo?.issuedDate,
                    validityPeriod:
                        session?.certificateInfo?.validityPeriod || 0,
                    url:
                        (session?.Participants &&
                            session?.Participants[0]?.Certificate?.url) ||
                        '',
                    name:
                        (session?.Participants &&
                            session?.Participants[0]?.Certificate?.name) ||
                        '',
                },
            })
        })
    }) || []
    return trainings
}

const TrainingPage = async () => {
    const data = await fetchUserTraining()

    if (!data) {
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
                    trainingList={data}
                    // trainingList={
                    //     usersPermissionsUser?.participant
                    //         ?.trainings as Trainings
                    // }
                />
            </div>
        </div>
    )
}

export default TrainingPage
