import dynamic from 'next/dynamic'

// 클라이언트 사이드에서만 렌더링되도록 설정
const NaverMap = dynamic(() => import('@/components/map/NaverMap'), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full bg-gray-200" />,
})

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="mb-4 text-2xl font-bold">네이버 지도</h1>
      <NaverMap />
    </main>
  )
}
