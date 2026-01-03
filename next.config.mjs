/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // Sources officielles Jeux Vidéo (Pour ta Marketplace)
            {
                protocol: 'https',
                hostname: 'shared.cloudflare.steamstatic.com', // Serveur d'images Steam
            },
            {
                protocol: 'https',
                hostname: 'cdn.akamai.steamstatic.com', // Autre serveur Steam fréquent
            },
            {
                protocol: 'https',
                hostname: 'images.igdb.com', // Base de donnée Twitch/IGDB
            },

            // Tes autres sources (Stock & Supabase)
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co', // Added for placeholders used in fixes
            },
            {
                protocol: 'https',
                hostname: 'mybnwwxabhwtbqpvxlfz.supabase.co',
            },
        ],
    },
};

export default nextConfig;
