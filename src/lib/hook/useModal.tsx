'use client'

import type { MouseEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import useBodyScrollLock from './useBodyScrollLock'

export const useModal = (isOpen: boolean, onUnmount?: () => void) => {
  const [shouldRender, setShouldRender] = useState<boolean>(false)

  const stopPropagation = useCallback((e: MouseEvent) => {
    e.stopPropagation()
  }, [])

  const offShouldRender = useCallback(() => {
    setShouldRender(false)
    onUnmount?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useBodyScrollLock(isOpen)

  useEffect(() => {
    if (isOpen) setShouldRender(true)
  }, [isOpen])

  return { shouldRender, offShouldRender, stopPropagation }
}
