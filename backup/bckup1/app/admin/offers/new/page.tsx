"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Save, Loader2, ArrowLeft, DollarSign, Package, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function NewOfferContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');
    const supabase = createClient();

    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

    const [formData, setFormData] = useState({
        price: '',
        stock: '99',
        region: 'Global',
        is_nexus_official: true
    });

    useEffect(() => {
        // Fetch User
        supabase.auth.getUser().then(({ data }) => setUser(data.user));

        // Fetch Product Details if productId provided
        if (productId) {
            supabase
                .from('products')
                .select('*')
                .eq('id', productId)
                .single()
                .then(({ data }) => {
                    if (data) setProduct(data);
                });
        }
    }, [productId, supabase]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product || !user) return;

        setLoading(true);

        const { error } = await supabase
            .from('offers')
            .insert([{
                product_id: product.id,
                vendor_id: user.id, // Current Admin as Vendor
                price: parseInt(formData.price),
                stock: parseInt(formData.stock),
                region: formData.region,
                is_nexus_official: formData.is_nexus_official
            }]);

        if (error) {
            alert('Erreur: ' + error.message);
            setLoading(false);
        } else {
            alert('Offre ajoutée avec succès !');
            router.push('/admin/products');
        }
    };

    if (!user) return <div className="p-8 text-center text-text-muted">Chargement...</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-6 mb-10">
                <Link href="/admin/products" className="group p-3 rounded-xl bg-surface border border-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300">
                    <ArrowLeft className="h-6 w-6 text-text-muted group-hover:text-white" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">Ajouter une Offre</h1>
                    <p className="text-text-muted">Définissez un prix et un stock pour ce produit.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Product Summary Card */}
                <div className="md:col-span-1">
                    {product ? (
                        <div className="bg-[#0f0f0f] rounded-2xl border border-white/5 overflow-hidden sticky top-8">
                            <div className="relative aspect-[3/4] w-full">
                                <Image
                                    src={product.image_url}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                    <h3 className="text-white font-bold leading-tight">{product.title}</h3>
                                </div>
                            </div>
                            <div className="p-4 space-y-2">
                                <div className="text-xs font-bold text-text-muted uppercase">Plateforme</div>
                                <div className="text-sm text-white bg-white/10 px-2 py-1 rounded w-fit">{product.platform}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-64 bg-white/5 rounded-2xl animate-pulse"></div>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">

                    <div className="bg-[#0f0f0f] p-8 rounded-2xl border border-white/5 shadow-xl space-y-6">

                        <div>
                            <label className="block text-sm font-bold text-text-muted mb-2 uppercase tracking-wider">Prix (XOF)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="ex: 15000"
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-xl text-white font-bold focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-text-muted mb-2 uppercase tracking-wider">Stock</label>
                                <div className="relative">
                                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-primary outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-text-muted mb-2 uppercase tracking-wider">Région</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                                    <input
                                        type="text"
                                        name="region"
                                        value={formData.region}
                                        onChange={handleChange}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-primary outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <span className="block font-bold text-white text-sm">Vendeur Officiel Nexus</span>
                                    <span className="text-xs text-text-muted">Cocher si vendu par la plateforme</span>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="is_nexus_official"
                                        checked={formData.is_nexus_official}
                                        onChange={handleCheckbox}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </div>
                            </label>
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(255,87,34,0.3)] hover:shadow-[0_0_50px_rgba(255,87,34,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-3"
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                        Mettre en Vente
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function NewOfferPage() {
    return (
        <Suspense fallback={<div className="text-white p-10">Chargement...</div>}>
            <NewOfferContent />
        </Suspense>
    );
}
