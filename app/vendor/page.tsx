"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { ShoppingBag, Tag, TrendingUp, Store } from 'lucide-react';
import Link from 'next/link';

export default function VendorDashboardPage() {
    const supabase = createClient();
    const [stats, setStats] = useState({
        offers: 0,
        sales: 0,
        revenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            // Mock data for now, would be replaced by real queries filtered by vendor_id
            setLoading(false);
            setStats({
                offers: 12,
                sales: 45,
                revenue: 450000
            });
        };
        fetchStats();
    }, []);

    const statCards = [
        { name: 'Chiffre d\'affaires', value: `${(stats.revenue).toLocaleString()} F`, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
        { name: 'Ventes', value: stats.sales, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'Offres Actives', value: stats.offers, icon: Tag, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    return (
        <div className="min-h-screen bg-[#060b10] p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
                            <Store className="h-8 w-8 text-sky-500" />
                            Espace Partenaire
                        </h1>
                        <p className="text-sky-200/60">Gérez votre boutique et suivez vos performances.</p>
                    </div>
                    <Link
                        href="/vendor/offers/new"
                        className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-sky-900/20"
                    >
                        <Tag className="h-5 w-5" />
                        Nouvelle Offre
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {statCards.map((stat) => (
                        <div key={stat.name} className="bg-[#0c1219] p-6 rounded-2xl border border-sky-900/20 hover:border-sky-500/30 transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sky-200/50 text-sm font-bold uppercase tracking-wider">{stat.name}</h3>
                                <p className="text-2xl font-black text-white">{loading ? "-" : stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-[#0c1219] rounded-2xl border border-sky-900/20 p-8 text-center py-12">
                    <p className="text-sky-200/40">Aucune activité récente à afficher.</p>
                </div>
            </div>
        </div>
    );
}
