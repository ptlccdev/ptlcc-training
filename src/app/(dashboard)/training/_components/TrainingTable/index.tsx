'use client'
import { Trainings } from '@/types'
import React from 'react'
import DataTable from './DataTable'
import { columns } from './Column'

interface TrainingTableProps {
    trainingList: Trainings
}

const TrainingTable = ({ trainingList }: TrainingTableProps) => {
    console.log('trainingList', trainingList)
    return (
        <div className='w-full'>
            <DataTable columns={columns} data={trainingList} />
        </div>
    )
}

export default TrainingTable
