import { HTMLProps, useEffect, useId, useRef } from 'react'
import { classNames } from '@/util/cssUtils'

interface Props extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean
  text?: string
  disabled?: boolean
  loading?: boolean
  textStyle?: 'bold' | 'default'
}

const CheckboxInput = ({ indeterminate, text, disabled = false, loading = false, textStyle = 'default', ...rest }: Props) => {
  const id = useId()
  const ref = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest.checked])

  return (
    <label className={classNames(disabled || loading ? 'cursor-auto' : 'cursor-pointer', text ? '' : 'flex-none', 'flex select-none px-1')} htmlFor={id}>
      <div className={`relative flex items-center justify-center`}>
        <input
          type="checkbox"
          id={id}
          key={id}
          ref={ref}
          className={classNames(
            disabled || loading ? 'bg-gray-200' : 'bg-white',
            'peer h-4 w-4 shrink-0 appearance-none rounded border-[1px]',
            rest.checked ? 'border-[#ED1B2]' : 'border-[#DFDFDF]',
          )}
          {...rest}
        />
        <svg
          className="absolute h-[10px] w-[12px] peer-checked:block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ED1B24"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {rest.checked ? <polyline points="20 6 9 17 4 12"></polyline> : indeterminate && <polyline points="5,12 20,12"></polyline>}
        </svg>
      </div>
      {text && (
        <span className={disabled || loading ? 'text-[#CFD0D6]' : `${textStyle === 'bold' ? 'font-bold' : 'font-medium'} min-h-4 items-center pl-2 text-body2 text-typo-500`}>
          {text}
        </span>
      )}
    </label>
  )
}

export default CheckboxInput
