import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, InfoCircledIcon } from '@radix-ui/react-icons'
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { ErrorFieldMessage } from '@/components/ui/errorFieldMessage'
import { UserIcon, AddressBookIcon } from '@/components/icons'
import {
    BASIC_INFO_FIELDS,
    RESIDENTIAL_ADDRESS_FIELDS,
    SIGN_UP_ACCORDIANS,
} from '@/lib/constants'

import { useRegistrationFormStore } from '../../_store/RegistrationFromStore'
import {
    PersonalInfoBasicFormSchema,
    PersonalInfoBasicFormSchemaType,
} from '../../_schema'
import {
    Enum_Componentcommonaddress_State,
    Enum_Componentparticipantpersonaldetails_Gender,
} from '@/graphql/types'

interface PersonalInfoFormProps {
    formId: string
    nextStep: () => void
}

const PersonalInfoForm = ({ formId, nextStep }: PersonalInfoFormProps) => {
    const [accordianValues, setAccordianValues] = useState<SIGN_UP_ACCORDIANS>(
        SIGN_UP_ACCORDIANS.BASIC_INFO
    )
    const {
        personalInfo: {
            firstName,
            lastName,
            fullName,
            gender,
            dob,
            phoneNumber,
            homeNumber,
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
    } = useForm<PersonalInfoBasicFormSchemaType>({
        mode: 'all',
        resolver: zodResolver(PersonalInfoBasicFormSchema),
        defaultValues: {
            firstName,
            lastName,
            fullName,
            phoneNumber,
            homeNumber,
            addressLine1,
            addressLine2,
            postalCode,
            city,
        },
    })

    // =============================================================================================
    //                                       HELPERS
    // =============================================================================================

    const currentDob = getValues(BASIC_INFO_FIELDS.DOB) || dob
    const currentGender = getValues(BASIC_INFO_FIELDS.GENDER) || gender
    const currentState = getValues(RESIDENTIAL_ADDRESS_FIELDS.STATE) || state
    const formIsInvalid = Object.keys(errors).length > 0
    const basicInfoFieldsIsInvalid = Object.values(BASIC_INFO_FIELDS).some(
        field => Object.keys(errors).includes(field)
    )
    const residentialAddressFieldsIsInvalid = Object.values(
        RESIDENTIAL_ADDRESS_FIELDS
    ).some(field => Object.keys(errors).includes(field))
    const basicInfoIsOpen = accordianValues.includes(
        SIGN_UP_ACCORDIANS.BASIC_INFO
    )
    const residentialAddressIsOpen = accordianValues.includes(
        SIGN_UP_ACCORDIANS.RESIDENTIAL_ADDRESS
    )

    // =============================================================================================
    //                                       EFFECTS
    // =============================================================================================

    // manually set the default values cause can't register them fields
    useEffect(() => {
        if (gender) {
            setValue(BASIC_INFO_FIELDS.GENDER, gender, { shouldValidate: true })
        }
        if (dob) {
            setValue(BASIC_INFO_FIELDS.DOB, new Date(dob), {
                shouldValidate: true,
            })
        }

        if (state) {
            setValue(RESIDENTIAL_ADDRESS_FIELDS.STATE, state, {
                shouldValidate: true,
            })
        }
    }, [dob, gender, setValue, state])

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

    const onSelectGender = (val: string) => {
        setValue(BASIC_INFO_FIELDS.GENDER, val, { shouldValidate: true })
    }
    const onSelectState = (val: string) => {
        setValue(RESIDENTIAL_ADDRESS_FIELDS.STATE, val, {
            shouldValidate: true,
        })
    }

    const onSetDob = (value: Date | undefined) => {
        if (value) {
            setValue(BASIC_INFO_FIELDS.DOB, value, { shouldValidate: true })
        }
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
                <AccordionItem value={SIGN_UP_ACCORDIANS.BASIC_INFO}>
                    <AccordionTrigger>
                        <h3 className='text-md col-span-3 flex flex-row items-center justify-between whitespace-nowrap px-4 font-medium'>
                            <UserIcon
                                className={`h-6 w-6 ${basicInfoIsOpen && 'text-secondaryColor'}`}
                            />
                            <span className='px-2 '>Basic Info</span>
                        </h3>
                        <Badge
                            hidden={
                                (!basicInfoFieldsIsInvalid &&
                                    !basicInfoIsOpen) ||
                                basicInfoIsOpen
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
                            <div className='col-span-6 flex flex-col space-y-1.5 md:col-span-3'>
                                <Label
                                    htmlFor={BASIC_INFO_FIELDS.FIRST_NAME}
                                    required
                                >
                                    First Name
                                </Label>
                                <Input
                                    id={BASIC_INFO_FIELDS.FIRST_NAME}
                                    placeholder='Enter your first name'
                                    error={!!errors.firstName}
                                    {...register(BASIC_INFO_FIELDS.FIRST_NAME)}
                                />
                                <ErrorFieldMessage
                                    message={errors.firstName?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5 md:col-span-3'>
                                <Label
                                    htmlFor={BASIC_INFO_FIELDS.LAST_NAME}
                                    required
                                >
                                    Last Name
                                </Label>
                                <Input
                                    id={BASIC_INFO_FIELDS.LAST_NAME}
                                    placeholder='Enter your last name'
                                    error={!!errors.lastName}
                                    {...register(BASIC_INFO_FIELDS.LAST_NAME)}
                                />
                                <ErrorFieldMessage
                                    message={errors.lastName?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5'>
                                <Label htmlFor={BASIC_INFO_FIELDS.FULL_NAME}>
                                    Full Name
                                </Label>
                                <Input
                                    id={BASIC_INFO_FIELDS.FULL_NAME}
                                    placeholder='Enter your full name'
                                    error={!!errors.fullName}
                                    {...register(BASIC_INFO_FIELDS.FULL_NAME)}
                                />
                                <ErrorFieldMessage
                                    message={errors.fullName?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5 md:col-span-3'>
                                <Label
                                    htmlFor={BASIC_INFO_FIELDS.GENDER}
                                    required
                                >
                                    Gender
                                </Label>
                                <Select
                                    onValueChange={onSelectGender}
                                    defaultValue={currentGender}
                                >
                                    <SelectTrigger
                                        id={BASIC_INFO_FIELDS.GENDER}
                                        error={!!errors.gender}
                                    >
                                        <SelectValue placeholder='Select your gender' />
                                    </SelectTrigger>
                                    <SelectContent position='popper'>
                                        {Object.values(
                                            Enum_Componentparticipantpersonaldetails_Gender
                                        ).map(gender => (
                                            <SelectItem
                                                value={gender}
                                                key={nanoid()}
                                            >
                                                {gender}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <ErrorFieldMessage
                                    message={errors.gender?.message}
                                />
                            </div>
                            <div className='col-span-6 flex  flex-col space-y-1.5 md:col-span-3'>
                                <Label htmlFor={BASIC_INFO_FIELDS.DOB} required>
                                    Date of Birth
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !getValues(
                                                    BASIC_INFO_FIELDS.DOB
                                                ) && 'text-muted-foreground',
                                                !!errors.dob &&
                                                    'border border-red-500 focus-visible:ring-red-300'
                                            )}
                                        >
                                            <CalendarIcon className='mr-2 h-4 w-4' />
                                            {currentDob ? (
                                                format(currentDob, 'dd/MM/yyyy')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className='w-auto p-0'
                                        align='start'
                                    >
                                        <Calendar
                                            id={BASIC_INFO_FIELDS.DOB}
                                            mode='single'
                                            captionLayout='dropdown'
                                            selected={currentDob}
                                            onSelect={onSetDob}
                                            disabled={date =>
                                                date > new Date() ||
                                                date < new Date('1900-01-01')
                                            }
                                            fromYear={1960}
                                            toYear={2030}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <ErrorFieldMessage
                                    message={errors.dob?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5 md:col-span-3'>
                                <Label
                                    htmlFor={BASIC_INFO_FIELDS.PHONE_NUMBER}
                                    required
                                >
                                    Phone Number
                                </Label>
                                <Input
                                    id={BASIC_INFO_FIELDS.PHONE_NUMBER}
                                    placeholder='Enter your cell phone number'
                                    error={!!errors.phoneNumber}
                                    {...register(
                                        BASIC_INFO_FIELDS.PHONE_NUMBER
                                    )}
                                />
                                <ErrorFieldMessage
                                    message={errors.phoneNumber?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5 md:col-span-3'>
                                <Label htmlFor={BASIC_INFO_FIELDS.HOME_NUMBER}>
                                    Home Number
                                </Label>
                                <Input
                                    id={BASIC_INFO_FIELDS.HOME_NUMBER}
                                    placeholder='Enter your home phone number'
                                    error={!!errors.homeNumber}
                                    {...register(BASIC_INFO_FIELDS.HOME_NUMBER)}
                                />
                                <ErrorFieldMessage
                                    message={errors.homeNumber?.message}
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value={SIGN_UP_ACCORDIANS.RESIDENTIAL_ADDRESS}>
                    <AccordionTrigger>
                        <h3 className='text-md col-span-6 flex flex-row items-center px-4 font-medium md:col-span-3'>
                            <AddressBookIcon
                                className={`h-6 w-6 ${residentialAddressIsOpen && 'text-secondaryColor'}`}
                            />
                            <span className='px-2'>Residential Address</span>
                        </h3>
                        <Badge
                            hidden={
                                (!residentialAddressFieldsIsInvalid &&
                                    !residentialAddressIsOpen) ||
                                residentialAddressIsOpen
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
                                    htmlFor={
                                        RESIDENTIAL_ADDRESS_FIELDS.ADDRESS_LINE_1
                                    }
                                    required
                                >
                                    Address Line 1
                                </Label>
                                <Input
                                    id={
                                        RESIDENTIAL_ADDRESS_FIELDS.ADDRESS_LINE_1
                                    }
                                    placeholder='Enter your street address'
                                    error={!!errors.addressLine1}
                                    {...register(
                                        RESIDENTIAL_ADDRESS_FIELDS.ADDRESS_LINE_1
                                    )}
                                />
                                <ErrorFieldMessage
                                    message={errors.addressLine1?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5'>
                                <Label
                                    htmlFor={
                                        RESIDENTIAL_ADDRESS_FIELDS.ADDRESS_LINE_2
                                    }
                                >
                                    Address Line 2
                                </Label>
                                <Input
                                    id={
                                        RESIDENTIAL_ADDRESS_FIELDS.ADDRESS_LINE_2
                                    }
                                    placeholder='Apartment, suite, unit, building, floor, etc.'
                                    error={!!errors.addressLine2}
                                    {...register(
                                        RESIDENTIAL_ADDRESS_FIELDS.ADDRESS_LINE_2
                                    )}
                                />
                                <ErrorFieldMessage
                                    message={errors.addressLine2?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5 md:col-span-3'>
                                <Label
                                    htmlFor={
                                        RESIDENTIAL_ADDRESS_FIELDS.POSTAL_CODE
                                    }
                                    required
                                >
                                    Postal Code
                                </Label>
                                <Input
                                    id={RESIDENTIAL_ADDRESS_FIELDS.POSTAL_CODE}
                                    placeholder='Enter your postal code'
                                    error={!!errors.postalCode}
                                    {...register(
                                        RESIDENTIAL_ADDRESS_FIELDS.POSTAL_CODE
                                    )}
                                />
                                <ErrorFieldMessage
                                    message={errors.postalCode?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5 md:col-span-3'>
                                <Label
                                    htmlFor={RESIDENTIAL_ADDRESS_FIELDS.CITY}
                                    required
                                >
                                    City
                                </Label>
                                <Input
                                    id={RESIDENTIAL_ADDRESS_FIELDS.CITY}
                                    placeholder='Enter your city'
                                    error={!!errors.city}
                                    {...register(
                                        RESIDENTIAL_ADDRESS_FIELDS.CITY
                                    )}
                                />
                                <ErrorFieldMessage
                                    message={errors.city?.message}
                                />
                            </div>
                            <div className='col-span-6 flex flex-col space-y-1.5'>
                                <Label
                                    htmlFor={RESIDENTIAL_ADDRESS_FIELDS.STATE}
                                    required
                                >
                                    State
                                </Label>
                                <Select
                                    onValueChange={onSelectState}
                                    defaultValue={currentState}
                                >
                                    <SelectTrigger
                                        id={RESIDENTIAL_ADDRESS_FIELDS.STATE}
                                        error={!!errors.state}
                                    >
                                        <SelectValue placeholder='Select your state' />
                                    </SelectTrigger>
                                    <SelectContent position='popper'>
                                        {Object.values(
                                            Enum_Componentcommonaddress_State
                                        ).map(state => (
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

export default PersonalInfoForm
