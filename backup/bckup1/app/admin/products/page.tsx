"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Search, Tag, Edit, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminProductsPage() {
    const supabase = createClient();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*, offers(count)');

        if (data) setProducts(data);
        setLoading(false);
    };

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex bg-[#050505] items-center justify-center min-h-[60vh]">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">Catalogue Jeux</h1>
                    <p className="text-text-muted">Gérez les jeux disponibles sur la marketplace.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.5)] transition-all flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    Nouveau Jeu
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5 flex items-center gap-4">
                <Search className="h-5 w-5 text-text-muted" />
                <input
                    type="text"
                    placeholder="Rechercher un jeu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent border-none outline-none text-white w-full placeholder:text-text-muted"
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="group bg-[#0f0f0f] rounded-2xl border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                        {/* Image Header */}
                        <div className="relative h-48 w-full bg-black/50">
                            <Image
                                src={product.cover_url || product.image_url || '/placeholder_cover.jpg'}
                                alt={product.title}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white border border-white/10 uppercase">
                                {product.platform}
                            </div>
                            {product.is_weekly_offer && (
                                <div className="absolute top-2 left-2 bg-primary px-2 py-1 rounded text-xs font-bold text-white shadow-lg uppercase">
                                    Weekly
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h3 className="font-bold text-white text-lg mb-1 truncate">{product.title}</h3>
                            <p className="text-xs text-text-muted font-mono mb-4 truncate">{product.slug}</p>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 text-xs font-bold text-text-muted">
                                    <Tag className="h-3 w-3" />
                                    {product.offers?.[0]?.count || 0} Offre(s)
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/offers/new?productId=${product.id}`}
                                        title="Ajouter une offre"
                                        className="p-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href={`/product/${product.slug}`}
                                        target="_blank"
                                        title="Voir sur le site"
                                        className="p-2 hover:bg-white/10 text-text-muted hover:text-white rounded-lg transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && !loading && (
                <div className="text-center py-20 text-text-muted">
                    Aucun jeu trouvé.
                </div>
            )}
        </div>
    );
}
