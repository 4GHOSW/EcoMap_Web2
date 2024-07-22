import { NextResponse, userAgent } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { isBot } = userAgent(request)
  if (isBot) return new Response('bot은 접근 불가.', { status: 403 })

  const returnURL = request.nextUrl.searchParams.get('returnURL')
  if (returnURL) {
    const response = NextResponse.redirect(new URL(returnURL, request.url))
    response.cookies.set({ name: 'returnURL', value: returnURL, path: '/' })
    return response
  }

  // if (!request.cookies.has('user_access_token')) {
  //   if (request.nextUrl.pathname !== '/login') return NextResponse.redirect(new URL(Router.Login, request.url))
  // } else {
  //   if (request.nextUrl.pathname === '/') return NextResponse.redirect(new URL(Router.Dashboard, request.url))
  // }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.svg).*)'],
}
