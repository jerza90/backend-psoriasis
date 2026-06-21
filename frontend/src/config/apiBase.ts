const PROD_API_URL = 'https://psoriasis-backend.fly.dev';

export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL?.trim();
  if (envUrl) {
    return envUrl.replace(/\/$/, '');
  }

  return import.meta.env.PROD ? PROD_API_URL : '';
}
