import React, { useState } from 'react';
import { Product } from '../types';
import { 
  ShoppingBag, 
  Sparkles, 
  Info, 
  ClipboardCheck, 
  CheckCircle,
  HelpCircle,
  ArrowUpRight 
} from 'lucide-react';

interface ProductsProps {
  products: Product[];
  onInquire: (productName: string) => void;
}

export default function Products({ products, onInquire }: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Extract unique categories dynamically
  const categories = ['Tous', 'Assiettes', 'Bols', 'Tasses', 'Pots de fleurs', 'Vases', 'Objets décoratifs'];

  // Filter products
  const filteredProducts = selectedCategory === 'Tous'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="catalog" className="py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 text-left">
            <span className="text-xs font-mono font-bold uppercase text-terracotta-600 tracking-[0.2em]">
              CATALOGUE ARTISANAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-stone-900 tracking-tight">
              Façonnés à la main, cuits avec passion
            </h2>
            <p className="text-stone-500 text-sm max-w-xl">
              Chaque assiette, tasse ou vase est une création unique modelée à Bukavu. L'utilisation d'émaux locaux garantit des pièces à la fois durables, fonctionnelles et esthétiques.
            </p>
          </div>

          {/* Quick Notice Tag */}
          <div className="inline-flex items-center gap-2.5 bg-stone-50 border border-stone-200 p-4 rounded-2xl max-w-sm text-left">
            <Info className="w-5 h-5 text-amber-700 shrink-0" />
            <p className="text-xs text-stone-600">
              <strong>Commandes Hôtels :</strong> Nous personnalisons les séries complètes d'art de la table sur-mesure pour les institutions.
            </p>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold font-display whitespace-nowrap transition cursor-pointer border ${
                selectedCategory === cat 
                  ? 'bg-stone-900 border-stone-900 text-white shadow-sm' 
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(prod => (
            <div 
              key={prod.id}
              className="group bg-stone-50/50 rounded-2xl border border-stone-200/80 overflow-hidden hover:border-amber-750 hover:border-amber-600/45 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Cover Image Container */}
              <div className="relative aspect-square overflow-hidden bg-stone-100 shrink-0">
                <img 
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm border border-stone-100">
                  {prod.category}
                </span>

                {/* Hot item Featured stamp */}
                {prod.featured && (
                  <span className="absolute top-3 right-3 bg-amber-600/90 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md shadow">
                    Vedette
                  </span>
                )}

                {/* Absolute overlay view detail button */}
                <button 
                  onClick={() => setSelectedProduct(prod)}
                  className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <span className="bg-white text-stone-900 font-bold font-display px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    Voir les détails
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>

              {/* Text metadata */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold font-display text-stone-900 text-lg leading-snug group-hover:text-amber-800 transition-colors">
                      {prod.name}
                    </h3>
                    <span className="font-mono font-bold text-stone-900 shrink-0">
                      {prod.price || "Tarif sur devis"}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs mt-auto">
                  <span className={`inline-flex items-center gap-1 font-semibold ${
                    prod.status === 'available' ? 'text-emerald-700' :
                    prod.status === 'custom-only' ? 'text-amber-700' : 'text-stone-500'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      prod.status === 'available' ? 'bg-emerald-500' :
                      prod.status === 'custom-only' ? 'bg-amber-500' : 'bg-stone-300'
                    }`} />
                    {prod.status === 'available' ? 'Atelier Disponible' :
                     prod.status === 'custom-only' ? 'Sur-mesure' : 'Rupture'}
                  </span>

                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="text-stone-400 group-hover:text-amber-800 font-bold transition hover:underline"
                  >
                    Détails &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-12 text-stone-400">
              Aucun produit ne correspond à cette sélection actuellement. 
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* PRODUCT DETAIL MODAL DRAWER */}
        {/* ========================================================= */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 relative grid grid-cols-1 md:grid-cols-2">
              
              {/* Close Button top-right */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-stone-100 p-1.5 rounded-full text-stone-600 hover:text-stone-900 border border-stone-200 transition"
              >
                <span className="sr-only">Fermer</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Cover visual */}
              <div className="relative h-64 md:h-full bg-stone-50">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3 left-3 bg-stone-900 text-white text-xs font-bold px-3 py-1 rounded">
                  {selectedProduct.category}
                </span>
              </div>

              {/* Informative text workspace details */}
              <div className="p-8 flex flex-col justify-between text-left space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-stone-900">{selectedProduct.name}</h3>
                    <p className="font-mono text-base font-bold text-amber-800 mt-1">{selectedProduct.price || "Tarif sur commande"}</p>
                  </div>

                  <p className="text-xs leading-relaxed text-stone-600 font-sans">
                    {selectedProduct.description}
                  </p>

                  <div className="space-y-2.5 text-xs text-stone-500 pt-2 border-t border-stone-100 font-sans">
                    {selectedProduct.dimensions && (
                      <p><strong>Dimensions / Volume :</strong> {selectedProduct.dimensions}</p>
                    )}
                    <p><strong>Origine brute :</strong> Argile de la province du Sud-Kivu, tamisée et travaillée à Kadutu.</p>
                    <p><strong>Qualité d'émaillage :</strong> Conforme à l'usage alimentaire, haute résistance thermique.</p>
                  </div>
                </div>

                {/* Dynamic call to Action to auto-populate inquiry form */}
                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <button
                    onClick={() => {
                      onInquire(selectedProduct.name);
                      setSelectedProduct(null);
                    }}
                    className="w-full text-center bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    <span>Demander un devis pour cet objet</span>
                  </button>
                  <p className="text-[10px] text-center text-stone-400">
                    Notre équipe étudie les besoins des ménages, hôtels et restaurants à Bukavu.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
