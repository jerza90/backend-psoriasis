import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Download, BookOpen, Loader } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';

export default function ThankYouPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const billCode = searchParams.get('billcode');
  const statusId = searchParams.get('status_id');
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(!!sessionId || !!billCode);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    fetch(`/api/checkout/session/${sessionId}`)
      .then(res => res.json())
      .then(session => {
        if (!cancelled && session.payment_status === 'paid') setVerified(true);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => { cancelled = true; };
  }, [sessionId]);

  useEffect(() => {
    if (billCode && statusId === '1') {
      setVerified(true);
      setChecking(false);
    } else if (billCode) {
      setChecking(false);
    }
  }, [billCode, statusId]);

  const handleDownload = async () => {
    if (!sessionId || requesting) return;
    setRequesting(true);
    try {
      const res = await fetch(`/api/checkout/session/${sessionId}/request-download`, { method: 'POST' });
      const data = await res.json();
      if (data.downloadUrl) {
        window.location.href = data.downloadUrl;
      }
    } catch {
      // silent
    } finally {
      setRequesting(false);
    }
  };

  const nextSteps = [
    t('thankYou.nextSteps.items.0'),
    t('thankYou.nextSteps.items.1'),
    t('thankYou.nextSteps.items.2'),
    t('thankYou.nextSteps.items.3'),
  ];

  return (
    <div className="min-h-screen">
      <Topbar />

      <section className="container-main pt-20 pb-16">
        <div className="max-w-[560px] mx-auto">
          <div className="text-center animate-fade-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-green mb-6 shadow-lg shadow-green/20">
              <Check size={40} className="text-white" />
            </div>

            <h1 className="clamp-heading-md mb-3">
              {t('thankYou.heading')}
            </h1>
            <p className="text-muted text-lg mb-10 leading-relaxed">
              {t('thankYou.subtitle')}
            </p>

            {checking ? (
              <div className="mb-12 flex items-center justify-center gap-2 text-muted">
                <Loader size={18} className="animate-spin" />
                {t('thankYou.verifying')}
              </div>
            ) : verified && sessionId ? (
              <button
                onClick={handleDownload}
                disabled={requesting}
                className="button-base button-primary gap-2 text-lg mb-12 w-full sm:w-auto justify-center shadow-lg shadow-green/20"
              >
                {requesting ? (
                  <Loader size={20} className="animate-spin" />
                ) : (
                  <Download size={20} />
                )}
                {t('thankYou.downloadCta')}
              </button>
            ) : (
              <div className="glass-card rounded-xl p-6 mb-12 text-center">
                <p className="text-muted text-sm">{t('thankYou.emailNotice')}</p>
              </div>
            )}
          </div>

          <ScrollReveal delay={150}>
            <div className="glass-card rounded-xl p-7">
              <h2 className="font-bold text-xs text-muted uppercase tracking-widest mb-5">
                {t('thankYou.nextSteps.title')}
              </h2>
              <ol className="space-y-4">
                {nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                    <span className="w-7 h-7 rounded-full gradient-green flex items-center justify-center shrink-0 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8 animate-fade-up [animation-delay:0.2s]">
            <Link to="/products" className="button-base button-secondary gap-2">
              <BookOpen size={18} />
              {t('thankYou.secondaryCta.products')}
            </Link>
            <Link to="/checklist" className="button-base button-secondary gap-2">
              {t('thankYou.secondaryCta.checklist')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
