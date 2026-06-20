import React, { useState, useEffect } from 'react';
import { ArrowRight, Hammer, HeartPulse, Award, ShoppingBag, Sparkles } from 'lucide-react';
import { CompanyDetails } from '../types';
import { motion } from 'motion/react';

interface HomeViewProps {
  company: CompanyDetails;
  onNavigate: (tab: string) => void;
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=1600", // original beautiful pottery on shelves
  "https://images.unsplash.com/photo-1565192647048-f997ded8795c?auto=format&fit=crop&q=80&w=1600", // skilled craftsman shaping clay on wheel
  "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=1600", // close-up details of warm clay ceramic
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1600"  // elegant studio display of finished earthen vessels
];

export default function HomeView({ company, onNavigate }: HomeViewProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // 6 seconds slide duration for maximum elegance
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in w-full">
      
      {/* 1. HERO SECTION WITH CINEMATIC ZOOM-FADE BACKGROUND SLIDESHOW (Fits flush with screen edges) */}
      <section className="relative bg-stone-950 text-white w-full py-32 px-6 md:px-12 lg:px-24 min-h-[580px] flex items-center">
        
        {/* Sliding images layer */}
        <div className="absolute inset-0 z-0">
          {HERO_IMAGES.map((img, idx) => (
            <div
              key={img}
              className="absolute inset-0 bg-cover bg-center transition-all duration-[2500ms] ease-in-out mix-blend-overlay"
              style={{
                backgroundImage: `url('${img}')`,
                opacity: idx === currentImgIndex ? 0.35 : 0,
                transform: idx === currentImgIndex ? 'scale(1.02)' : 'scale(1.10)',
              }}
            />
          ))}
        </div>
        
        {/* Soft elegant vignette gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-stone-950 via-stone-950/80 to-stone-900/20 z-1" />

        {/* Animated Contents */}
        <div className="relative z-10 max-w-4xl space-y-7">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 .5 py-1.5 rounded-full bg-[#df6438]/20 border border-terracotta-500/30 text-[#df6438] text-[11px] font-mono font-semibold tracking-wider uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Atelier Social d'Artisans Céramistes RDC</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white"
          >
            KIVU CERAMIC : <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#df6438] to-orange-400">
              Transformer l'argile
            </span> du Kivu en opportunités
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-stone-300 text-lg sm:text-xl leading-relaxed max-w-2xl font-light"
          >
            En unissant les traditions ancestrales africaines de poterie aux innovations écologiques modernes, Kivu Ceramic crée des œuvres uniques et redonne espoir, dignité et avenir aux jeunes de Bukavu.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={() => onNavigate('products')}
              className="px-8 py-4 bg-[#df6438] hover:bg-terracotta-700 text-white rounded-xl font-medium tracking-wide shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all cursor-pointer flex items-center gap-2"
            >
              Découvrir nos créations <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-medium hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              Collaborer ou Commander
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-6 right-6 md:right-12 z-10 hidden sm:flex items-center gap-2 px-3 py-1 rounded-sm bg-black/40 text-[10px] font-mono tracking-widest text-stone-300 uppercase">
          📍 Bukavu, Sud-Kivu, RD Congo
        </div>
      </section>

      {/* CONTAINER WRAPPER FOR REMAINING HOME BLOCK ELEMENTS */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* 2. STATS BAR GRID */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: "18-35 ans", label: "Public cible soutenu", desc: "Favoriser l'insertion des jeunes vulnérables." },
            { number: "100%", label: "Matière Locale", desc: "Argile pure extraite à Bukavu et Kabare." },
            { number: "2 Pôles", label: "Art-Thérapie & Métiers", desc: "Guérir le stress et enseigner le tournage." },
            { number: "Made in DRC", label: "Fierté Nationale", desc: "Alternative durable et haut de gamme." }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-xs hover:border-terracotta-200 hover:shadow-md transition-all">
              <div className="font-display font-extrabold text-2xl text-[#df6438] mb-1">{stat.number}</div>
              <div className="font-semibold text-stone-900 text-sm mb-1">{stat.label}</div>
              <p className="text-stone-500 text-xs leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </section>

        {/* 3. CORE MISSION & VALUE STATEMENT */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#df6438] font-bold">
              Qui sommes-nous ?
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-stone-900 leading-tight">
              Associer tradition de poterie et réhabilitation humaine
            </h2>
            <p className="text-stone-600 text-base leading-relaxed">
              {company.aboutText || "KIVU CERAMIC est une entreprise culturelle et sociale basée à Bukavu. Notre atelier associe les techniques traditionnelles de poterie aux innovations modernes de manière à valoriser l'argile du Kivu pour créer des produits authentiques."}
            </p>
            <div className="p-5 bg-terracotta-50/50 rounded-2xl border border-terracotta-100/50 space-y-2">
              <div className="font-semibold text-stone-850 text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-[#df6438]" /> Une alternative locale aux produits d'importation
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">
                Nous produisons et commercialisons des assiettes, tasses, bols, pots de fleurs et vases façonnés avec soin à Bukavu, offrant aux restaurants, hôtels et particuliers des pièces de caractère résistantes et écoresponsables.
              </p>
            </div>
            <div>
              <button
                onClick={() => onNavigate('about')}
                className="text-[#df6438] hover:text-[#8b3417] font-semibold items-center inline-flex gap-2 text-sm group cursor-pointer"
              >
                En savoir plus sur notre mission sociale <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white border border-stone-200 p-6 rounded-2xl flex gap-4 items-start hover:shadow-xs hover:translate-x-1 transition-all">
              <div className="p-3 bg-stone-100 text-stone-800 rounded-xl">
                <Hammer className="w-6 h-6 text-[#df6438]" />
              </div>
              <div>
                <h3 className="font-display font-bold text-stone-950 text-base mb-1">Formation & Insertion</h3>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Tournage, tournassage, cuisson écologique et commercialisation. Les jeunes acquièrent de solides compétences pour lancer d'importantes activités génératrices de revenus.
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 p-6 rounded-2xl flex gap-4 items-start hover:shadow-xs hover:translate-x-1 transition-all">
              <div className="p-3 bg-stone-100 text-stone-800 rounded-xl">
                <HeartPulse className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-display font-bold text-stone-950 text-base mb-1">Art-thérapie de l'argile</h3>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Prendre la terre en main pour extérioriser ses angoisses et soigner le cœur. L'argile détend, responsabilise et favorise le lâcher-prise pour surmonter les précarités.
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 p-6 rounded-2xl flex gap-4 items-start hover:shadow-xs hover:translate-x-1 transition-all">
              <div className="p-3 bg-stone-100 text-stone-800 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-display font-bold text-stone-950 text-base mb-1">Engagement & Circuit Court</h3>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Une production respectueuse des ressources locales, valorisant le savoir-faire des anciens de Kabare tout en l'adaptant aux exigences d'esthétique contemporaine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CALL TO ACTION - OUR ATELIER SPOTLIGHT */}
        <section className="bg-linear-to-br from-stone-50 to-stone-100 rounded-3xl p-8 md:p-12 border border-stone-300/40 relative overflow-hidden">
          <div className="max-w-xl space-y-4">
            <span className="px-2.5 py-1 bg-stone-200/70 rounded text-[10px] font-mono uppercase tracking-widest text-stone-700">
              Notre Espace de Création
            </span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-stone-900">
              Visitez ou contactez notre atelier de Kadutu
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Situé au cœur de Bukavu, notre atelier dispose d’équipements performants : tours de potier rotatifs, un grand four électrique écologique, et d'un espace chaleureux de communion artistique. 
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-2.5 bg-stone-900 text-white hover:bg-stone-850 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Nous Contacter
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="px-5 py-2.5 bg-transparent border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              >
                En Savoir Plus
              </button>
            </div>
          </div>
          
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial from-stone-200/50 to-transparent hidden md:block rounded-full transform translate-x-20 translate-y-20"></div>
        </section>
        
      </div>
      
    </div>
  );
}
