"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';


export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false); // New state for success message
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            setIsLoading(false);
            return;
        }

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: username,
                    },
                },
            });

            if (signUpError) throw signUpError;

            // Check if email confirmation is required (User created but no session)
            if (data?.user && !data.session) {
                setSuccess(true);
                setIsLoading(false); // Stop loading to show message
                return;
            }

            // Immediate login (if email confirmation is disabled)
            router.refresh();
            router.push('/orders');
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue lors de l\'inscription.');
            setIsLoading(false);
        } finally {
            // Don't unset loading here if successful (to prevent flicker before redirect)
            if (!success) setIsLoading(false);
        }
    };

    return (
        <div className="bg-surface border border-white/5 rounded-lg shadow-card p-8">
            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-white">Inscription</h2>
                <p className="text-sm text-text-muted mt-1">Rejoignez la communauté Nexus</p>
            </div>

            {success ? (
                <div className="animate-in fade-in zoom-in duration-300 text-center py-8">
                    <div className="mx-auto w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mb-4">
                        <Mail className="h-6 w-6 text-success" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Vérifiez vos emails</h3>
                    <p className="text-sm text-text-muted mb-6">
                        Un lien de confirmation a été envoyé à votre adresse. Cliquez dessus pour activer votre compte.
                    </p>
                    <Link href="/login" className="text-primary hover:text-primary-hover text-sm font-bold flex items-center justify-center gap-2">
                        Retour à la connexion <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            ) : (
                <>
                    {error && (
                        <div className="mb-6 p-3 bg-danger/10 border border-danger/20 rounded text-sm text-danger flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label htmlFor="username" className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                                Nom d'utilisateur
                            </label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-white transition-colors" />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Pseudo"
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-md py-2.5 pl-10 pr-4 text-white text-sm placeholder:text-text-dark focus:outline-none focus:border-primary transition-colors"
                                    required
                                />
                            </div>
                        </div>

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
                            <label htmlFor="password" className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                                Mot de passe
                            </label>
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

                        <div className="space-y-1.5">
                            <label htmlFor="confirmPassword" className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                                Confirmer le mot de passe
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-white transition-colors" />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
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
                                    Création...
                                </>
                            ) : (
                                <>
                                    Créer mon compte
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/5 text-center">
                        <p className="text-sm text-text-muted">
                            Déjà un compte ?{' '}
                            <Link href="/login" className="text-white hover:text-primary font-bold transition-colors">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
