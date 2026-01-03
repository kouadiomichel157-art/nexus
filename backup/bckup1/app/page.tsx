import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/ui/ProductCard';
import HeroCarousel from '@/components/home/HeroCarousel';
import { ArrowRight, TrendingUp, ShieldCheck, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/mock-data';



export default function Home() {
    return (
        <div className="min-h-screen pb-20 bg-background text-text-main">
            <Navbar />

            {/* NEW HERO CAROUSEL */}
            <div className="mx-auto max-w-[1600px] px-4 pt-6 pb-2">
                <HeroCarousel />
            </div>



            {/* BEST SELLERS GRID */}
            <section className="mx-auto max-w-[1600px] px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-1.5 bg-primary rounded-full shadow-[0_0_15px_rgba(255,87,34,0.5)]"></div>
                        <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Meilleures Ventes</h2>
                    </div>
                    <Link href="/catalog" className="group flex items-center gap-2 text-sm font-bold text-text-muted hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 hover:border-white/20">
                        Voir tout le catalogue
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                    {PRODUCTS.map((product) => (
                        <div key={product.id} className="h-full">
                            <ProductCard
                                // @ts-ignore
                                {...product}
                            />
                        </div>
                    ))}
                    {/* Repeat mock products to fill grid */}
                    {PRODUCTS.slice(0, 4).map((product) => (
                        <div key={`${product.id}-dup`} className="h-full">
                            <ProductCard
                                // @ts-ignore
                                {...product}
                                title={`[Recharge] ${product.title}`}
                                image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* TENDING SECTION (Alternate Layout) */}
            <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
                <div className="mx-auto max-w-[1600px] px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Tendances de la semaine</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PRODUCTS.slice(0, 4).map((product, i) => (
                            <div key={`trend-${product.id}`} className="group relative h-[200px] rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,87,34,0.15)]">
                                {/* Background Image */}
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded backdrop-blur-sm mb-2 inline-block border border-primary/20">
                                        #{i + 1} TENDANCE
                                    </span>
                                    <h3 className="text-xl font-black text-white italic leading-none mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-sm text-gray-300">{product.platform}</span>
                                        <span className="font-bold text-white bg-white/10 px-2 py-1 rounded">{product.price.toLocaleString()} F</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TRUST STRIP (Glassmorphism) */}
            <section className="mx-auto max-w-[1600px] px-4 py-12 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "Livraison Instantanée", desc: "Clés digitales envoyées en secondes", icon: Clock },
                        { title: "Paiements Sécurisés", desc: "Mobile Money, Wave, Visa", icon: ShieldCheck },
                        { title: "Support Expert", desc: "Disponible en français 24/7", icon: ShieldCheck },
                        { title: "Meilleur Prix", desc: "Économisez jusqu'à 90%", icon: Star },
                    ].map((feat, i) => (
                        <div key={i} className="relative group p-6 rounded-2xl bg-[#161616] border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="h-14 w-14 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:text-white group-hover:bg-primary transition-all duration-300 shadow-lg">
                                    <feat.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                                <p className="text-sm text-text-muted leading-relaxed">{feat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
