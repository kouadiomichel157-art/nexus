export type Platform = 'Steam' | 'PSN' | 'Xbox' | 'Nintendo' | 'Other';
export type ProductType = 'Key' | 'TopUp' | 'Subscription' | 'DLC';

export interface Product {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    oldPrice: number;
    platform: Platform;
    type: ProductType;
    image: string;
    images: string[];
    badge?: string;
    region: string;
    delivery: string;
    stock: string;
    developer: string;
    publisher: string;
    releaseDate: string;
    languages: string[];
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        slug: 'fc-24-standard',
        title: 'EA SPORTS FC 24 - Standard Edition PC',
        description: "EA SPORTS FC™ 24 marks a new era for The World's Game: 19,000+ fully licensed players, 700+ teams, and 30+ leagues playing together in the most authentic football experience ever created.",
        price: 35000,
        oldPrice: 45000,
        platform: 'PSN',
        type: 'Key',
        image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1000&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop',
        ],
        badge: 'BEST SELLER',
        region: 'Global',
        delivery: 'Instant',
        stock: 'In Stock',
        developer: 'EA Canada',
        publisher: 'Electronic Arts',
        releaseDate: '29 Sept, 2023',
        languages: ['Français', 'English', 'Deutsch', 'Español', 'Italiano']
    },
    {
        id: 'hero',
        slug: 'elden-ring-shadow-erdtree',
        title: 'ELDEN RING Shadow of the Erdtree',
        description: "The Shadow of the Erdtree expansion features an all-new story set in the Land of Shadow imbued with mystery, perilous dungeons, and new enemies, weapons and equipment. Discover uncharted territories, face formidable adversaries, and revel in the satisfying triumph of victory.",
        price: 25000,
        oldPrice: 25000,
        platform: 'Steam',
        type: 'DLC',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1000&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop'
        ],
        badge: 'PRE-ORDER',
        region: 'Global',
        delivery: 'Instant',
        stock: 'High',
        developer: 'FromSoftware Inc.',
        publisher: 'Bandai Namco',
        releaseDate: '21 Jun, 2024',
        languages: ['Français', 'English', 'Japanese']
    }
];

export function getProductBySlug(slug: string) {
    return PRODUCTS.find(p => p.slug === slug);
}
