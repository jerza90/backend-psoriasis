export interface UserRegistration {
  username: string;
  email: string;
  passwordHash: string;
  fullName?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string | null;
  role: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: number;
  email: string;
  fullName: string;
  username: string;
  role: string;
}

export interface ChecklistFormData {
  name: string;
  email: string;
}

export interface EbookProduct {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  currency: string;
  language: 'bm' | 'en';
  coverColor: string;
  features: string[];
  payhipUrl: string;
}

export interface ProductRecommendation {
  id: string;
  category: ProductCategory;
  name: string;
  ingredients: string[];
  dosage: string;
  safetyNotes: string[];
  iherbUrl: string;
  suitableFor: string[];
  notFor: string[];
}

export type ProductCategory =
  | 'Skin Barrier'
  | 'Immune'
  | 'Gut'
  | 'Stress/Sleep';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  publishedAt: string;
  imageUrl?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
