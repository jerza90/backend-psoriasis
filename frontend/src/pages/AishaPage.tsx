import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, MapPin, Calendar, Tag, Lightbulb, Quote, Sparkles, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTestimonials } from '../data/testimonials';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Eyebrow from '../components/Eyebrow';

export default function AishaPage() {
  const { t, i18n } = useTranslation();
  const aisha = getTestimonials(i18n.language).find((x) => x.id === 't1')!;

  return (
    <div className="min-h-screen">
      <Topbar />

      {/* Back link */}
      <section className="pt-24 pb-0">
        <div className="container-main">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green transition-colors">
            <ArrowLeft size={16} />
            {t('aisha.back')}
          </Link>
        </div>
      </section>

      {/* Profile header */}
      <section className="pt-8 pb-12">
        <div className="container-main">
          <div className="glass-card rounded-2xl p-8 md:p-10 max-w-[800px] mx-auto animate-fade-up">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={aisha.avatar}
                alt={aisha.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-white/40 shadow-lg shrink-0"
              />
              <div className="text-center md:text-left flex-1">
                <Eyebrow icon={Sparkles} className="mb-2">{t('aisha.badge')}</Eyebrow>
                <h1 className="text-3xl md:text-4xl font-black leading-tight mb-2">{aisha.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-muted mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {aisha.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {aisha.age} {t('aisha.yearsOld')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {aisha.conditionDuration}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs font-semibold text-green">
                  <Heart size={12} />
                  {aisha.category}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote + Summary */}
      <section className="pb-12">
        <div className="container-main max-w-[800px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up [animation-delay:0.1s]">
            <div className="glass rounded-xl p-5">
              <Quote size={16} className="text-rose mb-2" />
              <p className="text-sm text-muted italic leading-relaxed">"{aisha.initialQuote}"</p>
              <p className="text-xs text-muted/60 mt-1.5">{t('aisha.beforeQuote')}</p>
            </div>
            <div className="glass rounded-xl p-5">
              <Quote size={16} className="text-green mb-2" />
              <p className="text-sm text-muted italic leading-relaxed">"{aisha.resultQuote}"</p>
              <p className="text-xs text-muted/60 mt-1.5">{t('aisha.afterQuote')}</p>
            </div>
          </div>
          <div className="glass-card rounded-xl p-5 mt-4 animate-fade-up [animation-delay:0.15s]">
            <div className="flex items-center gap-2 text-green font-bold text-xs uppercase tracking-widest mb-3">
              <Award size={14} />
              {t('aisha.summary')}
            </div>
            <p className="text-sm text-muted leading-relaxed">{aisha.summary}</p>
          </div>
        </div>
      </section>

      {/* Progress Journey */}
      <section className="pb-16">
        <div className="container-main max-w-[800px]">
          <div className="text-center mb-8 animate-fade-up">
            <h2 className="clamp-heading-md">{t('aisha.journey')}</h2>
            <p className="text-muted text-lg max-w-[500px] mx-auto mt-2 leading-relaxed">
              {t('aisha.journeySub')}
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-[rgba(42,157,143,0.2)] -translate-x-1/2 hidden md:block" />

            {aisha.progressHistory.map((entry, i) => (
              <div key={entry.id} className="relative mb-8 animate-fade-up" style={{ animationDelay: `${0.1 * i}s` }}>
                <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 items-start">
                  {/* Timeline dot (desktop) */}
                  <div className="hidden md:flex justify-end items-center">
                    {i % 2 === 0 && (
                      <div className="text-right">
                        <span className="text-xs font-bold text-green bg-green/10 px-2.5 py-1 rounded-full">
                          {entry.date}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="hidden md:flex flex-col items-center relative">
                    <div className="w-10 h-10 rounded-full gradient-green flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-green/20 z-10">
                      {i + 1}
                    </div>
                  </div>

                  <div className="hidden md:flex items-center">
                    {i % 2 !== 0 && (
                      <div>
                        <span className="text-xs font-bold text-green bg-green/10 px-2.5 py-1 rounded-full">
                          {entry.date}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card */}
                  <div className="md:col-start-auto glass-card rounded-xl overflow-hidden">
                    {/* Date badge mobile */}
                    <div className="md:hidden flex items-center gap-2 px-5 pt-4 pb-0">
                      <div className="w-7 h-7 rounded-full gradient-green flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-xs font-bold text-green">{entry.date}</span>
                    </div>

                    {/* Images */}
                    {entry.images && entry.images.length > 0 && (
                      <div className={`grid ${entry.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-1 px-1 pt-1`}>
                        {entry.images.map((img, j) => (
                          <img
                            key={j}
                            src={img}
                            alt={`${entry.title} - ${j + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    <div className="p-5">
                      <h3 className="font-bold text-base mb-1">{entry.title}</h3>
                      <p className="text-sm text-muted leading-relaxed mb-3">{entry.description}</p>

                      {/* Notes */}
                      <div className="glass rounded-lg p-3 mb-3">
                        <p className="text-xs text-muted/80 leading-relaxed">
                          <span className="font-semibold text-muted">{t('aisha.note')} </span>
                          {entry.notes}
                        </p>
                      </div>

                      {/* Product tags */}
                      {entry.productTags && entry.productTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {entry.productTags.map((tag) => (
                            <span
                              key={tag.name}
                              className="inline-flex items-center gap-1 glass rounded-full px-2.5 py-1 text-xs text-green font-semibold"
                            >
                              <Tag size={10} />
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Tips */}
                      <details className="group">
                        <summary className="flex items-center gap-1.5 text-xs text-green font-semibold cursor-pointer hover:gap-2 transition-all list-none">
                          <Lightbulb size={14} />
                          {t('aisha.tips', { count: entry.tips.length })}
                          <span className="ml-auto text-muted transition-transform group-open:rotate-180 text-xs">▾</span>
                        </summary>
                        <div className="mt-2 space-y-1.5">
                          {entry.tips.map((tip, j) => (
                            <div key={j} className="flex items-start gap-2 text-xs text-muted">
                              <span className="w-4 h-4 rounded-full bg-green/20 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="w-1 h-1 rounded-full bg-green" />
                              </span>
                              {tip}
                            </div>
                          ))}
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-14">
        <div className="absolute inset-0 gradient-green" />
        <div className="absolute top-[-30%] right-[-20%] w-[60%] h-[60%] rounded-full bg-white/5 blur-3xl animate-float-slow" />
        <div className="relative container-main text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">{t('aisha.ctaHeading')}</h2>
          <p className="text-[rgba(255,255,255,0.85)] text-lg mb-6 max-w-[500px] mx-auto">{t('aisha.ctaSub')}</p>
          <Link to="/checkout" className="button-base button-white gap-2 shadow-lg shadow-black/20">
            <Heart size={18} />
            {t('aisha.cta')}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
