import { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../config/apiBase';

export interface ProgressEntry {
  id: number;
  date: string;
  title: string;
  description: string;
  notes: string;
  tips: string[];
  images: string[];
  productTags: { name: string; slug?: string }[];
  details?: Record<string, unknown>;
}

export interface TestimonialData {
  id: number;
  name: string;
  location: string;
  conditionDuration: string;
  categories: string[];
  summary: string;
  initialQuote: string;
  resultQuote: string;
  featured: boolean;
  avatarUrl: string;
  progressHistory: ProgressEntry[];
}

interface ApiProgressEntry {
  id: number;
  dateLabel: string;
  title: string;
  description: string;
  notes: string;
  tips: string[];
  images: string[];
  productTags: { name: string; slug?: string }[];
  details?: Record<string, unknown>;
}

interface ApiTestimonial {
  id: number;
  name: string;
  location: string;
  conditionDuration: string;
  categories: string[];
  summary: string;
  initialQuote: string;
  resultQuote: string;
  featured: boolean;
  avatarUrl: string;
  progressHistory: ApiProgressEntry[];
}

const API_BASE = getApiBaseUrl();

function normalizeLang(lang: string) {
  return (lang || 'ms').toLowerCase().slice(0, 2) || 'ms';
}

function mapTestimonial(t: ApiTestimonial): TestimonialData {
  return {
    ...t,
    progressHistory: t.progressHistory.map((p) => ({
      id: p.id,
      date: p.dateLabel,
      title: p.title,
      description: p.description,
      notes: p.notes,
      tips: p.tips || [],
      images: p.images || [],
      productTags: p.productTags || [],
      details: p.details,
    })),
  };
}

export function useTestimonials(lang: string) {
  const [data, setData] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const normalizedLang = normalizeLang(lang);
    setLoading(true);
    setError(null);
    setData([]);
    fetch(`${API_BASE}/api/testimonials?lang=${normalizedLang}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch testimonials');
        return res.json();
      })
      .then((list: ApiTestimonial[]) => setData(list.map(mapTestimonial)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [lang]);

  return { testimonials: data, loading, error };
}

export function useTestimonialById(id: number) {
  const [data, setData] = useState<TestimonialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);
    fetch(`${API_BASE}/api/testimonials/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Testimonial not found');
        return res.json();
      })
      .then((t: ApiTestimonial) => setData(mapTestimonial(t)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { testimonial: data, loading, error };
}
