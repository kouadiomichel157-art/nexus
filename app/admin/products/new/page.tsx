"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Save, Upload, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        image_url: '',
        cover_url: '',
        platform: 'PC',
        release_date: '',
        is_weekly_offer: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-generate slug from title
        if (name === 'title') {
            setFormData(prev => ({
                ...prev,
                title: value,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            }));
        }
    };

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('products')
            .insert([formData]);

        if (error) {
            alert('Erreur lors de la création du produit : ' + error.message);
            setLoading(false);
        } else {
            alert('Produit créé avec succès !');
            router.push('/admin/products');
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-6 mb-10">
                <Link href="/admin" className="group p-3 rounded-xl bg-surface border border-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300">
                    <ArrowLeft className="h-6 w-6 text-text-muted group-hover:text-white" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">Ajouter un Jeu</h1>
                    <p className="text-text-muted">Ajoutez un nouveau titre au catalogue Nexus.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Main Info (2 cols wide) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* General Info Card */}
                        <div className="bg-[#0f0f0f] p-8 rounded-2xl border border-white/5 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Save className="h-32 w-32 text-primary" />
                            </div>

                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <div className="w-1.5 h-4 bg-primary rounded-full"></div>
                                </div>
                                Informations Générales
                            </h2>

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <label className="block text-sm font-bold text-text-muted mb-2 uppercase tracking-wider">Titre du Jeu</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="ex: Call of Duty: Modern Warfare III"
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-lg text-white font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/10"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-text-muted mb-2 uppercase tracking-wider">Slug (URL)</label>
                                    <div className="flex rounded-xl bg-[#0a0a0a] border border-white/10 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all overflow-hidden">
                                        <span className="flex items-center px-4 bg-white/5 text-text-dark border-r border-white/5 text-sm">nexus.com/sku/</span>
                                        <input
                                            type="text"
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleChange}
                                            placeholder="call-of-duty-mw3"
                                            className="flex-1 bg-transparent p-4 text-text-muted focus:text-white outline-none font-mono text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-text-muted mb-2 uppercase tracking-wider">Plateforme</label>
                                        <div className="relative">
                                            <select
                                                name="platform"
                                                value={formData.platform}
                                                onChange={handleChange}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white appearance-none focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                                            >
                                                <option value="PC">PC</option>
                                                <option value="Xbox">Xbox</option>
                                                <option value="PSN">PlayStation</option>
                                                <option value="Nintendo">Nintendo</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <div className="border-t-[5px] border-t-white/30 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-text-muted mb-2 uppercase tracking-wider">Date de Sortie</label>
                                        <input
                                            type="date"
                                            name="release_date"
                                            value={formData.release_date}
                                            onChange={handleChange} // Note: simplified handle for now
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none [color-scheme:dark]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-text-muted mb-2 uppercase tracking-wider">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Description courte du jeu..."
                                        rows={4}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Media & Settings (1 col) */}
                    <div className="space-y-8">
                        {/* Media Card */}
                        <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Upload className="h-4 w-4 text-primary" />
                                </div>
                                Médias
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-text-muted mb-2 uppercase">Image Verticale (Affiche)</label>
                                    <input
                                        type="text"
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-primary outline-none"
                                        required
                                    />
                                    {/* Preview */}
                                    <div className="mt-2 aspect-[3/4] bg-black/40 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center relative group">
                                        {formData.image_url ?
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={formData.image_url} alt="Preview" className="object-cover w-full h-full" />
                                            : <span className="text-xs text-white/20">Aperçu</span>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-muted mb-2 uppercase">Image Horizontale (Cover)</label>
                                    <input
                                        type="text"
                                        name="cover_url"
                                        value={formData.cover_url}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-primary outline-none"
                                    />
                                    <div className="mt-2 aspect-video bg-black/40 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                                        {formData.cover_url ?
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={formData.cover_url} alt="Cover Preview" className="object-cover w-full h-full" />
                                            : <span className="text-xs text-white/20">Aperçu</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visibility */}
                        <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-white/5">
                            <h2 className="text-lg font-bold text-white mb-4">Visibilité</h2>
                            <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-all">
                                <div>
                                    <span className="block font-bold text-white text-sm">Offre de la semaine</span>
                                    <span className="text-xs text-text-muted">Afficher dans le carousel d'accueil</span>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="is_weekly_offer"
                                        checked={formData.is_weekly_offer}
                                        onChange={handleCheckbox}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-white/5">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary hover:bg-primary-hover text-white font-bold py-4 px-12 rounded-xl shadow-[0_0_30px_rgba(255,87,34,0.3)] hover:shadow-[0_0_50px_rgba(255,87,34,0.5)] hover:scale-105 transition-all flex items-center gap-3"
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                        Enregistrer le Produit
                    </button>
                </div>
            </form>
        </div>
    );
}
