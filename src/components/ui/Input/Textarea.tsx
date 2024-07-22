import { classNames } from '@/util/cssUtils'
import { CSSProperties } from 'react'

export interface textareaProps {
  name: string
  value?: string
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  style?: CSSProperties
  maxLength?: number
  setValue?: any
  onKeyUp?: any
}

const Textarea = ({ name, value, placeholder, disabled = false, loading = false, style, setValue, onKeyUp }: textareaProps) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      <textarea
        name={name}
        id={name}
        value={value}
        className={classNames(
          disabled || loading ? 'bg-GRAY_2' : 'text-GRAY_7 bg-white',
          'border-GRAY_1 focus-outline placeholder:text-GRAY_1 focus:border-typo-300 h-full min-h-[60px] w-full cursor-text resize-none appearance-none rounded-[4px] border px-4 py-3 text-sm shadow-none outline-0 ring-0 ease-in-out focus:outline-0',
        )}
        placeholder={placeholder}
        disabled={disabled || loading}
        onChange={(e: any) => setValue && setValue(e.target.value)}
        onKeyUp={(e: any) => onKeyUp && onKeyUp(e)}
      />
    </div>
  )
}

export default Textarea
