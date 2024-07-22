'use client'

import { ReactNode, useState } from 'react'
import { classNames } from '@/util/cssUtils'

interface Props {
  children: ReactNode
  message: any
  type?: string
  wrapSize?: string
  hasClickedState?: boolean
}

const Tooltip = ({ children, message, type = 'top', hasClickedState }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  let defaultStyle = ''
  switch (type) {
    case 'top':
      defaultStyle += ' top-[calc(-100%-30px)] '
      break
  }

  return (
    <div className="group/tooltip relative inline-flex" onClick={() => hasClickedState && setIsClicked((isClicked) => !isClicked)}>
      {children}
      <span
        className={classNames(
          defaultStyle,
          'absolute left-1/2 right-auto top-full mt-1.5 -translate-x-1/2 scale-0 items-center text-nowrap   rounded-sm  bg-secondary-base  px-2 pb-[5px] pt-[7px] text-center text-[10px] font-normal leading-[12px] text-white transition-transform delay-150 after:absolute after:left-[calc(50%+1px)] after:top-[3px] after:inline-block after:h-2.5 after:w-3 after:-translate-x-1/2  after:-translate-y-full after:bg-cover after:content-tooltipArrow lg:whitespace-pre',
          isClicked ? '' : 'lg:group-hover/tooltip:z-[5000] lg:group-hover/tooltip:scale-100',
        )}
      >
        {message}
      </span>
    </div>
  )
}

export default Tooltip
