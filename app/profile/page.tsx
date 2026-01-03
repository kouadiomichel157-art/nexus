"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User, Mail, Phone, MapPin, Shield, Key, Camera, Loader2, Save } from 'lucide-react';

export default function ProfilePage() {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState({
        full_name: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        const getProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                // Fetch additional profile data from 'profiles' table if it exists
                // const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
                // if (data) setProfile(data);

                // Mock existing data for visual demo since profiles table might be empty
                setProfile({
                    full_name: user.user_metadata?.full_name || '',
                    phone: '',
                    address: ''
                });
            }
            setLoading(false);
        };
        getProfile();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="relative overflow-hidden rounded-3xl bg-[#0f1115] border border-white/5 p-8 md:p-12">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-blue-600 p-1">
                            <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                                <User className="h-16 w-16 text-white/50" />
                            </div>
                        </div>
                        <button className="absolute bottom-0 right-0 p-2.5 rounded-full bg-white text-black hover:bg-gray-200 transition-colors shadow-lg">
                            <Camera className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                            {profile.full_name || 'Utilisateur Nexus'}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                                <Mail className="h-3.5 w-3.5" />
                                {user?.email}
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                                <Shield className="h-3.5 w-3.5" />
                                Membre Vérifié
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0f1115] rounded-2xl border border-white/5 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Informations Personnelles
                            </h2>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.full_name}
                                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Téléphone
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            placeholder="+225 ..."
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Adresse
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-3.5 h-4 w-4 text-text-muted" />
                                        <textarea
                                            value={profile.address}
                                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                            rows={3}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-primary hover:bg-primary-hover text-black font-bold py-3 px-8 rounded-xl transition-all active:scale-[0.98] flex items-center gap-2"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Enregistrement...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5" />
                                            Enregistrer
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Column - Preferences/Security */}
                <div className="space-y-6">
                    <div className="bg-[#0f1115] rounded-2xl border border-white/5 p-6 shadow-lg">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Key className="h-5 w-5 text-primary" />
                            Sécurité
                        </h3>
                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                                <span className="text-sm font-medium text-white">Changer de mot de passe</span>
                                <div className="h-8 w-8 rounded-lg bg-black/50 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </button>
                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                                <span className="text-sm font-medium text-white">Authentification 2FA</span>
                                <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/20">Désactivé</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-2xl border border-primary/20 p-6">
                        <h3 className="text-lg font-bold text-white mb-2">Nexus Premium</h3>
                        <p className="text-sm text-text-muted mb-4">
                            Profitez d'avantages exclusifs et de réductions sur vos prochains achats.
                        </p>
                        <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                            Voir les offres
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
