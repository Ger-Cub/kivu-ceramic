import React, { useState, useEffect } from 'react';
import {
  Building, BookOpen, MessageSquare, Database, Plus, Trash2, Edit3, CheckCheck,
  SquarePlay, ShieldAlert, Sparkles, Loader2, LogOut, Check, ChevronDown, CheckCircle, AlertCircle, ShoppingBag
} from 'lucide-react';
import { Article, Contact, CompanyDetails, Product } from '../types';
import AfricanPattern from './AfricanPattern';
import { supabase } from '../lib/supabase';

interface AdminViewProps {
  company: CompanyDetails;
  onUpdateCompany: (comp: CompanyDetails) => void;
  articles: Article[];
  onRefreshArticles: () => void;
  products: Product[];
  onRefreshProducts: () => void;
  contacts: Contact[];
  onRefreshContacts: () => void;
  token: string | null;
  onLoginSuccess: (token: string) => void;
  onLogoutAdmin: () => void;
  onBackToSite: () => void;
}

export default function AdminView({
  company,
  onUpdateCompany,
  articles,
  onRefreshArticles,
  products,
  onRefreshProducts,
  contacts,
  onRefreshContacts,
  token,
  onLoginSuccess,
  onLogoutAdmin,
  onBackToSite
}: AdminViewProps) {
  // Navigation internal
  const [adminTab, setAdminTab] = useState<'dashboard' | 'articles' | 'products' | 'inbox' | 'company'>('dashboard');

  // Input states for Admin login
  const [passkey, setPasskey] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // States for CRUD operations
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogCategory, setBlogCategory] = useState('Activité d’Apprentis');
  const [blogTagsInput, setBlogTagsInput] = useState('');
  const [blogSubmitting, setBlogSubmitting] = useState(false);
  const [blogActionError, setBlogActionError] = useState('');
  const [blogActionSuccess, setBlogActionSuccess] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // States for Product CRUD
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('table');
  const [prodDescription, setProdDescription] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodOrigin, setProdOrigin] = useState('Bukavu (Kadutu)');
  const [prodDimensions, setProdDimensions] = useState('');
  const [prodIsPopular, setProdIsPopular] = useState(false);
  const [prodSubmitting, setProdSubmitting] = useState(false);
  const [prodActionError, setProdActionError] = useState('');
  const [prodActionSuccess, setProdActionSuccess] = useState(false);

  // States for Company Settings Update
  const [compPhone, setCompPhone] = useState(company.phone);
  const [compEmail, setCompEmail] = useState(company.email);
  const [compAddress, setCompAddress] = useState(company.address);
  const [compMission, setCompMission] = useState(company.mission);
  const [compVision, setCompVision] = useState(company.vision);
  const [compAboutText, setCompAboutText] = useState(company.aboutText);
  const [compCatalogTitle, setCompCatalogTitle] = useState(company.catalogTitle || '');
  const [compCatalogSubtitle, setCompCatalogSubtitle] = useState(company.catalogSubtitle || '');
  const [compCatalogDescription, setCompCatalogDescription] = useState(company.catalogDescription || '');
  const [compSubmitting, setCompSubmitting] = useState(false);
  const [compSuccess, setCompSuccess] = useState(false);

  // Statistics for dashboard
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    totalContacts: 0,
    unreadContacts: 0
  });
  const [statsLoading, setStatsLoading] = useState(false);

  // Sync settings inputs when company props loads/changes
  useEffect(() => {
    if (company) {
      setCompPhone(company.phone || '');
      setCompEmail(company.email || '');
      setCompAddress(company.address || '');
      setCompMission(company.mission || '');
      setCompVision(company.vision || '');
      setCompAboutText(company.aboutText || '');
      setCompCatalogTitle(company.catalogTitle || '');
      setCompCatalogSubtitle(company.catalogSubtitle || '');
      setCompCatalogDescription(company.catalogDescription || '');
    }
  }, [company]);

  // Fetch Stats when authenticated
  const fetchStats = async () => {
    if (!token) return;
    setStatsLoading(true);
    try {
      const { data: arts, error: err1 } = await supabase.from('articles').select('views');
      const { data: conts, error: err2 } = await supabase.from('contacts').select('status');

      if (err1 || err2) throw err1 || err2;

      const totalViews = (arts || []).reduce((acc, curr) => acc + (curr.views || 0), 0);
      const totalArticles = (arts || []).length;
      const totalContacts = (conts || []).length;
      const unreadContacts = (conts || []).filter(c => c.status === 'unread').length;

      setStats({
        totalArticles,
        totalViews,
        totalContacts,
        unreadContacts
      });
    } catch (err) {
      console.error("Failed to load admin stats:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStats();
    }
  }, [token, articles, contacts]);

  // Handling Admin Log In
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setLoginError("Veuillez saisir votre passkey d'administration.");
      return;
    }

    setLoginLoading(true);
    setLoginError('');

    try {
      // In a real Supabase app, we'd use auth.signInWithPassword
      // But here the user defined a passkey logic. 
      // We'll mimic it or check against a hidden setting.
      // For now, I'll keep the passkey logic simplified to 'kivu2026' or check a 'secrets' table.
      // Better yet: the user can set ADMIN_PASSKEY in Supabase or use a simple auth check.

      if (passkey === 'kivu2026') {
        onLoginSuccess('kivu-admin-authenticated-token-2026');
      } else {
        setLoginError("Passkey d'accès invalide. Veuillez réessayer.");
      }
    } catch (err) {
      console.error(err);
      setLoginError("Erreur d'authentification.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handles updating company profile parameters
  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompSubmitting(true);
    setCompSuccess(false);

    try {
      const { data, error } = await supabase
        .from('company_settings')
        .upsert({
          id: 1,
          phone: compPhone,
          email: compEmail,
          address: compAddress,
          mission: compMission,
          vision: compVision,
          about_text: compAboutText,
          catalog_title: compCatalogTitle,
          catalog_subtitle: compCatalogSubtitle,
          catalog_description: compCatalogDescription
        })
        .select()
        .single();

      if (error) throw error;

      setCompSuccess(true);
      onUpdateCompany({
        ...data,
        aboutText: data.about_text,
        catalogTitle: data.catalog_title,
        catalogSubtitle: data.catalog_subtitle,
        catalogDescription: data.catalog_description
      });
      setTimeout(() => setCompSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setCompSubmitting(false);
    }
  };

  // Handle contact progress validation status change
  const handleUpdateContactStatus = async (contactId: string, currentStatus: string) => {
    const freshStatus = currentStatus === 'unread' ? 'read' : 'replied';
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status: freshStatus })
        .eq('id', contactId);

      if (error) throw error;
      onRefreshContacts();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle deleting contact message
  const handleDeleteContact = async (contactId: string) => {
    if (!confirm("Voulez-vous définitivement supprimer ce message de la boîte de réception ?")) return;
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contactId);

      if (error) throw error;
      onRefreshContacts();
    } catch (err) {
      console.error(err);
    }
  };

  // Loading inputs of article metadata to prepare editing
  const handleLoadEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setBlogTitle(art.title);
    setBlogSummary(art.summary);
    setBlogContent(art.content);
    setBlogImage(art.image);
    setBlogCategory(art.category);
    setBlogTagsInput((art.tags || []).join(', '));
    setBlogActionSuccess(false);
    setBlogActionError('');
  };

  // Cleaning form elements
  const handleResetArticleForm = () => {
    setEditingArticleId(null);
    setBlogTitle('');
    setBlogSummary('');
    setBlogContent('');
    setBlogImage('');
    setBlogCategory('Activité d’Apprentis');
    setBlogTagsInput('');
    setBlogActionSuccess(false);
    setBlogActionError('');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    setBlogActionError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (editingProductId || adminTab === 'products') {
        setProdImage(publicUrl);
      } else {
        setBlogImage(publicUrl);
      }
    } catch (err: any) {
      console.error(err);
      setBlogActionError("Erreur lors de l'envoi de l'image : " + err.message);
      setProdActionError("Erreur lors de l'envoi de l'image : " + err.message);
    } finally {
      setImageUploading(false);
    }
  };

  // Product specific CRUD handlers
  const handleLoadEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProdName(prod.name);
    setProdCategory(prod.category);
    setProdDescription(prod.description);
    setProdPrice(prod.price);
    setProdImage(prod.image);
    setProdOrigin(prod.origin);
    setProdDimensions(prod.dimensions || '');
    setProdIsPopular(prod.isPopular || false);
    setProdActionSuccess(false);
    setProdActionError('');
  };

  const handleResetProductForm = () => {
    setEditingProductId(null);
    setProdName('');
    setProdCategory('table');
    setProdDescription('');
    setProdPrice('');
    setProdImage('');
    setProdOrigin('Bukavu (Kadutu)');
    setProdDimensions('');
    setProdIsPopular(false);
    setProdActionSuccess(false);
    setProdActionError('');
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodDescription.trim() || !prodPrice.trim()) {
      setProdActionError("Le nom, la description et le prix sont requis.");
      return;
    }

    setProdSubmitting(true);
    setProdActionError('');
    setProdActionSuccess(false);

    const prodPayload = {
      name: prodName,
      category: prodCategory,
      description: prodDescription,
      price: prodPrice,
      image: prodImage || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
      origin: prodOrigin,
      dimensions: prodDimensions,
      is_popular: prodIsPopular
    };

    try {
      if (editingProductId) {
        const { error } = await supabase
          .from('products')
          .update(prodPayload)
          .eq('id', editingProductId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert({
            id: Math.random().toString(36).substr(2, 9),
            ...prodPayload
          });
        if (error) throw error;
      }

      setProdActionSuccess(true);
      handleResetProductForm();
      onRefreshProducts();
      setTimeout(() => setProdActionSuccess(false), 4500);
    } catch (err: any) {
      setProdActionError(err.message || "L'action sur le produit a échoué.");
    } finally {
      setProdSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Voulez-vous définitivement supprimer ce produit du catalogue ?")) return;
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      onRefreshProducts();
    } catch (err) {
      console.error(err);
      alert("La suppression du produit a échoué.");
    }
  };

  // Handle article Creation or update save
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogSummary.trim() || !blogContent.trim()) {
      setBlogActionError("Le titre, le résumé et le contenu principal sont requis.");
      return;
    }

    setBlogSubmitting(true);
    setBlogActionError('');
    setBlogActionSuccess(false);

    const formattedTags = blogTagsInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    const artPayload = {
      title: blogTitle,
      summary: blogSummary,
      content: blogContent,
      image: blogImage || "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=600",
      category: blogCategory,
      tags: formattedTags,
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
      author: 'Admin'
    };

    try {
      if (editingArticleId) {
        const { error } = await supabase
          .from('articles')
          .update(artPayload)
          .eq('id', editingArticleId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('articles')
          .insert({
            id: Math.random().toString(36).substr(2, 9),
            ...artPayload,
            views: 0
          });
        if (error) throw error;
      }

      setBlogActionSuccess(true);
      handleResetArticleForm();
      onRefreshArticles();
      setTimeout(() => setBlogActionSuccess(false), 4500);
    } catch (err: any) {
      setBlogActionError(err.message || "L'action sur l'article a échoué.");
    } finally {
      setBlogSubmitting(false);
    }
  };

  // Handle Deleting blog Article
  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm("Voulez-vous définitivement supprimer cet article du blog public ?")) return;
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId);

      if (error) throw error;
      onRefreshArticles();
    } catch (err) {
      console.error(err);
      alert("La suppression de l'article a échoué.");
    }
  };

  // 1. UNAUTHENTICATED LOGIN SHIELD SCREEN
  if (!token) {
    return (
      <div className="min-h-screen w-full bg-stone-50 flex flex-col items-center justify-center p-6 relative">
        <AfricanPattern variant="kuba" className="opacity-[0.035]" />

        {/* Flat button to go back to public app view */}
        <button
          onClick={onBackToSite}
          type="button"
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-200 text-xs font-semibold text-stone-600 hover:text-[#df6438] hover:border-terracotta-200 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer z-50"
        >
          ← Retourner au site public
        </button>

        <div className="max-w-md w-full bg-white border border-stone-200 p-8 rounded-3xl shadow-lg space-y-6 animate-fade-in text-stone-700 relative z-10">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-terracotta-50 text-[#df6438] rounded-full">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h1 className="font-display font-bold text-stone-900 text-xl tracking-tight uppercase">
              Console d'Exploitation
            </h1>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              Saisissez votre passkey d'administration secret de Kivu Ceramic pour configurer les articles, lire l'inbox, et mettre à jour l'atelier.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-rose-55 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" /> {loginError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">
                Passkey d'Administration *
              </label>
              <input
                type="password"
                required
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="••••••••••••••"
                className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:ring-1 focus:ring-terracotta-500 focus:bg-white text-stone-900 transition-all font-mono"
              />
              <p className="text-[9px] text-[#df6438] font-mono block mt-1">
                HINT : Rentrez "kivu2026" pour tester la boite de contrôle
              </p>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-stone-900 hover:bg-stone-850 disabled:bg-stone-400 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {loginLoading ? "Authentification..." : "Entrer dans la console"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED PANEL WORKSPACE DIRECTORY Layout
  return (
    <div className="bg-white w-full min-h-screen flex flex-col md:flex-row relative animate-fade-in text-stone-700">

      {/* Horizontal / Vertical sidebar menu */}
      <aside className="w-full md:w-64 bg-stone-950 text-stone-300 p-6 space-y-6 shrink-0 flex flex-col justify-between border-r border-stone-800 md:sticky md:top-0 md:h-screen overflow-y-auto">

        {/* Navigation block */}
        <div className="space-y-6">
          <div className="space-y-1 pb-4 border-b border-stone-800">
            <div className="w-10 h-10 mb-2">
              <img
                src="/assets/kivu-ceramic-logo.svg"
                alt="Logo"
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <span className="text-[10px] font-mono text-stone-500 font-extrabold uppercase tracking-widest block">
              Console Solidaire
            </span>
            <h3 className="font-display font-extrabold text-white key-about text-base uppercase">
              Kivu Ceramic Dashboard
            </h3>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Indicateurs / Stats', icon: Database },
              { id: 'articles', label: 'Éditer le Blog (Art)', icon: BookOpen },
              { id: 'products', label: 'Catalogue Produits', icon: ShoppingBag },
              { id: 'inbox', label: 'Messages Inbox', icon: MessageSquare },
              { id: 'company', label: 'Profil de l\'Atelier', icon: Building }
            ].map((it) => {
              const Icon = it.icon;
              const isActive = adminTab === it.id;
              return (
                <button
                  key={it.id}
                  onClick={() => setAdminTab(it.id as any)}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors text-left cursor-pointer ${isActive
                    ? 'bg-[#df6438] text-white shadow-xs'
                    : 'text-stone-300 hover:bg-stone-900 hover:text-white'
                    }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {it.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Action controls block */}
        <div className="pt-6 border-t border-stone-800 space-y-2">
          <button
            onClick={onBackToSite}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-stone-300 hover:bg-stone-900 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors text-left cursor-pointer"
          >
            <span className="text-[#df6438] text-sm">←</span> Retourner au site
          </button>

          <button
            onClick={onLogoutAdmin}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-stone-400 hover:bg-rose-950/40 hover:text-rose-400 text-xs font-bold uppercase tracking-wider transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0 text-[#df6438]" /> Déconnexion
          </button>
        </div>

      </aside>

      {/* Primary work panel layout area */}
      <section className="flex-grow p-6 sm:p-8 space-y-8 min-w-0">

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE WORK AREA: DASHBOARD STATISTICS SECTION */}
        {/* ------------------------------------------------------------- */}
        {adminTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="space-y-1.5 pb-4 border-b border-stone-100">
              <h2 className="font-display font-black text-stone-950 text-2xl h-admin">
                Tableau de gestion de l’Atelier
              </h2>
              <p className="text-xs text-stone-500 font-light">
                Explorez en un œil l'évolution de la visibilité digitale de notre projet à Bukavu, ainsi que la boîte de devis reçus.
              </p>
            </div>

            {statsLoading ? (
              <div className="flex justify-center items-center py-20 text-stone-500 gap-1.5 text-xs font-mono">
                <Loader2 className="w-5 h-5 animate-spin text-[#df6438]" /> Chargement des données...
              </div>
            ) : (
              <div className="space-y-8">
                {/* Stats grid */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1 flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider block">Articles publiés</span>
                    <span className="text-2xl font-mono font-black text-stone-900 block">{stats.totalArticles}</span>
                  </div>

                  <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1 flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider block">Lectures d’articles</span>
                    <span className="text-2xl font-mono font-black text-emerald-700 block">{stats.totalViews} vues</span>
                  </div>

                  <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1 flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider block">Messages Reçus</span>
                    <span className="text-2xl font-mono font-black text-stone-900 block">{stats.totalContacts}</span>
                  </div>

                  <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200/50 space-y-1 flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-amber-700 font-bold uppercase tracking-wider block">Demandes non lues</span>
                    <span className="text-2xl font-mono font-black text-[#df6438] block">{stats.unreadContacts}</span>
                  </div>
                </div>

                {/* Quick actions info */}
                <div className="p-6 bg-linear-to-br from-[#df6438]/5 to-transparent border border-terracotta-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-stone-950 text-base">Un nouvel article à partager ?</h4>
                    <p className="text-xs text-stone-500 font-light leading-relaxed max-w-lg">
                      Parlez de l'arrivée du grand four, ou du progrès d'apprentissage d'un jeune ! Publier des histoires vécues passionne les acheteurs de vaisselles écoresponsables.
                    </p>
                  </div>
                  <button
                    onClick={() => setAdminTab('articles')}
                    className="px-4 py-2 rounded-lg bg-[#df6438] hover:bg-terracotta-700 text-white text-xs font-bold tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
                  >
                    Rédiger un post
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE WORK AREA: ARTICLES BLOG CRUD SECTION */}
        {/* ------------------------------------------------------------- */}
        {adminTab === 'articles' && (
          <div className="space-y-8">
            <div className="space-y-1.5 pb-4 border-b border-stone-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="font-display font-black text-stone-950 text-2xl">
                  {editingArticleId ? "Modifier l'article" : "Gérer les actualités du Blog"}
                </h2>
                <p className="text-xs text-stone-500 font-light mt-0.5">
                  Publiez de nouvelles actualités sur les formations ou modifiez les articles déjà existants.
                </p>
              </div>
              {editingArticleId && (
                <button
                  onClick={handleResetArticleForm}
                  className="px-3 py-1.5 bg-stone-100 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-200"
                >
                  Annuler la modification
                </button>
              )}
            </div>

            {/* Editing / creation form */}
            <form onSubmit={handleSaveArticle} className="space-y-4 p-6 bg-stone-50 rounded-2xl border border-stone-200">
              <h3 className="font-display font-extrabold text-stone-900 text-sm uppercase tracking-wide flex items-center gap-1.5">
                <Plus className="w-5 h-5 text-[#df6438]" /> {editingArticleId ? "Formulaire de modification d'article" : "Rédiger une nouvelle d'Atelier"}
              </h3>

              {blogActionSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-medium">
                  ✓ Opération réussie ! L'article a été enregistré avec succès et mis à jour en base de données.
                </div>
              )}

              {blogActionError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-medium">
                  ⚠️ {blogActionError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Titre de l'Article *</label>
                  <input
                    type="text"
                    required
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="Ex : Ateliers ouverts : Venez voir tourner l'argile !"
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Catégorie *</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono"
                  >
                    <option value="Activité d’Apprentis">Activité d’Apprentis</option>
                    <option value="Techniques de Cuisson">Techniques de Cuisson</option>
                    <option value="Art-Thérapie">Art-Thérapie</option>
                    <option value="Boutique & Devis">Boutique & Devis</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Court Résumé d'accroche *</label>
                <input
                  type="text"
                  required
                  value={blogSummary}
                  onChange={(e) => setBlogSummary(e.target.value)}
                  placeholder="Ex : Notre atelier accueille 5 nouveaux jeunes en réhabilitation au travers de notre programme d'initiation au tournage d'assiettes de Kabare..."
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Image de couverture</label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={imageUploading}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className={`flex-grow px-4 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs font-mono cursor-pointer flex items-center justify-center gap-2 hover:bg-stone-200 transition-all ${imageUploading ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        {imageUploading ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...</>
                        ) : (
                          <>📷 Cliquer pour uploader une image</>
                        )}
                      </label>
                    </div>
                    {blogImage && (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={blogImage}
                          readOnly
                          className="flex-grow px-4 py-2 bg-stone-50 rounded-xl border border-stone-100 text-[10px] font-mono text-stone-400 truncate"
                        />
                        <button
                          type="button"
                          onClick={() => setBlogImage('')}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Tags (séparés par des virgules)</label>
                  <input
                    type="text"
                    value={blogTagsInput}
                    onChange={(e) => setBlogTagsInput(e.target.value)}
                    placeholder="congomade, poterie, arttherapie"
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-[#df6438] transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Contenu Littéraire * (Mots, paragraphes séparés par deux sauts de ligne)</label>
                <textarea
                  required
                  rows={8}
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  placeholder="### Notre sous-titre de section&#10;&#10;Contenu du paragraphe ici..."
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono leading-relaxed"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={blogSubmitting}
                className="w-full py-3 bg-[#df6438] hover:bg-terracotta-700 disabled:bg-stone-450 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {blogSubmitting ? "Enregistrement..." : editingArticleId ? "Sauvegarder les modifications" : "Publier l'histoire sur le Blog"}
              </button>
            </form>

            {/* List of current articles under CRUD control */}
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-stone-900 text-sm uppercase tracking-wide">
                Publications actives ({articles.length})
              </h3>

              <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white divide-y divide-stone-100">
                {articles.map(art => (
                  <div key={art.id} className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-stone-50/50">
                    <div className="space-y-1 flex items-start gap-4">
                      {art.image && (
                        <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden shrink-0 hidden sm:block">
                          <img src={art.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-display font-semibold text-stone-950 text-sm">{art.title}</h4>
                        <p className="text-xs text-stone-400 font-mono">
                          {art.date} • {art.category} • {art.views || 0} lectures
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLoadEditArticle(art)}
                        className="p-2 border border-stone-200 rounded-lg hover:bg-[#df6438]/10 hover:text-[#df6438] transition-colors"
                        title="Modifier l'article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-2 border border-stone-200 rounded-lg hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition-colors"
                        title="Supprimer l'article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE WORK AREA: CATALOG PRODUCTS CRUD SECTION */}
        {/* ------------------------------------------------------------- */}
        {adminTab === 'products' && (
          <div className="space-y-8">
            <div className="space-y-1.5 pb-4 border-b border-stone-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="font-display font-black text-stone-950 text-2xl">
                  {editingProductId ? "Modifier le produit" : "Gérer le Catalogue Produits"}
                </h2>
                <p className="text-xs text-stone-500 font-light mt-0.5">
                  Ajoutez vos nouvelles créations au catalogue ou modifiez les prix et descriptions.
                </p>
              </div>
              {editingProductId && (
                <button
                  onClick={handleResetProductForm}
                  className="px-3 py-1.5 bg-stone-100 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-200"
                >
                  Annuler la modification
                </button>
              )}
            </div>

            {/* Product form */}
            <form onSubmit={handleSaveProduct} className="space-y-4 p-6 bg-stone-50 rounded-2xl border border-stone-200">
              <h3 className="font-display font-extrabold text-stone-900 text-sm uppercase tracking-wide flex items-center gap-1.5">
                <Plus className="w-5 h-5 text-[#df6438]" /> {editingProductId ? "Formulaire de modification de produit" : "Ajouter une nouvelle création"}
              </h3>

              {prodActionSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-medium">
                  ✓ Produit enregistré avec succès !
                </div>
              )}

              {prodActionError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-medium">
                  ⚠️ {prodActionError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Nom du Produit *</label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="Ex : Tasse Kahuzi-Biega"
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Catégorie *</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono"
                  >
                    <option value="table">Art de la Table</option>
                    <option value="decor">Décoration</option>
                    <option value="custom">Sur-mesure / Cafés</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Prix (Texte libre) *</label>
                  <input
                    type="text"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="Ex : 15.000 FC / 8 $"
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Origine</label>
                  <input
                    type="text"
                    value={prodOrigin}
                    onChange={(e) => setProdOrigin(e.target.value)}
                    placeholder="Bukavu (Kadutu)"
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Dimensions</label>
                  <input
                    type="text"
                    value={prodDimensions}
                    onChange={(e) => setProdDimensions(e.target.value)}
                    placeholder="Ex : Ø 24cm"
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={prodIsPopular}
                    onChange={(e) => setProdIsPopular(e.target.checked)}
                    className="w-4 h-4 text-[#df6438] border-stone-300 rounded focus:ring-[#df6438]"
                  />
                  <label htmlFor="isPopular" className="text-xs font-semibold text-stone-700">Mettre en avant (Populaire)</label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Image du produit</label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageUploading}
                      className="hidden"
                      id="prod-image-upload"
                    />
                    <label
                      htmlFor="prod-image-upload"
                      className={`flex-grow px-4 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs font-mono cursor-pointer flex items-center justify-center gap-2 hover:bg-stone-200 transition-all ${imageUploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      {imageUploading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Envoi...</>
                      ) : (
                        <>📷 Cliquer pour uploader l'image</>
                      )}
                    </label>
                  </div>
                  {prodImage && (
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border">
                        <img src={prodImage} className="w-full h-full object-cover" />
                      </div>
                      <input
                        type="text"
                        value={prodImage}
                        readOnly
                        className="flex-grow px-4 py-2 bg-stone-50 rounded-xl border border-stone-100 text-[10px] font-mono text-stone-400 truncate"
                      />
                      <button type="button" onClick={() => setProdImage('')} className="p-2 text-rose-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Description du produit *</label>
                <textarea
                  required
                  rows={4}
                  value={prodDescription}
                  onChange={(e) => setProdDescription(e.target.value)}
                  placeholder="Décrivez les caractéristiques du produit..."
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono leading-relaxed"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={prodSubmitting}
                className="w-full py-3 bg-[#df6438] hover:bg-terracotta-700 disabled:bg-stone-450 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {prodSubmitting ? "Enregistrement..." : editingProductId ? "Sauvegarder les modifications" : "Ajouter au catalogue"}
              </button>
            </form>

            {/* Products list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(prod => (
                <div key={prod.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col">
                  <div className="aspect-square bg-stone-100 relative">
                    <img src={prod.image} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={() => handleLoadEditProduct(prod)}
                        className="p-1.5 bg-white/90 backdrop-blur-xs rounded-lg text-stone-700 hover:text-[#df6438] shadow-sm transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-1.5 bg-white/90 backdrop-blur-xs rounded-lg text-stone-700 hover:text-rose-600 shadow-sm transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-display font-bold text-stone-900 text-sm truncate">{prod.name}</h4>
                    <p className="text-[10px] text-stone-500 font-mono uppercase">{prod.category} • {prod.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE WORK AREA: MESSAGE BOX INBOX SECTION */}
        {/* ------------------------------------------------------------- */}
        {adminTab === 'inbox' && (
          <div className="space-y-6">
            <div className="space-y-1.5 pb-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h2 className="font-display font-black text-stone-950 text-2xl">
                  Boîte de réception ({contacts.length})
                </h2>
                <p className="text-xs text-stone-500 font-light mt-0.5">
                  Consultez les demandes de devis et collaborations soumises par les clients de Goma et Bukavu.
                </p>
              </div>
              <button
                onClick={onRefreshContacts}
                className="px-3 py-1.5 border border-stone-200 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                Actualiser Inbox
              </button>
            </div>

            {contacts.length === 0 ? (
              <div className="p-12 text-center text-stone-500 max-w-sm mx-auto space-y-1 bg-stone-50 rounded-2xl border">
                <p className="font-display font-bold text-sm">Boîte de réception vide</p>
                <p className="text-xs leading-relaxed font-light text-stone-400">
                  Aucun message n'a encore été soumis par les internautes ou clients.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map(msg => (
                  <div
                    key={msg.id}
                    className={`p-6 border rounded-2xl space-y-3.5 hover:shadow-xs transition-hover bg-white ${msg.status === 'unread' ? 'border-amber-300 ring-2 ring-amber-500/5' : 'border-stone-200'
                      }`}
                  >
                    {/* Header bar of message container */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-stone-150">
                      <div>
                        <h3 className="font-display font-semibold text-stone-950 text-base">{msg.name}</h3>
                        <p className="text-xs text-stone-400 font-mono lowercase">
                          {msg.email} • Soumis le {msg.date}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Status bag */}
                        <span className={`px-2.5 py-0.5 rounded-sm text-[9px] font-mono font-bold uppercase ${msg.status === 'unread'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : msg.status === 'read'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-stone-100 text-stone-500'
                          }`}>
                          {msg.status === 'unread' ? 'Non lu' : msg.status === 'read' ? 'Lu' : 'Répondu'}
                        </span>

                        <button
                          onClick={() => handleUpdateContactStatus(msg.id, msg.status)}
                          className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded-sm text-[10px] font-extrabold uppercase"
                          title="Changer le statut"
                        >
                          Marquer {msg.status === 'unread' ? 'Lu' : 'Répondu'}
                        </button>

                        <button
                          onClick={() => handleDeleteContact(msg.id)}
                          className="p-1 border border-transparent hover:border-stone-200 hover:text-rose-600 rounded-lg transition-colors"
                          title="Supprimer ce message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subject line and body text */}
                    <div className="space-y-1">
                      <div className="font-semibold text-stone-900 text-xs font-mono">Objet : {msg.subject}</div>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed p-4 bg-stone-50 rounded-xl border border-stone-150">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE WORK AREA: COMPANY ATELIER SETTINGS PANEL */}
        {/* ------------------------------------------------------------- */}
        {adminTab === 'company' && (
          <div className="space-y-6">
            <div className="space-y-1.5 pb-4 border-b border-stone-100">
              <h2 className="font-display font-black text-stone-950 text-2xl">
                Profil & Coordonnées de l'Atelier
              </h2>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Utilisez ce panneau pour modifier les cordonnées de contact, la mission éducative, et la présentation globale de l'atelier de Bukavu.
              </p>
            </div>

            <form onSubmit={handleSaveCompany} className="space-y-4">
              {compSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-medium animate-bounce flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" /> Les coordonnées de l'atelier ont été mises à jour avec succès sur le site !
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Téléphone direct de l'Atelier</label>
                  <input
                    type="text"
                    value={compPhone}
                    onChange={(e) => setCompPhone(e.target.value)}
                    placeholder="+243974505547"
                    className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Email de contact d'Atelier</label>
                  <input
                    type="email"
                    value={compEmail}
                    onChange={(e) => setCompEmail(e.target.value)}
                    placeholder="kivuceramic12@gmail.com"
                    className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Adresse physique à Bukavu</label>
                <input
                  type="text"
                  value={compAddress}
                  onChange={(e) => setCompAddress(e.target.value)}
                  placeholder="Ex : Avenue Rukumbuka, Quartier Kasali, Commune de Kadutu, Bukavu (RDC)"
                  className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-850 transition-all font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Mission Sociale</label>
                <textarea
                  rows={3}
                  value={compMission}
                  onChange={(e) => setCompMission(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono leading-relaxed"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Vision Stratégique</label>
                <textarea
                  rows={3}
                  value={compVision}
                  onChange={(e) => setCompVision(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono leading-relaxed"
                ></textarea>
              </div>

              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h3 className="font-display font-extrabold text-stone-900 text-sm uppercase tracking-wide">Configuration du Catalogue</h3>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Titre de la section Catalogue</label>
                  <input
                    type="text"
                    value={compCatalogTitle}
                    onChange={(e) => setCompCatalogTitle(e.target.value)}
                    placeholder="Les Trésors de l’Atelier"
                    className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Sous-titre de la section Catalogue</label>
                  <input
                    type="text"
                    value={compCatalogSubtitle}
                    onChange={(e) => setCompCatalogSubtitle(e.target.value)}
                    placeholder="Notre Catalogue de Céramiques d'Exception"
                    className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Description de la section Catalogue</label>
                  <textarea
                    rows={3}
                    value={compCatalogDescription}
                    onChange={(e) => setCompCatalogDescription(e.target.value)}
                    placeholder="Description du catalogue..."
                    className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono leading-relaxed"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={compSubmitting}
                className="w-full py-3 bg-stone-900 hover:bg-stone-850 disabled:bg-stone-500 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {compSubmitting ? "Enregistrement..." : "Enregistrer les modifications de Profil"}
              </button>
            </form>
          </div>
        )}

      </section>

    </div>
  );
}
