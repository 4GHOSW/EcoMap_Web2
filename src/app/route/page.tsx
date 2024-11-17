'use client'

import tmapAPI from '@/api/tmapAPI'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const NaverMap = dynamic(() => import('@/components/map/NaverMap'), {
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-gray-200" />,
})

export default function Route() {
  return <NaverMap />
}
