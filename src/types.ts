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

export type ActiveTab = 'home' | 'about' | 'products' | 'blog' | 'contact' | 'admin';

