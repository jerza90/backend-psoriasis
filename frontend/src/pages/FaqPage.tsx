import { Sparkles } from 'lucide-react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

export default function FaqPage() {
  const { t } = useTranslation();

  const faqGroups = [
    {
      category: t('faq.groups.0.category'),
      items: [
        { q: t('faq.groups.0.items.0.q'), a: t('faq.groups.0.items.0.a') },
        { q: t('faq.groups.0.items.1.q'), a: t('faq.groups.0.items.1.a') },
        { q: t('faq.groups.0.items.2.q'), a: t('faq.groups.0.items.2.a') },
      ],
    },
    {
      category: t('faq.groups.1.category'),
      items: [
        { q: t('faq.groups.1.items.0.q'), a: t('faq.groups.1.items.0.a') },
        { q: t('faq.groups.1.items.1.q'), a: t('faq.groups.1.items.1.a') },
        { q: t('faq.groups.1.items.2.q'), a: t('faq.groups.1.items.2.a') },
      ],
    },
    {
      category: t('faq.groups.2.category'),
      items: [
        { q: t('faq.groups.2.items.0.q'), a: t('faq.groups.2.items.0.a') },
        { q: t('faq.groups.2.items.1.q'), a: t('faq.groups.2.items.1.a') },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Topbar />

      <section className="container-main pt-16 pb-12">
        <div className="max-w-[680px] mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <div className="inline-flex items-center gap-2 text-green font-bold text-xs uppercase tracking-widest mb-3">
              <Sparkles size={14} />
              {t('faq.badge')}
            </div>
            <h1 className="clamp-heading-md mb-3">
              {t('faq.heading')}
            </h1>
            <p className="text-muted text-lg max-w-[500px] mx-auto leading-relaxed">
              {t('faq.subtitle')}
            </p>
          </div>

          {faqGroups.map((group, gi) => (
            <div key={group.category} className="mb-10 animate-fade-up" style={{ animationDelay: `${0.1 * gi}s` }}>
              <h2 className="font-bold text-xs text-muted uppercase tracking-widest mb-4">
                {group.category}
              </h2>
              <div className="space-y-3">
                {group.items.map((faq) => (
                  <details
                    key={faq.q}
                    className="glass rounded-xl p-5 group open:bg-white/70 transition-all cursor-pointer"
                  >
                    <summary className="font-bold text-sm list-none flex items-center justify-between gap-3">
                      {faq.q}
                      <span className="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center text-muted transition-transform group-open:rotate-45 shrink-0">
                        +
                      </span>
                    </summary>
                    <p className="text-muted text-sm mt-3 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
