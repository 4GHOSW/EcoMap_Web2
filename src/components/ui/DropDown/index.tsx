'use client'

import { classNames } from '@/util/cssUtils'
import { Dispatch, ReactNode, SetStateAction } from 'react'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  header: ReactNode
  body: ReactNode[]
  DropWidth?: string
  subDropX?: 'left' | 'right' | 'center'
  subDropY?: 'top' | 'bottom'
  subDropW?: string
}

const DropDown = ({ isOpen, setIsOpen, header, body, DropWidth = '', subDropX = 'center', subDropY = 'bottom', subDropW }: Props) => {
  return (
    <div className={classNames(DropWidth && DropWidth, 'relative')}>
      <button className={classNames(DropWidth && DropWidth)} onClick={() => setIsOpen((isOpen) => !isOpen)}>
        {header}
      </button>
      {isOpen && body.length > 0 && (
        <>
          <div onClick={() => setIsOpen(false)} className="fixed left-0 top-0 z-fixed h-screen w-screen" />
          <div
            className={classNames(
              `absolute z-fixed overflow-hidden p-1 ${subDropY === 'top' ? 'top-0 -translate-y-full' : ' mt-0'} ${subDropW} ${subDropX === 'left' ? 'left-0' : subDropX === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'}`,
            )}
          >
            <ul className={`animate-dropdown-slide-fade-in rounded-md bg-white py-2 shadow-dropdown ring-[0.5px] ring-tertiary-surface20`}>
              {body.map((item, index) => (
                <li key={'DropDown' + index}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default DropDown
