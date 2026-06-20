import { BlogPost, Product, ContactMessage, CompanySettings } from '../types';

// Seed data based on Kivu Ceramic document details
const INITIAL_SETTINGS: CompanySettings = {
  name: "KIVU CERAMIC",
  slogan: "Transformer l’argile du Kivu en opportunités durables",
  description: "KIVU CERAMIC associe les techniques traditionnelles de poterie aux innovations modernes de Bukavu pour concevoir une céramique éco-responsable et solidaire.",
  address: "Avenue Rukumbuka, Quartier Kasali, Commune de Kadutu, Bukavu (Sud-Kivu, République Démocratique du Congo)",
  phone: "+243974505547",
  email: "Kivuceramic12@gmail.com",
  facebookUrl: "https://facebook.com/kivuceramic",
  instagramUrl: "https://instagram.com/kivuceramic",
  whatsappNumber: "+243974505547",
  mission: "Préserver le savoir-faire céramique traditionnel, promouvoir la transformation locale des matières premières et offrir aux jeunes (particulièrement les femmes vulnérables) des opportunités de formation, d’emploi et d’épanouissement personnel.",
  vision: "Devenir la référence nationale dans la production de céramique artisanale en République Démocratique du Congo, en démontrant que l'argile locale peut être transformée en bijoux d'utilité et de design créateurs de richesse locale.",
  impactSocial: "Un programme innovant combinant apprentissages techniques de pointe et séances d'art-thérapie par l'argile pour extérioriser les émotions, surmonter les traumatismes de conflits, et rebâtir l'indépendance économique."
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Assiette Plate 'Kivu Horizon'",
    category: "Assiettes",
    description: "Assiette plate artisanale façonnée à la main à Bukavu. Finition émaillée satinée avec des nuances de pigments terreux naturels du Sud-Kivu.",
    dimensions: "Ø 26 cm",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600",
    price: "12.00 $",
    featured: true,
    status: "available"
  },
  {
    id: "prod-2",
    name: "Bol à Ramen 'Kahuzi'",
    category: "Bols",
    description: "Bol profond idéal pour les potages, ramens ou accompagnements. Haute résistance thermique grâce à notre cuisson éco-responsable.",
    dimensions: "Ø 16cm x H 8cm",
    image: "https://images.unsplash.com/photo-1576016770956-debb63d900ee?auto=format&fit=crop&q=80&w=600",
    price: "8.50 $",
    featured: true,
    status: "available"
  },
  {
    id: "prod-3",
    name: "Tasse et Sous-tasse 'Kuhani'",
    category: "Tasses",
    description: "Lot de tasses robustes pour le café ou thé, conçu spécialement pour l'usage quotidien ou les besoins des hôtels et restaurants locaux.",
    dimensions: "250 ml",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
    price: "6.00 $",
    featured: true,
    status: "available"
  },
  {
    id: "prod-4",
    name: "Vase Soliflore 'Ruzizi'",
    category: "Vases",
    description: "Vase décoratif célébrant les courbes de la rivière Ruzizi. Idéal pour sublimer vos fleurs ou comme pièce sculpturale autonome.",
    dimensions: "H 24cm",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=600",
    price: "25.00 $",
    featured: true,
    status: "available"
  },
  {
    id: "prod-5",
    name: "Pot de fleurs suspendu 'Kavumu'",
    category: "Pots de fleurs",
    description: "Pot de fleur d'intérieur ou d'extérieur avec fixations pré-percées pour cordes de lin naturel. Argile poreuse saine pour les plantes.",
    dimensions: "Ø 18cm x H 15cm",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600",
    price: "18.00 $",
    featured: false,
    status: "available"
  },
  {
    id: "prod-6",
    name: "Collection Institutionnelle sur-mesure",
    category: "Objets décoratifs",
    description: "Conception personnalisée d'articles en céramique siglés (vases géants, tasses gravées, assiettes d'hôtels) avec l'identité de votre établissement.",
    dimensions: "Sur-mesure",
    image: "https://images.unsplash.com/photo-1535401991746-da3d9055713e?auto=format&fit=crop&q=80&w=600",
    price: "Sur devis",
    featured: false,
    status: "custom-only"
  }
];

const INITIAL_BLOG: BlogPost[] = [
  {
    id: "blog-1",
    title: "L'Art-Thérapie par l'argile: Soigner l'esprit et restaurer l'estime à Bukavu",
    excerpt: "Découvrez comment notre programme innovant combine le travail manuel de l'argile et l'accompagnement psychologique pour aider les jeunes du Sud-Kivu à surmonter les traumas.",
    category: "Art-Thérapie",
    coverImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
    author: "Équipe Kivu Ceramic",
    date: "2026-06-15",
    readTime: "4 min",
    content: `Le travail de l’argile constitue un moyen d'expression et de bien-être d’une puissance insoupçonnée. Dans le contexte de Bukavu, marqué par d’importants défis d’insertion et les cicatrices de crises sécuritaires, KIVU CERAMIC a imaginé un projet pionnier.

Nos séances d'art-thérapie par la terre permettent aux participants d'extérioriser physiquement et sans mots des émotions complexes, de réduire considérablement l’anxiété et de stabiliser l'estime de soi. En pétrissant la matière, en centrant l'argile sur le tour de potier, les jeunes doivent focaliser leur attention, se détendre et synchroniser leur respiration.

Une de nos bénéficiaires témoigne : « Face au tour de potier, je ne pense plus à mes blessures passées. Je vois une forme naître sous mes mains, je me découvre capable de créer du beau et de l'utile. Cela m'a redonné confiance en mon avenir. »

Par ce processus de résilience créative, la poterie s'affirme comme un puissant vecteur de reconstruction individuelle et d'insertion sociale pérenne.`
  },
  {
    id: "blog-2",
    title: "Une alternative écologique majeure: Développer un four à cuisson propre",
    excerpt: "Dans un souci de préservation des forêts du bassin du Congo, KIVU CERAMIC modernise ses cuissons grâce à un four écologique conçu pour limiter l'utilisation du charbon classique et du bois.",
    category: "Éco-Technologie",
    coverImage: "https://images.unsplash.com/photo-1565192647048-f997ded87958?auto=format&fit=crop&q=80&w=800",
    author: "Atelier Technologie",
    date: "2026-06-08",
    readTime: "5 min",
    content: `La cuisson est l'étape cruciale où la terre se transforme définitivement en roche céramique. Historiquement, les fours traditionnels de poterie consomment une quantité importante de bois ou de charbon fossile, contribuant de fait à la déforestation locale alarmante dans la région de Kabare et aux alentours de Bukavu.

Pour KIVU CERAMIC, l'excellence de nos créations ne devait pas se faire au détriment de l'écosystème. Nous avons donc mis sur pied un four écologique innovant.

Ce four utilise des isolants réfractaires modernes pour retenir la chaleur de manière hermétique, réduisant de plus de 60 % la consommation d'énergie par rapport à un four à bois à tirage direct. Nous étudions également la transition vers des combustibles dérivés de déchets agricoles recyclés (briquettes de biomasse et résidus de café de la province) pour alimenter nos prochaines vagues de production.

Moderniser le savoir-faire ancestral inclut impérativement le respect de l'environnement pour préserver l'avenir de la République Démocratique du Congo !`
  },
  {
    id: "blog-3",
    title: "Formation pratique et insertion: 15 jeunes filles entament leur parcours en céramique",
    excerpt: "Focus sur notre nouvelle cohorte d'apprentissage accueillie dans nos locaux de Kadutu. Un cursus complet allant du tamisage de l'argile brute jusqu'à la commercialisation.",
    category: "Insertion Professionnelle",
    coverImage: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=800",
    author: "Administration",
    date: "2026-05-24",
    readTime: "3 min",
    content: `KIVU CERAMIC a le plaisir d'accueillir sa nouvelle promotion de formation à Bukavu ! 15 jeunes femmes en situation de vulnérabilité économique se sont engagées pour un parcours intensif de 6 mois de formation technique et entrepreneuriale.

Les participantes seront formées à chaque étape du circuit artisanal de la terre :
1. Préparation et traitement de l'argile brute collectée localement,
2. Tournage sur tour de potier traditionnel et électrique,
3. Tournassage, polissage et finitions esthétiques,
4. Cuisson sécurisée et contrôle thermique,
5. Émaillage décoratif aux pigments écologiques,
6. Techniques de vente et bases de gestion financière pour micro-entreprises.

À travers ce programme soutenu par nos différents partenaires, KIVU CERAMIC fournit aux bénéficiaires non seulement un savoir-faire rare à forte valeur ajoutée, mais aussi un tremplin direct vers l'autonomie financière par l'auto-emploi.`
  }
];

const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Hôtel Lac Kivu",
    email: "contact@hotellackivu.com",
    phone: "+243810002233",
    subject: "Demande de devis - Assiettes personnalisées",
    message: "Bonjour, nous aimerions commander une série de 120 assiettes plates et 80 bols siglés avec le logo de notre hôtel de Bukavu. Pourriez-vous nous indiquer vos délais et vos tarifs pour ce type de commande sur-mesure ? Cordialement.",
    createdAt: "2026-06-19T10:14:22Z",
    status: "unread"
  },
  {
    id: "msg-2",
    name: "Association Mwinda",
    email: "mwinda.asso@gmail.com",
    subject: "Partenariat Art-Thérapie",
    message: "Nous suivons de près l'impact social de votre atelier à Kadutu. Nous aimerions intégrer 5 de nos pensionnaires dans vos prochaines sessions d'art-thérapie par la terre. Serait-il possible de se rencontrer à votre atelier pour en discuter ?",
    createdAt: "2026-06-18T14:30:10Z",
    status: "read"
  }
];

// Helper to initialize local storage
const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading localStorage key", key, error);
    return defaultValue;
  }
};

const setLocalStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage key", key, error);
  }
};

// Application data store
export const KivuStore = {
  getSettings(): CompanySettings {
    return getLocalStorageItem<CompanySettings>("kc_settings", INITIAL_SETTINGS);
  },
  
  saveSettings(settings: CompanySettings): void {
    setLocalStorageItem<CompanySettings>("kc_settings", settings);
  },

  getProducts(): Product[] {
    return getLocalStorageItem<Product[]>("kc_products", INITIAL_PRODUCTS);
  },

  saveProducts(products: Product[]): void {
    setLocalStorageItem<Product[]>("kc_products", products);
  },

  getBlogPosts(): BlogPost[] {
    return getLocalStorageItem<BlogPost[]>("kc_blog", INITIAL_BLOG);
  },

  saveBlogPosts(posts: BlogPost[]): void {
    setLocalStorageItem<BlogPost[]>("kc_blog", posts);
  },

  getMessages(): ContactMessage[] {
    return getLocalStorageItem<ContactMessage[]>("kc_messages", INITIAL_MESSAGES);
  },

  saveMessages(messages: ContactMessage[]): void {
    setLocalStorageItem<ContactMessage[]>("kc_messages", messages);
  },

  addMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const messages = this.getMessages();
    const newMessage: ContactMessage = {
      ...message,
      id: "msg-" + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'unread'
    };
    messages.unshift(newMessage);
    this.saveMessages(messages);
    return newMessage;
  },

  // RESET SYSTEM back to default
  resetData(): void {
    localStorage.removeItem("kc_settings");
    localStorage.removeItem("kc_products");
    localStorage.removeItem("kc_blog");
    localStorage.removeItem("kc_messages");
    window.location.reload();
  }
};

/**
 * ============================================================================
 * DIRECTIVE DE MIGRATION VERS SUPABASE
 * ============================================================================
 * Pour connecter cette application à une vraie base de données Supabase, 
 * voici les étapes simplifiées à mettre en place :
 * 
 * 1. Installez le client Supabase :
 *    npm i @supabase/supabase-js
 * 
 * 2. Créez un fichier client supabase.ts :
 *    import { createClient } from '@supabase/supabase-js';
 *    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
 *    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
 *    export const supabase = createClient(supabaseUrl, supabaseAnonKey);
 * 
 * 3. Migrez les méthodes de cet objet 'KivuStore' vers des appels asynchrones. Par exemple :
 * 
 *    export const SupabaseStore = {
 *      async getProducts(): Promise<Product[]> {
 *        const { data, error } = await supabase
 *          .from('products')
 *          .select('*')
 *          .order('id', { ascending: true });
 *        if (error) throw error;
 *        return data as Product[];
 *      },
 * 
 *      async addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) {
 *        const { data, error } = await supabase
 *          .from('messages')
 *          .insert([{ ...msg, status: 'unread' }])
 *          .select();
 *        if (error) throw error;
 *        return data[0];
 *      }
 *    };
 * 
 * Sa polyvalence permet une migration transparente en quelques minutes sans réécrire le frontend.
 */
