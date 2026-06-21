import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, ArrowLeft, Sparkles, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Eyebrow from '../components/Eyebrow';
import ScrollReveal from '../components/ScrollReveal';
import Lightbox from '../components/Lightbox';

const images: { src: string; alt: string }[] = [
  { src: 'e-book-promo-cover-ipad-promo.jpg', alt: 'Psoriasis ebook cover — iPad promo' },
  { src: 'e-book-promo-discount-code.jpg', alt: 'Ebook discount code promotion' },
  { src: 'e-book-promo-free-resipe.jpg', alt: 'Free recipe bonus inside the ebook' },
  { src: 'e-book-reader-success-story-.jpg', alt: 'Reader success story — journey part 1' },
  { src: 'e-book-reader-success-story-2.jpg', alt: 'Reader success story — part 2' },
  { src: 'e-book-reader-success-story-3.jpg', alt: 'Reader success story — part 3' },
  { src: 'e-book-reader-success-story-4.jpg', alt: 'Reader success story — part 4' },
  { src: 'e-book-reader-success-story-5.jpg', alt: 'Reader success story — part 5' },
  { src: 'e-book-reader-success-story-6.png', alt: 'Reader success story — part 6' },
  { src: 'E-book-udpate.jpg', alt: 'Ebook latest update announcement' },
  { src: 'rawat_pso1.jpg', alt: 'Psoriasis treatment support — tip 1' },
  { src: 'rawat_pso3.jpg', alt: 'Psoriasis treatment support — tip 3' },
  { src: 'rawat_pso4.jpg', alt: 'Psoriasis treatment support — tip 4' },
  { src: 'rawat_pso5.jpg', alt: 'Psoriasis treatment support — tip 5' },
  { src: 'rawat_pso6.jpg', alt: 'Psoriasis treatment support — tip 6' },
  { src: 'rawat_pso9.jpg', alt: 'Psoriasis treatment support — tip 9' },
];

export default function EbookGalleryPage() {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const navigate = (next: number) => setLightboxIndex(next);

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

          <div className="text-center mb-10">
            <ScrollReveal>
              <Eyebrow icon={Sparkles} className="mb-3">{t('tips.gallery.title')}</Eyebrow>
              <h1 className="clamp-heading-md mb-3">{t('tips.gallery.heading') || t('tips.gallery.title')}</h1>
              <p className="text-muted text-lg max-w-[600px] mx-auto leading-relaxed">
                {t('tips.gallery.subtitle')}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <ScrollReveal key={img.src} delay={40 * i}>
                <div
                  className="glass-card glass-card-hover rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(i); }}
                >
                  <img
                    src={`/e-book-landing-pages/${img.src}`}
                    alt={img.alt}
                    className="w-full aspect-[0.72] object-cover"
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal className="mt-12">
            <div className="relative overflow-hidden rounded-xl p-8 text-center">
              <div className="absolute inset-0 gradient-green" />
              <div className="absolute top-[-50%] right-[-20%] w-[50%] h-[50%] rounded-full bg-white/5 blur-3xl animate-float-slow" />
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
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images.map((img) => ({ src: `/e-book-landing-pages/${img.src}`, alt: img.alt }))}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigate}
        />
      )}
    </div>
  );
}
