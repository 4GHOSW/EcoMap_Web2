'use client'

export const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="flex flex-col items-center">
            <span className="text-[60px] font-bold text-gray-800 mb-4">{error.digest}</span>
            <span className="text-[24px] font-bold text-gray-800 mb-4">죄송합니다!</span>
            <span className="text-[18px] font-light text-gray-600">일시적인 오류로</span>
            <span className="text-[18px] font-light text-gray-600 mb-3">페이지를 이용하실 수 없습니다 😥</span>
            <button onClick={() => history.back()} className="mt-3 px-4 py-2 bg-transparent border-none cursor-pointer font-bold rounded text-blue-400 hover:text-blue-600">
              이전 페이지로 돌아가기
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

export default Error
