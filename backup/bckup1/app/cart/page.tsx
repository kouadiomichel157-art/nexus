"use client";
import Navbar from '@/components/layout/Navbar';
import { useCart } from '@/context/CartContext';
import { Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
    const { cart, removeFromCart, addToCart, decreaseQuantity, totalPrice } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-background text-text-main">
                <Navbar />
                <div className="mx-auto max-w-[1200px] px-4 py-20 text-center">
                    <h1 className="text-3xl font-black text-white mb-4">Votre panier est vide</h1>
                    <p className="text-text-muted mb-8">Vous n'avez pas encore ajouté de produits.</p>
                    <Link href="/" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded uppercase tracking-wide transition-colors">
                        Commencer vos achats <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-text-main pb-20">
            <Navbar />
            <div className="mx-auto max-w-[1200px] px-4 py-8">
                <h1 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                    Mon Panier <span className="text-sm font-medium text-text-muted bg-surface px-2 py-1 rounded-full">{cart.length} articles</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-8 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 rounded bg-surface border border-white/5 hover:border-white/10 transition-colors">
                                {/* Image */}
                                <div className="relative h-20 w-32 shrink-0 rounded overflow-hidden bg-black">
                                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="font-bold text-white line-clamp-1">{item.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs font-bold text-text-dark uppercase px-1.5 py-0.5 rounded bg-white/5">{item.platform}</span>
                                                <span className="text-xs text-text-muted">Clé Digitale</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-black text-white text-lg">{item.price.toLocaleString('fr-FR')} F</div>
                                            {item.oldPrice && (
                                                <div className="text-xs text-text-dark line-through">{item.oldPrice.toLocaleString('fr-FR')} F</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4">
                                        <div className="flex items-center gap-3 bg-[#0a0a0a] rounded px-2 py-1 border border-white/5">
                                            <button
                                                onClick={() => decreaseQuantity(item.id)}
                                                className="h-6 w-6 flex items-center justify-center hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="text-sm font-bold text-white w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="h-6 w-6 flex items-center justify-center hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                                        >
                                            <Trash2 className="h-3 w-3" /> Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 rounded-md bg-surface border border-white/5 p-6">
                            <h2 className="text-lg font-bold text-white mb-6">Résumé de la commande</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-muted">Sous-total</span>
                                    <span className="text-white font-bold">{totalPrice.toLocaleString('fr-FR')} F</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-muted">Frais de service (0%)</span>
                                    <span className="text-success font-bold">GRATUIT</span>
                                </div>
                            </div>

                            <div className="border-t border-white/5 pt-4 mb-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-white">Total à payer</span>
                                    <span className="text-3xl font-black text-primary">{totalPrice.toLocaleString('fr-FR')} F</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="block w-full text-center bg-primary hover:bg-primary-hover text-white font-black uppercase py-4 rounded shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] mb-4">
                                Paiement Sécurisé
                            </Link>

                            <div className="flex items-center gap-2 justify-center text-xs text-text-muted">
                                <ShieldCheck className="h-3 w-3" />
                                <span>Transactions chiffrées SSL</span>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-2 opacity-50">
                                {/* Mock payment icons or text */}
                                <div className="h-6 bg-white/10 rounded"></div>
                                <div className="h-6 bg-white/10 rounded"></div>
                                <div className="h-6 bg-white/10 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
