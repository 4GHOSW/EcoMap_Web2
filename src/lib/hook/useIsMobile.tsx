'use client'

import { useEffect, useState } from 'react'
import useDebounce from '@/lib/hook/useDebounce'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024)
  const debouncedIsMobile = useDebounce({ value: isMobile, delay: 200 })

  useEffect(() => {
    const handleResize = () => {
      let status = window.innerWidth < 1024
      setIsMobile(status)
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return debouncedIsMobile
}
