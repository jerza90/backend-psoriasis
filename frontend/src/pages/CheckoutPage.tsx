import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, ArrowLeft, Mail, Download, AlertTriangle, Globe, MapPin, Banknote, Tag, Loader, CheckCircle2, XCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { getApiBaseUrl } from '../config/apiBase';
import { clearCheckoutDraft, readCheckoutDraft, saveCheckoutDraft } from '../utils/checkoutDraft';

type ProductType = 'bm' | 'en';

const SST_RATE = 0.08;
const TRANSACTION_FEE = 1;

function calcBmPrices() {
  const base = 39;
  const sst = base * SST_RATE;
  const total = base + sst + TRANSACTION_FEE;
  return {
    price: `RM ${base}`,
    original: 'RM 79',
    total: `RM ${total.toFixed(2)}`,
    surcharge: `SST 8% (RM ${sst.toFixed(2)}) + Fee (RM ${TRANSACTION_FEE}.00)`,
    currency: 'RM',
  };
}

const PRODUCTS: Record<ProductType, { price: string; original: string | null; total: string; surcharge: string | null; currency: string }> = {
  bm: calcBmPrices(),
  en: { price: '$27', original: '$67', total: '$28.50', surcharge: '$1.50', currency: '$' },
};

export default function CheckoutPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const draft = readCheckoutDraft();
  const [product, setProduct] = useState<ProductType>(draft?.product ?? 'bm');
  const [email, setEmail] = useState(draft?.email ?? '');
  const [phone, setPhone] = useState(draft?.phone ?? '');
  const [name, setName] = useState(draft?.name ?? '');
  const [discountCode, setDiscountCode] = useState(searchParams.get('discount') ?? draft?.discountCode ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [discountStatus, setDiscountStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [appliedDiscount, setAppliedDiscount] = useState<{ amount: number; original: number } | null>(null);
  const resumeNotice = Boolean(searchParams.get('resume')) || Boolean(draft);

  const referralCode = searchParams.get('ref') || undefined;

  useEffect(() => {
    if (!name.trim() && !email.trim() && !phone.trim() && !referralCode && !discountCode.trim()) {
      clearCheckoutDraft();
      return;
    }
    saveCheckoutDraft({ name, email, phone, product, referralCode, discountCode: discountCode.trim() || undefined });
  }, [name, email, phone, product, referralCode, discountCode]);

  const selected = PRODUCTS[product];

  const validateDiscount = async (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) {
      setDiscountStatus('idle');
      setAppliedDiscount(null);
      return;
    }
    setDiscountStatus('checking');
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/checkout/discount?code=${encodeURIComponent(trimmed)}`);
      const data = await parseJsonSafe(res);
      if (data?.valid) {
        setAppliedDiscount({ amount: Number(data.discountedAmount), original: Number(data.originalAmount) });
        setDiscountStatus('valid');
      } else {
        setAppliedDiscount(null);
        setDiscountStatus('invalid');
      }
    } catch {
      setAppliedDiscount(null);
      setDiscountStatus('invalid');
    }
  };

  const applied = appliedDiscount && product === 'bm' ? appliedDiscount : null;
  const displayPrice = applied ? `RM ${applied.amount.toFixed(2)}` : selected.price;
  const displayOriginal = applied ? `RM ${applied.original.toFixed(2)}` : selected.original;
  const displayTotal = applied ? `RM ${applied.amount.toFixed(2)}` : selected.total;
  const displaySave = applied
    ? `RM ${(applied.original - applied.amount).toFixed(2)}`
    : product === 'en' ? '-60%' : '-51%';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/checkout/create-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          email,
          phone,
          product,
          referralCode,
          discountCode: discountCode.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const err = await parseJsonSafe(res);
        throw new Error(err.error || 'Checkout failed');
      }

      const data = await parseJsonSafe(res);
      if (!data?.url) {
        throw new Error('Checkout link was not returned');
      }
      saveCheckoutDraft({ name, email, phone, product, referralCode, discountCode: discountCode.trim() || undefined });
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const productLabel = product === 'bm' ? t('checkout.bmLabel') : t('checkout.enLabel');
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
            {resumeNotice && (
              <div className="glass-card rounded-xl p-4 mb-6 border border-green/20 bg-green/5">
                <p className="text-sm font-semibold text-green mb-1">Kami sambung semula data anda</p>
                <p className="text-xs text-muted/70 leading-relaxed">
                  Maklumat pembelian sebelum ini telah diisi semula supaya anda boleh terus cuba lagi tanpa mula dari kosong.
                </p>
              </div>
            )}

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
                  <span className="text-sm font-bold">{t('checkout.bmLabel')}</span>
                </div>
                <div className={`flex items-baseline gap-2 ${product !== 'bm' ? 'opacity-50' : ''}`}>
                  <p className="text-lg font-black text-green">{PRODUCTS.bm.price}</p>
                  {PRODUCTS.bm.original && <p className="text-sm text-muted/40 line-through">{PRODUCTS.bm.original}</p>}
                </div>
                <p className={`text-[10px] text-muted/60 mt-0.5 ${product !== 'bm' ? 'opacity-50' : ''}`}>{t('checkout.bmDesc')} &middot; {t('checkout.bmSave')}</p>
                <p className={`flex items-center gap-1 text-[10px] text-amber-600 mt-1 ${product !== 'bm' ? 'opacity-50' : ''}`}>
                  <Banknote size={10} />
                  {t('checkout.fpxPayment')}
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
                  <span className="text-sm font-bold">{t('checkout.enLabel')}</span>
                </div>
                <div className={`flex items-baseline gap-2 ${product !== 'en' ? 'opacity-50' : ''}`}>
                  <p className="text-lg font-black text-green">$27</p>
                  <p className="text-sm text-muted/40 line-through">$67</p>
                </div>
                <p className={`text-[10px] text-muted/60 mt-0.5 ${product !== 'en' ? 'opacity-50' : ''}`}>{t('checkout.enDesc')} &middot; {t('checkout.enSave')}</p>
                <p className={`flex items-center gap-1 text-[10px] text-muted/60 mt-1 ${product !== 'en' ? 'opacity-50' : ''}`}>
                  <Lock size={10} />
                  {t('checkout.creditCard')}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <div>
                      <label className="block text-xs text-muted font-semibold mb-1.5">{t('checkout.phone')}</label>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t('checkout.phonePlaceholder')}
                        required
                        className="w-full rounded-xl glass-input px-4 py-2.5 text-sm text-ink outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-muted/50">
                  <Mail size={12} />
                  {t('checkout.emailDelivery')}
                </div>
              </div>

              {product === 'bm' && (
                <div className="glass-card rounded-xl p-4 mb-4">
                  <label className="block text-xs text-muted font-semibold mb-1.5">{t('checkout.discountCode')}</label>
                  <div className="relative">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/60" />
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value);
                        setDiscountStatus('idle');
                        setAppliedDiscount(null);
                      }}
                      onBlur={() => validateDiscount(discountCode)}
                      placeholder={t('checkout.discountPlaceholder')}
                      className={`w-full rounded-xl glass-input pl-9 pr-4 py-2.5 text-sm text-ink outline-none transition-all uppercase ${
                        discountStatus === 'invalid'
                          ? 'border-rose/70 animate-discount-shake'
                          : discountStatus === 'valid'
                          ? 'border-green/70 animate-discount-pop'
                          : ''
                      }`}
                    />
                  </div>
                  {discountStatus === 'checking' && (
                    <p className="flex items-center gap-1.5 mt-2 text-xs text-muted">
                      <Loader size={13} className="animate-spin" />
                      {t('checkout.discountChecking')}
                    </p>
                  )}
                  {discountStatus === 'valid' && appliedDiscount && (
                    <p className="flex items-center gap-1.5 mt-2 text-xs text-green animate-fade-in">
                      <CheckCircle2 size={14} className="shrink-0" />
                      {t('checkout.discountValid', {
                        amount: `RM ${appliedDiscount.amount.toFixed(2)}`,
                        original: `RM ${appliedDiscount.original.toFixed(2)}`,
                      })}
                    </p>
                  )}
                  {discountStatus === 'invalid' && (
                    <p className="flex items-center gap-1.5 mt-2 text-xs text-rose animate-fade-in">
                      <XCircle size={14} className="shrink-0" />
                      {t('checkout.discountInvalid')}
                    </p>
                  )}
                  {discountStatus === 'idle' && (
                    <p className="text-xs text-muted/50 mt-2">{t('checkout.discountHint')}</p>
                  )}
                </div>
              )}

              {error && (
                <div className="glass rounded-xl p-4 mb-4 flex items-start gap-2 border border-rose/30">
                  <AlertTriangle size={16} className="text-rose shrink-0 mt-0.5" />
                  <p className="text-sm text-rose">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !name.trim() || !email.trim() || !phone.trim()}
                className="button-base button-primary gap-2 w-full justify-center shadow-lg shadow-green/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {product === 'bm' ? <Banknote size={18} /> : <Lock size={18} />}
                {loading ? t('checkout.processing') : t('checkout.payNow')}
              </button>
              <p className="text-xs text-muted/50 text-center mt-3">
                  {product === 'bm' ? t('checkout.payViaFpx') : t('checkout.secureNotice')}
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
                <p className="text-sm font-bold">{displayPrice}</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-muted/50 mb-4">
                <Download size={12} />
                {t('checkout.digitalItem')}
              </div>

              <div className="space-y-2 text-sm mb-4">
                {displayOriginal && (
                  <div className="flex justify-between text-muted line-through">
                    <span>{t('checkout.original')}</span>
                    <span>{displayOriginal}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted">
                  <span>{productLabel}</span>
                  <span>{displayPrice}</span>
                </div>
                {displayOriginal && (
                  <div className="flex justify-between text-rose font-semibold text-xs">
                    <span>{t('checkout.discount')}</span>
                    <span>{displaySave}</span>
                  </div>
                )}
                {selected.surcharge && !applied && (
                  <div className="flex justify-between text-muted text-xs pt-2 border-t border-white/10">
                    <span>{t('checkout.surcharge')}</span>
                    <span>{selected.surcharge}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="font-bold text-sm">{t('checkout.total')}</span>
                <span className="text-xl font-black text-green">{displayTotal}</span>
              </div>

              <div className="flex items-center gap-1.5 mt-4 text-xs text-muted/50 justify-center">
                {product === 'bm' ? <Banknote size={12} /> : <Lock size={12} />}
                  {product === 'bm' ? t('checkout.fpxPayment') : t('checkout.secureBadge')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

async function parseJsonSafe(response: Response): Promise<any> {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}
