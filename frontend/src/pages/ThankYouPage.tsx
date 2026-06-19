import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Download, BookOpen, Loader } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function ThankYouPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout/session/${sessionId}`)
        .then(res => res.json())
        .then(session => {
          if (session.payment_status === 'paid') setVerified(true);
        })
        .catch(() => {})
        .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, [sessionId]);

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
            ) : verified ? (
              <a
                href={`/api/checkout/session/${sessionId}/download`}
                className="button-base button-primary gap-2 text-lg mb-12 w-full sm:w-auto justify-center shadow-lg shadow-green/20"
              >
                <Download size={20} />
                {t('thankYou.downloadCta')}
              </a>
            ) : (
              <p className="text-muted/60 text-sm mb-12">{t('thankYou.emailNotice')}</p>
            )}
          </div>

          <div className="glass rounded-xl p-7 animate-fade-up [animation-delay:0.15s]">
            <h2 className="font-bold text-xs text-muted uppercase tracking-widest mb-4">
              {t('thankYou.nextSteps.title')}
            </h2>
            <ol className="space-y-3 text-sm text-muted list-decimal list-inside">
              <li className="leading-relaxed">{t('thankYou.nextSteps.items.0')}</li>
              <li className="leading-relaxed">{t('thankYou.nextSteps.items.1')}</li>
              <li className="leading-relaxed">{t('thankYou.nextSteps.items.2')}</li>
              <li className="leading-relaxed">{t('thankYou.nextSteps.items.3')}</li>
            </ol>
          </div>

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
