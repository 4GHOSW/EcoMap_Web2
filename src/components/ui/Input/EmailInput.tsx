import { InputHTMLAttributes } from 'react'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  style?: string
  disabled?: boolean
  value?: string | number
  placeholder?: string
  loading?: boolean
  onChange?: any
}

const EmailInput = ({ style = '', disabled = false, value, placeholder, loading = false, onChange, ...rest }: Props) => {
  let defaultStyle = `flex w-full border rounded-sm placeholder:text-typo-200 text-typo-500 items-center justify-center focus-visible:outline-0 focus:border-typo-300 h-[34px] text-sm px-3 border-tertiary-base`

  return (
    <input
      type={'email'}
      value={value}
      placeholder={placeholder}
      className={defaultStyle + ' ' + style}
      disabled={disabled || loading}
      onChange={(e: any) => onChange && onChange(e.target.value)}
      {...rest}
    />
  )
}

export default EmailInput
