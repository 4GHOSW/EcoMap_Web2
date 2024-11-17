'use client'

import tmapAPI from '@/api/tmapAPI'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

const NaverMap = dynamic(() => import('@/components/map/NaverMap'), {
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-gray-200" />,
})

export default function Home() {
  const searchParams = useSearchParams()
  const [params, setParams] = useState({
    startX: '',
    startY: '',
    endX: '',
    endY: '',
  })

  useEffect(() => {
    setParams({
      startX: searchParams.get('startX') || '',
      startY: searchParams.get('startY') || '',
      endX: searchParams.get('endX') || '',
      endY: searchParams.get('endY') || '',
    })
  }, [searchParams])
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-gray-200" />}>
      <NaverMap {...params} />
    </Suspense>
  )
}

// 동적 라우팅 설정
export const fetchCache = 'force-no-store'
export const revalidate = 0
