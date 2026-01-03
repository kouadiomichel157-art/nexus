
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL! || 'https://mybnwwxabhwtbqpvxlfz.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || 'sb_publishable_NgXTRGuE8CaCb8aVxmv-kg_wGdN7rsq',
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // Protected Routes Logic
    // Protected Routes Logic
    if (!user) {
        if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/orders') || request.nextUrl.pathname.startsWith('/keys')) {
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }
        if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            return NextResponse.redirect(url)
        }
    }

    // Redirect to dashboard if logged in
    if (user) {
        if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
            const url = request.nextUrl.clone()
            url.pathname = '/orders'
            return NextResponse.redirect(url)
        }
        if (request.nextUrl.pathname.startsWith('/admin/login')) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin'
            return NextResponse.redirect(url)
        }
    }

    return response
}
