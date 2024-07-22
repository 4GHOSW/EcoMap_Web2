'use client'

import { useState } from 'react'
import SequentialModal, { type SequentialModalContent } from '@/components/ui/Modal/SequentialModal'
import { OverlayOpenParams } from '@/lib/hook/useOverlay'

interface Props {
  overlayElement: OverlayOpenParams
}

const ExampleSequentialModal = ({ overlayElement }: Props) => {
  const { close, isOpen, onUnmount } = overlayElement

  const [index, setIndex] = useState<number>(0)
  const [animDirection, setAnimDirection] = useState<'come' | 'back' | 'leave' | 'up' | 'down' | 'none'>('come')

  const onClickDone = () => {
    window.alert('확인 눌림')
    close()
  }

  const sequentialModalBody: SequentialModalContent[] = [
    {
      key: 0,
      size: 's',
      header: <div>첫 번째 타이틀</div>,
      body: (
        <div className="flex flex-col items-center">
          <p className="my-1">THIS IS 1ST CHILDREN</p>
          <p className="my-1">THIS IS 1ST CHILDREN</p>
          <p className="my-1">THIS IS 1ST CHILDREN</p>
          <p className="my-1">THIS IS 1ST CHILDREN</p>
          <p className="my-1">THIS IS 1ST CHILDREN</p>
        </div>
      ),
      footer: <></>,
      closeIcon: false,
    },
    {
      key: 1,
      size: 'm',
      header: <div>두 번째 타이틀</div>,
      body: (
        <div className="flex flex-col items-center">
          <p className="my-1">THIS IS 2ND CHILDREN</p>
          <p className="my-1">THIS IS 2ND CHILDREN</p>
          <p className="my-1">THIS IS 2ND CHILDREN</p>
          <p className="my-1">THIS IS 2ND CHILDREN</p>
          <p className="my-1">THIS IS 2ND CHILDREN</p>
        </div>
      ),
      footer: <></>,
      closeIcon: false,
    },
    {
      key: 2,
      size: 'l',
      header: <div>세 번째 타이틀</div>,
      body: (
        <div className="flex flex-col items-center">
          <p className="my-1">THIS IS 3RD CHILDREN</p>
          <p className="my-1">THIS IS 3RD CHILDREN</p>
          <p className="my-1">THIS IS 3RD CHILDREN</p>
          <p className="my-1">THIS IS 3RD CHILDREN</p>
          <p className="my-1">THIS IS 3RD CHILDREN</p>
        </div>
      ),
      footer: <></>,
      closeIcon: false,
    },
  ]

  return (
    <SequentialModal
      contents={sequentialModalBody}
      index={index}
      animDirection={animDirection}
      setAnimDirection={setAnimDirection}
      close={close}
      isOpen={isOpen}
      onUnmount={onUnmount}
    />
  )
}

export default ExampleSequentialModal
