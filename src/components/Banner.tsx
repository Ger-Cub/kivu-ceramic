import React from 'react';
import { Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';
import { CompanySettings } from '../types';

interface BannerProps {
  settings: CompanySettings;
  onExploreProducts: () => void;
  onExploreImpact: () => void;
}

export default function Banner({ settings, onExploreProducts, onExploreImpact }: BannerProps) {
  return (
    <section className="relative bg-stone-950 text-white overflow-hidden py-24 sm:py-32 flex items-center justify-center min-h-[580px]">
      {/* Background Decorative Layer: Overlayed organic radial ambient glows & pattern */}
      <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
        {/* Warm Terracotta and Charcoal gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] rounded-full bg-amber-800/25 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full bg-terracotta-600/20 blur-[130px]" />
        
        {/* Subtle grid pattern resembling studio textures */}
        <div className="absolute inset-0 bg-[radial-gradient(#292524_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      {/* Floating authentic vector of ceramic vase silhouette on the right margin side */}
      <div className="absolute right-0 bottom-[-20px] lg:right-16 lg:bottom-[-40px] opacity-10 lg:opacity-15 z-0 transform translate-x-12 lg:translate-x-0">
        <svg width="450" height="450" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 5 C30 5, 25 25, 28 50 C30 75, 20 95, 50 95 C80 95, 70 75, 72 50 C75 25, 70 5, 50 5 Z" fill="#b45309" />
          <ellipse cx="50" cy="5" rx="20" ry="2" fill="#d97706" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center sm:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Area */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          
          {/* Made In-Congo Tag */}
          <div className="inline-flex items-center gap-2 bg-stone-900 border border-stone-800 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-amber-500 font-bold uppercase animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Savoir-faire 100% Made in DR Congo (Bukavu)</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-[1.1]">
              Transformer l’argile du <span className="text-amber-500 underline decoration-terracotta-500 underline-offset-4 font-black">Kivu</span> en opportunités durables.
            </h1>
            <p className="text-stone-300 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl font-sans">
              {settings.description}
            </p>
          </div>

          {/* Slogan citation */}
          <blockquote className="border-l-2 border-terracotta-500 pl-4 py-1 italic text-stone-300 font-serif text-sm">
            &ldquo; Chaque pièce réalisée à Bukavu contient l'âme et la résilience du Sud-Kivu. &rdquo;
          </blockquote>

          {/* Action Call buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <button
              onClick={onExploreProducts}
              className="group relative inline-flex items-center justify-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 outline-none text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-350 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Découvrir le Catalogue</span>
              <ArrowRight className="w-4 h-4 transition duration-200 group-hover:translate-x-1" />
            </button>
            
            <button
              onClick={onExploreImpact}
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-200 font-bold py-4 px-8 rounded-xl transition cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-amber-500 animate-bounce" />
              <span>Notre Impact Social</span>
            </button>
          </div>
        </div>

        {/* Highlight Banner Badge Frame */}
        <div className="hidden lg:block lg:col-span-5 relative">
          <div className="bg-stone-900/60 backdrop-blur-md p-8 rounded-3xl border border-stone-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-terracotta-500/10 to-transparent w-full h-full pointer-events-none" />
            
            <h3 className="text-lg font-bold font-display text-white mb-4">Notre Atelier de Poterie</h3>
            <p className="text-xs text-stone-400 font-sans leading-relaxed mb-6">
              Situé dans la commune de Kadutu à Bukavu, notre atelier combine éthique locale et cuisson éco-responsable. Nous redonnons l'autonomie aux jeunes exclus ou touchés par l'isolement social. 
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-stone-300">Argile de qualité supérieure du Sud-Kivu</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-stone-300">Fours écologiques de cuisson propre</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-stone-300">Réhabilitation solidaire et Art-thérapie</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 font-mono">
              <span>Bukavu, RDC</span>
              <span className="text-amber-500 font-bold">KIVU CERAMIC &copy;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
