
import Link from 'next/link';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Subtle Gradient Background for professional depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] to-[#111] pointer-events-none"></div>

            {/* Content Wrapper */}
            <div className="w-full max-w-md relative z-10 flex flex-col gap-6">

                {/* Simplified Logo / Header */}
                <div className="text-center">
                    <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                        <div className="flex items-center justify-center gap-2">
                            {/* Simple Geometric Logo Placeholder if Image fails or as fallback */}
                            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center font-bold text-white text-lg">
                                N
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-white">NEXUS</h1>
                        </div>
                    </Link>
                </div>

                {children}

                {/* Footer Links (Legal/Help) */}
                <div className="flex justify-center gap-6 text-xs text-text-muted mt-4">
                    <Link href="/terms" className="hover:text-white transition-colors">Conditions</Link>
                    <Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
                    <Link href="/support" className="hover:text-white transition-colors">Aide</Link>
                </div>
            </div>
        </div>
    );
}
