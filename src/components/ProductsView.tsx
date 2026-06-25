import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface ProductsViewProps {
  onNavigateToContact: (quoteSubject: string) => void;
  products: Product[];
  catalogTitle?: string;
  catalogSubtitle?: string;
  catalogDescription?: string;
}

export default function ProductsView({
  onNavigateToContact,
  products,
  catalogTitle = "Les Trésors de l’Atelier",
  catalogSubtitle = "Notre Catalogue de Céramiques d'Exception",
  catalogDescription = "Chaque objet est une pièce unique, tournée ou modelée à la main à Bukavu par nos artisans. Nous utilisons une argile ocre locale, cuite à haute température pour assurer robustesse au four ou au lave-vaisselle."
}: ProductsViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  const categories = [
    { id: 'all', label: 'Toutes les Créations' },
    { id: 'table', label: 'Art de la Table' },
    { id: 'decor', label: 'Démarche de Décoration' },
    { id: 'custom', label: 'Commandes Sur-mesure / Cafés' }
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleApplyQuote = (productName: string) => {
    setSelectedProduct(null);
    onNavigateToContact(`Demande de devis ou commande : ${productName}`);
  };

  return (
    <div className="space-y-12 animate-fade-in text-stone-700">

      {/* 1. SECTION INTRO */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[#df6438] font-mono text-xs tracking-widest uppercase font-bold">
          {catalogTitle}
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-stone-900 leading-tight">
          {catalogSubtitle}
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed font-light">
          {catalogDescription}
        </p>
      </section>

      {/* 2. CATEGORY SELECTOR CHIPS */}
      <section className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${activeCategory === cat.id
              ? 'bg-[#df6438] text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-950 hover:bg-stone-50'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {/* 3. PRODUCT GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(prod => (
          <div
            key={prod.id}
            className="group bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs hover:border-terracotta-200 hover:shadow-md transition-all flex flex-col cursor-pointer"
            onClick={() => setSelectedProduct(prod)}
          >
            {/* Image Box */}
            <div className="relative aspect-square overflow-hidden bg-stone-100">
              <img
                src={prod.image}
                alt={prod.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {prod.isPopular && (
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-sm bg-amber-500 text-stone-950 font-mono font-bold text-[9px] uppercase tracking-wider">
                  Populaire
                </span>
              )}
              <span className="absolute bottom-3 right-3 px-2 py-1 rounded-sm bg-black/60 text-white font-mono text-[10px] uppercase">
                {prod.category === 'custom' ? 'Est. Spéciale' : 'En stock'}
              </span>
            </div>

            {/* Info Box */}
            <div className="p-5 flex-grow flex flex-col justify-between space-y-3.5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#df6438] font-bold uppercase tracking-wider block">
                  {prod.category === 'table' ? 'Art de la table' : prod.category === 'decor' ? 'Décoration' : 'Sur-mesure'}
                </span>
                <h3 className="font-display font-bold text-stone-950 text-base group-hover:text-[#df6438] transition-colors line-clamp-1">
                  {prod.name}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <span className="font-mono text-xs font-semibold text-stone-900 block">
                  {prod.price}
                </span>
                <span className="text-xs text-[#df6438] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Consulter <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 4. MODAL DRAWER FOR DETAILED STUDY & QUOTING */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-stone-200 shadow-2xl relative animate-scale-up my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square bg-stone-100 h-full">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 space-y-5 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono text-stone-500 font-extrabold uppercase tracking-widest block">
                    {selectedProduct.category.toUpperCase()} • FABRIQUÉ À KADUTU
                  </span>
                  <h2 className="font-display font-extrabold text-[#df6438] text-xl sm:text-2xl">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {selectedProduct.dimensions && (
                    <div className="p-3 bg-stone-50 rounded-lg space-y-1 font-mono text-[11px] text-stone-500">
                      <div><strong className="text-stone-700">Dimensions:</strong> {selectedProduct.dimensions}</div>
                      <div><strong className="text-stone-700">Provenance:</strong> {selectedProduct.origin}</div>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-stone-500 text-[10px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Argile volcanique du Sud-Kivu moulée à la main</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-stone-100">
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-stone-500 block">Prix estimatif :</span>
                    <span className="text-base font-mono font-bold text-stone-900 block">
                      {selectedProduct.price}
                    </span>
                  </div>
                  <button
                    onClick={() => handleApplyQuote(selectedProduct.name)}
                    className="w-full py-3 bg-[#df6438] hover:bg-terracotta-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Commander ce modèle <ShoppingBag className="w-4 h-4" />
                  </button>
                  <p className="text-[9px] text-stone-400 text-center">
                    Note : Les dimensions et finitions peuvent légèrement varier d'une pièce à l'autre en raison du processus artisanal de cuisson.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
