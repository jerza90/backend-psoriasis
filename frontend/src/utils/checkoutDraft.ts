export type CheckoutDraft = {
  name: string;
  email: string;
  product: 'bm' | 'en';
  referralCode?: string;
};

const KEY = 'psoriasis_checkout_draft';

export function saveCheckoutDraft(draft: CheckoutDraft) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(KEY, JSON.stringify(draft));
}

export function readCheckoutDraft(): CheckoutDraft | null {
  if (typeof window === 'undefined') return null;
  const raw = window.sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CheckoutDraft;
  } catch {
    return null;
  }
}

export function clearCheckoutDraft() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(KEY);
}
