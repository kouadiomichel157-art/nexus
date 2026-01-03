"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdminLoginPage() {
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
                    throw new Error('Identifiants administrateur incorrects.');
                }
                throw error;
            }

            // Successful login - Redirect to Admin Dashboard
            router.refresh();
            router.push('/admin');
        } catch (err: any) {
            setError(err.message || 'Erreur de connexion.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f1115] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 mb-4 shadow-xl">
                        <ShieldCheck className="h-8 w-8 text-slate-200" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Nexus Control Center</h1>
                    <p className="text-slate-400 text-sm mt-2">Accès restreint aux administrateurs</p>
                </div>

                <div className="bg-[#161b22] border border-slate-800 rounded-xl shadow-2xl p-8 backdrop-blur-sm">
                    {error && (
                        <div className="mb-6 p-3 bg-red-950/30 border border-red-900/50 rounded text-sm text-red-400 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Identifiant Admin
                            </label>
                            <div className="relative group">
                                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-slate-300 transition-colors" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="admin@nexus.com"
                                    className="w-full bg-[#0d1117] border border-slate-700/50 rounded-lg py-3 pl-10 pr-4 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all shadow-inner"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Clé de Sécurité
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-slate-300 transition-colors" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••••••"
                                    className="w-full bg-[#0d1117] border border-slate-700/50 rounded-lg py-3 pl-10 pr-4 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all shadow-inner"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-100 hover:bg-white text-slate-900 font-bold py-3 rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-lg shadow-slate-900/20"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Authentification...
                                </>
                            ) : (
                                <>
                                    Accéder au Dashboard
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-600">
                        Système sécurisé par Nexus Enterprise Security.<br />
                        Toute tentative d'intrusion sera signalée.
                    </p>
                </div>
            </div>
        </div>
    );
}
