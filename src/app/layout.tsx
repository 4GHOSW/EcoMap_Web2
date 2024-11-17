import 'react-toastify/dist/ReactToastify.css'
import '@/style/globals.css'

import React from 'react'
import { Metadata } from 'next'
import RecoilProvider from '@/lib/provider/RecoilProvider'
import { OverlayContainer } from '@/lib/hook/useOverlay'
import ReactQueryProviders from '@/lib/provider/ReactQueryProvider'
import Script from 'next/script'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 'EcoMap' : process.env.NEXT_PUBLIC_NODE_ENV === 'staging' ? '[DEV] EcoMap' : '[LOCAL] EcoMap',
  description: '친환경 길찾기',
  icons: { icon: '/images/favicon.png' },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head></head>
      <body className="flex flex-1 flex-col">
        <ReactQueryProviders>
          <RecoilProvider>
            <OverlayContainer />

            {children}
            <Script type="text/javascript" src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`} />
          </RecoilProvider>
        </ReactQueryProviders>
      </body>
    </html>
  )
}

export default RootLayout
