import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { ErrorFieldMessage } from '@/components/ui/errorFieldMessage'
import { WorkIcon, BuildingIcon } from '@/components/icons'
import {
    STATE,
    EMPLOYMENT_INFO_FIELDS,
    WORK_ADDRESS_FIELDS,
    SIGN_UP_ACCORDIANS,
} from '@/lib/constants'

import { useRegistrationFormStore } from '../../_store/RegistrationFromStore'
import { JobInfoFormSchema, JobInfoFormSchemaType } from '../../_schema'

interface JobInfoFormProps {
    formId: string
    nextStep: () => void
}

const JobInfoForm = ({ formId, nextStep }: JobInfoFormProps) => {
    const [accordianValues, setAccordianValues] = useState<SIGN_UP_ACCORDIANS>(
        SIGN_UP_ACCORDIANS.EMPLOYMENT_INFO
    )
    const {
        jobInfo: {
            company,
            titlePosition,
            workEmail,
            workNumber,
            addressLine1,
            addressLine2,
            postalCode,
            city,
            state,
        },
        setFormIsValid,
        updateFormData,
        setActiveFormRef,
    } = useRegistrationFormStore()
    const formRef = useRef<HTMLFormElement>(null)

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        trigger,
        formState: { errors, isValid },
    } = useForm<JobInfoFormSchemaType>({
        mode: 'all',
        resolver: zodResolver(JobInfoFormSchema),
        defaultValues: {
            company,
            titlePosition,
            workEmail,
            workNumber,
            addressLine1,
            addressLine2,
            postalCode,
            city,
        },
    })

    // =============================================================================================
    //                                       HELPERS
    // =============================================================================================

    const currentState = getValues(WORK_ADDRESS_FIELDS.STATE) || state
    const formIsInvalid = Object.keys(errors).length > 0
    const employmentInfoFieldsIsInvalid = Object.values(
        EMPLOYMENT_INFO_FIELDS
    ).some(field => Object.keys(errors).includes(field))
    const workAddressFieldsIsInvalid = Object.values(WORK_ADDRESS_FIELDS).some(
        field => Object.keys(errors).includes(field)
    )
    const employmentInfoIsOpen = accordianValues.includes(
        SIGN_UP_ACCORDIANS.EMPLOYMENT_INFO
    )
    const workAddressIsOpen = accordianValues.includes(
        SIGN_UP_ACCORDIANS.WORK_ADDRESS
    )

    // =============================================================================================
    //                                       EFFECTS
    // =============================================================================================

    // manually set the default values cause can't register them fields
    useEffect(() => {
        if (state) {
            setValue(WORK_ADDRESS_FIELDS.STATE, state, {
                shouldValidate: true,
            })
        }
    }, [setValue, state])

    useEffect(() => {
        if (formRef.current) {
            formRef.current.trigger = trigger
            formRef.current.getValues = getValues
            formRef.current.isValid = isValid
            setActiveFormRef(
                formId,
                formRef as MutableRefObject<HTMLFormElement>
            )
        }
    }, [formId, getValues, isValid, setActiveFormRef, trigger])

    useEffect(() => {
        setFormIsValid(!formIsInvalid)
    }, [formIsInvalid, setFormIsValid])

    // ==============================================================================================
    //                                        HANDLERS
    // ==============================================================================================

    const onContinue = (data: any) => {
        console.log('All fields validated!', data)
        updateFormData(formId, data)
        nextStep()
    }

    const onSelectState = (val: string) => {
        setValue(WORK_ADDRESS_FIELDS.STATE, val, { shouldValidate: true })
    }

    const onAccordianChange = (value: string) => {
        setAccordianValues(value as SIGN_UP_ACCORDIANS)
    }

    // =============================================================================================
    //                                       RENDER
    // =============================================================================================

    return (
        <form id={formId} onSubmit={handleSubmit(onContinue)} ref={formRef}>
            <Accordion
                type='single'
                className='w-full'
                value={accordianValues}
                onValueChange={onAccordianChange}
            >
                <AccordionItem value={SIGN_UP_ACCORDIANS.EMPLOYMENT_INFO}>
                    <AccordionTrigger>
                        <h3 className='text-md col-span-6 flex flex-row items-center px-4 font-medium md:col-span-3'>
                            <WorkIcon />
                            <span className='px-2'>Employment Info</span>
                        </h3>
                        <Badge
                            hidden={
                                (!employmentInfoFieldsIsInvalid &&
                                    !employmentInfoIsOpen) ||
                                employmentInfoIsOpen
                            }
                            variant={'destructive'}
                            className='ml-auto mr-4'
                        >
                            <InfoCircledIcon />
                            &nbsp; Error
                        </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='grid w-full grid-cols-6 items-start gap-4 px-4 py-4'>
                            <div className='col-span-6 flex flex-col space-y-1.5'>
                                <Label
                                    htmlFor={EMPLOYMENT_INFO_FIELDS.COMPANY}
                                    required
                                >
                                    Company
                                </Label>
                                <Input
                                    id={EMPLOYMENT_INFO_FIELDS.COMPANY}
                                    placeholder='Enter your company name'
                                    error={!!errors.company}
                                    {...register(
                                        EMPLOYMENT_INFO_FIELDS.COMPANY
                                    )}
                                />
                                <ErrorFieldMessage
                                    message={errors.company?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5'>
                                <Label
                                    htmlFor={
                                        EMPLOYMENT_INFO_FIELDS.TITLE_POSITION
                                    }
                                    required
                                >
                                    Title/Position
                                </Label>
                                <Input
                                    id={EMPLOYMENT_INFO_FIELDS.TITLE_POSITION}
                                    placeholder='Enter your position title'
                                    error={!!errors.titlePosition}
                                    {...register(
                                        EMPLOYMENT_INFO_FIELDS.TITLE_POSITION
                                    )}
                                />
                                <ErrorFieldMessage
                                    message={errors.titlePosition?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5 md:col-span-3'>
                                <Label
                                    htmlFor={EMPLOYMENT_INFO_FIELDS.WORK_EMAIL}
                                    required
                                >
                                    Work Email
                                </Label>
                                <Input
                                    id={EMPLOYMENT_INFO_FIELDS.WORK_EMAIL}
                                    placeholder='Enter your work email address'
                                    error={!!errors.workEmail}
                                    {...register(
                                        EMPLOYMENT_INFO_FIELDS.WORK_EMAIL
                                    )}
                                />
                                <ErrorFieldMessage
                                    message={errors.workEmail?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5 md:col-span-3'>
                                <Label
                                    htmlFor={EMPLOYMENT_INFO_FIELDS.WORK_NUMBER}
                                >
                                    Work Phone Number
                                </Label>
                                <Input
                                    id={EMPLOYMENT_INFO_FIELDS.WORK_NUMBER}
                                    placeholder='Enter your work phone number'
                                    error={!!errors.workNumber}
                                    {...register(
                                        EMPLOYMENT_INFO_FIELDS.WORK_NUMBER
                                    )}
                                />
                                <ErrorFieldMessage
                                    message={errors.workNumber?.message}
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value={SIGN_UP_ACCORDIANS.WORK_ADDRESS}>
                    <AccordionTrigger>
                        <h3 className='text-md col-span-6 flex flex-row items-center px-4 font-medium md:col-span-3'>
                            <BuildingIcon />
                            <span className='px-2'>Work Address</span>
                        </h3>
                        <Badge
                            hidden={
                                (!workAddressFieldsIsInvalid &&
                                    !workAddressIsOpen) ||
                                workAddressIsOpen
                            }
                            variant={'destructive'}
                            className='ml-auto mr-4'
                        >
                            <InfoCircledIcon />
                            &nbsp; Error
                        </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='grid w-full grid-cols-6 items-center gap-4 px-4 py-4'>
                            <div className='col-span-6 flex flex-col space-y-1.5'>
                                <Label
                                    htmlFor={WORK_ADDRESS_FIELDS.ADDRESS_LINE_1}
                                    required
                                >
                                    Address Line 1
                                </Label>
                                <Input
                                    id={WORK_ADDRESS_FIELDS.ADDRESS_LINE_1}
                                    placeholder='Enter your street address'
                                    error={!!errors.addressLine1}
                                    {...register(
                                        WORK_ADDRESS_FIELDS.ADDRESS_LINE_1
                                    )}
                                />
                                <ErrorFieldMessage
                                    message={errors.addressLine1?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5'>
                                <Label
                                    htmlFor={WORK_ADDRESS_FIELDS.ADDRESS_LINE_2}
                                >
                                    Address Line 2
                                </Label>
                                <Input
                                    id={WORK_ADDRESS_FIELDS.ADDRESS_LINE_2}
                                    placeholder='Apartment, suite, unit, building, floor, etc.'
                                    error={!!errors.addressLine2}
                                    {...register(
                                        WORK_ADDRESS_FIELDS.ADDRESS_LINE_2
                                    )}
                                />
                                <ErrorFieldMessage
                                    message={errors.addressLine2?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5 md:col-span-3'>
                                <Label
                                    htmlFor={WORK_ADDRESS_FIELDS.POSTAL_CODE}
                                    required
                                >
                                    Postal Code
                                </Label>
                                <Input
                                    id={WORK_ADDRESS_FIELDS.POSTAL_CODE}
                                    placeholder='Enter your postal code'
                                    error={!!errors.postalCode}
                                    {...register(
                                        WORK_ADDRESS_FIELDS.POSTAL_CODE
                                    )}
                                />
                                <ErrorFieldMessage
                                    message={errors.postalCode?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5 md:col-span-3'>
                                <Label
                                    htmlFor={WORK_ADDRESS_FIELDS.CITY}
                                    required
                                >
                                    City
                                </Label>
                                <Input
                                    id={WORK_ADDRESS_FIELDS.CITY}
                                    placeholder='Enter your city'
                                    error={!!errors.city}
                                    {...register(WORK_ADDRESS_FIELDS.CITY)}
                                />
                                <ErrorFieldMessage
                                    message={errors.city?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5'>
                                <Label
                                    htmlFor={WORK_ADDRESS_FIELDS.STATE}
                                    required
                                >
                                    State
                                </Label>
                                <Select
                                    onValueChange={onSelectState}
                                    defaultValue={currentState}
                                >
                                    <SelectTrigger
                                        id={WORK_ADDRESS_FIELDS.STATE}
                                        error={!!errors.state}
                                    >
                                        <SelectValue placeholder='Select your state' />
                                    </SelectTrigger>
                                    <SelectContent position='popper'>
                                        {Object.values(STATE).map(state => (
                                            <SelectItem
                                                value={state}
                                                key={nanoid()}
                                            >
                                                {state}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <ErrorFieldMessage
                                    message={errors.state?.message}
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </form>
    )
}

export default JobInfoForm
