import React, { useState } from 'react';
import { Coffee, Menu, X, Landmark, ShieldAlert } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
}

export default function Header({ activeTab, setActiveTab, isAdminLoggedIn, onLogout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'Notre Mission & Impact' },
    { id: 'products', label: 'Nos Créations' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId as ActiveTab);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            {/* Styled Ceramic Pot abstraction in SVG */}
            <div className="flex items-center justify-center w-11 h-11 relative group">
              <img
                src="/assets/kivu-ceramic-logo.svg"
                alt="Kivu Ceramic"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight uppercase text-stone-900 block leading-tight">
                Kivu Ceramic
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#df6438] font-medium block">
                Artisanal & Social • Bukavu
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all ${isActive
                      ? 'bg-[#df6438] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/50'
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Extra utility panel */}
          <div className="hidden md:flex items-center gap-3">
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`px-4 py-2 border border-dashed rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${activeTab === 'admin'
                      ? 'bg-amber-100/50 border-amber-600 text-amber-900'
                      : 'border-yellow-600 text-yellow-800 bg-yellow-50'
                    }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Paneau Admin
                </button>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 border border-stone-300 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  Déconnex.
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-4 py-2 border border-stone-300 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-stone-600 hover:border-terracotta-600 hover:text-terracotta-700 transition-all ${activeTab === 'admin' ? 'bg-terracotta-50 border-terracotta-200 text-terracotta-700' : ''
                  }`}
              >
                Connexion
              </button>
            )}
            <div className="h-6 w-[1px] bg-stone-200"></div>
            <span className="px-2.5 py-0.5 rounded-sm bg-stone-200/50 text-[11px] font-mono font-medium text-stone-600">
              RDC
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {isAdminLoggedIn && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Admin connecté"></span>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg text-stone-600 hover:bg-stone-100 focus:outline-hidden"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-t border-stone-200/50 py-3 px-4 shadow-inner space-y-1 animate-fade-in">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive
                    ? 'bg-[#df6438] text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-100'
                  }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="border-t border-stone-200 my-2 pt-2">
            {isAdminLoggedIn ? (
              <div className="space-y-1.5 pt-1">
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-center text-sm font-semibold transition-all ${activeTab === 'admin'
                      ? 'bg-amber-100 border border-amber-300 text-amber-900'
                      : 'bg-[#df6438]/10 text-[#df6438]'
                    }`}
                >
                  <ShieldAlert className="w-4 h-4" /> Gérer l'Atelier
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl border border-stone-300 text-center text-xs font-semibold text-stone-600"
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('admin')}
                className={`w-full py-3 px-4 rounded-xl text-center text-sm font-semibold border border-stone-300 text-stone-700 hover:border-terracotta-600 hover:text-terracotta-700 ${activeTab === 'admin' ? 'bg-terracotta-50 border-terracotta-200 text-terracotta-700' : ''
                  }`}
              >
                Connexion
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
