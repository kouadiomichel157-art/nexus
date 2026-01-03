"use client";

import Link from 'next/link';
import { Search, Filter, Eye, Download } from 'lucide-react';

const MOCK_ORDERS = [
    { id: 'NXS-88321', date: '02 Jan 2026', total: '34 900 FCFA', items: 2, status: 'Terminée' },
    { id: 'NXS-88204', date: '28 Dec 2025', total: '12 500 FCFA', items: 1, status: 'Terminée' },
    { id: 'NXS-87992', date: '15 Dec 2025', total: '5 000 FCFA', items: 1, status: 'Remboursée' },
];

export default function OrdersPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Mes Commandes</h1>
                    <p className="text-sm text-text-muted mt-1">Gérez votre historique d'achats</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dark" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="bg-surface border border-white/10 rounded-md py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-white/20 w-48 transition-colors"
                        />
                    </div>
                    <button className="p-2 border border-white/10 rounded-md text-text-muted hover:text-white hover:bg-white/5 transition-colors">
                        <Filter className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="bg-surface border border-white/5 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/5 text-text-muted uppercase text-xs tracking-wider">
                                <th className="px-6 py-4 font-semibold">Référence</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Total</th>
                                <th className="px-6 py-4 font-semibold">Statut</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {MOCK_ORDERS.map((order) => (
                                <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-white font-mono">{order.id}</td>
                                    <td className="px-6 py-4 text-text-muted">{order.date}</td>
                                    <td className="px-6 py-4 text-text-muted">{order.total}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${order.status === 'Terminée'
                                                ? 'bg-success/10 text-success border-success/20'
                                                : 'bg-danger/10 text-danger border-danger/20'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/checkout/success?id=${order.id}`} // Linking back to success page for demo
                                                className="p-1.5 hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                                                title="Voir détails"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <button
                                                className="p-1.5 hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                                                title="Facture PDF"
                                            >
                                                <Download className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination or Empty State could go here */}
            </div>
        </div>
    );
}
