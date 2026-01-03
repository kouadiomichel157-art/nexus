import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "Nexus - Clés de Jeux & Abonnements Instantanés",
    description: "La marketplace N°1 pour vos clés Steam, cartes PSN, Xbox, et abonnements. Paiement sécurisé par Mobile Money.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </head>
            <body className="font-sans">
                <Providers>
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
