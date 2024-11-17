'use client'

import tmapAPI from '@/api/tmapAPI'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const NaverMap = dynamic(() => import('@/components/map/NaverMap'), {
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-gray-200" />,
})

export default function Home({ searchParams }: { searchParams: { startX: string; startY: string; endX: string; endY: string } }) {
  // const fetchAPI = () => {
  //   tmapAPI('POST', 'https://apis.openapi.sk.com/transit/routes', {
  //     startX: '126.936928',
  //     startY: '37.555162',
  //     endX: '127.029281',
  //     endY: '37.564436',
  //   }).then((res) => {
  //     console.log(res)
  //   })
  // }

  // useEffect(() => {
  //   fetchAPI()
  // }, [])

  return <NaverMap {...searchParams} />
}
