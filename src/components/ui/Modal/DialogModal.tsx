'use client'

import { PropsWithChildren, ReactNode, useMemo } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid' //임시 X아이콘
import { useModal } from '@/lib/hook/useModal'
import { OverlayOpenParams } from '@/lib/hook/useOverlay'
import { classNames } from '@/util/cssUtils'
import ImageButton from '../Button/ImageButton'

interface Props extends PropsWithChildren, OverlayOpenParams {
  size?: 's' | 'm' | 'l' | 'xl' | 'xl2' | 'full'
  fullHeight?: boolean
  header?: ReactNode
  body?: ReactNode
  footer?: ReactNode
  closeIcon?: boolean
  hasPadding?: boolean
  noRounded?: boolean
}

const DialogModal = ({ size = 's', fullHeight, header, footer, closeIcon = true, body, hasPadding = true, noRounded = false, close, isOpen, onUnmount }: Props) => {
  const { shouldRender, offShouldRender, stopPropagation } = useModal(isOpen, onUnmount)

  const modalWidth = useMemo(() => {
    switch (size) {
      case 's':
        return 'w-full mx-4 max-w-[280px]'
      case 'm':
        return 'w-full mx-4 max-w-[480px]'
      case 'l':
        return 'max-w-[632px]'
      case 'xl':
        return 'w-[calc(100%-240px)] max-w-[1024px]'
      case 'xl2':
        return 'w-[calc(100%-240px)] max-w-[1440px]'
      case 'full':
        return 'w-full h-full'
    }
  }, [size])

  if (!shouldRender) {
    return null
  }

  return (
    <div
      onClick={close}
      onAnimationEnd={isOpen ? undefined : offShouldRender}
      className={classNames(
        `fixed bottom-0 top-0 z-modal flex h-full w-full items-center  justify-center bg-secondary-base/20`,
        isOpen ? 'animate-modal-bg-in' : 'animate-modal-bg-out',
      )}
    >
      <div
        onClick={stopPropagation}
        className={classNames(
          modalWidth,
          'flex flex-col justify-center bg-white lg:h-auto lg:max-h-full lg:flex-auto',
          fullHeight ? 'h-full flex-1' : '',
          isOpen ? 'animate-dialog-modal-bottom-up' : 'animate-dialog-modal-bottom-down',
          hasPadding ? 'px-4 pb-4 pt-6' : '',
          noRounded ? '' : 'rounded-sm',
        )}
      >
        {/* Header */}
        {closeIcon && (
          <ImageButton className={classNames('absolute right-6 h-6 w-6 rounded hover:bg-[#00000010] ', hasPadding ? 'top-6' : 'top-4')} icon={<XMarkIcon />} onClick={close} />
        )}
        {header}

        {/* Body */}
        <div className={classNames('flex flex-1 flex-col items-center overflow-auto', hasPadding ? 'my-4' : '')}>{body}</div>

        {/* Footer */}
        {footer}
      </div>
    </div>
  )
}

export default DialogModal
