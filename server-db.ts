import fs from 'fs';
import path from 'path';

export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  image: string;
  category: string;
  date: string;
  author: string;
  tags: string[];
  views: number;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
}

export interface CompanyDetails {
  phone: string;
  email: string;
  address: string;
  mission: string;
  vision: string;
  aboutText: string;
}

interface DatabaseSchema {
  articles: Article[];
  contacts: Contact[];
  company: CompanyDetails;
}

// Use process.cwd() to ensure we find the 'data' directory in the root of the project.
// In Vercel, this corresponds to the root of the deployment.
const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

const DEFAULT_COMPANY: CompanyDetails = {
  phone: "+243974505547",
  email: "Kivuceramic12@gmail.com",
  address: "Avenu Rukumbuka, Quartier Kasali, Commune de Kadutu, Bukavu - Sud-Kivu, RD Congo",
  mission: "Préserver le savoir-faire céramique traditionnel, promouvoir la transformation locale des matières premières et offrir aux jeunes des opportunités de formation, d'emploi et d'épanouissement personnel.",
  vision: "Devenir une référence dans la production de céramique artisanale en République Démocratique du Congo en démontrant que les ressources locales peuvent être transformées en produits de qualité, créateurs de richesse.",
  aboutText: "KIVU CERAMIC est une entreprise culturelle et sociale basée à Bukavu. Notre atelier associe les techniques traditionnelles de poterie aux innovations modernes de manière à valoriser l'argile du Kivu pour créer des produits authentiques « Made in DR Congo » tout en réhabilitant des jeunes vulnérables par l'apprentissage et l'art-thérapie."
};

const DEFAULT_ARTICLES: Article[] = [
  {
    id: "1",
    title: "L'Art-Thérapie par l'Argile : Un Chemin de Résilience à Bukavu",
    summary: "Découvrez comment le travail de l'argile aide les jeunes en situation de vulnérabilité à extérioriser leurs émotions et rebâtir leur estime de soi.",
    content: `Le travail de l'argile constitue bien plus qu'une simple activité artisanale chez KIVU CERAMIC : c'est un puissant vecteur d'expression, de reconstruction personnelle et de bien-être. 

Dans un contexte marqué par les traumatismes, le chômage et la précarité à Bukavu, notre programme d'art-thérapie par l'argile offre un havre de paix. Les séances permettent aux participants d'extérioriser physiquement leurs émotions, de canaliser leur stress et d'apaiser des blessures psychologiques invisibles.

### Pourquoi l'argile ?
L'argile est une matière malléable, tactile et indulgente. Elle réagit directement à la pression des mains, permettant d'entrer en connexion directe avec ses sentiments profonds. En façonnant un bloc informe pour en faire une tasse ou un vase, les jeunes réalisent de quoi ils sont capables : ils transforment la matière comme ils peuvent transformer leur propre destin.

### Des résultats concrets
- **Estime de soi retrouvée :** Voir un produit fini, solide et esthétique naître de ses propres mains redonne confiance.
- **Réduction durable du stress :** Le rythme lent et concentré du travail sur le tour favorise un état de pleine conscience.
- **Insertion durable :** Pour beaucoup de bénéficiaires de 18 à 35 ans (notamment les jeunes femmes), c'est le point d'ancrage d'un nouveau projet de vie économique.

*"Travailler la terre m'a permis de me vider la tête et de comprendre que je savais créer de belles choses",* partage l'un de nos apprentis. Grâce à vos soutiens, ce programme continue de transformer des vies à Kadutu.`,
    image: "https://images.unsplash.com/photo-1565192647048-f997ded87958?auto=format&fit=crop&q=80&w=800",
    category: "Art-Thérapie",
    date: "2026-06-15",
    author: "Kivu Ceramic Admin",
    tags: ["Art-Thérapie", "Santé Mentale", "Impact Social", "Bukavu"],
    views: 142
  },
  {
    id: "2",
    title: "Nos Formations Professionnelles : Autonomiser la Jeunesse du Sud-Kivu",
    summary: "Une immersion complète dans les différentes étapes de production de céramique artisanale, de l'argile brute au produit fini.",
    content: `Chez KIVU CERAMIC, nous croyons à l'excellence technique et à l'autonomie économique locale. C'est pourquoi nous organisons des programmes de formations professionnelles intensives destinées aux jeunes vulnérables et aux artisans qui désirent moderniser leurs compétences.

Chaque participant est accompagné pas à pas à travers les différentes phases de fabrication céramique :
1. **Préparation et traitement de l'argile :** Apprendre à raffiner la matière brute extraite localement au Sud-Kivu.
2. **Tournage sur tour de potier :** Maîtriser le geste fluide, le centrage de la terre et l'élévation des parois.
3. **Tournassage et finition :** Affiner le profil des pièces après un séchage partiel.
4. **Cuisson dans notre four écologique :** Comprendre la gestion de la température pour solidifier l'œuvre de façon respectueuse de l'environnement.
5. **Émaillage et décoration :** Développer une sensibilité artistique unique inspirée du patrimoine culturel congolais.
6. **Gestion et commercialisation :** Acquérir les bases managériales nécessaires pour fixer un prix juste et vendre ses créations.

À travers ces compétences, ce n'est pas seulement un métier que ces jeunes apprennent : c'est un passeport vers l'autonomisation financière et l'indépendance sociale.`,
    image: "https://images.unsplash.com/photo-1595273670150-db0a3e3681ee?auto=format&fit=crop&q=80&w=800",
    category: "Formations",
    date: "2026-06-10",
    author: "Responsable Formation",
    tags: ["Formation", "Autonomisation", "Jeunesse", "Savoir-faire"],
    views: 98
  },
  {
    id: "3",
    title: "Valoriser l'Argile du Kivu : La force d'un label \"Made in DR Congo\"",
    summary: "Pourquoi le choix des ressources locales et du circuit court participe activement au développement de Bukavu, Kadutu et Ibanda.",
    content: `Le Sud-Kivu regorge de richesses minérales, mais l'argile reste l'une de ses ressources renouvelables et traditionnelles les plus sous-estimées. KIVU CERAMIC s'est donné pour mission de valoriser cette matière première pour proposer une véritable alternative locale de qualité supérieure aux produits importés.

En achetant un bol, une tasse ou un pot de fleurs estampillé **Made in DR Congo - Bukavu**, nos clients font bien plus qu'acquérir un bel objet fonctionnel :
- Ils soutiennent la création d'emplois décents pour la jeunesse locale.
- Ils préservent et perpétuent des techniques de poterie séculaires de la région de Kabare.
- Ils réduisent l'empreinte carbone liée à l'importation massive de céramiques synthétiques.

Chaque pièce porte l'empreinte de la terre de notre province et l'identité de l'artisan qui l'a façonnée. C'est notre contribution culturelle et économique au développement harmonieux du Congo.`,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
    category: "Produits",
    date: "2026-06-01",
    author: "Direction Kivu Ceramic",
    tags: ["Made in DRC", "Argile", "Économie Locale", "Artisanat"],
    views: 187
  }
];

const DEFAULT_CONTACTS: Contact[] = [
  {
    id: "c1",
    name: "Hôtel Lac Kivu",
    email: "contact@hotellackivu.com",
    subject: "Demande de partenariat et commande de vaisselle personnalisée",
    message: "Bonjour, nous sommes à la recherche d'un artisan local pour produire 200 tasses et 150 assiettes personnalisées avec notre logo pour notre restaurant à Bukavu. Seriez-vous en mesure de réaliser cette commande d'ici fin août ? Merci !",
    date: "2026-06-18",
    status: "unread"
  },
  {
    id: "c2",
    name: "Irène Nabintu",
    email: "irene.nabintu@yahoo.fr",
    subject: "Inscription aux ateliers d'art-thérapie pour jeunes",
    message: "Bonjour Kivu Ceramic, je travaille avec une association de jeunes filles vulnérables à Kadutu et j'aimerais savoir si vous avez de prochaines sessions d'art-thérapie ou de formation gratuites de prévues. Les filles sont très motivées par la poterie.",
    date: "2026-06-19",
    status: "read"
  }
];

// Initialize database
export function initDB(): DatabaseSchema {
  const dataDir = path.dirname(DB_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const defaultData: DatabaseSchema = {
      articles: DEFAULT_ARTICLES,
      contacts: DEFAULT_CONTACTS,
      company: DEFAULT_COMPANY
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const data = JSON.parse(raw) as DatabaseSchema;
    // Fill in default values if structure is missing
    if (!data.articles) data.articles = DEFAULT_ARTICLES;
    if (!data.contacts) data.contacts = DEFAULT_CONTACTS;
    if (!data.company) data.company = DEFAULT_COMPANY;
    return data;
  } catch (err) {
    console.error("Error reading database file, resetting to defaults:", err);
    const defaultData: DatabaseSchema = {
      articles: DEFAULT_ARTICLES,
      contacts: DEFAULT_CONTACTS,
      company: DEFAULT_COMPANY
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
}

export function saveDB(data: DatabaseSchema) {
  try {
    const dataDir = path.dirname(DB_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("Failed to write to database file:", err);
  }
}

/*
  HOW TO MIGRATE TO SUPABASE (DECOUPLING & EVOLUTION MIGRATION):
  These functions encapsulate the persistence logic. To move to Supabase, 
  you can simply initialize `@supabase/supabase-js` here and rewrite these 
  functions using:
  
  ```typescript
  import { createClient } from '@supabase/supabase-js'
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  
  export async function getArticles() {
    const { data } = await supabase.from('articles').select('*').order('date', { ascending: false })
    return data;
  }
  ```
  
  Because the client code calls these abstracted endpoints through proxy requests, 
  switching the database behind the scenes requires ZERO code modifications in the React frontend!
*/

export const dbService = {
  getArticles(): Article[] {
    const db = initDB();
    return db.articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getArticleById(id: string): Article | null {
    const db = initDB();
    const article = db.articles.find(a => a.id === id);
    if (article) {
      article.views = (article.views || 0) + 1;
      saveDB(db);
    }
    return article || null;
  },

  createArticle(articleData: Omit<Article, 'id' | 'views'>): Article {
    const db = initDB();
    const newArticle: Article = {
      ...articleData,
      id: Math.random().toString(36).substring(2, 9),
      views: 0
    };
    db.articles.push(newArticle);
    saveDB(db);
    return newArticle;
  },

  updateArticle(id: string, updatedData: Partial<Omit<Article, 'id' | 'views'>>): Article | null {
    const db = initDB();
    const idx = db.articles.findIndex(a => a.id === id);
    if (idx === -1) return null;

    db.articles[idx] = {
      ...db.articles[idx],
      ...updatedData
    };
    saveDB(db);
    return db.articles[idx];
  },

  deleteArticle(id: string): boolean {
    const db = initDB();
    const lengthBefore = db.articles.length;
    db.articles = db.articles.filter(a => a.id !== id);
    if (db.articles.length === lengthBefore) return false;
    saveDB(db);
    return true;
  },

  getContacts(): Contact[] {
    const db = initDB();
    return db.contacts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  createContact(contactData: Omit<Contact, 'id' | 'date' | 'status'>): Contact {
    const db = initDB();
    const newContact: Contact = {
      ...contactData,
      id: "c_" + Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString().split('T')[0],
      status: 'unread'
    };
    db.contacts.push(newContact);
    saveDB(db);
    return newContact;
  },

  updateContactStatus(id: string, status: 'unread' | 'read' | 'replied'): Contact | null {
    const db = initDB();
    const idx = db.contacts.findIndex(c => c.id === id);
    if (idx === -1) return null;
    db.contacts[idx].status = status;
    saveDB(db);
    return db.contacts[idx];
  },

  deleteContact(id: string): boolean {
    const db = initDB();
    const lengthBefore = db.contacts.length;
    db.contacts = db.contacts.filter(c => c.id !== id);
    if (db.contacts.length === lengthBefore) return false;
    saveDB(db);
    return true;
  },

  getCompany(): CompanyDetails {
    const db = initDB();
    return db.company;
  },

  updateCompany(companyData: Partial<CompanyDetails>): CompanyDetails {
    const db = initDB();
    db.company = {
      ...db.company,
      ...companyData
    };
    saveDB(db);
    return db.company;
  }
};
