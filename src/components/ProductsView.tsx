import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, CornerDownRight, CheckCircle2 } from 'lucide-react';

interface ProductsViewProps {
  onNavigateToContact: (quoteSubject: string) => void;
}

interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  origin: string;
  dimensions?: string;
  isPopular?: boolean;
}

export default function ProductsView({ onNavigateToContact }: ProductsViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

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

  const products: ProductItem[] = [
    {
      id: 'prod-01',
      name: 'Tasse Kahuzi-Biega',
      category: 'table',
      description: 'Mug artisanal rustique tourné à la main, recouvert d’un émail volcanique satiné noir et ocre inspiré du parc national. Idéal pour votre café matinal.',
      price: '15.000 FC / 8 $',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
      origin: 'Bukavu (Kadutu)',
      dimensions: 'Hauteur 9cm, Ø 8.5cm',
      isPopular: true
    },
    {
      id: 'prod-02',
      name: 'Assiette plate "Terroir de Kabare"',
      category: 'table',
      description: 'Assiette large avec un contour brut texturé, préservant la teinte sauvage et ocre de l’argile naturelle. Émail blanc crème mat sur la surface utile.',
      price: '28.000 FC / 12 $',
      image: 'https://images.unsplash.com/photo-1590451430585-64c1f1446937?auto=format&fit=crop&q=80&w=600',
      origin: 'Bukavu (Kadutu)',
      dimensions: 'Ø 24cm',
      isPopular: true
    },
    {
      id: 'prod-03',
      name: 'Vase Amphore Volcan Mat',
      category: 'decor',
      description: 'Vase sculptural façonné à la plaque avec des anses géométriques. Texture extérieure rugueuse rappelant le basalte, intérieur imperméabilisé.',
      price: '70.000 FC / 30 $',
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600',
      origin: 'Bukavu (Kadutu)',
      dimensions: 'Hauteur 28cm, Largeur max 16cm'
    },
    {
      id: 'prod-04',
      name: 'Bol à Ramen "Kivu Teal"',
      category: 'table',
      description: 'Grand bol robuste avec repose-baguettes moulé. Vernis intérieur bleu-vert canard scintillant rappelant les eaux profondes du lac Kivu.',
      price: '35.000 FC / 15 $',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600',
      origin: 'Bukavu (Kadutu)',
      dimensions: 'Hauteur 11cm, Ø 18cm'
    },
    {
      id: 'prod-05',
      name: 'Pot à Bonsaï Souche Charnue',
      category: 'decor',
      description: 'Coupe large et basse percée à l’égout, modelée avec des rainures reproduisant l’écorce des grands arbres de la forêt équatoriale.',
      price: '45.000 FC / 19 $',
      image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=600',
      origin: 'Bukavu (Kadutu)',
      dimensions: 'Ø 20cm, Hauteur 7cm'
    },
    {
      id: 'prod-06',
      name: 'Service à Thé Complet "Goma" pour 4',
      category: 'table',
      description: 'Comprend 1 théière hermétique munie d’un filtre intégré et d’une poignée en rotin, assortie de 4 tasses cylindriques élégantes sans anses.',
      price: '180.000 FC / 75 $',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
      origin: 'Bukavu (Kadutu)',
      dimensions: 'Théière 750ml, Tasses 150ml'
    },
    {
      id: 'prod-07',
      name: 'Ensemble de tasses pour Cafés & Restos',
      category: 'custom',
      description: 'Service personnalisé d’espresso ou de cappuccino pour bars, coffee shops et hôtels. Choix d’email, estampage de votre logo d’entreprise.',
      price: 'Sur devis (Tarif dégressif)',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
      origin: 'Bukavu (Kadutu)',
      dimensions: 'Volumétries ajustables de 80ml à 350ml',
      isPopular: true
    },
    {
      id: 'prod-08',
      name: 'Jarres Décoratives de Sol d’Hôtel',
      category: 'custom',
      description: 'Jarre monumentale de décoration d’intérieur d’un demi-mètre de haut, modelée au boudin par les aînés formateurs de l’atelier.',
      price: 'Sur Devis uniquement',
      image: 'https://images.unsplash.com/photo-1614362945762-3740268291f4?auto=format&fit=crop&q=80&w=600',
      origin: 'Bukavu (Kadutu)',
      dimensions: 'Hauteur 55cm, Ø 32cm'
    }
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
          Les Trésors de l’Atelier
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-stone-900 leading-tight">
          Notre Catalogue de Céramiques d'Exception
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed font-light">
          Chaque objet est une pièce unique, tournée ou modelée à la main à Bukavu par nos artisans. Nous utilisons une argile ocre locale, cuite à haute température pour assurer robustesse au four ou au lave-vaisselle.
        </p>
      </section>

      {/* 2. CATEGORY SELECTOR CHIPS */}
      <section className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === cat.id
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
