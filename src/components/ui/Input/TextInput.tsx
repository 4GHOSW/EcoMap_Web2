import { classNames } from '@/util/cssUtils'
import { forwardRef, InputHTMLAttributes, Ref } from 'react'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  style?: string
  disabled?: boolean
  value?: string
  placeholder?: string
  loading?: boolean
  onChange?: any
  styleSize?: 'default' | 'navChat'
  isCounting?: boolean
}

const TextInput = forwardRef(
  ({ style = '', styleSize = 'default', disabled = false, value, placeholder, loading = false, onChange, isCounting = false, ...rest }: Props, ref: Ref<HTMLInputElement>) => {
    let defaultStyle = `flex w-full border rounded-sm placeholder:text-typo-200 text-typo-500 items-center justify-center focus-visible:outline-0 focus:border-typo-300 `
    const styleSizeStyle = {
      default: ' h-[34px] text-sm px-3 border-tertiary-base',
      navChat: ' h-5 w-full px-0.5 border-tertiary-inpBorder text-body2',
    }

    return (
      <div className="w-full">
        <input
          ref={ref}
          type={'text'}
          className={defaultStyle + styleSizeStyle[styleSize] + ' ' + style}
          value={value}
          placeholder={placeholder}
          disabled={disabled || loading}
          onChange={(e: any) => (rest.maxLength !== undefined ? onChange(e.target.value.substring(0, rest.maxLength)) : onChange(e.target.value))}
          {...rest}
        />
        {rest.maxLength !== undefined && isCounting && (
          <div className={classNames('mt-1 flex justify-end text-desc', rest.maxLength === value?.length ? ' font-bold text-typo-500 ' : '  text-typo-100')}>
            <span>{value?.length}</span>/<span>{rest.maxLength}</span>
          </div>
        )}
      </div>
    )
  },
)

TextInput.displayName = 'TextInput'
export default TextInput
