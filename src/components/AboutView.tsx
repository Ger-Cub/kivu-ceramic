import React from 'react';
import { Target, Eye, Users, HeartPulse, Hammer, Sparkles, Sprout } from 'lucide-react';
import { CompanyDetails } from '../types';

interface AboutViewProps {
  company: CompanyDetails;
}

export default function AboutView({ company }: AboutViewProps) {
  return (
    <div className="space-y-16 animate-fade-in text-stone-700">
      
      {/* 1. INTRO / VISION HERO */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#df6438] font-mono text-xs tracking-widest uppercase font-bold">
          Qui Se Cache Derrière L'Argile ?
        </span>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-stone-900 tracking-tight leading-tight">
          Notre Mission d'Art-Thérapie <br />et d'Insertion Sociale
        </h1>
        <p className="text-stone-500 text-base leading-relaxed font-light">
          Kivu Ceramic est né d'une idée simple : faire de la poterie locale un tremplin de réinsertion pour la jeunesse marginalisée ou traumatisée du Sud-Kivu, tout en créant un pôle d'excellence « Made in Congo ».
        </p>
      </section>

      {/* 2. CORE DUAL MISSION CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Card */}
        <div className="bg-white p-8 rounded-3xl border border-stone-200/60 shadow-xs space-y-4 hover:border-terracotta-200 hover:shadow-md transition-all">
          <div className="inline-flex p-3 bg-terracotta-50 text-[#df6438] rounded-2xl">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-stone-900">Notre Mission de Vie</h2>
          <p className="text-sm leading-relaxed text-stone-600">
            {company.mission || "Sensibiliser et insérer professionnellement la jeunesse vulnérable de Bukavu, âgée de 18 à 35 ans. L'atelier offre des formations qualifiantes intensives afin d'offrir des opportunités concrètes et stables d'intégration communautaire."}
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-white p-8 rounded-3xl border border-stone-200/60 shadow-xs space-y-4 hover:border-emerald-200 hover:shadow-md transition-all">
          <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-stone-900">Notre Vision d'Avenir</h2>
          <p className="text-sm leading-relaxed text-stone-600">
            {company.vision || "Faire rayonner la culture céramique congolaise à l'échelle nationale et régionale. Nous aspirons à devenir l'école de référence en modelage, tout en bâtissant une fillière solidaire, de l'argile locale brute de Kabare jusqu'aux tables gastronomiques d'Afrique centrale."}
          </p>
        </div>
      </section>

      {/* 3. DETAILED ABOUT TEXT SECTION */}
      <section className="bg-stone-50 rounded-3xl border border-stone-200/80 p-8 md:p-12 space-y-6">
        <h2 className="font-display font-bold text-2xl text-stone-900">Origines & Impact de Kivu Ceramic</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
          <p className="font-light">
            {company.aboutText || "À Bukavu, de nombreux jeunes font face au chômage et manquent cruellement de perspectives concrètes d'avenir. Parallèlement, des ressources naturelles somptueuses comme l'argile restent inexploitées. Kivu Ceramic a choisi de relier ces deux réalités. En transformant la terre lourde de Bukavu en objets d'exception, nous transformons par la même occasion le destin des jeunes apprentis."}
          </p>
          <p className="font-light">
            En rejoignant l'atelier, les jeunes participent à un programme intensif d'une durée de 6 à 12 mois. Ils y apprennent le travail sur le tour de potier, la formulation d'émaux non-toxiques, les techniques de séchage et de cuisson, ainsi que les notions essentielles de comptabilité et de gestion de clientèle pour assurer leur autonomie financière future.
          </p>
        </div>
      </section>

      {/* 4. KEY EDUCATION STEPS FOR REHABILITATION */}
      <section className="space-y-8">
        <h2 className="font-display font-bold text-2xl text-stone-900 text-center">
          Comment opère notre programme ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-stone-150 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#df6438]/10 text-[#df6438] flex items-center justify-center font-mono font-black text-sm">1</span>
              <h3 className="font-display font-bold text-stone-900 text-base">La Prise de Contact</h3>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Identification des jeunes de Bukavu en situation d'échec ou d'exclusion. Accueil individuel et bienveillant dans nos locaux de Kadutu.
            </p>
          </div>

          <div className="bg-white p-6 border border-stone-150 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-mono font-black text-sm">2</span>
              <h3 className="font-display font-bold text-stone-900 text-base">Poterie d'Art-Thérapie</h3>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Prendre la terre en mains pour extérioriser ses angoisses et soigner les syndromes traumatiques légers. L'argile apaise et restaure l’estime de soi.
            </p>
          </div>

          <div className="bg-white p-6 border border-stone-150 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-mono font-black text-sm">3</span>
              <h3 className="font-display font-bold text-stone-900 text-base">Le Diplôme & L'Emploi</h3>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Accompagner les jeunes formés vers l'emploi salarié au sein de notre atelier, ou l'installation de leur propre boutique de micro-production locale.
            </p>
          </div>
        </div>
      </section>

      {/* 5. LOCAL SOCIAL IMPACT CALLOUT */}
      <section className="bg-linear-to-r from-[#df6438]/10 to-amber-500/10 rounded-3xl p-8 border border-terracotta-200/50 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#df6438] font-semibold text-sm">
            <Sprout className="w-4 h-4" />
            <span>Soutenez Notre Action Aujourd'hui</span>
          </div>
          <h3 className="font-display font-bold text-stone-900 text-lg md:text-xl">
            Soutenez un jeune en commandant son travail !
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed max-w-2xl font-light">
            En commandant des assiettes, des mugs corporatifs, ou en devenant partenaire financier de Kivu Ceramic, vous financez directement les bourses de repas, de soins et de formation de nos jeunes Apprentis.
          </p>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('footer');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 py-3 bg-[#df6438] hover:bg-terracotta-700 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors shrink-0"
        >
          Devenir Partenaire
        </button>
      </section>

    </div>
  );
}
