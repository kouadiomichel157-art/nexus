"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Users, Tag, Settings, LogOut, PackagePlus } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const navigation = [
        { name: 'Vue d\'ensemble', href: '/admin', icon: LayoutDashboard },
        { name: 'Catalogue Jeux', href: '/admin/products', icon: ShoppingBag },
        { name: 'Ajouter un Jeu', href: '/admin/products/new', icon: PackagePlus },
        { name: 'Vendeurs', href: '/admin/vendors', icon: Users },
        { name: 'Offres', href: '/admin/offers', icon: Tag },
        { name: 'Paramètres', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#050505] flex font-sans text-text-main">
            {/* Sidebar */}
            <aside className="w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col fixed h-full z-20 shadow-2xl">
                <div className="p-8 border-b border-white/5 flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0">
                        <Image src="/logo.png" alt="Nexus" fill className="object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-white tracking-tighter text-lg leading-none">NEXUS</span>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Administrator</span>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-xs font-bold text-text-dark uppercase tracking-wider mb-2">Menu Principal</p>
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-primary text-white shadow-[0_0_20px_rgba(255,87,34,0.3)] border border-white/10'
                                    : 'text-text-muted hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5'
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-text-dark group-hover:text-primary'}`} />
                                {item.name}
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-white/5 bg-[#080808]">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-red-500 hover:text-white hover:bg-red-500 rounded-xl w-full transition-all duration-200 border border-transparent hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] group"
                    >
                        <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Déconnexion
                    </button>
                    <p className="text-[10px] text-center text-text-dark mt-4">NEXUS Admin v1.0.0</p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-10 max-w-[1920px]">
                {children}
            </main>
        </div>
    );
}
