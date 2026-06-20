import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative border-t border-[rgba(23,33,28,0.08)] bg-gradient-subtle">
      <div className="container-main py-6">
        <div className="flex flex-col items-center gap-4">
          <Link to="/" className="flex items-center justify-center gap-2 font-bold no-underline text-ink">
            <span
              className="w-5 h-5 rounded-full border-2 border-white shadow-[0_2px_8px_rgba(23,33,28,0.1)]"
              style={{
                background: 'conic-gradient(from 40deg, var(--color-green), var(--color-leaf), var(--color-gold), var(--color-rose), var(--color-green))',
              }}
              aria-hidden="true"
            />
            <span className="text-[10px]">{t('common.brand')}</span>
          </Link>
          <p className="text-muted text-[10px] leading-relaxed max-w-[400px] text-center">
            {t('footer.tagline')}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-[10px] text-muted">
            <Link to="/blog" className="hover:text-green transition-colors">{t('footer.education.blog')}</Link>
            <Link to="/checklist" className="hover:text-green transition-colors">{t('footer.education.checklist')}</Link>
            <Link to="/faq" className="hover:text-green transition-colors">{t('footer.education.faq')}</Link>
            <Link to="/tips" className="hover:text-green transition-colors">{t('footer.products.tips')}</Link>
            <Link to="/products" className="hover:text-green transition-colors">{t('footer.products.productSupport')}</Link>
          </div>
          <div className="border-t border-[rgba(23,33,28,0.06)] pt-3 w-full text-center">
            <p className="text-[10px] text-muted/60">
              {t('footer.copyright', { year: new Date().getFullYear() })} &middot; {t('footer.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
