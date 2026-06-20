import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, HeartPulse } from 'lucide-react';
import { CompanyDetails } from '../types';

interface ContactViewProps {
  company: CompanyDetails;
  prefilledSubject?: string;
}

export default function ContactView({ company, prefilledSubject = '' }: ContactViewProps) {
  // Input form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(prefilledSubject || '');
  const [message, setMessage] = useState('');

  // Status handlers
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg("Veuillez remplir tous les champs requis, s'il vous plaît.");
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        throw new Error("L'envoi a échoué. Le serveur a renvoyé une erreur.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Impossible de joindre le service de messagerie. Vos données ne sont pas perdues, veuillez réessayer d'ici quelques instants.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in text-stone-700">
      
      {/* 1. SECTION INTRO */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[#df6438] font-mono text-xs tracking-widest uppercase font-bold">
          Coordonnées & Messagerie
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-stone-900 leading-tight">
          Demander un devis ou Collaborer
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed font-light">
          Vous êtes un restaurant de Bukavu, un hôtel de Goma ou un passionné de design d'intérieur ? Laissez-nous vos projets d'ameublement, de vaisselle personnalisée ou vos avis !
        </p>
      </section>

      {/* 2. CONTACT TWO COLUMN WRAP */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* Left Side: Detail & Address Info (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-6 shadow-xs">
            <h2 className="font-display font-bold text-[#df6438] text-lg uppercase tracking-wider">
              Kivu Ceramic Bukavu
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Notre équipe d'Artisans Céramistes vous accueille chaleureusement au sein de notre atelier de Bukavu pour des commandes, visites privées ou consultations d'art-thérapie.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-stone-50 rounded-xl text-stone-800">
                  <MapPin className="w-5 h-5 text-[#df6438]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-display font-semibold text-stone-900 text-xs uppercase font-mono">Notre adresse</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {company.address || "Avenu Rukumbuka, Quartier Kasali, Commune de Kadutu, Ville de Bukavu, Sud-Kivu, RD Congo."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-stone-50 rounded-xl text-stone-800">
                  <Phone className="w-5 h-5 text-[#df6438]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-display font-semibold text-stone-900 text-xs uppercase font-mono">Téléphone direct / WhatsApp</h4>
                  <p className="text-xs text-stone-500 font-mono">
                    {company.phone || "+243 974 505 547"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-stone-50 rounded-xl text-stone-800">
                  <Mail className="w-5 h-5 text-[#df6438]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-display font-semibold text-stone-900 text-xs uppercase font-mono">Messagerie Électronique</h4>
                  <p className="text-xs text-stone-500 font-mono truncate">
                    {company.email || "Kivuceramic12@gmail.com"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-150 flex items-center gap-1.5 text-stone-500 text-[11px] font-mono">
              <HeartPulse className="w-4 h-4 text-[#df6438]" />
              <span>Chaque message est lu avec soin.</span>
            </div>
          </div>

          <div className="p-6 bg-stone-100 rounded-3xl border border-stone-200 flex items-start gap-3 text-xs leading-relaxed font-light text-stone-500">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Vos informations privées ne servent qu'à la prise de contact pour vos factures d'ameublement ou devis de vaisselles. Elles ne sont jamais partagées à des tiers.</span>
          </div>
        </div>

        {/* Right Side: Message form submission (3 Cols) */}
        <div className="lg:col-span-3 bg-white border border-stone-200 p-8 rounded-3xl shadow-xs space-y-6">
          <h2 className="font-display font-black text-stone-900 text-lg sm:text-xl">
            Envoyer un Message à l'Atelier
          </h2>

          <form onSubmit={handleSendMessage} className="space-y-4">
            {success && (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl space-y-1.5 animate-bounce">
                <div className="font-semibold text-sm flex items-center gap-1.5">
                  ✓ Message envoyé avec succès !
                </div>
                <p className="text-xs leading-relaxed font-light">
                  Merci infiniment. Notre responsable d'atelier à Bukavu étudiera votre demande et vous contactera d'ici les prochaines 24 heures ouvrées.
                </p>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium">
                ⚠️ {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">
                  Votre Nom Complet *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : Mitterand Kabanga"
                  className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-terracotta-500 focus:bg-white text-stone-800 transition-all font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">
                  Courriel de contact (Email) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex : contact@domaine.com"
                  className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-terracotta-500 focus:bg-white text-stone-800 transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">
                Objet / Sujet de votre message *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex : Devis personnalisé assiettes de restaurant..."
                className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-terracotta-500 focus:bg-white text-stone-800 transition-all font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">
                Détail de votre demande (Message) *
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Indiquez ici les pièces souhaitées, les finitions (teinte volcanique noire, ocre, crème), ou vos questions sociales..."
                className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-terracotta-500 focus:bg-white text-stone-800 transition-all font-mono leading-relaxed"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#df6438] hover:bg-terracotta-700 disabled:bg-stone-400 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {submitting ? "Envoi en cours..." : "Transmettre mon message"}
              <Send className="w-4 h-4 shrink-0" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
