'use client'

import tmapAPI from '@/api/tmapAPI'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const NaverMap = dynamic(() => import('@/components/map/NaverMap'), {
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-gray-200" />,
})

export default function Home({ searchParams }: { searchParams: { startX: string; startY: string; endX: string; endY: string } }) {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-gray-200" />}>
      <NaverMap {...searchParams} />
    </Suspense>
  )
}
