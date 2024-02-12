import React from 'react'
import { EnterIcon } from '@radix-ui/react-icons'
import { StepperState } from 'headless-stepper'

import { Button } from '@/components/ui/button'
import { SIGNUP_STEPS } from '@/constants'
import LoadingSpinner from '@/components/svgs/LoadingSpinner'

const StepperButtonNav = ({
    isSubmitting,
    state,
    formIsInvalid,
    activeFormId,
    prevStep,
}: {
    isSubmitting: boolean
    state: StepperState
    formIsInvalid: boolean
    activeFormId: string
    prevStep: () => void
}) => {
    return (
        <div className='flex w-full flex-row justify-between'>
            <Button
                variant='outline'
                onClick={prevStep}
                disabled={!state.hasPreviousStep}
            >
                Back
            </Button>
            {state.currentStep === SIGNUP_STEPS.length - 1 ? (
                <Button
                    type='submit'
                    disabled={formIsInvalid}
                    form={activeFormId}
                >
                    Create account{' '}
                    {isSubmitting ? (
                        <LoadingSpinner className='ml-auto h-5 w-5' />
                    ) : (
                        <EnterIcon className='ml-2 h-5 w-5' />
                    )}
                </Button>
            ) : (
                <Button
                    type='submit'
                    disabled={formIsInvalid}
                    form={activeFormId}
                >
                    Continue
                </Button>
            )}
        </div>
    )
}

export default StepperButtonNav
