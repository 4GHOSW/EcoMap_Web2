import { ReactNode } from 'react'

interface Props {
  text: string | ReactNode
  color: 'none' | 'primary' | 'outline' | 'secondary' | 'secondary10' | 'secondary20' | 'tertiary'
  disabled?: boolean
  loading?: boolean
  style?: string
  height?: string
  width?: string
  rounded?: string

  [key: string]: any
}

const TextButton = ({ text, color = 'none', disabled = false, loading = false, style = '', width, height, rounded, ...rest }: Props) => {
  let defaultStyle = `flex ${width ? width : 'w-full'} ${height ? height : 'h-full'} ${rounded ? rounded : 'rounded-btn'} items-center justify-center leading-none  gap-x-1.5 text-body2 `

  switch (color) {
    case 'none':
      defaultStyle += ' text-gray-600 hover:font-bold  '
      break
    case 'primary':
      defaultStyle += ` text-white bg-primary   ${disabled ? 'opacity-25' : 'hover:bg-primary/80'}  `
      break
    case 'secondary':
      defaultStyle += ' text-white bg-secondary-base  hover:bg-secondary-base/80  '
      break
    case 'secondary10':
      defaultStyle += ' text-white bg-secondary-surface10  hover:bg-secondary-surface10/80  '
      break
    case 'secondary20':
      defaultStyle += ' text-white bg-secondary-surface  hover:bg-secondary-surface/80  '
      break
    case 'tertiary':
      defaultStyle += ' text-typo-250 bg-tertiary-surface20 text-typo-250  hover:bg-tertiary-surface20/80  '
      break
    case 'outline':
      defaultStyle += ` text-typo-300 border-tertiary-base bg-white border ${disabled ? '' : 'hover:text-typo-300/80 hover:border-tertiary-base/80'} `
      break
  }

  return (
    <button type={'button'} disabled={disabled || loading} className={defaultStyle + ' ' + style} {...rest}>
      {text}
    </button>
  )
}

export default TextButton
