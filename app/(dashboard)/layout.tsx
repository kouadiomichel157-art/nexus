"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Key, User, LogOut, Home } from 'lucide-react';
import Navbar from '@/components/layout/Navbar'; // Reusing main navbar if possible, or building a specific one? 
// Actually, usually dashboards have a specific sidebar+header layout. 
// Let's make a dedicated sidebar layout, maybe reuse the Navbar component or make a dashboard-specific header.
// Given "Simple & Pro", a sidebar is best.
import { createClient } from '@/utils/supabase/client';

const SIDEBAR_LINKS = [
    { label: 'Vue d\'ensemble', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Mes Commandes', href: '/orders', icon: ShoppingBag },
    { label: 'Ma Bibliothèque', href: '/keys', icon: Key },
    { label: 'Mon Profil', href: '/profile', icon: User },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-[#050505] flex font-sans">
            {/* Sidebar - Glassmorphism */}
            <aside className="w-72 fixed h-full z-30 hidden md:flex flex-col">
                <div className="h-full bg-[#0a0a0a]/80 backdrop-blur-xl border-r border-white/5 flex flex-col p-6">
                    <div className="mb-10 px-2">
                        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="h-10 w-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center font-black text-black text-xl">N</div>
                            <span className="font-black text-2xl text-white tracking-tighter">NEXUS</span>
                        </Link>
                    </div>

                    <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar">
                        <div>
                            <h3 className="px-4 text-xs font-black text-text-muted/60 uppercase tracking-widest mb-4">Menu Principal</h3>
                            <nav className="space-y-1">
                                {SIDEBAR_LINKS.map((link) => {
                                    const Icon = link.icon;
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all group ${isActive
                                                ? 'bg-primary text-black shadow-lg shadow-primary/25'
                                                : 'text-text-muted hover:bg-white/5 hover:text-white'
                                                } `}
                                        >
                                            <Icon className={`h-5 w-5 ${isActive ? 'text-black' : 'text-text-muted group-hover:text-white transition-colors'}`} />
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="px-4 py-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5">
                            <h4 className="text-white font-bold mb-1">Besoin d'aide ?</h4>
                            <p className="text-xs text-text-muted mb-4">Contactez le support 24/7</p>
                            <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors">
                                Support
                            </button>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 mt-auto">
                        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-text-muted hover:bg-white/5 hover:text-white transition-colors">
                            <Home className="h-5 w-5" />
                            Retour Boutique
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors mt-2"
                        >
                            <LogOut className="h-5 w-5" />
                            Déconnexion
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-72 min-h-screen flex flex-col relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-[#050505] to-[#050505]">
                {/* Mobile Header */}
                <header className="md:hidden h-20 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-20">
                    <Link href="/" className="font-black text-xl text-white tracking-tight">NEXUS</Link>
                    <button className="p-2 text-text-muted hover:text-white transition-colors">
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className="block w-full h-0.5 bg-current rounded-full"></span>
                            <span className="block w-full h-0.5 bg-current rounded-full"></span>
                            <span className="block w-full h-0.5 bg-current rounded-full"></span>
                        </div>
                    </button>
                </header>

                <div className="p-6 md:p-10 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
