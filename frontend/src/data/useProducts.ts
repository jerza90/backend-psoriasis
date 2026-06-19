import { useTranslation } from 'react-i18next';
import { products as productsEn, type Product } from './products';
import { productsMs } from './productsMs';

export function useProducts(): Product[] {
  const { i18n } = useTranslation();
  return i18n.language === 'ms' ? productsMs : productsEn;
}

export function useProduct(id: string): Product | undefined {
  const products = useProducts();
  return products.find((p) => p.id === id);
}

export { type Product } from './products';
