import React, { InputHTMLAttributes, useState } from 'react'
import Image from 'next/image'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  style?: string
  disabled?: boolean
  value?: string | number
  placeholder?: string
  loading?: boolean
  onChange?: any
}

const PasswordInput = ({ style = '', disabled = false, value, placeholder, loading = false, onChange, ...rest }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const toggleVisibility = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPassword(!showPassword)
  }

  let defaultStyle = 'flex w-full h-9 text-sm text-GRAY_7 pl-4 placeholder:text-GRAY_4 items-center justify-center focus-visible:outline-0'

  return (
    <div className={'border-GRAY_1 flex h-10 w-full items-center justify-between rounded border'}>
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        className={defaultStyle + ' ' + style}
        disabled={disabled || loading}
        onChange={(e: any) => onChange && onChange(e.target.value)}
        {...rest}
      />
      <div className={'w-10 cursor-pointer p-2'} onClick={(e) => toggleVisibility(e)}>
        <Image src={`/image/common/eye${showPassword ? '_disabled' : ''}.svg`} alt={'보기'} width={20} height={20} />
      </div>
    </div>
  )
}

export default PasswordInput
