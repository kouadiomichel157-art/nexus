import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    title: string;
    price: number;
    oldPrice?: number;
    platform: 'Steam' | 'PSN' | 'Xbox' | 'Nintendo' | 'Other';
    type: 'Key' | 'TopUp' | 'Subscription' | 'DLC';
    image: string;
    badge?: string;
    sellerCount?: number;
    slug?: string;
}

export default function ProductCard({
    title,
    price,
    oldPrice,
    platform,
    image,
    badge,
    sellerCount = 5,
    slug = '#'
}: ProductCardProps) {
    const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

    return (
        <Link href={`/product/${slug}`} className="group relative bg-[#121212] rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/10 h-full flex flex-col">
            {/* Image Section (Vertical Aspect Ratio for game covers) */}
            <div className="relative aspect-[3/4] w-full bg-[#0a0a0a] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                />

                {/* Gradient overlay for better text readability on top/bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#121212] to-transparent opacity-80" />

                {/* Badge */}
                {badge && (
                    <div className="absolute top-2 left-2 bg-primary/90 backdrop-blur-md px-2 py-1 text-[10px] font-black text-white uppercase tracking-wider rounded">
                        {badge}
                    </div>
                )}

                {/* Discount Tag */}
                {discount > 0 && (
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 text-[10px] font-bold text-green-400 rounded border border-white/10">
                        -{discount}%
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div className="flex flex-col flex-1 p-4 relative z-10 -mt-2">
                {/* Platform */}
                <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[10px] uppercase font-bold text-text-muted bg-white/5 px-1.5 py-0.5 rounded">{platform}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors mb-2 min-h-[40px]">
                    {title}
                </h3>

                <div className="flex-1" />

                {/* Price */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-text-muted mb-0.5">À partir de</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-black text-white group-hover:text-primary transition-colors">
                                {price.toLocaleString('fr-FR')} F
                            </span>
                            {oldPrice && (
                                <span className="text-xs text-text-dark line-through decoration-white/20">
                                    {oldPrice.toLocaleString('fr-FR')}
                                </span>
                            )}
                        </div>
                    </div>

                    <button className="h-9 w-9 rounded-full bg-white/5 hover:bg-primary text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-sm border border-white/10 group-hover:border-primary">
                        <ShoppingCart className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </Link>
    );
}
