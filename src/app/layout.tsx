import 'react-toastify/dist/ReactToastify.css'
import '@/style/globals.css'

import React from 'react'
import { Metadata } from 'next'
import RecoilProvider from '@/lib/provider/RecoilProvider'
import { OverlayContainer } from '@/lib/hook/useOverlay'
import ReactQueryProviders from '@/lib/provider/ReactQueryProvider'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 'LADS' : process.env.NEXT_PUBLIC_NODE_ENV === 'staging' ? '[DEV] LADS' : '[LOCAL] LADS',
  description: 'Lotte AI Data Storage',
  icons: { icon: '/images/favicon.png' },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,target-densityDpi=device-dpi," />
      </head>
      <body className="flex flex-1 flex-col">
        <ReactQueryProviders>
          <RecoilProvider>
            <OverlayContainer />

            {children}
          </RecoilProvider>
        </ReactQueryProviders>
      </body>
    </html>
  )
}

export default RootLayout
