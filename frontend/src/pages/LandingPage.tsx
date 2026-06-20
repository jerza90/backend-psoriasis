import { useTranslation } from 'react-i18next';
import { ArrowRight, Download, BookOpen, Sparkles, Heart } from 'lucide-react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import TestimonialCarousel from '../components/TestimonialCarousel';
import Eyebrow from '../components/Eyebrow';
import ScrollReveal from '../components/ScrollReveal';
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
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-green/5 via-leaf/5 to-transparent blur-3xl animate-float-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-rose/5 via-gold/5 to-transparent blur-3xl animate-float-slower" />

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
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green/20 via-ocean-teal/10 to-ocean-light/10 rounded-xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <img
                  src="/e-book-landing-pages/default-ebook-page.jpg"
                  alt="BebasPsoriasis - Panduan Sokongan Psoriasis"
                  className="relative w-full rounded-xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:-translate-y-1"
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
          <div className="text-center mb-10">
            <ScrollReveal>
              <Eyebrow icon={Sparkles} className="mb-3">{t('landing.learn.badge')}</Eyebrow>
              <h2 className="clamp-heading-md">{t('landing.learn.heading')}</h2>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gridItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={100 * i}>
                <article className="glass-card glass-card-hover rounded-xl overflow-hidden h-full">
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={i === 0 ? '/phase-recovery/phase-1.png' : i === 1 ? '/phase-recovery/phase-2.jpg' : '/phase-recovery/phase-3.JPG'}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <strong className="text-base block leading-snug">{item.title}</strong>
                    <p className="m-0 text-muted text-sm leading-relaxed text-pretty">{item.desc}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote + Before / After */}
      <section className="section-top">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.5fr] gap-10 items-center max-w-[1000px] mx-auto">
            {/* Quote */}
            <ScrollReveal>
              <blockquote>
                <div className="text-5xl font-black text-green/20 leading-none mb-3">&ldquo;</div>
                <p className="text-xl md:text-2xl font-bold leading-snug text-ink">
                  {t('landing.quote.text')}
                </p>
                <footer className="mt-3 text-sm text-muted">
                  &mdash; {t('landing.quote.author')}
                </footer>
              </blockquote>
            </ScrollReveal>

            {/* Before / After panels */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScrollReveal className="rounded-xl overflow-hidden relative group">
                <div className="aspect-[4/5] relative">
                  <img
                    src="/block-quote/before_psoriasis_May_2021.png"
                    alt="Before psoriasis healing - May 2021"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-3 left-3 glass rounded-lg px-2.5 py-1 text-xs font-semibold text-muted">
                  {t('landing.beforeAfter.dateBefore')}
                </div>
                <div className="bg-rose/10 p-2.5 text-center">
                  <span className="font-bold text-sm text-rose">{t('landing.beforeAfter.before')}</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150} className="rounded-xl overflow-hidden relative group">
                <div className="aspect-[4/5] relative">
                  <img
                    src="/block-quote/after_psoriasis_May_2026.png"
                    alt="After psoriasis healing - May 2026"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-3 left-3 glass rounded-lg px-2.5 py-1 text-xs font-semibold text-muted">
                  {t('landing.beforeAfter.dateAfter')}
                </div>
                <div className="bg-green/10 p-2.5 text-center">
                  <span className="font-bold text-sm text-green">{t('landing.beforeAfter.after')}</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Success Stories */}
      <section className="section-top" id="testimonials">
        <div className="container-main">
          <div className="text-center mb-10">
            <ScrollReveal>
              <Eyebrow icon={Heart} className="mb-3">{t('landing.testimonials.badge')}</Eyebrow>
              <h2 className="clamp-heading-md">{t('landing.testimonials.heading')}</h2>
              <p className="text-muted text-lg max-w-[600px] mx-auto mt-3 leading-relaxed">
                {t('landing.testimonials.subtitle')}
              </p>
            </ScrollReveal>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Ebook teaser - Peek inside the book */}
      <section className="section-top overflow-hidden">
        <div className="container-main">
          <div className="text-center mb-6">
            <ScrollReveal>
              <Eyebrow icon={BookOpen} className="mb-2">{t('landing.ebookTeaser.badge')}</Eyebrow>
              <h2 className="clamp-heading-md">{t('landing.ebookTeaser.heading')}</h2>
            </ScrollReveal>
          </div>

          {/* Book spread */}
          <ScrollReveal className="max-w-[800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] rounded-xl overflow-hidden shadow-[0_8px_24px_-8px_rgba(0,0,0,0.2)] border border-white/10">
              {/* Left page - Ebook cover */}
              <div className="relative bg-gradient-to-br from-amber-50 to-amber-100/80 flex items-center justify-center p-0 min-h-[260px] overflow-hidden">
                <img
                  src="/e-book-landing-pages/e-book-reader-success-story-6.jpg"
                  alt="BebasPsoriasis Ebook"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 to-transparent" />
                <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 w-5 h-10 rounded-l-full bg-gradient-to-l from-amber-50/0 to-amber-50 hidden md:block" />
              </div>

              {/* Right page - Table of contents */}
              <div className="relative bg-gradient-to-br from-amber-50 to-amber-100/90 p-6 md:p-7 flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-800/30 font-semibold mb-4">
                  Contents
                </span>
                <div className="space-y-3">
                  {(t('landing.ebookTeaser.toc', { returnObjects: true }) as { chapter: string; page: string }[]).map((item, i) => (
                    <div key={item.chapter} className="flex items-start gap-3 group cursor-default">
                      <span className="text-xs font-mono text-green/50 w-5 shrink-0 mt-0.5 font-semibold">{String(i + 1).padStart(2, '0')}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-sm md:text-base text-amber-950/90 font-medium leading-snug group-hover:text-green transition-colors">
                            {item.chapter}
                          </span>
                          <span className="text-[10px] font-mono text-amber-800/25 shrink-0">{item.page}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-4 right-5 text-[10px] text-amber-800/15 font-mono">62 pages</div>

                {/* Binding effect */}
                <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-5 h-10 rounded-r-full bg-gradient-to-r from-amber-50/0 to-amber-50 hidden md:block" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="text-center mt-5" delay={100}>
            <Link to="/checkout" className="button-base button-primary gap-2 shadow-lg shadow-green/20 text-base px-8 py-3">
              <BookOpen size={18} />
              {t('landing.ebookTeaser.cta')}
              <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Split panel */}
      <section className="section-top" id="fit">
        <div className="container-main">
          <div className="text-center mb-8">
            <ScrollReveal>
              <h2 className="clamp-heading-md">{t('landing.split.heading')}</h2>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[800px] mx-auto">
            {/* For you — motivational */}
            <ScrollReveal>
              <div className="relative rounded-xl p-7 h-full bg-gradient-to-br from-rose/10 via-gold/10 to-rose/5 border border-rose/10 overflow-hidden">
                <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-rose/5 blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold/10 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-9 h-9 rounded-full bg-rose/15 flex items-center justify-center">
                      <span className="text-lg">🔥</span>
                    </span>
                    <h3 className="font-bold text-lg text-ink">{t('landing.split.forYou.title')}</h3>
                  </div>
                  <ul className="space-y-3">
                    {forYou.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted text-sm">
                        <span className="w-5 h-5 rounded-full bg-rose/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            {/* Not for you — tough love */}
            <ScrollReveal delay={100}>
              <div className="relative rounded-xl p-7 h-full bg-gradient-to-br from-ink/5 via-muted/5 to-ink/5 border border-line/50 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose/5 blur-3xl" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] rounded-full bg-rose/5 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-9 h-9 rounded-full bg-rose/10 flex items-center justify-center border border-rose/10">
                      <span className="text-rose font-bold text-sm">✕</span>
                    </span>
                    <h3 className="font-bold text-lg text-ink">{t('landing.split.notFor.title')}</h3>
                  </div>
                  <ul className="space-y-3">
                    {notFor.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted text-sm">
                        <span className="w-5 h-5 rounded-full bg-rose/5 flex items-center justify-center shrink-0 mt-0.5 border border-rose/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose/40" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-4 border-t border-line">
                    <p className="text-[11px] text-muted/50 uppercase tracking-wider text-center">Only for the brave</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Free recipe promo */}
      <section className="section-top" id="buy">
        <div className="container-main">
          <ScrollReveal className="max-w-[800px] mx-auto">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr]">
                {/* Image side */}
                <div className="relative min-h-[260px] md:min-h-full overflow-hidden bg-green/5">
                  <img
                    src="/e-book-landing-pages/e-book-promo-free-resipe.jpg"
                    alt="Daily meal plan during healing"
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                {/* Text side */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <span className="text-xs font-bold text-green uppercase tracking-[0.15em] mb-1">Free</span>
                  <h2 className="text-xl md:text-2xl font-black leading-snug text-ink mb-2">
                    {t('landing.price.heading')}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {t('landing.price.subtitle')}
                  </p>
                  <Link
                    to="/checkout"
                    className="button-base button-primary gap-2 shadow-lg shadow-green/20 self-start"
                  >
                    <BookOpen size={16} />
                    {t('landing.price.cta')}
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick actions + Disclaimer */}
      <section className="section-top border-b-0">
        <div className="container-main">
          <ScrollReveal>
            <div className="glass-card rounded-xl p-6 max-w-[800px] mx-auto text-center">
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
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
