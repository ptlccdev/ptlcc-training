import React, { HTMLAttributes } from 'react'
import { StepperState } from 'headless-stepper'
import { useWindowSize } from '@/hooks'
import { SIGNUP_STEPS } from '@/lib/constants'
import { useToast } from '@/hooks/useToast'
import { SIGNUP_FORM_ERROR_TOAST } from '@/lib/constants'
import { useRegistrationFormStore } from '../../_store/RegistrationFromStore'

const Stepper = ({
    state,
    stepsProps,
    stepperProps,
    setStep,
}: {
    state: StepperState
    stepsProps: HTMLAttributes<HTMLElement>[]
    stepperProps: HTMLAttributes<HTMLElement>
    setStep: (step: number) => void
}) => {
    const { toast } = useToast()
    const { size } = useWindowSize()
    const {
        activeForm: { id, ref: activeFormRef },
        updateFormData,
    } = useRegistrationFormStore()

    const DEV = true

    const onJumpStep = (index: number) => {
        // won't allow user to skip steps forward
        if (index > state.currentStep + 1) {
            return
        }

        // if (index < state.currentStep) {
        if (DEV || index < state.currentStep) {
            setStep(index)
            return
        }

        activeFormRef?.current.trigger() // trigger validation
        if (activeFormRef?.current.isValid) {
            updateFormData(id, activeFormRef?.current.getValues())
            setStep(index)
        } else {
            toast(SIGNUP_FORM_ERROR_TOAST)
        }
    }

    return (
        <nav
            className='mt-8 flex w-full flex-col items-center justify-between gap-3 md:flex-row md:gap-0'
            {...stepperProps}
        >
            {stepsProps?.map((step, index) => {
                let stepperStyle = {
                    labelStyle: 'font-medium text-primaryColor',
                    iconStyle: 'bg-primaryColor text-white font-medium',
                    lineStyle:
                        index > state.currentStep
                            ? 'after:border-gray-300'
                            : '',
                }

                if (index === state.currentStep) {
                    stepperStyle.lineStyle = 'after:border-gray-300'
                } else if (index < state.currentStep) {
                    stepperStyle.lineStyle = 'after:border-primaryColor'
                } else {
                    stepperStyle.labelStyle = 'font-normal text-gray-400'
                    stepperStyle.iconStyle =
                        'font-normal border-2 border-solid border-gray-200 bg-white text-gray-400'
                }

                const overridedStepAttrs = {
                    onClick: () => onJumpStep(index),
                    onKeyDown: () => onJumpStep(index),
                }
                return (
                    <div
                        key={index}
                        className={`flex items-center text-sm font-medium sm:text-center lg:text-base ${(index !== SIGNUP_STEPS.length - 1 || size === 'xs' || size === 'sm') && 'w-full'}`}
                        {...step}
                        {...overridedStepAttrs}
                    >
                        <div
                            className={`mr-2 flex h-7 w-7 shrink-0 grow-0 cursor-pointer items-center justify-center rounded-full ease-in-out ${stepperStyle.iconStyle}`}
                        >
                            {index + 1}
                        </div>
                        <div
                            className={`cursor-pointer whitespace-nowrap ${stepperStyle.labelStyle}`}
                        >
                            {SIGNUP_STEPS[index].label}
                        </div>
                        {index !== SIGNUP_STEPS.length - 1 && (
                            <div
                                className={`after:border-5 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b dark:text-blue-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 ${stepperStyle.lineStyle}`}
                            >
                                <span className='flex items-center after:mx-2 dark:after:text-gray-500 sm:after:hidden'></span>
                            </div>
                        )}
                    </div>
                )
            })}
        </nav>
    )
}

export default Stepper
