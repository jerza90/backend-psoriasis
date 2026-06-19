import { useTranslation } from 'react-i18next';
import { BookOpen, ArrowLeft, Sparkles, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

const images = [
  'e-book-promo-cover-ipad-promo.jpg',
  'e-book-promo-discount-code.jpg',
  'e-book-promo-free-resipe.jpg',
  'e-book-reader-success-story-.jpg',
  'e-book-reader-success-story-2.jpg',
  'e-book-reader-success-story-3.jpg',
  'e-book-reader-success-story-4.jpg',
  'e-book-reader-success-story-5.jpg',
  'e-book-reader-success-story-6.jpg',
  'E-book-udpate.jpg',
  'rawat_pso1.jpg',
  'rawat_pso3.jpg',
  'rawat_pso4.jpg',
  'rawat_pso5.jpg',
  'rawat_pso6.jpg',
  'rawat_pso9.jpg',
];

export default function EbookGalleryPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Topbar />

      <section className="container-main pt-16 pb-12">
        <div className="max-w-[900px] mx-auto">
          <Link
            to="/tips"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green mb-6 transition-all"
          >
            <ArrowLeft size={16} />
            {t('tips.gallery.backToTips')}
          </Link>

          <div className="text-center mb-10 animate-fade-up">
            <div className="inline-flex items-center gap-2 text-green font-bold text-xs uppercase tracking-widest mb-3">
              <Sparkles size={14} />
              {t('tips.gallery.title')}
            </div>
            <h1 className="clamp-heading-md mb-3">{t('tips.gallery.title')}</h1>
            <p className="text-muted text-lg max-w-[600px] mx-auto leading-relaxed">
              {t('tips.gallery.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((src) => (
              <div key={src} className="glass-card rounded-xl overflow-hidden group">
                <img
                  src={`/e-book-landing-pages/${src}`}
                  alt={src}
                  className="w-full aspect-[0.72] object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden rounded-xl p-8 mt-12 text-center">
            <div className="absolute inset-0 gradient-green" />
            <div className="absolute top-[-50%] right-[-20%] w-[50%] h-[50%] rounded-full bg-white/5 blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-4">
                <ShoppingCart size={26} className="text-white" />
              </div>
              <h2 className="text-2xl font-black text-white mb-3">{t('tips.pricing.cta')}</h2>
              <p className="text-[rgba(255,255,255,0.85)] text-sm mb-5 max-w-[500px] mx-auto leading-relaxed">
                {t('tips.pricing.desc')}
              </p>
              <Link
                to="/checkout"
                className="button-base button-primary gap-2 shadow-lg shadow-green/20"
              >
                <BookOpen size={20} />
                {t('tips.gallery.cta')}
                <ShoppingCart size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
