"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);
        }, 1500);
    };

    return (
        <div className="bg-surface border border-white/5 rounded-lg shadow-card p-8">
            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-white">Mot de passe oublié ?</h2>
                <p className="text-sm text-text-muted mt-1">Nous vous enverrons un lien de réinitialisation</p>
            </div>

            {isSent ? (
                <div className="text-center animate-in fade-in zoom-in duration-300">
                    <div className="h-12 w-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 text-success">
                        <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Email envoyé !</h3>
                    <p className="text-sm text-text-muted mb-6">
                        Vérifiez votre boîte de réception pour les instructions.
                    </p>
                    <Link href="/login" className="text-sm text-primary hover:text-primary-hover font-bold transition-colors flex items-center justify-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Retour à la connexion
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Email
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-white transition-colors" />
                            <input
                                id="email"
                                type="email"
                                placeholder="exemple@email.com"
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
                                Envoi...
                            </>
                        ) : (
                            <>
                                Envoyer le lien
                                <ArrowRight className="h-4 w-4" />
                            </>
                        )}
                    </button>

                    <div className="text-center mt-4">
                        <Link href="/login" className="text-xs text-text-muted hover:text-white transition-colors inline-flex items-center gap-1">
                            <ArrowLeft className="h-3 w-3" />
                            Retour à la connexion
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
}
