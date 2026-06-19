import { useTranslation } from 'react-i18next';
import { ArrowRight, Download, Shield, BookOpen, Sparkles, Heart } from 'lucide-react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const { t } = useTranslation();

  const gridItems = [
    { title: t('landing.learn.items.0.title'), desc: t('landing.learn.items.0.desc') },
    { title: t('landing.learn.items.1.title'), desc: t('landing.learn.items.1.desc') },
    { title: t('landing.learn.items.2.title'), desc: t('landing.learn.items.2.desc') },
  ];

  const forYou = [
    t('landing.split.forYou.items.0'),
    t('landing.split.forYou.items.1'),
    t('landing.split.forYou.items.2'),
    t('landing.split.forYou.items.3'),
  ];

  const notFor = [
    t('landing.split.notFor.items.0'),
    t('landing.split.notFor.items.1'),
    t('landing.split.notFor.items.2'),
    t('landing.split.notFor.items.3'),
  ];

  const heroTags = [
    t('landing.hero.tags.0'),
    t('landing.hero.tags.1'),
    t('landing.hero.tags.2'),
  ];

  return (
    <div className="min-h-screen">
      <Topbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-16 md:pb-20">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-green/5 via-leaf/5 to-transparent blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-rose/5 via-gold/5 to-transparent blur-3xl" />

        <div className="relative container-main">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 text-green font-bold text-xs uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-rose shadow-[0_0_6px_rgba(199,109,100,0.5)]" />
                {t('landing.hero.badge')}
              </div>
              <h1 className="clamp-heading mt-0 mb-4 max-w-[760px]">
                {t('landing.hero.heading')}
              </h1>
              <p className="text-muted text-lg leading-relaxed max-w-[600px]">
                {t('landing.hero.subheading')}
              </p>
              <div className="flex flex-wrap gap-2 mt-8">
                {heroTags.map((tag) => (
                  <span
                    key={tag}
                    className="glass rounded-full px-3 py-1.5 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Cover mockup */}
            <div className="justify-self-center w-full max-w-[340px] animate-fade-up [animation-delay:0.15s]">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green/20 via-ocean-teal/10 to-ocean-light/10 rounded-xl blur-2xl" />
                <img
                  src="/e-book-landing-pages/default-ebook-page.jpg"
                  alt="BebasPsoriasis - Panduan Sokongan Psoriasis"
                  className="relative w-full rounded-xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <Link to="/checkout" className="button-base button-primary gap-2 shadow-lg shadow-green/20">
                  {t('landing.hero.ctaPrimary')}
                  <ArrowRight size={18} />
                </Link>
                <Link to="/tips/ebook" className="button-base button-secondary gap-2">
                  {t('landing.hero.ctaSecondary')}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What the ebook helps with */}
      <section className="section-top" id="inside">
        <div className="container-main">
          <div className="text-center mb-10 animate-fade-up">
            <div className="inline-flex items-center gap-2 text-green font-bold text-xs uppercase tracking-widest mb-3">
              <Sparkles size={14} />
              {t('landing.learn.badge')}
            </div>
            <h2 className="clamp-heading-md">{t('landing.learn.heading')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gridItems.map((item, i) => (
              <article
                key={item.title}
                className="glass-card glass-card-hover rounded-xl animate-fade-up overflow-hidden"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://picsum.photos/seed/${i + 1}/800/600)`,
                  }}
                />
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full gradient-green flex items-center justify-center shrink-0">
                      <Heart size={16} className="text-white" />
                    </div>
                    <strong className="text-base">{item.title}</strong>
                  </div>
                  <p className="m-0 text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quote + Before / After */}
      <section className="section-top">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.5fr] gap-10 items-center max-w-[1000px] mx-auto">
            {/* Quote */}
            <blockquote className="animate-fade-up">
              <div className="text-5xl font-black text-green/20 leading-none mb-3">&ldquo;</div>
              <p className="text-xl md:text-2xl font-bold leading-snug text-ink">
                {t('landing.quote.text')}
              </p>
              <footer className="mt-3 text-sm text-muted">
                &mdash; {t('landing.quote.author')}
              </footer>
            </blockquote>

            {/* Before / After images */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden relative group animate-drop-in">
                <div className="overflow-hidden">
                  <img
                    src="https://picsum.photos/seed/before/800/600"
                    alt="Before"
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute top-3 left-3 glass rounded-lg px-2.5 py-1 text-xs font-semibold text-muted">
                  {t('landing.beforeAfter.dateBefore')}
                </div>
                <div className="bg-rose/10 p-2.5 text-center">
                  <span className="font-bold text-sm text-rose">{t('landing.beforeAfter.before')}</span>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden relative group animate-drop-in [animation-delay:0.25s]">
                <div className="overflow-hidden">
                  <img
                    src="https://picsum.photos/seed/after/800/600"
                    alt="After"
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute top-3 left-3 glass rounded-lg px-2.5 py-1 text-xs font-semibold text-muted">
                  {t('landing.beforeAfter.dateAfter')}
                </div>
                <div className="bg-green/10 p-2.5 text-center">
                  <span className="font-bold text-sm text-green">{t('landing.beforeAfter.after')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Success Stories */}
      <section className="section-top" id="testimonials">
        <div className="container-main">
          <div className="text-center mb-10 animate-fade-up">
            <div className="inline-flex items-center gap-2 text-green font-bold text-xs uppercase tracking-widest mb-3">
              <Heart size={14} />
              {t('landing.testimonials.badge')}
            </div>
            <h2 className="clamp-heading-md">{t('landing.testimonials.heading')}</h2>
            <p className="text-muted text-lg max-w-[600px] mx-auto mt-3 leading-relaxed">
              {t('landing.testimonials.subtitle')}
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Split panel */}
      <section className="section-top" id="fit">
        <div className="container-main">
          <div className="text-center mb-10 animate-fade-up">
            <h2 className="clamp-heading-md">{t('landing.split.heading')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass rounded-xl p-7 animate-fade-up">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full gradient-green flex items-center justify-center">
                  <Shield size={16} className="text-white" />
                </span>
                <h3 className="font-bold text-lg">{t('landing.split.forYou.title')}</h3>
              </div>
              <ul className="space-y-2.5">
                {forYou.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-muted text-sm">
                    <span className="w-5 h-5 rounded-full bg-green/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-xl p-7 animate-fade-up [animation-delay:0.1s]">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full gradient-warm flex items-center justify-center">
                  <span className="text-white font-bold text-sm">!</span>
                </span>
                <h3 className="font-bold text-lg">{t('landing.split.notFor.title')}</h3>
              </div>
              <ul className="space-y-2.5">
                {notFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-muted text-sm">
                    <span className="w-5 h-5 rounded-full bg-rose/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Price band */}
      <section className="relative overflow-hidden py-16 my-8" id="buy">
        <div className="absolute inset-0 gradient-green" />
        <div className="absolute top-[-30%] right-[-20%] w-[60%] h-[60%] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-20%] w-[60%] h-[60%] rounded-full bg-white/5 blur-3xl" />

        <div className="relative container-main">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="animate-fade-up">
              <h2 className="text-[clamp(28px,4.5vw,44px)] font-black leading-[1] text-white mb-3">
                {t('landing.price.heading')}
              </h2>
              <p className="text-[rgba(255,255,255,0.8)] text-lg">
                {t('landing.price.subtitle')}
              </p>
            </div>
            <div className="text-left md:text-right animate-fade-up [animation-delay:0.1s]">
              <div className="text-[42px] font-black text-white">{t('landing.price.amount')}</div>
              <Link
                to="/checkout"
                className="button-base button-primary gap-2 shadow-lg shadow-green/20"
              >
                <BookOpen size={18} />
                {t('landing.price.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick actions + Disclaimer */}
      <section className="section-top border-b-0">
        <div className="container-main">
          <div className="glass rounded-xl p-6 max-w-[600px] mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <Link to="/products" className="button-base button-primary gap-2 shadow-lg shadow-green/20 text-sm">
                <BookOpen size={16} />
                {t('landing.productsCta.cta')}
              </Link>
              <Link to="/checklist" className="button-base button-secondary gap-2 text-sm">
                <Download size={16} />
                {t('landing.checklistCta.cta')}
              </Link>
            </div>
            <p className="text-muted text-xs leading-relaxed opacity-70">
              {t('landing.disclaimer')}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
