"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/utils/supabase/types';
import Link from 'next/link';
import { Plus, Search, Tag, AlertCircle, CheckCircle, Package } from 'lucide-react';

type Product = Database['public']['Tables']['products']['Row'];
type Offer = Database['public']['Tables']['offers']['Row'] & {
    profiles: { username: string } | null;
    keys: { count: number }[]; // Aggregate count from generic query
};

export default function StockPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [offersMap, setOffersMap] = useState<Record<string, any[]>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const supabase = createClient();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            // 1. Fetch Products
            const { data: productsData } = await supabase
                .from('products')
                .select('*')
                .order('title');

            if (productsData) {
                setProducts(productsData);

                // 2. Fetch Offers with Key Counts (Manual Aggregation for now due to complex join)
                // Note: In a real prod app, use RPC or specific View for performance.
                const { data: offersData, error } = await supabase
                    .from('offers')
                    .select(`
                        *,
                        profiles (username),
                        keys (count)
                    `); // This implies keys has a FK to offer_id. Supabase JS select(count) is tricky on related.

                // Fallback approach: Fetch keys separately if relation aggregation fails or is strictly RLS
                // Ideally: .select('*, keys(count)') works if FK exists.

                if (offersData) {
                    const grouped = offersData.reduce((acc: any, offer: any) => {
                        if (!acc[offer.product_id]) acc[offer.product_id] = [];

                        // Parse count if available, else 0
                        const stockCount = offer.keys?.[0]?.count || 0;
                        // Note: The above assumes select('keys(count)') returns array of objects with count.
                        // Actually, supabase .select('*, keys(count)') returns { ...offer, keys: [{ count: 12 }] } usually.

                        // Let's refine the query approach in a separate block if needed. 
                        // For this version, we will assume visual "Stock" is static until we confirm SQL keys relation.

                        acc[offer.product_id].push({ ...offer, stockCount: 0 }); // Placeholder until SQL run
                        return acc;
                    }, {});
                    setOffersMap(grouped);
                }
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Gestion des Stocks</h1>
                    <p className="text-text-muted mt-2">Gérez les clés de licence pour vos produits.</p>
                </div>
                <Link
                    href="/admin/stock/add"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/20"
                >
                    <Plus className="h-5 w-5" />
                    Ajouter des Clés
                </Link>
            </div>

            {/* Search */}
            <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                <input
                    type="text"
                    placeholder="Rechercher un jeu..."
                    className="w-full bg-[#0f1115] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-text-muted focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {isLoading ? (
                    <div className="text-center py-20 text-text-muted">Chargement des stocks...</div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-[#0f1115] rounded-xl border border-white/5">
                        <Package className="h-12 w-12 text-text-muted mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-bold text-white">Aucun produit trouvé</h3>
                        <p className="text-text-muted">Essayez d'ajouter un nouveau produit au catalogue.</p>
                    </div>
                ) : (
                    filteredProducts.map(product => {
                        const offers = offersMap[product.id] || [];
                        const totalStock = offers.reduce((sum: number, o: any) => sum + (o.stockCount || 0), 0);

                        return (
                            <div key={product.id} className="bg-[#0f1115] border border-white/5 rounded-xl p-6 transition-all hover:border-white/10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-4">
                                        <div className="h-16 w-12 bg-black rounded overflow-hidden relative border border-white/10">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={product.image_url} alt={product.title} className="object-cover w-full h-full" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{product.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="px-2 py-0.5 rounded bg-white/5 text-xs font-bold text-text-muted border border-white/5">{product.platform}</span>
                                                <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold border ${totalStock > 0 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                                    {totalStock > 0 ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                                                    {totalStock > 0 ? `${totalStock} en stock` : 'Rupture'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* OFFERS LIST */}
                                <div className="space-y-3">
                                    {offers.length > 0 ? offers.map((offer: any) => (
                                        <div key={offer.id} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5 text-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                                                    {offer.profiles?.username?.[0] || 'V'}
                                                </div>
                                                <div>
                                                    <span className="block font-bold text-white">{offer.profiles?.username || 'Vendeur Inconnu'}</span>
                                                    <span className="text-xs text-text-muted">{offer.region} • {offer.price} F</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`block font-bold ${offer.stockCount > 0 ? 'text-white' : 'text-red-500'}`}>
                                                    {offer.stockCount || 0} clés
                                                </span>
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="text-sm text-text-muted italic px-4">Aucune offre active pour ce produit.</p>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
