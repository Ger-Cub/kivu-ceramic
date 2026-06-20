import React, { useState, useEffect } from 'react';
import { CompanySettings } from '../types';
import { KivuStore } from '../services/store';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  MessageSquare,
  Sparkles,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface ContactProps {
  settings: CompanySettings;
  prefillInquiry: string | null;
  onClearPrefill: () => void;
}

export default function Contact({ settings, prefillInquiry, onClearPrefill }: ContactProps) {
  // Input fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // Feedback action feedback
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Prefill hook logic when a customer asks from products page
  useEffect(() => {
    if (prefillInquiry) {
      setSubject(`Demande de devis spécialisé - ${prefillInquiry}`);
      setMessage(`Bonjour l'équipe Kivu Ceramic,\n\nJe suis intéressé(e) par l'article "${prefillInquiry}" proposé dans votre catalogue de Bukavu.\n\nPourriez-vous me fournir de plus amples détails concernant les tarifs de gros, la personnalisation institutionnelle ou les délais de livraison ?\n\nMerci !`);
      
      // Smooth scroll to contact section
      const section = document.getElementById('contact');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [prefillInquiry]);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      alert("Veuillez remplir tous les champs obligatoires marqués d'un astérisque (*)");
      return;
    }

    setIsLoading(true);
    
    // Simulate API network turnaround latency
    setTimeout(() => {
      KivuStore.addMessage({
        name,
        email,
        phone: phone || undefined,
        subject,
        message
      });

      setIsLoading(false);
      setIsSubmitted(true);
      
      // Reset inputs
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      onClearPrefill();
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold uppercase text-terracotta-600 tracking-[0.2em] block">
            CONTACTER NOS ATELIERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-stone-900 tracking-tight">
            Planifions vos créations en un instant
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Pour des questions générales, des demandes d'intégration au programme d'art-thérapie à Kadutu, ou des commandes de vaisselle brute pour des établissements (hôtels, cafétérias), soumettez vos coordonnées ci-dessous.
          </p>
        </div>

        {/* 2-column layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Coordinates details & Stylized local Map Card */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            <div className="bg-stone-900 text-stone-200 p-8 rounded-3xl border border-stone-800 shadow-md space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-600/10 w-full h-[60%] blur-[80px] pointer-events-none" />
              
              <h3 className="text-lg font-bold font-display text-white border-b border-stone-800 pb-3">Nos Coordonnées</h3>

              <div className="space-y-6 text-sm">
                
                {/* Physical address */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-stone-800/80 text-amber-500 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-display">Adresse de l'Atelier</h4>
                    <p className="text-stone-300 mt-1 leading-relaxed text-xs">
                      {settings.address}
                    </p>
                  </div>
                </div>

                {/* Direct Dial numbers */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-stone-800/80 text-amber-500 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-display">Téléphone / WhatsApp</h4>
                    <p className="text-stone-300 mt-1 leading-relaxed font-mono font-medium">
                      {settings.phone}
                    </p>
                    <span className="text-[10px] text-stone-500 font-mono">Disponibilité : Lu - Sa (8h00 - 17h00)</span>
                  </div>
                </div>

                {/* support email */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-stone-800/80 text-amber-500 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-display">Adresse E-mail</h4>
                    <p className="text-stone-300 mt-1 leading-relaxed font-mono font-medium lowercase">
                      {settings.email}
                    </p>
                  </div>
                </div>

              </div>
              
              {/* Ecological badge info */}
              <div className="pt-6 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 font-sans">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  Cuisson éco-responsable
                </span>
                <span className="text-amber-500 font-bold font-mono">Kadutu - Bukavu</span>
              </div>
            </div>

            {/* Simulated Hand-styled Pottery Map Area */}
            <div className="bg-stone-50 border border-stone-200/80 p-6 rounded-3xl space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400">Atelier à Bukavu (Kadutu - Quartier Kasali)</h4>
              <div className="h-40 rounded-xl bg-stone-200/20 border border-stone-300/40 relative overflow-hidden flex flex-col justify-center items-center text-center">
                
                {/* Abstract graphic representing Lake Kivu and Bukavu coordinates */}
                <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100" fill="none">
                  {/* Lake Kivu abstract blue shape */}
                  <path d="M 60,0 C 70,30 90,40 100,50 L 100,0 Z" fill="#93c5fd" />
                  {/* Streets representation lines */}
                  <line x1="10" y1="20" x2="90" y2="20" stroke="#a8a29e" strokeWidth="1" />
                  <line x1="30" y1="0" x2="30" y2="100" stroke="#a8a29e" strokeWidth="1" />
                  <line x1="55" y1="10" x2="15" y2="90" stroke="#a8a29e" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="8" fill="#df6438" opacity="0.2" />
                  <circle cx="50" cy="50" r="3" fill="#df6438" />
                </svg>

                <div className="relative z-10 space-y-1">
                  <span className="bg-stone-900 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider block">Kivu Ceramic HQ</span>
                  <div className="text-stone-500 text-[11px] font-medium max-w-xs px-2">Avenue Rukumbuka, Kadutu (à proximité du lac Kivu)</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-stone-10/40 border border-stone-150 p-8 rounded-3xl shadow-sm bg-white">
            
            {/* Subject state alert if compiled with product prefill */}
            {prefillInquiry && (
              <div className="bg-amber-100/30 border border-amber-200 p-4 rounded-2xl mb-6 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-left">
                  <h4 className="text-xs font-bold text-amber-950 uppercase tracking-tight">Formulaire pré-rempli pour devis</h4>
                  <p className="text-xs text-amber-800 leading-relaxed font-sans">
                    Vous demandez actuellement des précisions sur l'article : <strong>"{prefillInquiry}"</strong>. Vous pouvez modifier ou étendre la question rédigée ci-dessous.
                  </p>
                </div>
              </div>
            )}

            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <div className="p-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <CheckCircle className="w-12 h-12 stroke-[1.5]" />
                </div>
                <div className="space-y-1.5 max-w-md">
                  <h3 className="text-xl font-bold font-display text-stone-900">Message envoyé avec succès !</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    Merci pour votre intérêt. Les responsables de notre atelier en commune de Kadutu réviseront votre demande et y répondront dans les plus brefs délais au Sud-Kivu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition cursor-pointer"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Customer name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Votre nom complet *</label>
                    <input 
                      type="text"
                      required
                      placeholder="Ex: Gérard Cubaka"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-amber-600 bg-white transition"
                    />
                  </div>

                  {/* Customer email */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Adresse e-mail *</label>
                    <input 
                      type="email"
                      required
                      placeholder="Ex: gerard@gmail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-amber-600 bg-white transition"
                    />
                  </div>

                  {/* Customer phone number */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Téléphone portable (Optionnel)</label>
                    <input 
                      type="tel"
                      placeholder="Ex: +243..."
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-amber-600 bg-white transition font-mono"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Objet du message *</label>
                    <input 
                      type="text"
                      required
                      placeholder="Ex: Demande de prix de gros ou Partenariat"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-amber-600 bg-white transition"
                    />
                  </div>

                  {/* Complete message context */}
                  <div className="col-span-full space-y-2">
                    <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Détail de votre message ou projet *</label>
                    <textarea 
                      required
                      rows={6}
                      placeholder="Saisissez précisément votre demande ou les détails du custom-order..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-amber-600 bg-white transition"
                    />
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-105">
                  <span className="text-[10px] text-stone-400 leading-snug font-sans">
                    * En soumettant ce formulaire, vous acceptez l'envoi de vos informations aux administrateurs de Kivu Ceramic.
                  </span>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white font-bold py-3 px-8 rounded-xl text-xs flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-sm shrink-0"
                  >
                    {isLoading ? (
                      <span>Envoi en cours...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
