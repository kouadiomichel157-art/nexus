"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { Check, CheckCircle2, ChevronRight, Copy, Download, Home, Loader2, Package, ShieldCheck, Gamepad2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import Image from 'next/image';

// Simulated items (Pass via context in real app, mocked here for success page demo)
const MOCK_ITEMS = [
    {
        id: 'fc24',
        title: 'EA SPORTS FC 24 - Standard Edition PC',
        price: 34900,
        image: 'https://cdn.g2a.com/x/thumb/1140x577/1x1x1/ea-sports-fc-24-pc-ea-app-key-global-i10000336595015/8468722c1d484725916053f1',
        platform: 'EA App'
    }
];

export default function SuccessPage() {
    const [orderId, setOrderId] = useState('');
    const [currentStep, setCurrentStep] = useState(0);
    const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
    const [decryptedKeys, setDecryptedKeys] = useState<Record<string, string>>({}); // Store actual keys only when needed
    const [confirmingItem, setConfirmingItem] = useState<string | null>(null);
    const [acceptedWarning, setAcceptedWarning] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Mock Obfuscated Keys (Base64 encoded to prevent simple "Inspect Source" reads)
    // "XXXX-YYYY-ZZZZ-NEXUS" -> "WFhYWC1ZWVlZLVaWVaWi1ORVhVUw=="
    const ENCRYPTED_KEYS: Record<string, string> = {
        'fc24': 'WFhYWC1ZWVlZLVaWVaWi1ORVhVUw==' // Base64 for "XXXX-YYYY-ZZZZ-NEXUS"
    };

    // Load state from LocalStorage on mount
    useEffect(() => {
        setIsClient(true);
        const saved = localStorage.getItem('nexus_revealed_keys');
        if (saved) {
            const parsed = JSON.parse(saved);
            setRevealedKeys(parsed);

            // Restore decrypted keys for already revealed items
            const restoredDecrypted: Record<string, string> = {};
            Object.keys(parsed).forEach(id => {
                if (parsed[id] && ENCRYPTED_KEYS[id]) {
                    try {
                        restoredDecrypted[id] = atob(ENCRYPTED_KEYS[id]);
                    } catch (e) {
                        console.error("Key decode error", e);
                    }
                }
            });
            setDecryptedKeys(restoredDecrypted);
        }
    }, []);

    const handleRevealClick = (itemId: string) => {
        setConfirmingItem(itemId);
        setAcceptedWarning(false);
    };

    const confirmReveal = () => {
        if (confirmingItem && acceptedWarning) {
            const newRevealed = { ...revealedKeys, [confirmingItem]: true };

            // Update State
            setRevealedKeys(newRevealed);

            try {
                const decoded = atob(ENCRYPTED_KEYS[confirmingItem] || '');
                setDecryptedKeys(prev => ({ ...prev, [confirmingItem]: decoded }));
            } catch (error) {
                console.error("Failed to decode key", error);
                setDecryptedKeys(prev => ({ ...prev, [confirmingItem]: "Erreur de décodage" }));
            }

            // Persist
            localStorage.setItem('nexus_revealed_keys', JSON.stringify(newRevealed));

            setConfirmingItem(null);
            triggerConfetti();
        }
    };

    // ... (stepper effect)

    // ... inside render loop



    // Steps configuration
    const steps = [
        { id: 1, label: 'Paiement Validé' },
        { id: 2, label: 'Traitement' },
        { id: 3, label: 'Livraison' }
    ];

    useEffect(() => {
        // Generate random Order ID
        setOrderId(`NXS-${Math.floor(100000 + Math.random() * 900000)}`);

        // Step Simulation Sequence
        const timer1 = setTimeout(() => setCurrentStep(1), 1000); // Validation -> Traitement
        const timer2 = setTimeout(() => setCurrentStep(2), 2500); // Traitement -> Livraison
        const timer3 = setTimeout(() => {
            setCurrentStep(3); // Complete
            // triggerConfetti(); // Confetti now triggers on manual key reveal
        }, 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const triggerConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <div className="min-h-screen bg-background text-text-main pb-20">
            <Navbar />

            <div className="mx-auto max-w-[800px] px-4 py-12">

                {/* 1. Stepper Header in Circles (Neon Redesign) */}
                <div className="mb-12 pt-8">
                    <div className="relative flex justify-between items-center w-full max-w-[500px] mx-auto z-10">
                        {/* Connecting Line Base */}
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#1a1a1a] -z-20 rounded-full"></div>

                        {/* Active Progress Line with Glow */}
                        <div
                            className="absolute top-1/2 left-0 h-[2px] bg-[#00ff88] -z-10 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_#00ff88]"
                            style={{ width: `${(Math.min(currentStep, 2) / 2) * 100}%` }}
                        ></div>

                        {steps.map((step, index) => {
                            const isCompleted = currentStep > index; // Completed steps
                            const isActive = currentStep === index; // Current animating step
                            const isWitnessed = currentStep >= index; // Visible steps (past or present)

                            return (
                                <div key={step.id} className="flex flex-col items-center gap-4 relative">
                                    {/* Circle */}
                                    <div className={`
                                        h-14 w-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-[#0f0f0f] z-10
                                        ${isWitnessed
                                            ? 'border-[#00ff88] text-[#00ff88] shadow-[0_0_30px_rgba(0,255,136,0.3)] scale-110'
                                            : 'border-white/10 text-white/20'
                                        }
                                    `}>
                                        {isWitnessed ? (
                                            <Check className="h-6 w-6 drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]" strokeWidth={3} />
                                        ) : (
                                            <span className="text-sm font-bold">{step.id}</span>
                                        )}
                                    </div>

                                    {/* Label */}
                                    <span className={`
                                        absolute top-20 w-32 text-center text-[11px] font-black uppercase tracking-widest transition-all duration-500
                                        ${isWitnessed
                                            ? 'text-[#00ff88] drop-shadow-[0_0_10px_rgba(0,255,136,0.6)]'
                                            : 'text-text-muted opacity-50'
                                        }
                                    `}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 2. Order Summary Card */}
                <div className={`bg-surface border border-white/5 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ${currentStep >= 3 ? 'scale-100 opacity-100' : 'scale-95 opacity-90'}`}>

                    {/* Header */}
                    <div className="bg-[#0f0f0f] border-b border-white/5 p-6 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded bg-success/10 flex items-center justify-center text-success">
                                <Package className="h-5 w-5" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">Commande {currentStep === 3 ? 'Terminée' : 'En cours...'}</h1>
                                <p className="text-xs text-text-muted">ID: <span className="font-mono text-white/70">{orderId}</span></p>
                            </div>
                        </div>
                        {currentStep < 3 && (
                            <div className="flex items-center gap-2 text-primary text-sm font-bold animate-pulse">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Traitement...
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        {/* Current Status Message */}
                        <div className="mb-8 text-center">
                            {currentStep === 0 && <p className="text-text-muted">Nous vérifions votre paiement...</p>}
                            {currentStep === 1 && <p className="text-text-muted">Préparation de votre clé unique...</p>}
                            {currentStep === 2 && <p className="text-text-muted">Sécurisation et envoi des données...</p>}
                            {currentStep === 3 && (
                                <div className="text-success flex flex-col items-center gap-2 animate-in zoom-in duration-300">
                                    <CheckCircle2 className="h-12 w-12" />
                                    <h2 className="text-2xl font-black text-white">Tout est prêt !</h2>
                                    <p className="text-text-muted mb-4">Votre clé est disponible ci-dessous.</p>
                                </div>
                            )}
                        </div>

                        {/* Order Recap Items with Key Logic */}
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-end mb-4">
                                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Vos Produits</h3>
                                <p className="text-[10px] text-text-muted/80">Cliquez sur <span className="text-white">"Afficher"</span> pour révéler vos clés.</p>
                            </div>

                            {MOCK_ITEMS.map((item) => (
                                <div key={item.id} className=" bg-[#0a0a0a] p-4 rounded-lg border border-white/5 transition-all hover:border-white/10 relative overflow-hidden group">
                                    <div className="flex gap-4 items-center relative z-10">
                                        <div className="h-16 w-16 bg-surface rounded border border-white/5 overflow-hidden relative shrink-0">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-white truncate">{item.title}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs bg-white/5 text-text-muted px-2 py-0.5 rounded border border-white/5">
                                                    {item.platform}
                                                </span>
                                                {revealedKeys[item.id] && (
                                                    <span className="text-[10px] font-bold text-success flex items-center gap-1 bg-success/10 px-2 py-0.5 rounded animate-in fade-in">
                                                        <Check className="h-3 w-3" />
                                                        Clé affichée
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-right shrink-0">
                                            {!revealedKeys[item.id] ? (
                                                currentStep >= 3 ? (
                                                    <button
                                                        onClick={() => handleRevealClick(item.id)}
                                                        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
                                                    >
                                                        <ShieldCheck className="h-4 w-4" />
                                                        Afficher le code
                                                    </button>
                                                ) : (
                                                    <div className="px-4 py-2 bg-white/5 text-text-muted text-xs font-bold rounded cursor-not-allowed flex items-center gap-2 opacity-50">
                                                        <Loader2 className="h-3 w-3 animate-spin" />
                                                        Préparation...
                                                    </div>
                                                )
                                            ) : (
                                                <div className="flex flex-col items-end gap-1 animate-in fade-in zoom-in duration-300">
                                                    <div className="flex items-center gap-2">
                                                        <code className="bg-surface-highlight border border-white/10 px-3 py-1.5 rounded text-sm font-mono font-bold text-white select-all relative overflow-hidden group/code">
                                                            {decryptedKeys[item.id] || ''}
                                                        </code>
                                                        <button
                                                            onClick={() => decryptedKeys[item.id] && navigator.clipboard.writeText(decryptedKeys[item.id])}
                                                            className="p-1.5 hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                                                            title="Copier"
                                                        >
                                                            <Copy className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Confirmation Overlay (Inline) */}
                                    {confirmingItem === item.id && (
                                        <div className="absolute inset-0 bg-[#0a0a0a] z-20 flex flex-col justify-center items-center p-4 animate-in fade-in slide-in-from-right-10 duration-200">
                                            <div className="w-full max-w-lg flex items-center justify-between gap-4">
                                                <div className="flex items-start gap-3 text-left">
                                                    <div className="p-2 bg-yellow-500/10 rounded-full text-yellow-500 shrink-0">
                                                        <ShieldCheck className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white leading-tight">Attention : Non remboursable</p>
                                                        <p className="text-[11px] text-text-muted mt-0.5">La révélation de la clé renonce à votre droit de rétractation.</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 shrink-0">
                                                    <label className="flex items-center gap-2 cursor-pointer group">
                                                        <input
                                                            type="checkbox"
                                                            checked={acceptedWarning}
                                                            onChange={(e) => setAcceptedWarning(e.target.checked)}
                                                            className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/50 transition-all cursor-pointer"
                                                        />
                                                        <span className="text-xs font-bold text-text-muted group-hover:text-white transition-colors select-none">J'accepte</span>
                                                    </label>

                                                    <div className="h-8 w-px bg-white/10 mx-1"></div>

                                                    <button
                                                        onClick={() => setConfirmingItem(null)}
                                                        className="px-3 py-1.5 hover:bg-white/5 text-xs font-bold text-text-muted hover:text-white rounded transition-colors"
                                                    >
                                                        Annuler
                                                    </button>
                                                    <button
                                                        onClick={confirmReveal}
                                                        disabled={!acceptedWarning}
                                                        className="px-4 py-1.5 bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold rounded transition-all active:scale-95"
                                                    >
                                                        Confirmer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Actions (removed global key section) */}
                        <div className={`flex justify-center gap-4 transition-opacity duration-500 ${currentStep === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <Link href="/" className="flex items-center gap-2 px-6 py-3 rounded bg-white/5 hover:bg-white/10 text-sm font-bold text-white transition-colors">
                                <Home className="h-4 w-4" />
                                Boutique
                            </Link>
                            <button className="flex items-center gap-2 px-6 py-3 rounded bg-surface border border-white/10 hover:border-white/30 text-sm font-bold text-white transition-colors">
                                <Download className="h-4 w-4" />
                                Facture PDF
                            </button>
                        </div>

                    </div>

                    {/* Footer Progress Bar */}
                    <div className="h-1 w-full bg-[#0a0a0a]">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        ></div>
                    </div>
                </div>

            </div>
        </div>
    );
}
