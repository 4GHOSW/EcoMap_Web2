'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import type { Ref } from 'react'
import React, { forwardRef, useEffect, useImperativeHandle, useCallback, useState, useRef, useMemo } from 'react'

const overlayAtom = atom<Map<number, React.ReactNode>>({ key: 'overlayAtom', default: new Map() })

export interface OverlayOpenParams {
  close: () => void
  isOpen: boolean
  onUnmount: () => void
}

type OverlayElement = (params: OverlayOpenParams) => JSX.Element

let elementId = 1

const assignElementId = () => {
  elementId += 1

  return elementId
}

interface Options {
  isCleanUp?: boolean
}

export const useOverlay = ({ isCleanUp = true }: Options = {}) => {
  const setOverlay = useSetRecoilState(overlayAtom)

  const addOverlay = (id: number, overlayController: React.ReactNode) => {
    setOverlay((overlay) => {
      const newMap = new Map(overlay)
      newMap.set(id, overlayController)
      return newMap
    })
  }

  const removeOverlay = (id: number) => {
    setOverlay((overlay) => {
      const newMap = new Map(overlay)
      newMap.delete(id)
      return newMap
    })
  }

  const [id] = useState(assignElementId)

  const overlayRef = useRef<OverlayControlRef | null>(null)

  useEffect(() => {
    return () => {
      if (isCleanUp) {
        removeOverlay(id)
      }
    }
  }, [isCleanUp, id])

  return useMemo(
    () => ({
      open: (overlayElement: OverlayElement) => {
        addOverlay(
          id,
          <OverlayController
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
            onUnmount={() => {
              removeOverlay(id)
            }}
          />,
        )
      },
      close: () => {
        overlayRef.current?.close()
      },
      remove: () => {
        removeOverlay(id)
      },
    }),
    [id],
  )
}

export const OverlayContainer: React.FC = () => {
  const overlayMap = useRecoilValue(overlayAtom)

  return (
    <>
      {[...overlayMap.entries()].map(([key, modal]) => (
        <React.Fragment key={key}>{modal}</React.Fragment>
      ))}
    </>
  )
}

interface Props {
  onUnmount: () => void
  overlayElement: OverlayElement
}

export interface OverlayControlRef {
  close: () => void
}

const OverlayController = forwardRef(function OverlayController({ overlayElement: OverlayElement, onUnmount }: Props, ref: Ref<OverlayControlRef>) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = useCallback(() => setIsOpen(false), [])

  useImperativeHandle(
    ref,
    () => {
      return { close: handleClose }
    },
    [handleClose],
  )

  useEffect(() => {
    // NOTE: requestAnimationFrame이 없으면 가끔 Open 애니메이션이 실행되지 않는다.
    requestAnimationFrame(() => {
      setIsOpen(true)
    })
  }, [])

  return <OverlayElement close={handleClose} isOpen={isOpen} onUnmount={onUnmount} />
})
