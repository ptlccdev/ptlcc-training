import React from 'react'
import { Button } from '@/components/ui/button'
import { StepperState } from 'headless-stepper'
import { EnterIcon } from '@radix-ui/react-icons'
import { SIGNUP_STEPS } from '@/lib/constants'

const StepperButtonNav = ({
    state,
    formIsInvalid,
    activeFormId,
    prevStep,
}: {
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
                    Create account <EnterIcon className='ml-2 h-4 w-4' />
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
