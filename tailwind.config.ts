import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Fond "Deep Matte"
                background: "#0a0a0a", // Vrai noir mat
                surface: "#141414", // Gris très sombre pour les cartes
                "surface-highlight": "#1e1e1e", // Hover states

                // Palette Stricte (2 couleurs)
                primary: {
                    DEFAULT: "#e04f00", // Matte Gaming Orange (Action)
                    hover: "#ff5a00",   // Lighter matte on hover
                },
                secondary: {
                    DEFAULT: "#1a2b45", // Matte Navy (Trust/Info)
                    hover: "#243b5e",
                },

                // Textes
                "text-main": "#ffffff",
                "text-muted": "#a1a1aa", // Zinc-400
                "text-dark": "#71717a",   // Zinc-500

                // Utilitaires fonctionnels (Pas de teintes flashy)
                success: "#15803d", // Green-700 (Matte)
                danger: "#b91c1c",  // Red-700 (Matte)
                warning: "#b45309", // Amber-700 (Matte)
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            borderRadius: {
                'xs': '2px',
                'sm': '4px',
                DEFAULT: '6px', // Arrondi léger, "Pro"
                'md': '8px',
                'lg': '12px',
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.15)', // Ombre dense et discrète
                'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
            }
        },
    },
    plugins: [],
};

export default config;
