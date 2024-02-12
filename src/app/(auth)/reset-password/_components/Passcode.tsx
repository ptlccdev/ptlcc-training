import { usePasscode } from 'react-headless-passcode'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const Passcode = ({ inputClassName }: { inputClassName?: string }) => {
    const { passcode, getEventHandlers, refs, isComplete } = usePasscode({
        count: 6,
        isAlphaNumeric: true,
    })

    return (
        <>
            {passcode.map((value, index) => {
                const { ...rest } = getEventHandlers(index)

                return (
                    <Input
                        className={cn('single-input', inputClassName)}
                        ref={el => el && (refs.current[index] = el)}
                        type='text'
                        inputMode='numeric'
                        autoComplete='one-time-code'
                        maxLength={1}
                        pattern='\d{1}'
                        value={String(value)}
                        key={`index-${index}`}
                        {...rest}
                    />
                )
            })}
        </>
    )
}

export default Passcode
