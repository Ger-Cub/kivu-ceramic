import React, { useState } from 'react';
import { Search, Calendar, User, Eye, ArrowLeft, Filter } from 'lucide-react';
import { Article } from '../types';

interface BlogViewProps {
  articles: Article[];
  activeArticleId: string | null;
  onArticleClick: (id: string) => void;
  onBackToList: () => void;
}

export default function BlogView({ articles, activeArticleId, onArticleClick, onBackToList }: BlogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Parse custom styled text simulating basic paragraphs/markdown natively safely
  const parseMarkdownContent = (text: string) => {
    if (!text) return null;
    return text.split('\n\n').map((para, idx) => {
      if (para.startsWith('###')) {
        return (
          <h3 key={idx} className="font-display font-extrabold text-stone-900 text-lg sm:text-xl pt-4 pb-1">
            {para.replace('###', '').trim()}
          </h3>
        );
      }
      if (para.startsWith('##')) {
        return (
          <h2 key={idx} className="font-display font-extrabold text-stone-950 text-2xl pt-6 pb-2 border-b border-stone-200">
            {para.replace('##', '').trim()}
          </h2>
        );
      }
      if (para.startsWith('-') || para.startsWith('*')) {
        const lis = para.split('\n').map((li, lIdx) => (
          <li key={lIdx} className="list-disc ml-5 pl-1 py-1 text-stone-600">
            {li.replace(/^[\s-*]+/, '')}
          </li>
        ));
        return (
          <ul key={idx} className="space-y-1 my-3">
            {lis}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-stone-600 text-sm sm:text-base leading-relaxed mb-4">
          {para}
        </p>
      );
    });
  };

  // Extract all unique tags
  const allTags = ['all', ...Array.from(new Set(articles.flatMap(a => a.tags || [])))];

  // Filters
  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || (art.tags && art.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  const activeArticle = articles.find(art => art.id === activeArticleId);

  // VIEWING SINGLE ARTICLE DETAIL
  if (activeArticle) {
    return (
      <article className="max-w-3xl mx-auto space-y-8 animate-fade-in text-stone-700 pb-12">
        <button
          onClick={onBackToList}
          className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-90 key-back text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#df6438]" /> Retour aux actualités
        </button>

        <div className="space-y-4">
          <span className="px-2.5 py-1 rounded bg-[#df6438]/10 text-[#df6438] text-[10px] font-mono font-bold tracking-wider uppercase">
            {activeArticle.category}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-stone-900 leading-tight">
            {activeArticle.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-mono pt-2 border-b border-stone-200/80 pb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {activeArticle.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> Par {activeArticle.author || "Atelier Kivu Ceramic"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> {activeArticle.views || 0} consultations
            </span>
          </div>
        </div>

        {activeArticle.image && (
          <div className="rounded-3xl overflow-hidden aspect-video relative shadow-md bg-stone-100">
            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Lead Summary callout */}
        <p className="text-stone-900 text-base sm:text-lg leading-relaxed font-semibold italic border-l-4 border-[#df6438] pl-4">
          {activeArticle.summary}
        </p>

        {/* Rich Parsed Content bodies */}
        <div className="space-y-2.5">
          {parseMarkdownContent(activeArticle.content)}
        </div>

        {/* Article tags */}
        {activeArticle.tags && activeArticle.tags.length > 0 && (
          <div className="pt-6 border-t border-stone-150 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-stone-400">TAGS :</span>
            {activeArticle.tags.map((tg, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded bg-stone-100 text-stone-600 text-xs font-medium uppercase font-mono">
                #{tg}
              </span>
            ))}
          </div>
        )}
      </article>
    );
  }

  // ARTICLES LIST DIRECTORY
  return (
    <div className="space-y-10 animate-fade-in text-stone-700">
      
      {/* 1. HEADER SECTION */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[#df6438] font-mono text-xs tracking-widest uppercase font-bold">
          Les Tribunes de l'Atelier
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-stone-900 leading-tight">
          Notre Blog & Actualités Locales
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed font-light">
          Découvrez la vie quotidienne de notre atelier de Kadutu, les témoignages de réhabilitation de nos jeunes Apprentis céramistes et les tribunes sur le design culturel congolais.
        </p>
      </section>

      {/* 2. FILTER & SEARCH RAILS */}
      <section className="bg-white border border-stone-200/60 p-4 rounded-3xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
        {/* Search input */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Rechercher des articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-terracotta-500 focus:bg-white text-stone-800 transition-all font-mono"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
        </div>

        {/* Tag Filters list */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <div className="text-xs text-stone-400 mr-1 hidden sm:inline flex items-center gap-1 font-mono">
            <Filter className="w-3.5 h-3.5" /> Filtrer :
          </div>
          {allTags.map(tg => (
            <button
              key={tg}
              onClick={() => setSelectedTag(tg)}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase transition-all cursor-pointer ${
                selectedTag === tg
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-stone-50 text-stone-500 border border-transparent hover:bg-stone-100'
              }`}
            >
              {tg === 'all' ? 'Tous' : tg}
            </button>
          ))}
        </div>
      </section>

      {/* 3. DYNAMIC ARTICLES LIST */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center max-w-md mx-auto space-y-2">
          <p className="text-stone-600 font-display font-bold text-base">Aucun article trouvé</p>
          <p className="text-stone-400 text-xs leading-relaxed font-light">
            Désolé, aucune publication ne correspond à votre recherche ou filtre à Bukavu. Essayez d'autres termes ou tags !
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(art => (
            <div
              key={art.id}
              onClick={() => onArticleClick(art.id)}
              className="group bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs hover:border-terracotta-200 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
            >
              {/* Cover Image */}
              <div className="relative aspect-video overflow-hidden bg-stone-100">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-sm bg-[#df6438] text-white font-mono font-bold text-[9px] uppercase tracking-wider block">
                  {art.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-sm bg-black/50 text-white font-mono text-[9px]">
                  {art.date}
                </span>
              </div>

              {/* Text Bodies */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-stone-900 text-lg group-hover:text-[#df6438] transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-stone-500 text-xs line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-mono font-bold text-[#df6438] group-hover:text-terracotta-700">
                  <span className="flex items-center gap-1 font-sans text-[11px] text-stone-400 font-normal">
                    <Eye className="w-3.5 h-3.5" /> {art.views || 0} vues
                  </span>
                  <span className="cursor-pointer">Lire l'article &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

    </div>
  );
}
