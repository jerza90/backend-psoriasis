import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, ArrowLeft, Mail, Download, AlertTriangle, Globe, MapPin, Banknote } from 'lucide-react';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

type ProductType = 'bm' | 'en';

const PRODUCTS: Record<ProductType, { label: string; price: string; original: string | null; total: string; surcharge: string | null; currency: string; paymentMethod: string }> = {
  bm: { label: 'Panduan BM', price: 'RM 39', original: 'RM 49', total: 'RM 39', surcharge: null, currency: 'RM', paymentMethod: 'FPX / Bank Transfer' },
  en: { label: 'English Guide', price: '$27', original: '$67', total: '$28.50', surcharge: '$1.50', currency: '$', paymentMethod: 'Credit Card' },
};

export default function CheckoutPage() {
  const { t } = useTranslation();
  const [product, setProduct] = useState<ProductType>('bm');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selected = PRODUCTS[product];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name, email, product }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Checkout failed');
      }

      const data = await res.json();
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const productLabel = product === 'bm' ? 'Panduan BM' : 'English Guide';
  const productImage = product === 'bm'
    ? '/e-book-landing-pages/e-book-promo-free-resipe.jpg'
    : '/e-book-landing-pages/default-ebook-page.jpg';

  return (
    <div className="min-h-screen">
      <Topbar />

      <section className="container-main pt-12 pb-16">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green transition-colors mb-8">
          <ArrowLeft size={16} />
          {t('checkout.backToHome')}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-10 items-start max-w-[1000px] mx-auto">
          {/* Left column */}
          <div className="animate-fade-up">
            <h1 className="text-2xl md:text-3xl font-black mb-2">{t('checkout.heading')}</h1>
            <p className="text-muted text-sm mb-6">{t('checkout.subtitle')}</p>

            {/* Product selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setProduct('bm')}
                className={`relative rounded-xl p-4 text-left transition-all border-2 ${
                  product === 'bm'
                    ? 'border-green bg-green/5 shadow-[0_0_0_1px_rgba(42,157,143,0.15)]'
                    : 'border-transparent bg-soft hover:bg-white/40'
                }`}
              >
                <div className={`flex items-center gap-2 mb-2 ${product !== 'bm' ? 'opacity-50' : ''}`}>
                  <span className="w-7 h-7 rounded-full bg-green/10 flex items-center justify-center">
                    <MapPin size={14} className="text-green" />
                  </span>
                  <span className="text-sm font-bold">Panduan BM</span>
                </div>
                <div className={`flex items-baseline gap-2 ${product !== 'bm' ? 'opacity-50' : ''}`}>
                  <p className="text-lg font-black text-green">RM 39</p>
                  <p className="text-sm text-muted/40 line-through">RM 49</p>
                </div>
                <p className={`text-[10px] text-muted/60 mt-0.5 ${product !== 'bm' ? 'opacity-50' : ''}`}>Local — Bahasa Malaysia &middot; Save 20%</p>
                <p className={`flex items-center gap-1 text-[10px] text-amber-600 mt-1 ${product !== 'bm' ? 'opacity-50' : ''}`}>
                  <Banknote size={10} />
                  FPX / Bank Transfer
                </p>
                {product === 'bm' && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                )}
              </button>

              <button
                onClick={() => setProduct('en')}
                className={`relative rounded-xl p-4 text-left transition-all border-2 ${
                  product === 'en'
                    ? 'border-green bg-green/5 shadow-[0_0_0_1px_rgba(42,157,143,0.15)]'
                    : 'border-transparent bg-soft hover:bg-white/40'
                }`}
              >
                <div className={`flex items-center gap-2 mb-2 ${product !== 'en' ? 'opacity-50' : ''}`}>
                  <span className="w-7 h-7 rounded-full bg-green/10 flex items-center justify-center">
                    <Globe size={14} className="text-green" />
                  </span>
                  <span className="text-sm font-bold">English Guide</span>
                </div>
                <div className={`flex items-baseline gap-2 ${product !== 'en' ? 'opacity-50' : ''}`}>
                  <p className="text-lg font-black text-green">$27</p>
                  <p className="text-sm text-muted/40 line-through">$67</p>
                </div>
                <p className={`text-[10px] text-muted/60 mt-0.5 ${product !== 'en' ? 'opacity-50' : ''}`}>International — English &middot; Save 60%</p>
                <p className={`flex items-center gap-1 text-[10px] text-muted/60 mt-1 ${product !== 'en' ? 'opacity-50' : ''}`}>
                  <Lock size={10} />
                  Credit Card
                </p>
                {product === 'en' && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                )}
              </button>
            </div>

            {/* Digital product notice */}
            <div className="glass-card rounded-xl p-4 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center shrink-0">
                <Download size={18} className="text-green" />
              </div>
              <div>
                <p className="text-sm font-semibold">{t('checkout.digitalNotice')}</p>
                <p className="text-xs text-muted/60">{t('checkout.digitalDesc')}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="glass-card rounded-xl p-6 mb-4">
                <h2 className="font-bold text-sm text-muted uppercase tracking-widest mb-4">{t('checkout.deliveryInfo')}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-muted font-semibold mb-1.5">{t('checkout.fullName')}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('checkout.namePlaceholder')}
                      required
                      className="w-full rounded-xl glass-input px-4 py-2.5 text-sm text-ink outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted font-semibold mb-1.5">{t('checkout.email')}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl glass-input px-4 py-2.5 text-sm text-ink outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-muted/50">
                  <Mail size={12} />
                  {t('checkout.emailDelivery')}
                </div>
              </div>

              {error && (
                <div className="glass rounded-xl p-4 mb-4 flex items-start gap-2 border border-rose/30">
                  <AlertTriangle size={16} className="text-rose shrink-0 mt-0.5" />
                  <p className="text-sm text-rose">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !name.trim() || !email.trim()}
                className="button-base button-primary gap-2 w-full justify-center shadow-lg shadow-green/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {product === 'bm' ? <Banknote size={18} /> : <Lock size={18} />}
                {loading ? t('checkout.processing') : `${t('checkout.payNow')} — ${selected.total}`}
              </button>
              <p className="text-xs text-muted/50 text-center mt-3">
                {product === 'bm' ? 'Pay via FPX / online banking' : t('checkout.secureNotice')}
              </p>
            </form>
          </div>

          {/* Order summary */}
          <div className="animate-fade-up [animation-delay:0.1s]">
            <div className="glass-card rounded-xl p-6 sticky top-24">
              <h2 className="font-bold text-sm text-muted uppercase tracking-widest mb-4">{t('checkout.orderSummary')}</h2>

              <div className="flex items-start gap-3 pb-4 mb-4 border-b border-white/10">
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={productImage}
                    alt={productLabel}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{productLabel}</p>
                  <p className="text-xs text-muted/60">{t('ebook.details.pages')}</p>
                </div>
                <p className="text-sm font-bold">{selected.price}</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-muted/50 mb-4">
                <Download size={12} />
                {t('checkout.digitalItem')}
              </div>

              <div className="space-y-2 text-sm mb-4">
                {selected.original && (
                  <div className="flex justify-between text-muted line-through">
                    <span>{t('checkout.original')}</span>
                    <span>{selected.original}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted">
                  <span>{productLabel}</span>
                  <span>{selected.price}</span>
                </div>
                {selected.original && (
                  <div className="flex justify-between text-rose font-semibold text-xs">
                    <span>{t('checkout.discount')}</span>
                    <span>{product === 'en' ? '-60%' : '-20%'}</span>
                  </div>
                )}
                {selected.surcharge && (
                  <div className="flex justify-between text-muted text-xs pt-2 border-t border-white/10">
                    <span>{t('checkout.surcharge')}</span>
                    <span>{selected.surcharge}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="font-bold text-sm">{t('checkout.total')}</span>
                <span className="text-xl font-black text-green">{selected.total}</span>
              </div>

              <div className="flex items-center gap-1.5 mt-4 text-xs text-muted/50 justify-center">
                {product === 'bm' ? <Banknote size={12} /> : <Lock size={12} />}
                {product === 'bm' ? 'FPX / Bank Transfer' : t('checkout.secureBadge')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
