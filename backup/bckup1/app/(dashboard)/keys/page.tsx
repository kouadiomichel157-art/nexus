"use client";

import { useState } from 'react';
import { Search, Copy, Check, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

const MOCK_KEYS = [
    {
        id: 'k1',
        game: 'EA SPORTS FC 24',
        platform: 'EA App',
        image: 'https://cdn.g2a.com/x/thumb/1140x577/1x1x1/ea-sports-fc-24-pc-ea-app-key-global-i10000336595015/8468722c1d484725916053f1',
        key: 'XXXX-YYYY-ZZZZ-NEXUS',
        purchased: '02 Jan 2026'
    },
    {
        id: 'k2',
        game: 'Xbox Game Pass Ultimate',
        platform: 'Xbox',
        image: 'https://cdn.g2a.com/x/thumb/1140x577/1x1x1/xbox-game-pass-ultimate-1-month-xbox-live-key-global-i10000188766005/5d2c9c577e696c14e13d90f2',
        key: 'XBX-1234-5678-GAME',
        purchased: '28 Dec 2025'
    }
];

export default function KeysPage() {
    const [revealed, setRevealed] = useState<Record<string, boolean>>({});
    const [copied, setCopied] = useState<string | null>(null);

    const toggleReveal = (id: string) => {
        setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Ma Bibliothèque</h1>
                    <p className="text-sm text-text-muted mt-1">Vos clés d'activation disponibles</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dark" />
                    <input
                        type="text"
                        placeholder="Rechercher un jeu..."
                        className="bg-surface border border-white/10 rounded-md py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-white/20 w-64 transition-colors"
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {MOCK_KEYS.map((item) => (
                    <div key={item.id} className="bg-surface border border-white/5 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center group hover:border-white/10 transition-colors">
                        {/* Game Image */}
                        <div className="h-16 w-24 bg-[#0a0a0a] rounded border border-white/5 relative shrink-0 overflow-hidden">
                            <Image src={item.image} alt={item.game} fill className="object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left min-w-0">
                            <h3 className="font-bold text-white truncate">{item.game}</h3>
                            <div className="flex items-center justify-center md:justify-start gap-2 mt-1 text-xs text-text-muted">
                                <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">{item.platform}</span>
                                <span>Acheté le {item.purchased}</span>
                            </div>
                        </div>

                        {/* Key Action */}
                        <div className="flex items-center gap-2 shrink-0 bg-[#0a0a0a] p-2 rounded border border-white/5 w-full md:w-auto justify-between md:justify-end">
                            <code className={`font-mono text-sm px-2 ${revealed[item.id] ? 'text-primary font-bold' : 'text-text-dark blur-sm select-none'}`}>
                                {revealed[item.id] ? item.key : 'XXXX-YYYY-ZZZZ-AAAA'}
                            </code>

                            <div className="flex items-center gap-1 border-l border-white/5 pl-2 ml-2">
                                <button
                                    onClick={() => toggleReveal(item.id)}
                                    className="p-1.5 hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                                    title={revealed[item.id] ? "Masquer" : "Révéler"}
                                >
                                    {revealed[item.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                                <button
                                    onClick={() => copyToClipboard(item.key, item.id)}
                                    className="p-1.5 hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                                    title="Copier"
                                    disabled={!revealed[item.id]}
                                >
                                    {copied === item.id ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
