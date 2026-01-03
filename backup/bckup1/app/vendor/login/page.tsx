"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Store, Key, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function VendorLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                if (error.message.includes('Invalid login credentials')) {
                    throw new Error('Email ou mot de passe incorrect.');
                }
                throw error;
            }

            // Successful login - Redirect to Admin Dashboard (Vendor Area)
            router.refresh();
            router.push('/admin');
        } catch (err: any) {
            setError(err.message || 'Erreur de connexion.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#060b10] flex items-center justify-center p-4">
            {/* Background decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-full h-[500px] bg-sky-900/10 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-full h-[500px] bg-teal-900/10 rounded-full blur-[120px] translate-y-1/2" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-900/50 to-teal-900/50 border border-sky-800/50 mb-6 shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                        <Store className="h-9 w-9 text-sky-200" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Nexus Partners</h1>
                    <p className="text-sky-200/60 text-sm">Gérez vos offres et développez votre audience</p>
                </div>

                <div className="bg-[#0c1219]/80 border border-sky-900/30 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-200 flex items-center gap-3">
                            <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs font-semibold text-sky-200/50 uppercase tracking-wider ml-1">
                                Email Professionnel
                            </label>
                            <div className="relative group">
                                <Store className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-700 group-focus-within:text-sky-400 transition-colors" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="contact@votre-boutique.com"
                                    className="w-full bg-[#0a1016] border border-sky-900/40 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm placeholder:text-sky-900/50 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label htmlFor="password" className="text-xs font-semibold text-sky-200/50 uppercase tracking-wider">
                                    Mot de passe
                                </label>
                                <a href="#" className="text-xs text-sky-400 hover:text-sky-300 transition-colors">
                                    Mot de passe oublié ?
                                </a>
                            </div>
                            <div className="relative group">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-700 group-focus-within:text-sky-400 transition-colors" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••••••"
                                    className="w-full bg-[#0a1016] border border-sky-900/40 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm placeholder:text-sky-900/50 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2 shadow-lg shadow-sky-900/20"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Connexion en cours...
                                </>
                            ) : (
                                <>
                                    Accéder à l'espace Vendeur
                                    <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-sky-200/40">
                        Vous souhaitez devenir partenaire Nexus ?{' '}
                        <a href="#" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
                            Postuler ici
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
