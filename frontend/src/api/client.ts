import type { AuthUser, User, UserRegistration } from '../types';
import { getApiBaseUrl } from '../config/apiBase';

const API_BASE = getApiBaseUrl();
const BASE_URL = API_BASE + '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function login(email: string, password: string): Promise<AuthUser> {
  return request<AuthUser>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function sendRegistrationOtp(email: string): Promise<{ message: string }> {
  return request<{ message: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function verifyRegistration(
  email: string,
  otpCode: string,
  password: string,
  fullName: string,
  username?: string,
): Promise<{ message: string; userId: number; role: string }> {
  return request<{ message: string; userId: number; role: string }>('/auth/verify-registration', {
    method: 'POST',
    body: JSON.stringify({ email, otpCode, password, fullName, username }),
  });
}

export async function sendForgotPasswordOtp(email: string): Promise<{ message: string }> {
  return request<{ message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(
  email: string,
  otpCode: string,
  newPassword: string,
): Promise<{ message: string }> {
  return request<{ message: string }>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email, otpCode, newPassword }),
  });
}

export async function registerUser(
  data: UserRegistration
): Promise<User> {
  return request<User>('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function checkUsernameExists(
  username: string
): Promise<boolean> {
  return request<boolean>(`/users/exists/username/${encodeURIComponent(username)}`);
}

export async function checkEmailExists(email: string): Promise<boolean> {
  return request<boolean>(`/users/exists/email/${encodeURIComponent(email)}`);
}

export async function getUserByUsername(username: string): Promise<User> {
  return request<User>(`/users/username/${encodeURIComponent(username)}`);
}

export interface AffiliateProfile {
  id: number;
  name: string;
  email: string;
  referralCode: string;
  bio?: string | null;
  pageTitle?: string | null;
  pageIntro?: string | null;
  conditionLabel?: string | null;
  storyTitle?: string | null;
  storySummary?: string | null;
  storyBody?: string | null;
  blogTitle?: string | null;
  blogExcerpt?: string | null;
  blogUrl?: string | null;
  blogImageUrl?: string | null;
  tipsTitle?: string | null;
  tipsText?: string | null;
  guideTitle?: string | null;
  guideText?: string | null;
  progressTitle?: string | null;
  progressText?: string | null;
  progressImages?: string | null;
  avatarUrl?: string | null;
  socialLinks?: string | null;
  paymentInfo?: string | null;
  commissionRate: string;
  totalEarned: string;
  totalPaid: string;
  status: string;
  referralLink: string;
  createdAt: string;
}

export interface AffiliateProfileUpdateInput {
  name?: string;
  avatarUrl?: string;
  bio?: string;
  pageTitle?: string;
  pageIntro?: string;
  conditionLabel?: string;
  storyTitle?: string;
  storySummary?: string;
  storyBody?: string;
  socialLinks?: string;
  paymentInfo?: string;
  blogTitle?: string;
  blogExcerpt?: string;
  blogUrl?: string;
  blogImageUrl?: string;
  tipsTitle?: string;
  tipsText?: string;
  guideTitle?: string;
  guideText?: string;
  progressTitle?: string;
  progressText?: string;
  progressImages?: string;
}

export interface AdminTestimonialProgressInput {
  dateLabel: string;
  title: string;
  description: string;
  notes: string;
  tips: string[];
  images: string[];
  productTags: { name: string; slug?: string }[];
  details: Record<string, unknown>;
  sortOrder: number;
}

export interface AdminTestimonialInput {
  affiliateId?: number | null;
  name: string;
  location: string;
  conditionDuration: string;
  categories: string[];
  summary: string;
  initialQuote: string;
  resultQuote: string;
  featured: boolean;
  avatarUrl: string;
  lang: string;
  sortOrder: number;
  status: string;
  progressHistory: AdminTestimonialProgressInput[];
}

export interface TestimonialResponse {
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
  lang: string;
  progressHistory: {
    id: number;
    dateLabel: string;
    title: string;
    description: string;
    notes: string;
    tips: string[];
    images: string[];
    productTags: { name: string; slug?: string }[];
    details?: Record<string, unknown>;
  }[];
}

export async function listAdminTestimonials(): Promise<TestimonialResponse[]> {
  return request<TestimonialResponse[]>('/admin/testimonials');
}

export async function createAdminTestimonial(data: AdminTestimonialInput): Promise<TestimonialResponse> {
  return request<TestimonialResponse>('/admin/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAdminTestimonial(id: number, data: AdminTestimonialInput): Promise<TestimonialResponse> {
  return request<TestimonialResponse>(`/admin/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteAdminTestimonial(id: number): Promise<{ message: string }> {
  return request<{ message: string }>(`/admin/testimonials/${id}`, {
    method: 'DELETE',
  });
}

export async function getAffiliateProfile(email: string): Promise<AffiliateProfile> {
  return request<AffiliateProfile>(`/affiliate/profile?email=${encodeURIComponent(email)}`);
}

export async function updateAffiliateProfile(
  email: string,
  data: AffiliateProfileUpdateInput,
): Promise<AffiliateProfile> {
  return request<AffiliateProfile>(`/affiliate/profile?email=${encodeURIComponent(email)}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function getPublicAffiliateProfile(code: string): Promise<AffiliateProfile> {
  return request<AffiliateProfile>(`/affiliate/public?code=${encodeURIComponent(code)}`);
}

export interface AffiliateConversion {
  id: number;
  orderAmount: string;
  commissionAmount: string;
  status: string;
  createdAt: string;
}

export interface AffiliateConversionsResponse {
  count: number;
  conversions: AffiliateConversion[];
}

export async function getAffiliateConversions(affiliateId: number): Promise<AffiliateConversionsResponse> {
  return request<AffiliateConversionsResponse>(`/affiliate/${affiliateId}/conversions`);
}

export async function registerAffiliate(name: string, email: string): Promise<AffiliateProfile> {
  return request<AffiliateProfile>('/affiliate/register', {
    method: 'POST',
    body: JSON.stringify({ name, email }),
  });
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) {
    throw new Error('Upload failed');
  }
  const data = await res.json();
  return data.url;
}
