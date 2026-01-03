"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { ShoppingBag, Users, DollarSign, Tag, TrendingUp, PackagePlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminDashboardPage() {
    const supabase = createClient();
    const [stats, setStats] = useState({
        products: 0,
        users: 0,
        offers: 0,
        revenue: 0 // Mock revenue for now
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
            const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
            const { count: offerCount } = await supabase.from('offers').select('*', { count: 'exact', head: true });

            // For revenue we would usually sum orders, mock for now or fetch real if orders table exists
            setStats({
                products: productCount || 0,
                users: userCount || 0,
                offers: offerCount || 0,
                revenue: 1540000 // Mock: 1.5M FCFA
            });
            setLoading(false);
        };
        fetchStats();
    }, []);

    const statCards = [
        { name: 'Ventes Totales', value: `${(stats.revenue).toLocaleString()} F`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
        { name: 'Utilisateurs', value: stats.users, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'Produits', value: stats.products, icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10' },
        { name: 'Offres Actives', value: stats.offers, icon: Tag, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">Vue d'ensemble</h1>
                    <p className="text-text-muted">Bienvenue sur le dashboard administrateur de Nexus.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                    <PackagePlus className="h-5 w-5" />
                    Ajouter un Jeu
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <div key={stat.name} className="bg-[#0f0f0f] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            {loading && <div className="h-2 w-12 bg-white/10 rounded animate-pulse" />}
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-text-muted text-sm font-bold uppercase tracking-wider">{stat.name}</h3>
                            <p className="text-2xl font-black text-white">{loading ? "-" : stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity Mock */}
                <div className="bg-[#0f0f0f] rounded-2xl border border-white/5 p-6">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Activité Récente
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                    N
                                </div>
                                <div>
                                    <p className="text-sm text-white font-medium">Nouvelle commande #CMD-{1000 + i}</p>
                                    <p className="text-xs text-text-muted">Il y a {i * 5} minutes</p>
                                </div>
                                <div className="ml-auto font-bold text-white">+ 15,000 F</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-[#0f0f0f] rounded-2xl border border-white/5 p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Actions Rapides</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/products" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-center group">
                            <ShoppingBag className="h-8 w-8 text-text-muted group-hover:text-white mx-auto mb-3 transition-colors" />
                            <span className="text-sm font-bold text-white block">Gérer le Catalogue</span>
                        </Link>
                        <Link href="/admin/offers" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-center group">
                            <Tag className="h-8 w-8 text-text-muted group-hover:text-white mx-auto mb-3 transition-colors" />
                            <span className="text-sm font-bold text-white block">Gérer les Offres</span>
                        </Link>
                        <Link href="/admin/users" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-center group">
                            <Users className="h-8 w-8 text-text-muted group-hover:text-white mx-auto mb-3 transition-colors" />
                            <span className="text-sm font-bold text-white block">Utilisateurs</span>
                        </Link>
                        <Link href="/" className="p-4 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all text-center group">
                            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                            <span className="text-sm font-bold text-white block">Voir le Site</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
