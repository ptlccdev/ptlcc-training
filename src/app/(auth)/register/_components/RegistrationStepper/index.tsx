'use client'
import { useEffect, useMemo } from 'react'
import { useStepper } from 'headless-stepper'
import { nanoid } from 'nanoid'

import { FORM_ID, SIGNUP_STEPS } from '@/constants'
import { useToast } from '@/hooks/useToast'
import { SIGNUP_FORM_ERROR_TOAST } from '@/constants'

import { AccountForm, JobInfoForm, PersonalInfoForm } from '../Forms'
import Steppper from './Stepper'
import StepperButtonNav from './StepperButtonNav'
import { useRegistrationFormStore } from '../../_store/RegistrationFromStore'

const RegistrationStepper = () => {
    const {
        isSubmitting,
        activeForm: { isValid },
        reset,
    } = useRegistrationFormStore()
    const { toast } = useToast()
    const { state, stepsProps, stepperProps, nextStep, prevStep, setStep } =
        useStepper({
            steps: SIGNUP_STEPS,
        })

    const [activeForm, activeFormId] = useMemo(() => {
        const activeForms = [
            {
                id: FORM_ID.PersonalInfoForm,
                component: (
                    <PersonalInfoForm
                        key={nanoid()}
                        nextStep={nextStep}
                        formId={FORM_ID.PersonalInfoForm}
                    />
                ),
            },
            {
                id: FORM_ID.JobInfoForm,
                component: (
                    <JobInfoForm
                        key={nanoid()}
                        nextStep={nextStep}
                        formId={FORM_ID.JobInfoForm}
                    />
                ),
            },
            {
                id: FORM_ID.AccountForm,
                component: (
                    <AccountForm key={nanoid()} formId={FORM_ID.AccountForm} />
                ),
            },
        ]

        return [
            activeForms[state.currentStep].component,
            activeForms[state.currentStep].id,
        ]
    }, [nextStep, state.currentStep])

    // =============================================================================================
    //                                     EFFECTS
    // =============================================================================================

    useEffect(() => {
        if (!isValid) {
            toast(SIGNUP_FORM_ERROR_TOAST)
        }
    }, [isValid, toast])

    useEffect(() => {
        return () => {
            reset()
        }
    }, [reset])

    // =============================================================================================
    //                                     RENDERS
    // =============================================================================================

    return (
        <div className='flex h-full w-10/12 flex-col items-center justify-start md:justify-between'>
            <Steppper
                state={state}
                stepsProps={stepsProps}
                stepperProps={stepperProps}
                setStep={setStep}
            />
            <div className='my-6 w-full md:h-full'>{activeForm}</div>
            <StepperButtonNav
                isSubmitting={isSubmitting}
                state={state}
                formIsInvalid={!isValid}
                activeFormId={activeFormId}
                prevStep={prevStep}
            />
        </div>
    )
}

export default RegistrationStepper
