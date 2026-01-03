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
        <div className="min-h-screen bg-[#0a0a0a] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-surface border-r border-white/5 flex flex-col fixed h-full z-20 hidden md:flex">
                <div className="p-6 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="h-7 w-7 bg-primary rounded shadow-sm flex items-center justify-center font-bold text-white text-sm">N</div>
                        <span className="font-bold text-lg text-white tracking-tight">NEXUS</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {SIDEBAR_LINKS.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items - center gap - 3 px - 3 py - 2.5 rounded - md text - sm font - medium transition - all ${isActive
                                        ? 'bg-white/10 text-white'
                                        : 'text-text-muted hover:bg-white/5 hover:text-white'
                                    } `}
                            >
                                <Icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-text-muted hover:bg-white/5 hover:text-white transition-colors">
                        <Home className="h-4 w-4" />
                        Retour Boutique
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-danger hover:bg-danger/10 transition-colors mt-1"
                    >
                        <LogOut className="h-4 w-4" />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 bg-[#0a0a0a] min-h-screen flex flex-col">
                {/* Mobile Header (Visible only on mobile) */}
                <header className="md:hidden h-16 bg-surface border-b border-white/5 flex items-center justify-between px-4 sticky top-0 z-20">
                    <Link href="/" className="font-bold text-white">NEXUS</Link>
                    <button className="p-2 text-text-muted">
                        {/* Hamburger Menu would go here */}
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className="block w-full h-0.5 bg-current"></span>
                            <span className="block w-full h-0.5 bg-current"></span>
                            <span className="block w-full h-0.5 bg-current"></span>
                        </div>
                    </button>
                </header>

                <div className="p-8 max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
