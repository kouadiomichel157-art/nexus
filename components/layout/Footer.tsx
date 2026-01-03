import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0a0a0a] border-t border-white/5 text-text-muted text-sm pt-16 pb-8">
            <div className="mx-auto max-w-[1600px] px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="block relative h-10 w-32 opacity-80 hover:opacity-100 transition-opacity">
                            <Image
                                src="/logo.png"
                                alt="NEXUS"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="leading-relaxed">
                            La référence N°1 en Afrique pour l'achat de jeux vidéo, abonnements et logiciels. Livraison instantanée et garantie à 100%.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded bg-surface border border-white/5 hover:bg-primary hover:text-white transition-all">
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Informations</h4>
                        <ul className="space-y-4">
                            {['À propos de nous', 'Comment ça marche ?', 'Blog', 'Avis Clients', 'Partenaires'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-primary transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Support & Légal</h4>
                        <ul className="space-y-4">
                            {['Centre d\'aide', 'Contactez-nous', 'Conditions Générales', 'Politique de Confidentialité', 'Remboursements'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-primary transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Payment */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Nous Contacter</h4>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>support@nexus.ci</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+225 07 00 00 00 00</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>Abidjan, Côte d'Ivoire</span>
                            </li>
                        </ul>
                        <div className="space-y-2">
                            <div className="text-xs font-bold uppercase tracking-wider text-text-dark">Paiements Sécurisés</div>
                            <div className="flex flex-wrap gap-2">
                                {['Orange Money', 'MTN Momo', 'Wave', 'Visa'].map(method => (
                                    <div key={method} className="px-2 py-1 bg-surface border border-white/10 rounded text-xs font-medium text-white">
                                        {method}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-dark">
                    <p>&copy; 2024 NEXUS Digital Services. Tous droits réservés.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
                        <a href="#" className="hover:text-white transition-colors">CGV</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
