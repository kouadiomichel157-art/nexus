"use client";
import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
    images: string[];
    title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
    const [activeImage, setActiveImage] = useState(images[0]);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-surface border border-white/5">
                <Image
                    src={activeImage}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`relative aspect-video h-20 shrink-0 overflow-hidden rounded-sm border-2 transition-all ${activeImage === img ? 'border-primary' : 'border-transparent hover:border-white/20'
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`${title} screenshot ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
