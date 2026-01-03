import { getProductBySlug } from '@/lib/mock-data';
import Navbar from '@/components/layout/Navbar';
import ProductGallery from '@/components/product/ProductGallery';
import ProductActions from '@/components/product/ProductActions';
import OfferList from '@/components/product/OfferList';
import ProductCard from '@/components/ui/ProductCard';
import { notFound } from 'next/navigation';
import { Info, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

interface PageProps {
    params: { slug: string };
}

export default async function ProductPage({ params }: PageProps) {
    const supabase = createClient();

    // 1. Try to fetch from Supabase
    const { data: dbProduct } = await supabase
        .from('products')
        .select('*')
        .eq('slug', params.slug)
        .single();

    // 2. Fetch Offers if product exists
    let offers: any[] = [];
    if (dbProduct) {
        const { data: dbOffers } = await supabase
            .from('offers')
            .select(`
                *,
                profiles (
                   username,
                   avatar_url
                )
            `)
            .eq('product_id', dbProduct.id);
        if (dbOffers) offers = dbOffers;
    }

    // Force mock offers for visualization if none found
    if (offers.length === 0) {
        offers = getMockOffers('mock-id');
    }

    // 3. Fallback to Mock Data if not in DB
    const mockProduct = getProductBySlug(params.slug);

    // Combine Data (DB takes precedence)
    const product = dbProduct ? {
        id: dbProduct.id,
        title: dbProduct.title,
        price: offers.length > 0 ? Math.min(...offers.map(o => o.price)) : 0, // Best price
        prevPrice: 0,
        image: dbProduct.image_url,
        images: [dbProduct.image_url, dbProduct.cover_url].filter(Boolean) as string[],
        platform: dbProduct.platform || 'PC',
        region: 'Global',
        developer: 'Unknown',
        publisher: 'Unknown',
        releaseDate: dbProduct.release_date || 'N/A',
        description: dbProduct.description || '',
        edition: 'Standard'
    } : mockProduct;

    if (!product) {
        return notFound();
    }

    // Determine Best Price for highlighting
    const bestPrice = offers.length > 0 ? Math.min(...offers.map(o => o.price)) : product.price;

    return (
        <div className="min-h-screen bg-background text-text-main pb-20">
            <Navbar />

            <main className="mx-auto max-w-[1400px] px-4 py-8">
                {/* Back Button */}
                <div className="mb-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-white transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Retour au catalogue
                    </Link>
                </div>

                {/* Breadcrumb (Simplified) */}
                <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted">
                    <span>Home</span>
                    <span className="text-text-dark">/</span>
                    <span>{product.platform}</span>
                    <span className="text-text-dark">/</span>
                    <span className="text-primary">{product.title}</span>
                </div>

                {/* Product Title Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-white">{product.title}</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: Media & Details (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        <ProductGallery images={product.images} title={product.title} />

                        {/* NEW: Offer List (Vendors) */}
                        {offers.length > 0 && (
                            <div className="mb-8">
                                <OfferList offers={offers} bestPrice={bestPrice} />
                            </div>
                        )}

                        {/* Description Card */}
                        <div className="rounded-md bg-surface border border-white/5 p-6">
                            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                                <Info className="h-5 w-5 text-primary" />
                                Détails du produit
                            </h2>
                            <div className="prose prose-invert prose-sm max-w-none text-text-muted leading-relaxed">
                                <p>{product.description}</p>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                <div>
                                    <span className="block text-xs font-bold text-text-dark uppercase">Développeur</span>
                                    <span className="text-white font-medium">{product.developer}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-text-dark uppercase">Éditeur</span>
                                    <span className="text-white font-medium">{product.publisher}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-text-dark uppercase">Date de sortie</span>
                                    <span className="text-white font-medium">{product.releaseDate}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-text-dark uppercase">Platforme</span>
                                    <span className="text-white font-medium">{product.platform}</span>
                                </div>
                            </div>
                        </div>

                        {/* Activation Guide */}
                        <div className="rounded-md bg-surface border border-white/5 p-6">
                            <h2 className="mb-4 text-lg font-bold text-white">Comment activer votre clé {product.platform} ?</h2>
                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-highlight border border-white/10 text-xs font-bold">1</div>
                                    <p className="text-sm text-text-muted">Ouvrez le client {product.platform} sur votre PC/Console.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-highlight border border-white/10 text-xs font-bold">2</div>
                                    <p className="text-sm text-text-muted">Allez dans la section "Activer un produit" ou "Utiliser un code".</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-highlight border border-white/10 text-xs font-bold">3</div>
                                    <p className="text-sm text-text-muted">Copiez/Collez la clé reçue par email et validez.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Buying Actions (4 cols) */}
                    <div className="lg:col-span-4 h-full">
                        {/* @ts-ignore */}
                        <ProductActions product={product} />
                    </div>

                </div>
            </main>

            {/* SUGGESTED PRODUCTS (Price & Relevance) */}
            <section className="mx-auto max-w-[1400px] px-4 py-12 border-t border-white/5">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-6 w-1 bg-primary rounded-full"></div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">Vous aimerez aussi</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {/* Mock Suggestions from imported PRODUCTS */}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-full">
                            {/* @ts-ignore */}
                            <ProductCard {...(getProductBySlug('fc-24') || {})} title={`Suggestion ${i + 1}`} image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop" price={15000 + (i * 1000)} />
                        </div>
                    ))}
                </div>
            </section>

            {/* RECENTLY VIEWED */}
            <section className="mx-auto max-w-[1400px] px-4 pb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-6 w-1 bg-gray-600 rounded-full"></div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">Vus récemment</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 opacity-80 hover:opacity-100 transition-opacity">
                    {/* Mock History */}
                    {[0, 1, 2, 3].map((i) => (
                        <div key={`hist-${i}`} className="h-full scale-95 origin-left">
                            {/* @ts-ignore */}
                            <ProductCard {...(getProductBySlug('cod-mw3') || {})} title={`Vu Récemment ${i + 1}`} image="https://images4.alphacoders.com/132/1329382.jpeg" price={45000} badge={undefined} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// Helper to generate mock offers for visual testing
function getMockOffers(productId: string) {
    return [
        { id: 'mo-1', price: 24500, profiles: { username: 'GameKeyZ', avatar_url: null }, product_id: productId },
        { id: 'mo-2', price: 25900, profiles: { username: 'FastCodes', avatar_url: null }, product_id: productId },
        { id: 'mo-3', price: 26000, profiles: { username: 'NexusOfficial', avatar_url: null }, product_id: productId },
    ];
}
