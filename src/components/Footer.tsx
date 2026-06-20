import React from 'react';
import { Mail, Phone, MapPin, Heart, Sparkles, Globe } from 'lucide-react';
import { CompanyDetails } from '../types';

interface FooterProps {
  company: CompanyDetails;
  onNavigate: (tab: string) => void;
}

export default function Footer({ company, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand/Social Column */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#df6438] text-white font-display font-medium text-lg">
                KO
              </div>
              <span className="font-display font-semibold text-lg uppercase tracking-wider text-stone-100">
                Kivu Ceramic
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-md">
              Valoriser l'argile locale du Sud-Kivu pour créer de sublimes objets authentiques 
              « Made in DR Congo ». Notre mission de formation professionnelle et d'art-thérapie 
              redynamise la jeunesse vulnérable de Bukavu face aux défis d'insertion sociale.
            </p>
            <div className="flex items-center gap-2 text-[#df6438] text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Transmettre • Façonner • Reconstruire</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-display font-bold text-[#df6438] uppercase text-xs tracking-widest mb-4">
              Navigation rapide
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Notre Mission & Impact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Nos Créations artisanales
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Blog d'articles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Formulaire de Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="font-display font-bold text-[#df6438] uppercase text-xs tracking-widest mb-4">
              Atelier & Contact
            </h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#df6438] shrink-0 mt-0.5" />
                <span className="leading-snug">{company.address || "Avenu Rukumbuka, Quartier Kasali, Kadutu, Bukavu"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#df6438] shrink-0" />
                <a href={`tel:${company.phone || "+243974505547"}`} className="hover:text-white transition-colors">
                  {company.phone || "+243974505547"}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#df6438] shrink-0" />
                <a href={`mailto:${company.email || "Kivuceramic12@gmail.com"}`} className="hover:text-white transition-colors break-all">
                  {company.email || "Kivuceramic12@gmail.com"}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#df6438] shrink-0" />
                <span>Bukavu • R.D. Congo</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-stone-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {currentYear} Kivu Ceramic. Tous droits réservés.
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            <span>Fait à Bukavu avec amour</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>&bull; Artisanat Engagé</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
