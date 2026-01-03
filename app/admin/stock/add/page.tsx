"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/utils/supabase/types';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

type Product = Database['public']['Tables']['products']['Row'];
type Offer = Database['public']['Tables']['offers']['Row'] & {
    profiles: { username: string } | null;
};

export default function AddStockPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [selectedOfferId, setSelectedOfferId] = useState<string>('');
    const [keysInput, setKeysInput] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const router = useRouter();
    const supabase = createClient();

    // 1. Fetch Products on Mount
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await supabase.from('products').select('*').order('title');
            if (data) setProducts(data);
            setIsLoading(false);
        };
        fetchProducts();
    }, []);

    // 2. Fetch Offers when Product Selected
    useEffect(() => {
        if (!selectedProduct) {
            setOffers([]);
            setSelectedOfferId('');
            return;
        }

        const fetchOffers = async () => {
            const { data } = await supabase
                .from('offers')
                .select('*, profiles(username)')
                .eq('product_id', selectedProduct.id);

            if (data) setOffers(data);
        };
        fetchOffers();
    }, [selectedProduct]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        if (!selectedOfferId) {
            setStatus({ type: 'error', message: 'Veuillez sélectionner une offre.' });
            setIsSubmitting(false);
            return;
        }

        // Parse keys (split by newline, trim, filter empty)
        const rawKeys = keysInput.split('\n').map(k => k.trim()).filter(k => k.length > 0);

        if (rawKeys.length === 0) {
            setStatus({ type: 'error', message: 'Aucune clé valide détectée.' });
            setIsSubmitting(false);
            return;
        }

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Non authentifié');

            // Bulk Insert
            const inserts = rawKeys.map(code => ({
                offer_id: selectedOfferId,
                code: code,
                is_sold: false
            }));

            const { error } = await supabase.from('keys').insert(inserts);

            if (error) throw error;

            setStatus({ type: 'success', message: `${rawKeys.length} clés ajoutées avec succès.` });
            setKeysInput(''); // Reset form

            // Redirect after short delay
            setTimeout(() => router.push('/admin/stock'), 1500);

        } catch (err: any) {
            console.error(err);
            setStatus({ type: 'error', message: err.message || "Erreur lors de l'ajout des clés." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <Link href="/admin/stock" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="h-6 w-6 text-white" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight">Ajouter du Stock</h1>
                    <p className="text-text-muted text-sm">Importez des clés de licence pour une offre existante.</p>
                </div>
            </div>

            <div className="bg-[#0f1115] border border-white/5 rounded-xl p-8 shadow-2xl">
                {status && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {status.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                        <span className="font-bold">{status.message}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 1. Product Select */}
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase mb-2">Produit Concerné</label>
                        <select
                            className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            value={selectedProduct?.id || ''}
                            onChange={(e) => {
                                const prod = products.find(p => p.id === e.target.value);
                                setSelectedProduct(prod || null);
                            }}
                            disabled={isLoading}
                        >
                            <option value="">-- Sélectionner un jeu --</option>
                            {products.map(p => (
                                <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                        </select>
                    </div>

                    {/* 2. Offer Select */}
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase mb-2">Offre Cible (Vendeur / Prix)</label>
                        <select
                            className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                            value={selectedOfferId}
                            onChange={(e) => setSelectedOfferId(e.target.value)}
                            disabled={!selectedProduct || offers.length === 0}
                        >
                            <option value="">-- Sélectionner une offre --</option>
                            {offers.map(o => (
                                <option key={o.id} value={o.id}>
                                    {o.profiles?.username || 'Vendeur'} - {o.region} - {o.price} F
                                </option>
                            ))}
                        </select>
                        {selectedProduct && offers.length === 0 && (
                            <p className="text-xs text-red-400 mt-2">Aucune offre trouvée pour ce produit. Créez d'abord une offre.</p>
                        )}
                    </div>

                    {/* 3. Keys Input */}
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase mb-2">
                            Liste des Clés (Une par ligne)
                        </label>
                        <textarea
                            className="w-full bg-black border border-white/10 rounded-lg p-4 text-sm text-white font-mono placeholder:text-text-muted/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-64 resize-none"
                            placeholder={"XXXX-XXXX-XXXX-XXXX\nYYYY-YYYY-YYYY-YYYY\n..."}
                            value={keysInput}
                            onChange={(e) => setKeysInput(e.target.value)}
                            disabled={!selectedOfferId}
                            spellCheck={false}
                        />
                        <div className="flex justify-between mt-2 text-xs text-text-muted">
                            <span>Format libre (sera nettoyé)</span>
                            <span>{keysInput.split('\n').filter(k => k.trim().length > 0).length} clés détectées</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !selectedOfferId || !keysInput.trim()}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Importation...
                            </>
                        ) : (
                            <>
                                <Save className="h-5 w-5" />
                                Importer les Clés
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
