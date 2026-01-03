"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Search, ShoppingCart, User, Globe, Menu, ChevronDown, Zap } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';

export default function Navbar() {
    const { cart, totalItems, totalPrice } = useCart();
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-surface border-b border-white/5 font-sans">
            {/* Top Bar (Trust & Tools) */}
            <div className="bg-[#0f0f0f] px-4 py-2 text-xs text-text-muted border-b border-white/5 hidden md:block">
                <div className="mx-auto flex max-w-[1600px] justify-between">
                    <div className="flex gap-6">
                        <span className="hover:text-white cursor-pointer transition-colors">Garantie NEXUS Shield™</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Vendre sur NEXUS</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Support 24/7</span>
                    </div>
                    <div className="flex gap-6">
                        <span className="hover:text-white cursor-pointer transition-colors">Télécharger l'app</span>
                        <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
                            <Globe className="h-3 w-3" />
                            <span>FR / XOF</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header (Dense & Efficient) */}
            <div className="mx-auto max-w-[1600px] px-4 py-4">
                <div className="flex items-center gap-8">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="relative h-10 w-32">
                            <Image
                                src="/logo.png"
                                alt="NEXUS"
                                fill
                                sizes="128px"
                                className="object-contain" // Fixed class
                                priority
                            />
                        </div>
                    </Link>

                    {/* Search Bar (Massive & Central) */}
                    <div className="flex-1 max-w-3xl hidden md:block">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Minecraft, FC 24, Carte PSN..."
                                className="w-full rounded-md bg-[#0a0a0a] border border-white/10 py-3 pl-12 pr-4 text-sm text-white placeholder-text-dark focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-dark group-focus-within:text-primary transition-colors" />
                            <div className="absolute top-1/2 -translate-y-1/2 right-2 rounded bg-surface-highlight px-2 py-1 text-xs text-text-muted border border-white/5">
                                CTRL+K
                            </div>
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center gap-4 shrink-0 ml-auto">
                        {user ? (
                            <Link href="/orders" className="hidden md:flex flex-col items-center gap-1 text-text-muted hover:text-white transition-colors group">
                                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                                    <User className="h-4 w-4" />
                                </div>
                                <span className="text-[10px] font-bold uppercase truncate max-w-[80px]">{user.user_metadata?.full_name?.split(' ')[0] || 'Compte'}</span>
                            </Link>
                        ) : (
                            <Link href="/login" className="hidden md:flex flex-col items-center gap-1 text-text-muted hover:text-white transition-colors group">
                                <User className="h-6 w-6 group-hover:text-primary transition-colors" />
                                <span className="text-[10px] font-bold uppercase">Connexion</span>
                            </Link>
                        )}
                        <div className="relative group z-50">
                            <Link href="/cart" className="flex flex-col items-center gap-1 text-text-muted hover:text-white transition-colors relative py-2">
                                <div className="relative">
                                    <ShoppingCart className="h-6 w-6 group-hover:text-primary transition-colors" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center border border-surface">{totalItems}</span>
                                    )}
                                </div>
                                <span className="text-[10px] font-bold uppercase">Panier</span>
                            </Link>

                            {/* Hover Dropdown */}
                            <div className="absolute top-full right-0 w-80 bg-[#0f0f0f] border border-white/10 rounded shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 before:absolute before:top-[-8px] before:right-6 before:border-l-8 before:border-l-transparent before:border-r-8 before:border-r-transparent before:border-b-8 before:border-b-white/10">
                                {totalItems === 0 ? (
                                    <div className="p-6 text-center">
                                        <p className="text-sm text-text-muted mb-4">Votre panier est vide</p>
                                        <Link href="/" className="text-xs font-bold text-primary hover:text-primary-hover uppercase">
                                            Commencer vos achats
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <div className="p-4 bg-surface max-h-[300px] overflow-y-auto">
                                            {cart.map((item) => (
                                                <div key={item.id} className="flex gap-3 mb-3 last:mb-0">
                                                    <div className="relative h-12 w-12 shrink-0 rounded bg-black overflow-hidden border border-white/5">
                                                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                                                        <div className="flex justify-between items-center text-xs mt-1">
                                                            <span className="text-text-muted">{item.platform}</span>
                                                            <span className="text-white font-medium">x{item.quantity}</span>
                                                        </div>
                                                        <div className="text-xs font-bold text-primary mt-0.5">{item.price.toLocaleString('fr-FR')} F</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 bg-[#0a0a0a] border-t border-white/5">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-sm text-text-muted">Total</span>
                                                <span className="text-lg font-black text-white">{totalPrice.toLocaleString('fr-FR')} F</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Link href="/cart" className="text-center py-2 rounded bg-white/5 hover:bg-white/10 text-xs font-bold text-white uppercase transition-colors">
                                                    Voir Panier
                                                </Link>
                                                <Link href="/checkout" className="text-center py-2 rounded bg-primary hover:bg-primary-hover text-xs font-bold text-white uppercase transition-colors">
                                                    Paiement
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <button className="md:hidden text-white">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Bar (Categorical) */}
            <div className="bg-surface border-t border-white/5 hidden md:block">
                <div className="mx-auto max-w-[1600px] px-4">
                    <nav className="flex items-center justify-center gap-2">
                        {['Jeux PC', 'Xbox', 'PSN', 'Nintendo', 'Logiciels', 'Cartes Cadeaux', 'Abonnements'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="flex items-center gap-1 px-5 py-3 text-sm font-bold text-text-muted hover:text-white hover:bg-surface-highlight transition-colors border-b-2 border-transparent hover:border-primary"
                            >
                                {item}
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </a>
                        ))}
                        <a href="#" className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-primary hover:text-primary-hover transition-colors">
                            Offres Flash <Zap className="h-4 w-4" />
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}
