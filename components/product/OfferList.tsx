"use client";

import { ShoppingCart, ShieldCheck, User } from 'lucide-react';
import { Database } from '@/utils/supabase/types';

type Offer = Database['public']['Tables']['offers']['Row'] & {
    profiles: {
        username: string | null;
        avatar_url: string | null;
    } | null;
};

interface OfferListProps {
    offers: Offer[];
    bestPrice: number;
}

export default function OfferList({ offers, bestPrice }: OfferListProps) {
    if (!offers || offers.length === 0) return null;

    // Sort: Nexus Official first, then Price ASC
    const sortedOffers = [...offers].sort((a, b) => {
        if (a.is_nexus_official && !b.is_nexus_official) return -1;
        if (!a.is_nexus_official && b.is_nexus_official) return 1;
        return a.price - b.price;
    });

    return (
        <div className="rounded-md bg-surface border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-[#141414] flex justify-between items-center">
                <h2 className="font-bold text-white flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Autres Vendeurs
                </h2>
                <span className="text-xs text-text-muted">{offers.length} offres disponibles</span>
            </div>

            <div className="divide-y divide-white/5">
                {sortedOffers.map((offer) => (
                    <div key={offer.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">

                        {/* Vendor Info */}
                        <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs ${offer.is_nexus_official ? 'bg-primary text-white border-2 border-white/10' : 'bg-surface-highlight text-text-muted'}`}>
                                {offer.is_nexus_official ? 'N' : (offer.profiles?.username?.[0] || 'V').toUpperCase()}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm font-bold ${offer.is_nexus_official ? 'text-primary' : 'text-white'}`}>
                                        {offer.is_nexus_official ? 'NEXUS Official' : (offer.profiles?.username || 'Vendeur Inconnu')}
                                    </span>
                                    {offer.is_nexus_official && <ShieldCheck className="h-3 w-3 text-primary" />}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-text-muted">
                                    <span>{offer.region}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                    <span className="text-green-500">En Stock</span>
                                </div>
                            </div>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <span className={`block font-black ${offer.price === bestPrice ? 'text-green-400' : 'text-white'}`}>
                                    {offer.price.toLocaleString()} F
                                </span>
                            </div>
                            <button
                                className={`p-2 rounded transition-colors ${offer.is_nexus_official
                                        ? 'bg-primary hover:bg-primary-hover text-white'
                                        : 'bg-white/10 hover:bg-white/20 text-white'
                                    }`}
                                title="Ajouter au panier"
                            >
                                <ShoppingCart className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
