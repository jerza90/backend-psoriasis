import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Shield, Info, ExternalLink, Star, Search, X } from 'lucide-react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import HeroProduct from '../components/HeroProduct';
import ProductImage from '../components/ProductImage';
import { useProducts, type Product } from '../data/useProducts';

function EvidenceBadge({ level }: { level: Product['evidenceLevel'] }) {
  const { t } = useTranslation();
  const colors = {
    Strong: 'bg-green/20 text-green border-green/30',
    Moderate: 'bg-gold/20 text-gold border-gold/30',
    Emerging: 'bg-rose/20 text-rose border-rose/30',
  };
  const levelLabel = t(`heroProduct.evidenceLevels.${level.toLowerCase()}`);
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${colors[level]}`}>
      {levelLabel}
    </span>
  );
}

function ProductDetailModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 md:pt-20 overflow-y-auto">
      <div className="fixed inset-0 bg-[rgba(10,20,30,0.6)] backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-strong rounded-2xl w-full max-w-[700px] animate-scale-in overflow-hidden mb-12">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/30 transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="p-7 md:p-9">
          {/* Image gallery */}
          {product.images && product.images.length > 0 && (
            <div className="flex gap-3 mb-5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  className="w-48 h-48 rounded-xl object-cover shrink-0 snap-start"
                />
              ))}
            </div>
          )}

          {/* Testimonial */}
          {product.testimonialText && (
            <div className="glass rounded-xl p-5 mb-5 flex items-start gap-4">
              {product.testimonialImage ? (
                <img src={product.testimonialImage} alt={product.testimonialAuthor || 'Testimonial'} className="w-12 h-12 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-full avatar-gradient flex items-center justify-center shrink-0 text-white font-bold text-lg">
                  {product.testimonialAuthor?.charAt(0) || 'U'}
                </div>
              )}
              <div>
                <p className="text-sm text-muted leading-relaxed italic">"{product.testimonialText}"</p>
                {product.testimonialAuthor && (
                  <p className="text-xs text-muted/60 mt-2 font-semibold">— {product.testimonialAuthor}</p>
                )}
              </div>
            </div>
          )}

          <div className="flex items-start gap-4 mb-4">
            <ProductImage name={product.name} category={product.category} imageUrl={product.imageUrl} size="md" className="shrink-0" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <EvidenceBadge level={product.evidenceLevel} />
                <span className="text-xs text-muted">{product.brand}</span>
              </div>
              <h2 className="text-2xl font-black">{product.name}</h2>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < product.rating ? 'text-gold fill-gold' : 'text-muted/30'} />
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-muted leading-relaxed mb-5">{product.shortDesc}</p>

          {/* Why it helps — the key pitch */}
          <div className="glass rounded-xl p-5 mb-4">
            <h3 className="font-bold text-sm text-green mb-2 flex items-center gap-1.5">
              <Shield size={16} />
              {t('heroProduct.whyHelps')}
            </h3>
            <p className="text-sm text-muted leading-relaxed">{product.whyItHelps}</p>
          </div>

          <details className="group mb-4">
            <summary className="flex items-center gap-1.5 text-sm text-muted font-semibold cursor-pointer hover:text-green transition-colors list-none">
              <Info size={14} />
              {t('products.modal.howWorks')}
              <span className="ml-auto text-muted transition-transform group-open:rotate-180 text-lg font-bold">▾</span>
            </summary>
            <p className="text-sm text-muted/80 mt-2 leading-relaxed glass rounded-xl p-4">
              {product.howItWorks}
            </p>
          </details>

          <p className="text-xs text-muted/60 italic mb-5">{product.evidenceNote}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="glass rounded-xl p-4">
              <span className="font-bold text-xs text-muted uppercase tracking-widest block mb-1">{t('products.modal.dosage')}</span>
              <p className="text-sm text-muted">{product.dosage}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <span className="font-bold text-xs text-muted uppercase tracking-widest block mb-1">{t('products.modal.bestTime')}</span>
              <p className="text-sm text-muted">{product.bestTime}</p>
            </div>
          </div>

          <div className="glass rounded-xl p-4 mb-4">
            <span className="font-bold text-xs text-muted uppercase tracking-widest block mb-2">{t('products.modal.keyIngredients')}</span>
            <ul className="space-y-1">
              {product.keyIngredients.map((ing) => (
                <li key={ing} className="flex items-start gap-2 text-sm text-muted">
                  <span className="w-1 h-1 rounded-full bg-green mt-2 shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-1.5 font-bold text-xs text-green uppercase tracking-widest mb-2">
                <Shield size={14} />
                {t('products.modal.suitable')}
              </div>
              <ul className="space-y-1.5">
                {product.suitableFor.map((s) => (
                  <li key={s} className="flex items-start gap-1.5 text-xs text-muted">
                    <span className="w-1 h-1 rounded-full bg-green mt-1.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-1.5 font-bold text-xs text-rose uppercase tracking-widest mb-2">
                <AlertTriangle size={14} />
                {t('products.modal.avoidIf')}
              </div>
              <ul className="space-y-1.5">
                {product.notSuitableFor.map((n) => (
                  <li key={n} className="flex items-start gap-1.5 text-xs text-muted">
                    <span className="w-1 h-1 rounded-full bg-rose mt-1.5 shrink-0" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-1.5 font-bold text-xs text-gold uppercase tracking-widest mb-2">
                <AlertTriangle size={14} />
                {t('products.modal.safety')}
              </div>
              <ul className="space-y-1.5">
                {product.safety.map((s) => (
                  <li key={s} className="flex items-start gap-1.5 text-xs text-muted">
                    <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href={product.affiliateUrl}
            className="button-base button-primary gap-2 w-full justify-center shadow-lg shadow-green/20"
          >
            <ShoppingCart size={18} />
            {t('products.modal.cta')}
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { t } = useTranslation();
  const products = useProducts();
  const categories = [...new Set(products.map((p) => p.category))];
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = activeCategory === 'All'
    ? products.filter((p) => !p.isHero)
    : products.filter((p) => p.category === activeCategory && !p.isHero);

  return (
    <div className="min-h-screen">
      <Topbar />

      <section className="container-main pt-10 pb-16">
        <div className="max-w-[900px] mx-auto">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-up">
            <div className="inline-flex items-center gap-2 text-green font-bold text-xs uppercase tracking-widest mb-3">
              <Search size={14} />
              {t('products.badge')}
            </div>
            <h1 className="clamp-heading-md mb-3">
              {t('products.heading')}
            </h1>
            <p className="text-muted text-lg max-w-[600px] mx-auto leading-relaxed">
              {t('products.subtitle')}
            </p>
          </div>

          {/* Hero product */}
          <div className="mb-12 animate-fade-up">
            <h2 className="font-bold text-xs text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
              <Star size={14} />
              {t('products.featured')}
            </h2>
            <HeroProduct />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center animate-fade-up">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  activeCategory === cat
                    ? 'gradient-green text-white shadow-lg shadow-green/20'
                    : 'glass hover:bg-white/40'
                }`}
              >
                {cat === 'All' ? t('products.filterAll') : cat}
              </button>
            ))}
          </div>

          {/* Product list */}
          <div className="space-y-4">
            {filtered.length === 0 && (
              <p className="text-center text-muted text-sm glass rounded-xl p-8">
                {t('products.empty')}
              </p>
            )}
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="glass-card glass-card-hover rounded-xl p-6 cursor-pointer animate-fade-up"
                style={{ animationDelay: `${0.05 * i}s` }}
                onClick={() => setSelectedProduct(product)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedProduct(product); }}
              >
                <div className="flex items-start gap-4">
                  <ProductImage name={product.name} category={product.category} imageUrl={product.imageUrl} size="sm" className="hidden sm:flex shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <EvidenceBadge level={product.evidenceLevel} />
                    </div>
                    <p className="text-xs text-muted mb-2">{product.brand} · {product.category}</p>
                    <p className="text-sm text-muted leading-relaxed">{product.shortDesc}</p>

                    {/* Why it helps — inline preview */}
                    <div className="glass rounded-lg p-3 mt-3">
                      <p className="text-xs text-muted/80 leading-relaxed">
                        <span className="font-semibold text-green">{t('products.whyForPsoriasis')} </span>
                        {product.whyItHelps}
                      </p>
                    </div>
                  </div>

                  {/* Suitability summary */}
                  <div className="hidden md:block shrink-0 w-[200px]">
                    <div className="glass rounded-xl p-3 text-xs space-y-2">
                      <div>
                        <span className="font-semibold text-green block mb-0.5">{t('products.suitable')}</span>
                        <p className="text-muted/70 line-clamp-2">{product.suitableFor.slice(0, 2).join(', ')}</p>
                      </div>
                      <div className="flex items-center gap-1 text-green font-semibold">
                        {t('products.viewDetails')} <ExternalLink size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="glass rounded-xl p-6 text-sm text-muted mt-10 animate-fade-up">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full gradient-green flex items-center justify-center">
                <span className="text-white font-bold text-xs">i</span>
              </span>
              <strong className="text-ink font-bold">{t('products.disclaimer.title')}</strong>
            </div>
            <p className="leading-relaxed mb-2">
              {t('products.disclaimer.text1')}
            </p>
            <p className="leading-relaxed">
              {t('products.disclaimer.text2')}
            </p>
          </div>
        </div>
      </section>

      {/* Detail modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </div>
  );
}
