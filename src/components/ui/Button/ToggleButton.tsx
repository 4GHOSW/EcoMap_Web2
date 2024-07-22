import { classNames } from '@/util/cssUtils'

export interface Props extends Omit<React.ComponentProps<'button'>, 'ref'> {
  isOn: boolean | undefined
  disabled?: boolean
  label?: JSX.Element | string
}

const ToggleButton = ({ isOn, disabled, label, onClick, ...rests }: Props) => {
  return (
    <label htmlFor="toggle" className="inline-flex items-center justify-center gap-1">
      <span onClick={disabled ? undefined : onClick} className="text-desc2 text-typo-300">
        {label}
      </span>
      <button
        onClick={disabled ? undefined : onClick}
        className={classNames('relative h-4 w-7 cursor-pointer rounded-3xl border-none transition-[background-color_0.1s_ease-in-out]', isOn ? 'bg-primary' : 'bg-tertiary-base')}
        {...rests}
      >
        <div
          className={classNames(
            'shadow-[0_0_4px_rgba(0, 0, 0, 0.4)] absolute top-1/2 h-4 w-4 -translate-y-1/2 transform rounded-full border bg-white transition-[left_0.2s_ease-in-out]',
            isOn ? 'border-primary left-full -translate-x-full' : 'border-tertiary-base left-0',
          )}
        />
      </button>
    </label>
  )
}

export default ToggleButton
