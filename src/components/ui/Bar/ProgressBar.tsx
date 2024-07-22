interface Props {
  size?: number | string
  barColor?: string
}

const ProgressBar = ({ size = '0', barColor = 'bg-primary' }: Props) => {
  return (
    <div className="flex h-[8px] w-full items-center">
      <div className={`rounded-base relative h-full w-full overflow-hidden`}>
        <span className="rounded-base border-typo-100 absolute left-0 top-0 h-full w-full border" />
        <div className={`absolute left-0 top-0 ${barColor} rounded-base h-full`} style={{ width: `${size}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar
