'use client'

import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid' //임시 X아이콘
import { OverlayOpenParams } from '@/lib/hook/useOverlay'
import { useModal } from '@/lib/hook/useModal'
import { classNames } from '@/util/cssUtils'
import ImageButton from '../Button/ImageButton'

export type SequentialModalContent = {
  key: number | string
  size: 's' | 'm' | 'l' | 'xl' | 'full'
  fullHeight?: boolean
  hasPadding?: boolean
  header: ReactNode
  body: ReactNode
  footer: ReactNode
  closeIcon: boolean
}

interface Props extends OverlayOpenParams {
  contents: SequentialModalContent[]
  index: number
  animDirection: string
  setAnimDirection: Dispatch<SetStateAction<'come' | 'back' | 'leave' | 'up' | 'down' | 'none'>>
  isSlide?: boolean
}

const SequentialModal = ({ contents, index, animDirection, setAnimDirection, close, isOpen, onUnmount, isSlide = false }: Props) => {
  const { shouldRender, offShouldRender, stopPropagation } = useModal(isOpen, onUnmount)

  const onClose = () => {
    isSlide ? setAnimDirection('leave') : setAnimDirection('down')
    close()
  }

  const modalWidth = (size: SequentialModalContent['size']) => {
    switch (size) {
      case 's':
        return 'mx-4 w-full max-w-[280px] p-4 pt-6'
      case 'm':
        return 'mx-4 w-full max-w-[520px] px-4 pb-4 pt-7 lg:p-6'
      case 'l':
        return 'max-w-[736px]'
      case 'xl':
        return 'w-[calc(100%-240px)] max-w-[1024px] px-4 pb-4 pt-7 lg:p-6'
      case 'full':
        return 'w-full h-full'
    }
  }

  const modalAnimation = useMemo(() => {
    switch (animDirection) {
      case 'come':
        return 'animate-sequential-modal-come'
      case 'back':
        return 'animate-sequential-modal-back'
      case 'leave':
        return 'animate-sequential-modal-leave'
      case 'up':
        return 'animate-dialog-modal-bottom-up'
      case 'down':
        return 'animate-dialog-modal-bottom-down'
      default:
        return ''
    }
  }, [animDirection])

  if (!shouldRender) {
    return null
  }

  return (
    <div
      onClick={onClose}
      onAnimationEnd={isOpen ? undefined : offShouldRender}
      className={classNames(
        `fixed bottom-0 top-0 z-modal flex h-full w-full items-center justify-center bg-secondary-base/20`,
        isOpen ? 'animate-modal-bg-in' : 'animate-modal-bg-out',
      )}
    >
      <div
        onClick={stopPropagation}
        onAnimationEnd={() => setAnimDirection('none')}
        className={classNames(
          modalWidth(contents[index].size),
          'flex flex-col justify-center rounded-sm bg-white lg:h-auto lg:max-h-full lg:flex-auto',
          contents[index].fullHeight ? 'h-full flex-1' : '',
          contents[index].hasPadding ? 'p-6' : '',
          modalAnimation,
        )}
      >
        {/* Header */}
        {contents[index].closeIcon && (
          <ImageButton
            className={classNames('absolute right-6 h-6 w-6 rounded hover:bg-[#00000010]', contents[index].hasPadding ? 'top-6' : 'top-4')}
            icon={<XMarkIcon />}
            onClick={close}
          />
        )}
        {contents[index].header}

        {/* Body */}
        <div className={classNames('flex flex-1 flex-col items-center overflow-auto', contents[index].hasPadding ? 'my-4' : '')}>{contents[index].body}</div>

        {/* Footer */}
        {contents[index].footer}
      </div>
    </div>
  )
}

export default SequentialModal
