import { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  disabled?: boolean
  loading?: boolean
  color?: 'transparent' | 'outline' | 'primary'
  style?: string
  size?: string

  [key: string]: any
}

const ImageButton = ({ icon, disabled = false, loading = false, style = '', size = '', color = 'transparent', ...rest }: Props) => {
  const getColor = (color: string) => {
    switch (color) {
      case 'primary':
        return `rounded-btn ${disabled ? 'bg-tertiary-base ' : 'bg-primary '} `

      case 'transparent':
        return 'bg-transparent'

      case 'outline':
        return 'border border-border-base rounded-btn'

      default:
        'bg-transparent'
    }
  }

  return (
    <button className={`img-button inline-flex aspect-square items-center justify-center ${getColor(color)} ${size} ${style}`} disabled={disabled} {...rest}>
      {icon}
    </button>
  )
}

export default ImageButton
