import { ReactNode } from 'react'

interface Props {
  text: string
  icon: ReactNode
  pos: string
  color?: 'none' | 'primary' | 'transparent' | 'secondary' | 'tertiary' | 'shadow' | 'outline' | 'primarySoft'
  disabled?: boolean
  loading?: boolean
  style?: string
  height?: string
  width?: string
  rounded?: string

  [key: string]: any
}

const ImageTextButton = ({ text, icon, pos = 'left', color = 'none', disabled = false, loading = false, style = '', width, height, rounded, ...rest }: Props) => {
  let defaultStyle = `flex ${width ? width : 'w-full'} ${height ? height : 'h-full'} ${rounded ? rounded : 'rounded-btn'} text-base  items-center justify-center `

  switch (color) {
    case 'none':
      defaultStyle += 'text-gray-600 hover:font-bold  '
      break
    case 'primary':
      defaultStyle += 'text-white bg-primary hover:bg-primarySoft gap-x-1.5 '
      break
    case 'secondary':
      defaultStyle += ' text-white bg-secondary-base  hover:bg-secondary-base/80  '
      break
    case 'tertiary':
      defaultStyle += ' text-typo-250 bg-tertiary-surface20 text-typo-250  hover:bg-tertiary-surface20/80  '
      break
    case 'transparent':
      defaultStyle += `bg-transparent text-selectBtn1 gap-x-1 
      ${disabled ? ' text-typo-200' : ' text-typo-500 hover:text-typo-500/80'}
      `
      break
    case 'shadow':
      defaultStyle += ` bg-white gap-1 p-1 text-desc2 shadow-[0px_1px_2px_#00000029] h-6 flex-none ${disabled ? 'text-typo-250' : 'text-typo-500'}
        `
      break
    case 'outline':
      defaultStyle += ` bg-white gap-1 p-1 border ${disabled ? 'text-typo-250 border-[#E3E3E3]' : 'text-typo-500 border-typo-250 '}
        `
      break
    case 'primarySoft':
      defaultStyle += `bg-transparent text-selectBtn1 gap-x-1 text-primarySoft hover:text-typo-500/80'`
      break
  }
  return (
    <button disabled={disabled || loading} className={defaultStyle + ' ' + style} {...rest}>
      {pos === 'left' && icon}
      <span>{text}</span>
      {pos === 'right' && icon}
    </button>
  )
}

export default ImageTextButton
