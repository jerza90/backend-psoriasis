import { BookOpen, Check, ArrowRight, Sparkles, Shield, AlertTriangle, Info, Star, FileText, Clock } from 'lucide-react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function EbookPage() {
  const { t } = useTranslation();

  const features = [
    t('ebook.features.items.0'),
    t('ebook.features.items.1'),
    t('ebook.features.items.2'),
    t('ebook.features.items.3'),
    t('ebook.features.items.4'),
    t('ebook.features.items.5'),
  ];

  const faqs = [
    { q: t('ebook.faq.items.0.q'), a: t('ebook.faq.items.0.a') },
    { q: t('ebook.faq.items.1.q'), a: t('ebook.faq.items.1.a') },
    { q: t('ebook.faq.items.2.q'), a: t('ebook.faq.items.2.a') },
    { q: t('ebook.faq.items.3.q'), a: t('ebook.faq.items.3.a') },
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

  return (
    <div className="min-h-screen">
      <Topbar />

      {/* Hero — full-width cover */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-green/10 via-leaf/10 to-transparent blur-3xl" />

        <div className="relative container-main pt-12 pb-8 md:pt-16 md:pb-12">
          <div className="max-w-[700px] mx-auto text-center animate-fade-up">
            <span className="inline-block px-3 py-1 rounded-full gradient-green text-xs font-bold text-white mb-4">
              {t('ebook.badge')}
            </span>
            <h1 className="clamp-heading-md mb-3">{t('ebook.heading')}</h1>
            <p className="text-muted text-lg leading-relaxed mb-6">
              {t('ebook.subtitle')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted mb-8">
              <span className="flex items-center gap-1.5">
                <FileText size={16} />
                {t('ebook.details.pages')}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} />
                {t('ebook.details.format')}
              </span>
            </div>
          </div>

          {/* Big cover image */}
          <div className="max-w-[500px] mx-auto animate-fade-up [animation-delay:0.15s]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green/20 via-ocean-teal/10 to-ocean-light/10 rounded-xl blur-2xl" />
              <img
                src="/e-book-landing-pages/default-ebook-page.jpg"
                alt="BebasPsoriasis - Panduan Sokongan Psoriasis"
                className="relative w-full rounded-xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
              />
              <div className="absolute -top-3 -right-3 z-10 bg-rose text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                -40%
              </div>
            </div>
          </div>

          {/* Price + CTA below cover */}
          <div className="max-w-[400px] mx-auto mt-8 animate-fade-up [animation-delay:0.2s]">
            <div className="relative overflow-hidden rounded-xl p-6 text-center">
              <div className="absolute inset-0 gradient-green" />
              <div className="absolute top-[-50%] right-[-30%] w-[70%] h-[70%] rounded-full bg-white/5 blur-3xl" />
              <div className="relative z-10">
                <p className="text-[rgba(255,255,255,0.7)] text-sm mb-1 line-through">{t('ebook.price.original')}</p>
                <div className="text-[42px] font-black text-white">{t('ebook.price.amount')}</div>
                <p className="text-[rgba(255,255,255,0.9)] text-sm font-semibold mb-3">{t('ebook.price.discount')}</p>
                <p className="text-[rgba(255,255,255,0.7)] text-xs mb-4">{t('ebook.price.note')}</p>
                <Link to="/checkout" className="button-base button-primary gap-2 w-full justify-center shadow-lg shadow-green/20">
                  <BookOpen size={18} />
                  {t('ebook.price.cta')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / What's inside */}
      <section className="section-top">
        <div className="container-main">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-8 animate-fade-up">
              <h2 className="clamp-heading-md">{t('ebook.features.title')}</h2>
            </div>
            <div className="glass rounded-xl p-7 md:p-9 animate-fade-up">
              <ul className="space-y-4">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm md:text-base">
                    <span className="w-6 h-6 rounded-full gradient-green flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-white" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Suitable for / Not suitable for */}
      <section className="section-top">
        <div className="container-main">
          <div className="max-w-[800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass rounded-xl p-7 animate-fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={18} className="text-green" />
                  <h3 className="font-bold text-lg">{t('landing.split.forYou.title')}</h3>
                </div>
                <ul className="space-y-3">
                  {forYou.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <span className="w-5 h-5 rounded-full bg-green/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-xl p-7 animate-fade-up [animation-delay:0.1s]">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle size={18} className="text-rose" />
                  <h3 className="font-bold text-lg">{t('landing.split.notFor.title')}</h3>
                </div>
                <ul className="space-y-3">
                  {notFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <span className="w-5 h-5 rounded-full bg-rose/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-top">
        <div className="container-main">
          <div className="max-w-[700px] mx-auto">
            <div className="glass rounded-xl p-7 md:p-9 animate-fade-up text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">A</div>
              <p className="text-muted text-base md:text-lg leading-relaxed italic mb-4">"{t('ebook.testimonial.text')}"</p>
              <p className="text-sm text-muted/60 font-semibold">— {t('ebook.testimonial.author')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-top">
        <div className="container-main">
          <div className="max-w-[700px] mx-auto">
            <div className="text-center mb-8 animate-fade-up">
              <h2 className="clamp-heading-md">{t('ebook.faq.title')}</h2>
            </div>
            <div className="space-y-3 animate-fade-up">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="glass rounded-xl p-5 group open:bg-white/50 transition-all cursor-pointer"
                >
                  <summary className="font-bold text-sm list-none flex items-center justify-between gap-3">
                    {faq.q}
                    <span className="text-muted text-lg transition-transform group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <p className="text-muted text-sm mt-3 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-top">
        <div className="container-main">
          <div className="max-w-[400px] mx-auto animate-fade-up text-center">
            <a href="#" className="button-base button-primary gap-2 w-full justify-center shadow-lg shadow-green/20 text-lg py-4">
              <BookOpen size={22} />
              {t('ebook.price.cta')} — {t('ebook.price.amount')}
              <ArrowRight size={22} />
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section-top border-b-0">
        <div className="container-main">
          <div className="glass rounded-xl p-6 max-w-[900px] mx-auto">
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
