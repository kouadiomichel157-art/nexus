"use client";
import { ShieldCheck, Zap, Globe, AlertCircle } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/mock-data';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface ProductActionsProps {
    product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
    const { price, oldPrice, stock, region, platform } = product;
    const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

    const { addToCart } = useCart();
    const router = useRouter();

    const handleBuy = () => {
        addToCart(product);
        router.push('/cart');
    };

    return (
        <div className="sticky top-24 rounded-md bg-surface border border-white/5 p-6 shadow-card">
            {/* Price Block */}
            <div className="mb-6">
                <div className="text-xs text-text-muted mb-1">Prix Total</div>
                <div className="flex items-end gap-3 transition-all">
                    <span className="text-4xl font-black text-primary tracking-tight">
                        {price.toLocaleString('fr-FR')} F
                    </span>
                    {oldPrice && (
                        <div className="flex flex-col mb-1">
                            <span className="text-sm text-text-dark line-through">
                                {oldPrice.toLocaleString('fr-FR')} F
                            </span>
                            <span className="text-xs font-bold text-success bg-success/10 px-1.5 rounded">
                                Save {discount}%
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Main CTA */}
            <button
                onClick={handleBuy}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-black uppercase text-lg py-4 rounded transition-all shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
            >
                <ShoppingCart className="h-5 w-5" />
                Acheter Maintenant
            </button>

            <div className="mt-3 text-center text-xs text-text-muted">
                Paiement sécurisé · Pas de frais cachés
            </div>

            <div className="my-6 border-b border-white/5"></div>

            {/* Key Info List */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#0a0a0a] text-primary border border-white/5">
                        <Zap className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="text-xs text-text-muted font-medium">Livraison</div>
                        <div className="text-sm text-white font-bold">Immédiate (Email)</div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#0a0a0a] text-secondary border border-white/5">
                        <Globe className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="text-xs text-text-muted font-medium">Région</div>
                        <div className="text-sm text-white font-bold">{region}</div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#0a0a0a] text-success border border-white/5">
                        <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="text-xs text-text-muted font-medium">Stock</div>
                        <div className="text-sm text-white font-bold">{stock}</div>
                    </div>
                </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 p-3 rounded bg-[#0a0a0a]/50 border border-white/5 flex gap-2">
                <AlertCircle className="h-4 w-4 text-text-muted shrink-0 mt-0.5" />
                <div className="text-xs text-text-muted leading-relaxed">
                    Ce produit est une clé digitale officielle. Elle sera affichée sur votre écran et envoyée par email immédiatement après le paiement.
                </div>
            </div>

        </div>
    );
}
