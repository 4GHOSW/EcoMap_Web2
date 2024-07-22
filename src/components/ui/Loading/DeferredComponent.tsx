'use client'

import React, { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
  time?: number
}

const DeferredComponent = ({ children, time = 200 }: Props) => {
  const [isDeferred, setIsDeferred] = useState(false)

  useEffect(() => {
    // time 지난 후 children Render
    const timeoutId = setTimeout(() => {
      setIsDeferred(true)
    }, time)
    return () => clearTimeout(timeoutId)
  }, [])

  if (!isDeferred) {
    return null
  }

  return <>{children}</>
}

export default DeferredComponent
