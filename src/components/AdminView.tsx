import React, { useState, useEffect } from 'react';
import {
  Building, BookOpen, MessageSquare, Database, Plus, Trash2, Edit3, CheckCheck,
  SquarePlay, ShieldAlert, Sparkles, Loader2, LogOut, Check, ChevronDown, CheckCircle, AlertCircle
} from 'lucide-react';
import { Article, Contact, CompanyDetails } from '../types';
import AfricanPattern from './AfricanPattern';

interface AdminViewProps {
  company: CompanyDetails;
  onUpdateCompany: (comp: CompanyDetails) => void;
  articles: Article[];
  onRefreshArticles: () => void;
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
  contacts,
  onRefreshContacts,
  token,
  onLoginSuccess,
  onLogoutAdmin,
  onBackToSite
}: AdminViewProps) {
  // Navigation internal
  const [adminTab, setAdminTab] = useState<'dashboard' | 'articles' | 'inbox' | 'company'>('dashboard');

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

  // States for Company Settings Update
  const [compPhone, setCompPhone] = useState(company.phone);
  const [compEmail, setCompEmail] = useState(company.email);
  const [compAddress, setCompAddress] = useState(company.address);
  const [compMission, setCompMission] = useState(company.mission);
  const [compVision, setCompVision] = useState(company.vision);
  const [compAboutText, setCompAboutText] = useState(company.aboutText);
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
    }
  }, [company]);

  // Fetch Stats when authenticated
  const fetchStats = async () => {
    if (!token) return;
    setStatsLoading(true);
    try {
      const res = await fetch('/api/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
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
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ passkey })
      });

      if (res.ok) {
        const data = await res.json();
        onLoginSuccess(data.token);
      } else {
        const errData = await res.json().catch(() => ({}));
        setLoginError(errData.error || "Passkey d'accès invalide. Veuillez réessayer.");
      }
    } catch (err) {
      console.error(err);
      setLoginError("Erreur de communication avec le serveur.");
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
      const res = await fetch('/api/company', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          phone: compPhone,
          email: compEmail,
          address: compAddress,
          mission: compMission,
          vision: compVision,
          aboutText: compAboutText
        })
      });

      if (res.ok) {
        setCompSuccess(true);
        const data = await res.json();
        onUpdateCompany(data.company);
        setTimeout(() => setCompSuccess(false), 4000);
      } else {
        throw new Error("L'atelier n'a pas pu être mis à jour.");
      }
    } catch (err) {
      alert("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setCompSubmitting(false);
    }
  };

  // Handle contact progress validation status change
  const handleUpdateContactStatus = async (contactId: string, currentStatus: string) => {
    const freshStatus = currentStatus === 'unread' ? 'read' : 'replied';
    try {
      const res = await fetch(`/api/contacts/${contactId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: freshStatus })
      });
      if (res.ok) {
        onRefreshContacts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle deleting contact message
  const handleDeleteContact = async (contactId: string) => {
    if (!confirm("Voulez-vous définitivement supprimer ce message de la boîte de réception ?")) return;
    try {
      const res = await fetch(`/api/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        onRefreshContacts();
      }
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
      tags: formattedTags
    };

    try {
      let res;
      if (editingArticleId) {
        // UPDATE PUT Request
        res = await fetch(`/api/articles/${editingArticleId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(artPayload)
        });
      } else {
        // CREATE POST Request
        res = await fetch('/api/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(artPayload)
        });
      }

      if (res.ok) {
        setBlogActionSuccess(true);
        handleResetArticleForm();
        onRefreshArticles();
        setTimeout(() => setBlogActionSuccess(false), 4500);
      } else {
        const dataErr = await res.json().catch(() => ({}));
        setBlogActionError(dataErr.error || "L'action sur l'article a échoué.");
      }
    } catch (err) {
      setBlogActionError("Communication impossible avec le service de persistence.");
    } finally {
      setBlogSubmitting(false);
    }
  };

  // Handle Deleting blog Article
  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm("Voulez-vous définitivement supprimer cet article du blog public ?")) return;
    try {
      const res = await fetch(`/api/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        onRefreshArticles();
      } else {
        alert("La suppression de l'article a échoué.");
      }
    } catch (err) {
      console.error(err);
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
      <aside className="w-full md:w-64 bg-stone-950 text-stone-300 p-6 space-y-6 shrink-0 flex flex-col justify-between border-r border-stone-800">

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
                  <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">URL de l'image de couverture</label>
                  <input
                    type="text"
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono"
                  />
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

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">Texte d'introduction descriptif (À propos de l'Atelier)</label>
                <textarea
                  rows={4}
                  value={compAboutText}
                  onChange={(e) => setCompAboutText(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#df6438] text-stone-800 transition-all font-mono leading-relaxed"
                ></textarea>
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
