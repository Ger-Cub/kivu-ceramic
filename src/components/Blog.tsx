import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Search, Calendar, User, Clock, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

interface BlogProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Extract unique categories
  const categories = ['Tous', 'Art-Thérapie', 'Éco-Technologie', 'Insertion Professionnelle'];

  // Filter blog posts based on search query AND category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="blog" className="py-20 bg-stone-100 border-t border-stone-200">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 text-left">
            <span className="text-xs font-mono font-bold uppercase text-terracotta-600 tracking-[0.2em]">
              BLOG & ACTUALITÉS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-stone-900 tracking-tight">
              Nouvelles et savoir-faire de l'atelier
            </h2>
            <p className="text-stone-500 text-sm max-w-xl font-sans">
              Découvrez la vie en direct de nos installations à Bukavu. Lisez nos analyses sur l'art-thérapie, la préservation environnementale du bassin du Congo, et l'insertion sociale de nos apprentis.
            </p>
          </div>

          {/* Dynamic Search & Categorization controls */}
          <div className="relative w-full md:w-80 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Rechercher alertes, articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-200 pl-10 pr-4 py-3 rounded-xl text-xs font-sans focus:outline-none focus:border-amber-600 transition shadow-sm font-medium"
            />
          </div>
        </div>

        {/* Sub-categories bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200/60 text-left">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pb-2.5 px-1 text-xs font-bold font-display relative whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat ? 'text-amber-800' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Articles List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article 
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition duration-300 flex flex-col justify-between cursor-pointer text-left"
            >
              {/* Cover cover */}
              <div className="relative h-48 overflow-hidden bg-stone-100">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded-md">
                  {post.category}
                </span>
              </div>

              {/* Card Meta */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {/* Title and stats */}
                  <div className="flex items-center gap-4 text-[11px] text-stone-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-display text-stone-900 group-hover:text-amber-800 transition duration-150 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed font-sans">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs mt-4">
                  <span className="flex items-center gap-1.5 text-stone-400 font-medium">
                    <User className="w-3.5 h-3.5 text-stone-300" />
                    {post.author}
                  </span>

                  <span className="text-amber-800 font-bold group-hover:translate-x-1 transition duration-200 flex items-center gap-0.5">
                    Lire la suite
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}

          {filteredPosts.length === 0 && (
            <div className="col-span-full text-center py-12 text-stone-400 font-sans">
              Aucun article rédigé ne correspond à cette recherche. Modifiez vos filtres ou effectuez une recherche différente.
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* L'ARTICLE READER DIALOG OVERLAY */}
        {/* ========================================================= */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col">
              
              {/* Absolute Close Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-100 flex items-center justify-between z-10">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded">
                  {selectedPost.category}
                </span>

                <button 
                  onClick={() => setSelectedPost(null)}
                  className="bg-stone-50 hover:bg-stone-150 p-1.5 rounded-full text-stone-500 hover:text-stone-900 border border-stone-200/50 transition cursor-pointer"
                >
                  <span className="sr-only">Fermer</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Reader body content */}
              <div className="p-6 md:p-8 space-y-6 text-left">
                {/* Hero cover image */}
                <div className="h-56 md:h-72 w-full rounded-2xl overflow-hidden bg-stone-50">
                  <img 
                    src={selectedPost.coverImage} 
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Meta details */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-stone-300" />
                      {new Date(selectedPost.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-stone-300" />
                      Temps de lecture: {selectedPost.readTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-stone-300" />
                      Auteur: {selectedPost.author}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black font-display text-stone-900 leading-tight">
                    {selectedPost.title}
                  </h3>
                </div>

                {/* Formatted body paragraph content */}
                <div className="prose prose-stone max-w-none text-stone-750 text-sm leading-relaxed font-sans space-y-4 pt-4 border-t border-stone-105 whitespace-pre-wrap">
                  {selectedPost.content}
                </div>
              </div>

              {/* Footer action to go back */}
              <div className="sticky bottom-0 bg-stone-50 px-6 py-4 border-t border-stone-100 flex justify-end shrink-0">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold font-display cursor-pointer"
                >
                  Fermer la lecture
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
