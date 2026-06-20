import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ProductsView from './components/ProductsView';
import BlogView from './components/BlogView';
import ContactView from './components/ContactView';
import AdminView from './components/AdminView';
import AfricanPattern from './components/AfricanPattern';
import { ActiveTab, Article, Contact, CompanyDetails } from './types';
import { Loader2, AlertCircle } from 'lucide-react';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [prefilledSubject, setPrefilledSubject] = useState<string>('');

  // Currently viewed blog article
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  // States
  const [articles, setArticles] = useState<Article[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [company, setCompany] = useState<CompanyDetails>({
    phone: '',
    email: '',
    address: '',
    mission: '',
    vision: '',
    aboutText: ''
  });

  // Authentication State
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('kivu_admin_token');
  });

  // UI Loaders
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // -------------------------------------------------------------
  // FETCHERS (STABILIZED HANDLERS)
  // -------------------------------------------------------------
  const fetchCompanyDetails = async () => {
    try {
      const res = await fetch('/api/company');
      if (res.ok) {
        const data = await res.json();
        setCompany(data);
      } else {
        throw new Error("Impossible de charger les données d'atelier.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Impossible de joindre le serveur backend.");
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (err) {
      console.error("Failed to load blog articles:", err);
    }
  };

  const fetchContacts = async (tokenValue: string | null) => {
    const activeToken = tokenValue || adminToken;
    if (!activeToken) return;

    try {
      const res = await fetch('/api/contacts', {
        headers: {
          'Authorization': `Bearer ${activeToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (err) {
      console.error("Failed to load contacts:", err);
    }
  };

  // -------------------------------------------------------------
  // INITIAL LOAD
  // -------------------------------------------------------------
  useEffect(() => {
    const initApp = async () => {
      setLoading(true);
      setErrorMsg('');
      await Promise.all([fetchCompanyDetails(), fetchArticles()]);
      
      // If we have saved session token, grab initial inbox list too
      if (adminToken) {
        await fetchContacts(adminToken);
      }
      setLoading(false);
    };
    
    initApp();
  }, [adminToken]); // Refresh contacts when validation context changes

  // -------------------------------------------------------------
  // ACTION AUTHENTICATION HOOKS
  // -------------------------------------------------------------
  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('kivu_admin_token', token);
    setAdminToken(token);
    fetchContacts(token);
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem('kivu_admin_token');
    setAdminToken(null);
    setContacts([]);
    // Back to home
    setActiveTab('home');
  };

  // -------------------------------------------------------------
  // HELPER NAVIGATION TRIGGERS (UX INTEGRATION FOR DISCOVER COUPLING)
  // -------------------------------------------------------------
  const handleProductQuoteAction = (quoteSubject: string) => {
    setPrefilledSubject(quoteSubject);
    handleNavigate('contact');
  };

  const handleNavigate = (tabName: string) => {
    if (tabName === 'admin') {
      setActiveTab('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (activeTab === 'admin') {
        setActiveTab(tabName as ActiveTab);
        setTimeout(() => {
          const el = document.getElementById(tabName);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        const el = document.getElementById(tabName);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const handleArticleClick = (articleId: string) => {
    setActiveArticleId(articleId);
    // Track count update on server side too
    fetch(`/api/articles/${articleId}`).then(() => {
      // Re-fetch list to update view count state
      fetchArticles();
    });
  };

  // Modern scroll-spy tracker: automatically highlighting current section on scroll
  useEffect(() => {
    if (activeTab === 'admin' || loading) return;

    const sections = ['home', 'about', 'products', 'blog', 'contact'];
    
    const onScroll = () => {
      const scrollPos = window.scrollY + 280; // offset to pick up center content
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveTab(sectionId as ActiveTab);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading, activeTab === 'admin']);

  // Read clean status loaders
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center gap-4 text-stone-600">
        <Loader2 className="w-10 h-10 animate-spin text-terracotta-600" />
        <p className="font-display font-medium text-sm tracking-wider uppercase">Chargement de Kivu Ceramic...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      
      {/* 1. MAIN GLOBAL NAVBAR HEADER */}
      {activeTab !== 'admin' && (
        <Header 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            handleNavigate(tab);
            // Clean cached subject if they leave the tab
            if (tab !== 'contact') setPrefilledSubject('');
            // Clear active blog read state if they click tab
            if (tab !== 'blog') setActiveArticleId(null);
          }}
          isAdminLoggedIn={!!adminToken}
          onLogout={handleLogoutAdmin}
        />
      )}

      {/* 2. ERROR STATE BAR */}
      {errorMsg && (
        <div className="bg-rose-600 text-white p-3 text-xs font-medium text-center flex items-center justify-center gap-1.5 animate-pulse relative z-50">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMsg} — Fonctionnement hors-ligne ou local activé par défaut.</span>
        </div>
      )}

      {/* 3. DYNAMIC MAIN SPA SECTIONS */}
      <main className="flex-grow">
        {activeTab === 'admin' ? (
          <div className="w-full min-h-screen bg-stone-50">
            <AdminView 
              company={company}
              onUpdateCompany={setCompany}
              articles={articles}
              onRefreshArticles={fetchArticles}
              contacts={contacts}
              onRefreshContacts={() => fetchContacts(adminToken)}
              token={adminToken}
              onLoginSuccess={handleLoginSuccess}
              onLogoutAdmin={handleLogoutAdmin}
              onBackToSite={() => handleNavigate('home')}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            
            {/* Section 1: ACCUEIL */}
            <section id="home" className="relative scroll-mt-20">
              <HomeView company={company} onNavigate={handleNavigate} />
            </section>

            {/* Section 2: NOTRE MISSION & IMPACT */}
            <section id="about" className="relative bg-white py-24 border-y border-stone-200/40 scroll-mt-20 overflow-hidden">
              <AfricanPattern variant="kuba" className="opacity-[0.035]" />
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <AboutView company={company} />
              </div>
            </section>

            {/* Section 3: NOS CRÉATIONS */}
            <section id="products" className="relative bg-stone-50 py-24 border-b border-stone-200/40 scroll-mt-20 overflow-hidden">
              <AfricanPattern variant="waves" className="opacity-[0.025]" />
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <ProductsView onNavigateToContact={handleProductQuoteAction} />
              </div>
            </section>

            {/* Section 4: BLOG / ACTUALITÉS */}
            <section id="blog" className="relative bg-white py-24 border-b border-stone-200/40 scroll-mt-20 overflow-hidden">
              <AfricanPattern variant="mesh" className="opacity-[0.03]" />
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <BlogView 
                  articles={articles} 
                  onArticleClick={(articleId) => {
                    handleArticleClick(articleId);
                    const el = document.getElementById('blog');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  activeArticleId={activeArticleId}
                  onBackToList={() => {
                    setActiveArticleId(null);
                    const el = document.getElementById('blog');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                />
              </div>
            </section>

            {/* Section 5: NOUS CONTACTER */}
            <section id="contact" className="relative bg-[#FAF8F5] py-24 scroll-mt-20 overflow-hidden">
              <AfricanPattern variant="kuba" className="opacity-[0.02]" />
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <ContactView company={company} prefilledSubject={prefilledSubject} />
              </div>
            </section>

          </div>
        )}
      </main>

      {/* 4. FOOTER COORDIANTES HINT */}
      {activeTab !== 'admin' && <Footer company={company} onNavigate={handleNavigate} />}

    </div>
  );
}
