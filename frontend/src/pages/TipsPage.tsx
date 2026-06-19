import { useTranslation, Trans } from 'react-i18next';
import { BookOpen, Check, ArrowRight, Sparkles, Star, Heart, Clock, Gift, Images, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function TipsPage() {
  const { t } = useTranslation();

  const learnBullets = [
    t('tips.learn.items.0'),
    t('tips.learn.items.1'),
    t('tips.learn.items.2'),
    t('tips.learn.items.3'),
    t('tips.learn.items.4'),
    t('tips.learn.items.5'),
    t('tips.learn.items.6'),
  ];

  const bonuses = [
    {
      icon: Images,
      title: t('tips.bonuses.items.0.title'),
      desc: t('tips.bonuses.items.0.desc'),
    },
    {
      icon: Heart,
      title: t('tips.bonuses.items.1.title'),
      desc: t('tips.bonuses.items.1.desc'),
    },
    {
      icon: Brain,
      title: t('tips.bonuses.items.2.title'),
      desc: t('tips.bonuses.items.2.desc'),
    },
  ];

  const extraTips = [
    {
      id: 'free-checklist',
      title: t('tips.extraTips.0.title'),
      type: t('tips.extraTips.0.type'),
      icon: Star,
      gradient: 'gradient-green',
      desc: t('tips.extraTips.0.desc'),
      features: [
        t('tips.extraTips.0.features.0'),
        t('tips.extraTips.0.features.1'),
        t('tips.extraTips.0.features.2'),
        t('tips.extraTips.0.features.3'),
      ],
      cta: t('tips.extraTips.0.cta'),
      ctaHref: '/checklist',
    },
  ];

  return (
    <div className="min-h-screen">
      <Topbar />

      {/* Ebook Hero */}
      <section className="relative overflow-hidden pt-14 pb-8">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-green/8 via-leaf/5 to-transparent blur-3xl" />

        <div className="relative container-main max-w-[800px] mx-auto">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 text-green font-bold text-xs uppercase tracking-widest mb-4">
              <BookOpen size={14} />
              {t('tips.badge')}
            </div>

            <h1 className="clamp-heading-md mb-4">
              {t('tips.heading')}
            </h1>

            {/* Personal story */}
            <div className="glass rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-full gradient-green flex items-center justify-center shrink-0 mt-1">
                  <Heart size={20} className="text-white" />
                </span>
                <div>
                  <p className="text-sm text-muted leading-relaxed mb-3">
                    <Trans i18nKey="tips.story.p1" components={{ strong: <strong className="text-ink" /> }} />
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    <Trans i18nKey="tips.story.p2" components={{ strong: <strong className="text-ink" /> }} />
                  </p>
                </div>
              </div>
            </div>

            {/* Secret hacks */}
            <div className="relative overflow-hidden rounded-xl p-6 mb-6">
              <div className="absolute inset-0 gradient-green opacity-10" />
              <div className="relative flex items-start gap-3">
                <span className="w-10 h-10 rounded-full gradient-green flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-green/20">
                  <Sparkles size={20} className="text-white" />
                </span>
                <div>
                  <p className="text-base font-bold text-ink mb-1">
                    {t('tips.secretHacks')}
                  </p>
                </div>
              </div>
            </div>

            {/* What you'll learn */}
            <div className="glass rounded-xl p-6 mb-6">
              <h3 className="font-bold text-xs text-muted uppercase tracking-widest mb-4">{t('tips.learn.title')}</h3>
              <div className="space-y-3">
                {learnBullets.map((b) => (
                  <div key={b} className="flex items-start gap-3 text-sm text-muted">
                    <span className="w-5 h-5 rounded-full bg-green/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-green" />
                    </span>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Ebook previews */}
            <div className="mb-6">
              <h3 className="font-bold text-xs text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                <BookOpen size={14} />
                {t('tips.preview.title')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Cover 1 */}
                <div className="glass-card rounded-xl overflow-hidden group cursor-pointer">
                  <img
                    src="/e-book-landing-pages/default-ebook-page.jpg"
                    alt="BebasPsoriasis - Panduan Sokongan Psoriasis"
                    className="w-full aspect-[0.72] object-cover"
                  />
                </div>

                {/* Cover 2 — English version mock */}
                <div className="glass-card rounded-xl overflow-hidden group cursor-pointer">
                  <div
                    className="aspect-[0.72] p-5 flex flex-col justify-between relative"
                    style={{
                      background:
                        'linear-gradient(145deg, rgba(15,40,71,0.85), rgba(10,22,40,0.5)), radial-gradient(circle at 30% 20%, rgba(78,205,196,0.12) 0 16%, transparent 17%), radial-gradient(circle at 78% 76%, rgba(42,143,168,0.15) 0 18%, transparent 19%), #0f2847',
                    }}
                  >
                    <div className="text-green text-xs font-black uppercase tracking-wider">{t('tips.preview.enCover.brand')}</div>
                    <div className="text-xl leading-none font-black max-w-[160px] text-white">{t('tips.preview.enCover.title')}</div>
                    <div className="text-muted text-[10px] border-t border-white/10 pt-2">
                      {t('tips.preview.enCover.subtitle')}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl" />
                  </div>
                </div>

                {/* Cover 3 — inside pages spoiler */}
                <div className="glass-card rounded-xl overflow-hidden group cursor-pointer">
                  <div
                    className="aspect-[0.72] p-5 flex flex-col justify-between relative"
                    style={{
                      background:
                        'linear-gradient(145deg, rgba(255,248,240,0.95), rgba(255,255,255,0.6)), radial-gradient(circle at 50% 30%, #f7e8d8 0 20%, transparent 21%), #faf3eb',
                    }}
                  >
                    <div className="text-[10px] font-mono text-muted/60 leading-relaxed line-clamp-6">
                      <span className="font-bold text-ink text-xs block mb-1">{t('tips.preview.spoiler.label')}</span>
                      {t('tips.preview.spoiler.text')}
                    </div>
                    <div className="text-muted text-[10px] border-t border-[rgba(26,46,58,0.1)] pt-2 flex items-center justify-between">
                      <span>{t('tips.preview.spoiler.footer')}</span>
                      <span className="text-green">{t('tips.preview.spoiler.peek')}</span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Spoiler section — sample pages */}
            <details className="group mb-6">
              <summary className="glass-card rounded-xl p-4 cursor-pointer list-none hover:bg-white/30 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-rose/20 flex items-center justify-center">
                    <Images size={18} className="text-rose" />
                  </span>
                  <div>
                    <span className="font-bold text-sm">{t('tips.spoiler.title')}</span>
                    <p className="text-xs text-muted">{t('tips.spoiler.subtitle')}</p>
                  </div>
                </div>
                <span className="text-muted transition-transform group-open:rotate-180">▾</span>
              </summary>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-up">
                {/* Sample page 1 */}
                <div className="glass rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono bg-green/20 text-green px-2 py-0.5 rounded">{t('tips.spoiler.pages.0.label')}</span>
                    <span className="text-xs text-muted">{t('tips.spoiler.pages.0.tag')}</span>
                  </div>
                  <div className="text-xs text-muted leading-relaxed space-y-2 font-mono">
                    <p className="font-bold text-ink text-sm">{t('tips.spoiler.pages.0.title')}</p>
                    <p>{t('tips.spoiler.pages.0.items.0')}</p>
                    <p>{t('tips.spoiler.pages.0.items.1')}</p>
                    <p>{t('tips.spoiler.pages.0.items.2')}</p>
                    <p>{t('tips.spoiler.pages.0.items.3')}</p>
                    <p>{t('tips.spoiler.pages.0.items.4')}</p>
                    <p className="text-green text-[10px] mt-2">{t('tips.spoiler.pages.0.tip')}</p>
                  </div>
                </div>

                {/* Sample page 2 */}
                <div className="glass rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono bg-gold/20 text-gold px-2 py-0.5 rounded">{t('tips.spoiler.pages.1.label')}</span>
                    <span className="text-xs text-muted">{t('tips.spoiler.pages.1.tag')}</span>
                  </div>
                  <div className="text-xs text-muted leading-relaxed space-y-2 font-mono">
                    <p className="font-bold text-ink text-sm">{t('tips.spoiler.pages.1.title')}</p>
                    <p>{t('tips.spoiler.pages.1.items.0')}</p>
                    <p>{t('tips.spoiler.pages.1.items.1')}</p>
                    <p>{t('tips.spoiler.pages.1.items.2')}</p>
                    <p>{t('tips.spoiler.pages.1.items.3')}</p>
                    <p className="text-green text-[10px] mt-2">{t('tips.spoiler.pages.1.tip')}</p>
                  </div>
                </div>

                {/* Sample page 3 */}
                <div className="glass rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono bg-rose/20 text-rose px-2 py-0.5 rounded">{t('tips.spoiler.pages.2.label')}</span>
                    <span className="text-xs text-muted">{t('tips.spoiler.pages.2.tag')}</span>
                  </div>
                  <div className="text-xs text-muted leading-relaxed space-y-2 font-mono">
                    <p className="font-bold text-ink text-sm">{t('tips.spoiler.pages.2.title')}</p>
                    <p>{t('tips.spoiler.pages.2.items.0')}</p>
                    <p>{t('tips.spoiler.pages.2.items.1')}</p>
                    <p>{t('tips.spoiler.pages.2.items.2')}</p>
                    <p>{t('tips.spoiler.pages.2.items.3')}</p>
                    <p>{t('tips.spoiler.pages.2.items.4')}</p>
                    <p className="text-green text-[10px] mt-2">{t('tips.spoiler.pages.2.tip')}</p>
                  </div>
                </div>

                {/* Sample page 4 */}
                <div className="glass rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono bg-green/20 text-green px-2 py-0.5 rounded">{t('tips.spoiler.pages.3.label')}</span>
                    <span className="text-xs text-muted">{t('tips.spoiler.pages.3.tag')}</span>
                  </div>
                  <div className="text-xs text-muted leading-relaxed space-y-2 font-mono">
                    <p className="font-bold text-ink text-sm">{t('tips.spoiler.pages.3.title')}</p>
                    <p>{t('tips.spoiler.pages.3.items.0')}</p>
                    <p>{t('tips.spoiler.pages.3.items.1')}</p>
                    <p>{t('tips.spoiler.pages.3.items.2')}</p>
                    <p>{t('tips.spoiler.pages.3.items.3')}</p>
                    <p className="text-green text-[10px] mt-2">{t('tips.spoiler.pages.3.tip')}</p>
                  </div>
                </div>
              </div>
            </details>

            {/* Bonuses */}
            <div className="glass rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Gift size={18} className="text-rose" />
                <h3 className="font-bold text-sm text-ink">{t('tips.bonuses.title')}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {bonuses.map((b) => {
                  const BIcon = b.icon;
                  return (
                    <div key={b.title} className="glass rounded-xl p-4">
                      <BIcon size={20} className="text-green mb-2" />
                      <h4 className="font-bold text-sm mb-1">{b.title}</h4>
                      <p className="text-xs text-muted leading-relaxed">{b.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price */}
            <div className="relative overflow-hidden rounded-xl p-7 mb-6 text-center">
              <div className="absolute inset-0 gradient-green" />
              <div className="absolute top-[-50%] right-[-30%] w-[60%] h-[60%] rounded-full bg-white/5 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-[rgba(255,255,255,0.5)] text-2xl line-through decoration-2">{t('tips.pricing.originalPrice')}</span>
                  <span className="text-5xl font-black text-white">{t('tips.pricing.discountedPrice')}</span>
                  <span className="text-[rgba(255,255,255,0.8)] text-lg">{t('tips.pricing.currency')}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-4">
                  <Clock size={12} />
                  {t('tips.pricing.badge')}
                </div>
                <p className="text-[rgba(255,255,255,0.85)] text-sm mb-5 max-w-[500px] mx-auto leading-relaxed">
                  {t('tips.pricing.desc')}
                </p>
                <Link
                  to="/checkout"
                  className="button-base button-primary gap-2 shadow-lg shadow-green/20"
                >
                  <BookOpen size={20} />
                  {t('tips.pricing.cta')}
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* Emotional closing */}
            <div className="glass rounded-xl p-6 text-center mb-8">
              <p className="text-sm text-muted leading-relaxed italic">
                {t('tips.closing')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Resources */}
      <section className="section-top">
        <div className="container-main max-w-[800px] mx-auto">
          <div className="text-center mb-8 animate-fade-up">
            <h2 className="font-bold text-sm text-muted uppercase tracking-widest">
              {t('tips.moreResources')}
            </h2>
          </div>

          <div className="space-y-4">
            {extraTips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div
                  key={tip.id}
                  className="glass-card rounded-xl p-5 animate-fade-up"
                  style={{ animationDelay: `${0.08 * i}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${tip.gradient} flex items-center justify-center shrink-0`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold">{tip.title}</h3>
                      </div>
                      <span className="text-xs text-muted block mb-1">{tip.type}</span>
                      <p className="text-sm text-muted leading-relaxed mb-3">{tip.desc}</p>
                      <Link
                        to={tip.ctaHref}
                        className="button-base button-primary gap-2 text-sm shadow-lg shadow-green/20"
                      >
                        {tip.cta}
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section-top border-b-0">
        <div className="container-main">
          <div className="glass rounded-xl p-5 max-w-[800px] mx-auto">
            <p className="text-muted text-xs leading-relaxed">
              {t('landing.disclaimer')}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
