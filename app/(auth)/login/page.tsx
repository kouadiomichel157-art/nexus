"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
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
                // Translated error messages for better UX
                if (error.message.includes('Invalid login credentials')) {
                    throw new Error('Email ou mot de passe incorrect.');
                }
                throw error;
            }

            // Successful login
            router.refresh();
            router.push('/orders');
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-surface border border-white/5 rounded-lg shadow-card p-8">
            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-white">Connexion</h2>
                <p className="text-sm text-text-muted mt-1">Accédez à votre espace client</p>
            </div>

            {error && (
                <div className="mb-6 p-3 bg-danger/10 border border-danger/20 rounded text-sm text-danger flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                        Email
                    </label>
                    <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-white transition-colors" />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="exemple@email.com"
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-md py-2.5 pl-10 pr-4 text-white text-sm placeholder:text-text-dark focus:outline-none focus:border-primary transition-colors"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Mot de passe
                        </label>
                        <Link href="/forgot-password" className="text-[11px] text-primary hover:text-primary-hover font-medium transition-colors">
                            Oublié ?
                        </Link>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-white transition-colors" />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-md py-2.5 pl-10 pr-4 text-white text-sm placeholder:text-text-dark focus:outline-none focus:border-primary transition-colors"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2.5 rounded-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Connexion...
                        </>
                    ) : (
                        <>
                            Se connecter
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 text-center">
                <p className="text-sm text-text-muted">
                    Pas encore de compte ?{' '}
                    <Link href="/register" className="text-white hover:text-primary font-bold transition-colors">
                        S'inscrire
                    </Link>
                </p>
            </div>
        </div>
    );
}
