import { classNames } from '@/util/cssUtils'
import { HTMLProps, useId } from 'react'

interface Props extends HTMLProps<HTMLInputElement> {
  text?: string
  disabled?: boolean
  loading?: boolean
}

const RadioInput = ({ text, disabled = false, loading = false, ...rest }: Props) => {
  classNames(disabled || loading ? 'cursor-auto' : 'cursor-pointer', 'relative flex items-center rounded-full')
  return (
    <label className={classNames(disabled || loading ? 'cursor-auto' : 'cursor-pointer', 'relative flex items-center justify-center gap-x-1 rounded-full')} htmlFor={rest.id}>
      <input
        id={rest.id}
        name={rest.id}
        type={'radio'}
        className={classNames(
          'peer/radio-inp relative h-4 w-4  appearance-none rounded-full border-[5px] border-[#E7E8EE] transition-all',
          'checked:border-primarySoft hover:border-[#d6d6d6] checked:hover:border-primarySoft',
        )}
        disabled={disabled}
        {...rest}
      />
      <span className="text-body text-typo-300 peer-checked/radio-inp:text-typo-500 "> {text}</span>
    </label>
  )
}

export default RadioInput
