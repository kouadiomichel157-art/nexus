export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    username: string | null
                    role: 'admin' | 'vendor' | 'user'
                    avatar_url: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    username?: string | null
                    role?: 'admin' | 'vendor' | 'user'
                    avatar_url?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    username?: string | null
                    role?: 'admin' | 'vendor' | 'user'
                    avatar_url?: string | null
                    created_at?: string
                }
            }
            products: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    image_url: string
                    cover_url: string | null
                    description: string | null
                    release_date: string | null
                    platform: 'PC' | 'Xbox' | 'PSN' | 'Nintendo' | 'Software' | null
                    is_weekly_offer: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    image_url: string
                    cover_url?: string | null
                    description?: string | null
                    release_date?: string | null
                    platform?: 'PC' | 'Xbox' | 'PSN' | 'Nintendo' | 'Software' | null
                    is_weekly_offer?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    image_url?: string
                    cover_url?: string | null
                    description?: string | null
                    release_date?: string | null
                    platform?: 'PC' | 'Xbox' | 'PSN' | 'Nintendo' | 'Software' | null
                    is_weekly_offer?: boolean
                    created_at?: string
                }
            }
            offers: {
                Row: {
                    id: string
                    product_id: string
                    vendor_id: string
                    price: number
                    stock: number
                    region: string
                    is_nexus_official: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    vendor_id: string
                    price: number
                    stock?: number
                    region?: string
                    is_nexus_official?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    vendor_id?: string
                    price?: number
                    stock?: number
                    region?: string
                    is_nexus_official?: boolean
                    created_at?: string
                }
            }
            keys: {
                Row: {
                    id: string
                    offer_id: string
                    code: string
                    is_sold: boolean
                    buyer_id: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    offer_id: string
                    code: string
                    is_sold?: boolean
                    buyer_id?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    offer_id?: string
                    code?: string
                    is_sold?: boolean
                    buyer_id?: string | null
                    created_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    buyer_id: string
                    total: number
                    status: 'pending' | 'completed' | 'failed'
                    payment_method: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    buyer_id: string
                    total: number
                    status?: 'pending' | 'completed' | 'failed'
                    payment_method?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    buyer_id?: string
                    total?: number
                    status?: 'pending' | 'completed' | 'failed'
                    payment_method?: string | null
                    created_at?: string
                }
            }
        }
    }
}
