import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL! || 'https://mybnwwxabhwtbqpvxlfz.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || 'sb_publishable_NgXTRGuE8CaCb8aVxmv-kg_wGdN7rsq'
    )
}
