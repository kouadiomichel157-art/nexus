"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/utils/supabase/types';
import { ChevronRight, Plus } from 'lucide-react';

type Product = Database['public']['Tables']['products']['Row'];

// Mock data for initial display if DB is empty
const MOCK_OFFERS = [
    {
        id: 'mock-1',
        title: 'EA Sports FC 24',
        slug: 'fc-24',
        cover_url: 'https://placehold.co/1920x1080/1a1a1a/FFF?text=FC+24+Banner',
        image_url: 'https://placehold.co/600x900/1a1a1a/FFF?text=FC+24',
        description: 'Le jeu de football le plus réaliste au monde.',
        price: 15000 // Mock price
    },
    {
        id: 'mock-2',
        title: 'Call of Duty: MW3',
        slug: 'cod-mw3',
        cover_url: 'https://placehold.co/1920x1080/2a2a2a/FFF?text=MW3+Banner',
        image_url: 'https://placehold.co/600x900/2a2a2a/FFF?text=MW3',
        description: 'La guerre moderne est de retour.',
        price: 45000
    },
    {
        id: 'mock-3',
        title: 'Minecraft Java & Bedrock',
        slug: 'minecraft',
        cover_url: 'https://placehold.co/1920x1080/3a3a3a/FFF?text=Minecraft+Banner',
        image_url: 'https://placehold.co/600x900/3a3a3a/FFF?text=Minecraft',
        description: 'Créez, explorez et survivez.',
        price: 12500
    }
];

export default function HeroCarousel() {
    const [offers, setOffers] = useState<any[]>(MOCK_OFFERS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const supabase = createClient();

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('is_weekly_offer', true)
                    .limit(5);

                if (error || !data || data.length === 0) {
                    console.warn("Using mock data due to empty/error DB response.", error);
                    return;
                }

                setOffers(data);
            } catch (err) {
                console.error("Critical error fetching offers:", err);
            }
        };
        fetchOffers();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % offers.length);
    };

    const handleSelect = (index: number) => {
        setCurrentIndex(index);
    };

    // Auto-scroll
    useEffect(() => {
        const timer = setInterval(handleNext, 5000);
        return () => clearInterval(timer);
    }, [offers]);

    if (!offers.length) return null;

    const currentOffer = offers[currentIndex];

    return (
        <section className="relative h-[500px] w-full overflow-hidden mb-8 rounded-2xl bg-surface border border-white/5">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
                <Image
                    src={currentOffer.cover_url || '/placeholder_banner.jpg'}
                    alt={currentOffer.title}
                    fill
                    className="object-cover transition-opacity duration-700"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
            </div>

            <div className="relative z-10 h-full max-w-[1600px] mx-auto flex">
                {/* Content (Left) */}
                <div className="flex-1 flex flex-col justify-center px-12 max-w-2xl">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-white bg-primary rounded w-fit">
                        Offre de la semaine
                    </span>
                    <h1 className="text-5xl font-black text-white mb-4 leading-tight">
                        {currentOffer.title}
                    </h1>
                    <p className="text-lg text-text-muted mb-8 line-clamp-3">
                        {currentOffer.description || "Découvrez ce jeu incroyable au meilleur prix sur Nexus."}
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href={`/products/${currentOffer.slug}`}
                            className="bg-white text-black px-8 py-4 rounded font-bold uppercase hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                            Acheter Maintenant
                            {currentOffer.price && <span className="ml-2 opacity-50">| {currentOffer.price.toLocaleString()} F</span>}
                        </Link>
                        <button className="px-4 py-4 rounded border border-white/20 text-white hover:bg-white/10 transition-colors">
                            <Plus className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Navigation List (Right - Epic Style) */}
                <div className="w-[300px] hidden lg:flex flex-col justify-center pr-8 gap-2 ml-auto">
                    {offers.map((offer, index) => (
                        <div
                            key={offer.id}
                            onClick={() => handleSelect(index)}
                            className={`
                                group cursor-pointer p-4 rounded-xl transition-all duration-300 flex items-center gap-4
                                ${index === currentIndex ? 'bg-white/10' : 'hover:bg-white/5'}
                            `}
                        >
                            <div className={`relative h-16 w-12 rounded overflow-hidden transition-all ${index === currentIndex ? 'scale-110 ring-2 ring-primary' : 'opacity-70 group-hover:opacity-100'}`}>
                                <Image
                                    src={offer.image_url || '/placeholder_cover.jpg'}
                                    alt={offer.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className={`text-sm font-bold transition-colors ${index === currentIndex ? 'text-white' : 'text-text-muted group-hover:text-white'}`}>
                                    {offer.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
