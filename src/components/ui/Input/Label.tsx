interface Props {
  text: any
  name: string
  style?: string
  onClick?: (val: any) => void
  isRequired?: boolean
}

const Label = ({ text, name, style = '', onClick, isRequired }: Props) => {
  let defaultStyle = 'text-body font-medium text-typo-500 inline-flex gap-x-1'

  return (
    <div onClick={onClick}>
      <label htmlFor={name} className={style + ' ' + defaultStyle}>
        {text}
        {isRequired && <span className={"text-primarySoft after:content-['*']"}></span>}
      </label>
    </div>
  )
}

export default Label
