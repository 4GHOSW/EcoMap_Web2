'use client'

import TextButton from '@/components/ui/Button/TextButton'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter()
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div>해당 페이지를 찾을수 없습니다.</div>
      <TextButton text={'메인 화면으로 이동'} color={'outline'} onClick={() => router.push('/')} />
    </div>
  )
}

export default NotFound
