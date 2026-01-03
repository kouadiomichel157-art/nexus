"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import { Lock, Mail, Phone, ArrowRight, ShieldCheck, Loader2, Smartphone, CreditCard, Bitcoin, Wallet, FileText, User, MapPin } from 'lucide-react';
import Link from 'next/link';

// Payment Configuration
const PAYMENT_GROUPS = [
    {
        id: 'cinetpay',
        name: 'Mobile Money',
        description: 'Wave, Orange Money, MTN',
        icon: Smartphone,
        color: '#ff7900',
        feePercent: 6.5,
        providers: ['Wave', 'Orange Money', 'MTN']
    },
    {
        id: 'cards',
        name: 'Carte Bancaire',
        description: 'Visa, Mastercard',
        icon: CreditCard,
        color: '#1a1f71',
        feePercent: 4.0,
        providers: ['Visa', 'Mastercard']
    },
    {
        id: 'crypto',
        name: 'Crypto-monnaies',
        description: 'BTC, ETH, USDT, TRX',
        icon: Bitcoin,
        color: '#f7931a',
        feePercent: 4.0,
        providers: ['BTC', 'ETH', 'USDT', 'TRX']
    },
    {
        id: 'binance',
        name: 'Binance Pay',
        description: 'Paiement rapide via Binance',
        icon: Wallet,
        color: '#fcd535',
        feePercent: 4.0,
        providers: ['Binance Pay']
    },
];

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useCart();
    const router = useRouter();

    // Deployment State
    const [email, setEmail] = useState('');
    const [method, setMethod] = useState('cinetpay');
    const [loading, setLoading] = useState(false);
    const [receiptRequested, setReceiptRequested] = useState(false);

    // Receipt Fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

    // Promo Code State
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<{ code: string, discount: number, type: 'percent' | 'fixed' } | null>(null);
    const [promoError, setPromoError] = useState('');

    // Redirect if cart is empty
    useEffect(() => {
        if (cart.length === 0) {
            router.push('/cart');
        }
    }, [cart, router]);

    // Promo Logic
    const handleApplyPromo = () => {
        setPromoError('');
        const code = promoCode.trim().toUpperCase();

        if (code === 'NEXUS10') {
            setAppliedPromo({ code: 'NEXUS10', discount: 10, type: 'percent' });
        } else if (code === 'WELCOME') {
            setAppliedPromo({ code: 'WELCOME', discount: 500, type: 'fixed' });
        } else {
            setPromoError('Code promo invalide');
            setAppliedPromo(null);
        }
    };

    // Fee Calculation & Totals
    const selectedMethod = PAYMENT_GROUPS.find(g => g.id === method) || PAYMENT_GROUPS[0];

    let subtotal = totalPrice;
    let discountAmount = 0;

    if (appliedPromo) {
        if (appliedPromo.type === 'percent') {
            discountAmount = Math.round(subtotal * (appliedPromo.discount / 100));
        } else {
            discountAmount = appliedPromo.discount;
        }
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const fees = Math.round(discountedSubtotal * (selectedMethod.feePercent / 100));
    const finalTotal = discountedSubtotal + fees;

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate Payment Processing
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Success
        clearCart();
        router.push('/checkout/success');
    };

    if (cart.length === 0) return null;

    return (
        <div className="min-h-screen bg-background text-text-main pb-20">
            <Navbar />

            <div className="mx-auto max-w-[1200px] px-4 py-8">
                <h1 className="text-2xl font-black text-white mb-8 flex items-center gap-2">
                    <Lock className="h-6 w-6 text-primary" />
                    Paiement Sécurisé
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT: PAYMENT FORM */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* 1. Contact Info */}
                        <div className="rounded-md bg-surface border border-white/5 p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-highlight text-xs border border-white/10">1</span>
                                Livraison
                            </h2>
                            <div>
                                <label className="block text-xs font-bold text-text-muted mb-1.5 uppercase">Email (Obligatoire)</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted transition-colors group-focus-within:text-white" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="votre@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded bg-[#0a0a0a] border border-white/10 py-3 pl-10 pr-4 text-white placeholder-text-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    />
                                </div>
                                <p className="text-[10px] text-text-muted mt-2 flex items-center gap-1">
                                    <ShieldCheck className="h-3 w-3" />
                                    Votre clé sera envoyée instantanément à cette adresse.
                                </p>
                            </div>

                            {/* Receipt Option */}
                            <div className="mt-6 border-t border-white/5 pt-4">
                                <label className="flex items-center gap-2 cursor-pointer select-none group">
                                    <input
                                        type="checkbox"
                                        checked={receiptRequested}
                                        onChange={(e) => setReceiptRequested(e.target.checked)}
                                        className="w-4 h-4 rounded border-white/10 bg-[#0a0a0a] text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm font-bold text-text-muted group-hover:text-white transition-colors">Je souhaite recevoir une facture PDF</span>
                                </label>

                                {/* Conditional Fields */}
                                {receiptRequested && (
                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div>
                                            <label className="block text-[10px] font-bold text-text-muted mb-1 uppercase">Prénom</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
                                                <input
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className="w-full rounded bg-[#0a0a0a] border border-white/10 py-2 pl-9 pr-3 text-sm text-white focus:border-primary outline-none transition-all"
                                                    placeholder="Jean"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-text-muted mb-1 uppercase">Nom</label>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full rounded bg-[#0a0a0a] border border-white/10 py-2 px-3 text-sm text-white focus:border-primary outline-none transition-all"
                                                placeholder="Kouassi"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-bold text-text-muted mb-1 uppercase">Adresse</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
                                                <input
                                                    type="text"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    className="w-full rounded bg-[#0a0a0a] border border-white/10 py-2 pl-9 pr-3 text-sm text-white focus:border-primary outline-none transition-all"
                                                    placeholder="Cocody, Abidjan"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 2. Payment Method */}
                        <div className="rounded-md bg-surface border border-white/5 p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-highlight text-xs border border-white/10">2</span>
                                Moyen de paiement
                            </h2>

                            <div className="space-y-3">
                                {PAYMENT_GROUPS.map((group) => {
                                    const Icon = group.icon;
                                    const isSelected = method === group.id;

                                    return (
                                        <div
                                            key={group.id}
                                            onClick={() => setMethod(group.id)}
                                            className={`relative px-4 py-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-center gap-4 group
                                        ${isSelected
                                                    ? 'bg-primary/5 border-primary shadow-[0_0_20px_rgba(224,79,0,0.1)]'
                                                    : 'bg-[#0a0a0a] border-white/5 hover:border-white/20 hover:bg-surface-highlight'
                                                }
                                    `}
                                        >
                                            {/* Radio Indicator */}
                                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-primary' : 'border-white/20'}`}>
                                                {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                                            </div>

                                            {/* Icon */}
                                            <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-surface border border-white/5 text-text-muted'}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>

                                            {/* Text Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className={`font-bold ${isSelected ? 'text-white' : 'text-text-main group-hover:text-white'}`}>{group.name}</span>
                                                    {/* Providers Labels */}
                                                    <div className="flex gap-1">
                                                        {group.providers.slice(0, 3).map(p => (
                                                            <span key={p} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-text-dark font-medium border border-white/5">{p}</span>
                                                        ))}
                                                        {group.providers.length > 3 && <span className="text-[10px] text-text-dark">...</span>}
                                                    </div>
                                                </div>
                                                <div className="text-xs text-text-muted mt-1 flex justify-between">
                                                    <span>{group.description}</span>
                                                    <span className={isSelected ? 'text-primary' : 'text-text-dark'}>Frais: +{group.feePercent}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT: ORDER SUMMARY */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 rounded-md bg-surface border border-white/5 p-6 shadow-card">
                            <h2 className="text-lg font-bold text-white mb-6">Résumé de la commande</h2>

                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3 text-sm">
                                        <div className="relative h-10 w-10 shrink-0 rounded bg-[#0a0a0a] overflow-hidden">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <h4 className="font-bold text-white line-clamp-1">{item.title}</h4>
                                                <span className="font-medium text-white ml-2">{item.price.toLocaleString('fr-FR')} F</span>
                                            </div>
                                            <div className="text-xs text-text-muted mt-0.5 flex justify-between">
                                                <span>{item.platform}</span>
                                                <span>x {item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/5 pt-4 space-y-3 mb-6 bg-surface-highlight/50 p-4 rounded border border-white/5">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-muted">Sous-total</span>
                                    <span className="text-white font-bold">{subtotal.toLocaleString('fr-FR')} F</span>
                                </div>

                                {appliedPromo && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-success">Réduction ({appliedPromo.code})</span>
                                        <span className="text-success font-bold">-{discountAmount.toLocaleString('fr-FR')} F</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-1.5 ">
                                        <span className="text-text-muted">Frais ({selectedMethod.name})</span>
                                    </div>
                                    <span className="text-text-muted font-medium">+{fees.toLocaleString('fr-FR')} F</span>
                                </div>
                                <div className="h-px bg-white/10 my-1"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-base font-bold text-white uppercase tracking-tight">Total TTC</span>
                                    <span className="text-3xl font-black text-primary tracking-tight">{finalTotal.toLocaleString('fr-FR')} F</span>
                                </div>
                            </div>

                            {/* Promo Code Input (Placed below summary) */}
                            <div className="mb-6">
                                <label className="block text-[10px] font-bold text-text-muted mb-2 uppercase">Code Promo</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Ex: NEXUS10"
                                        value={promoCode}
                                        onChange={(e) => {
                                            setPromoCode(e.target.value);
                                            setPromoError('');
                                        }}
                                        disabled={!!appliedPromo}
                                        className="flex-1 rounded bg-[#0a0a0a] border border-white/10 py-2 px-3 text-sm text-white focus:border-primary outline-none transition-all disabled:opacity-50 uppercase"
                                    />
                                    {appliedPromo ? (
                                        <button
                                            onClick={() => {
                                                setAppliedPromo(null);
                                                setPromoCode('');
                                            }}
                                            className="px-3 rounded bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 text-xs font-bold transition-colors"
                                        >
                                            X
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleApplyPromo}
                                            disabled={!promoCode}
                                            className="px-4 rounded bg-surface border border-white/10 hover:bg-white/5 text-white text-xs font-bold transition-colors disabled:opacity-50"
                                        >
                                            APPLIQUER
                                        </button>
                                    )}
                                </div>
                                {promoError && (
                                    <p className="text-[10px] text-red-500 mt-1.5 font-medium">{promoError}</p>
                                )}
                                {appliedPromo && (
                                    <p className="text-[10px] text-success mt-1.5 font-medium">
                                        Code {appliedPromo.code} appliqué ! (-{appliedPromo.discount}{appliedPromo.type === 'percent' ? '%' : ' F'})
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={loading || !email}
                                className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed text-white font-black uppercase py-4 rounded shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Traitement...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                        Payer {finalTotal.toLocaleString('fr-FR')} F
                                    </>
                                )}
                            </button>

                            <div className="mt-4 flex justify-center gap-4 grayscale opacity-50">
                                {/* Mock Payment Logs */}
                                <div className="h-5 w-8 bg-white/20 rounded"></div>
                                <div className="h-5 w-8 bg-white/20 rounded"></div>
                                <div className="h-5 w-8 bg-white/20 rounded"></div>
                            </div>

                            <div className="mt-4 text-center">
                                <p className="text-[10px] text-text-muted leading-relaxed">
                                    En validant votre paiement, vous acceptez nos CGV. <br />
                                    Vos données sont chiffrées (SSL) et ne sont jamais stockées.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
