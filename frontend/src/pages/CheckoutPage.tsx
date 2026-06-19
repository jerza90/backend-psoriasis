import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Lock, BookOpen, ArrowLeft, CreditCard, Mail, Download, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function CheckoutPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name, email }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Checkout failed');
      }

      const data = await res.json();
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Topbar />

      <section className="container-main pt-12 pb-16">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green transition-colors mb-8">
          <ArrowLeft size={16} />
          {t('checkout.backToHome')}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-10 items-start max-w-[1000px] mx-auto">
          {/* Customer form */}
          <div className="animate-fade-up">
            <h1 className="text-2xl md:text-3xl font-black mb-2">{t('checkout.heading')}</h1>
            <p className="text-muted text-sm mb-8">{t('checkout.subtitle')}</p>

            {/* Digital product notice */}
            <div className="glass rounded-xl p-4 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center shrink-0">
                <Download size={18} className="text-green" />
              </div>
              <div>
                <p className="text-sm font-semibold">{t('checkout.digitalNotice')}</p>
                <p className="text-xs text-muted/60">{t('checkout.digitalDesc')}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="glass rounded-xl p-6 mb-4">
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
                      className="w-full rounded-xl bg-white/50 border border-white/20 px-4 py-2.5 text-sm text-ink placeholder-muted/50 outline-none focus:border-green/50 focus:bg-white/80 transition-all"
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
                      className="w-full rounded-xl bg-white/50 border border-white/20 px-4 py-2.5 text-sm text-ink placeholder-muted/50 outline-none focus:border-green/50 focus:bg-white/80 transition-all"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-muted/50">
                  <Mail size={12} />
                  {t('checkout.emailDelivery')}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="glass rounded-xl p-4 mb-4 flex items-start gap-2 border border-rose/30">
                  <AlertTriangle size={16} className="text-rose shrink-0 mt-0.5" />
                  <p className="text-sm text-rose">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !name.trim() || !email.trim()}
                className="button-base button-primary gap-2 w-full justify-center shadow-lg shadow-green/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Lock size={18} />
                {loading ? t('checkout.processing') : t('checkout.payNow')}
              </button>
              <p className="text-xs text-muted/50 text-center mt-3">{t('checkout.secureNotice')}</p>
            </form>
          </div>

          {/* Order summary */}
          <div className="animate-fade-up [animation-delay:0.1s]">
            <div className="glass rounded-xl p-6 sticky top-24">
              <h2 className="font-bold text-sm text-muted uppercase tracking-widest mb-4">{t('checkout.orderSummary')}</h2>

              <div className="flex items-start gap-3 pb-4 mb-4 border-b border-white/10">
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                  <img
                    src="/e-book-landing-pages/default-ebook-page.jpg"
                    alt="Ebook cover"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{t('ebook.heading')}</p>
                  <p className="text-xs text-muted/60">{t('ebook.details.pages')}</p>
                </div>
                <p className="text-sm font-bold">{t('ebook.price.amount')}</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-muted/50 mb-4">
                <Download size={12} />
                {t('checkout.digitalItem')}
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-muted">
                  <span>{t('ebook.price.amount')}</span>
                  <span>{t('ebook.price.amount')}</span>
                </div>
                <div className="flex justify-between text-muted line-through">
                  <span>{t('checkout.original')}</span>
                  <span>{t('ebook.price.original')}</span>
                </div>
                <div className="flex justify-between text-rose font-semibold">
                  <span>{t('checkout.discount')}</span>
                  <span>-40%</span>
                </div>
                <div className="flex justify-between text-muted text-xs pt-2 border-t border-white/10">
                  <span>{t('checkout.surcharge')} <span className="text-muted/50">(3% + RM2)</span></span>
                  <span>RM 2.90</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="font-bold text-sm">{t('checkout.total')}</span>
                <span className="text-xl font-black text-green">RM 29.90</span>
              </div>

              <div className="flex items-center gap-1.5 mt-4 text-xs text-muted/50 justify-center">
                <Lock size={12} />
                {t('checkout.secureBadge')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
