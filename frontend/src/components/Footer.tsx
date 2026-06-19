import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[rgba(23,33,28,0.08)] bg-gradient-subtle">
      <div className="container-main py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="animate-fade-up col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold no-underline text-ink mb-2">
              <span
                className="w-6 h-6 rounded-full border-2 border-white shadow-[0_2px_8px_rgba(23,33,28,0.1)]"
                style={{
                  background: 'conic-gradient(from 40deg, var(--color-green), var(--color-leaf), var(--color-gold), var(--color-rose), var(--color-green))',
                }}
                aria-hidden="true"
              />
              <span className="text-xs">{t('common.brand')}</span>
            </Link>
            <p className="text-muted text-xs leading-relaxed max-w-[200px]">
              {t('footer.tagline')}
            </p>
          </div>
          <div className="animate-fade-up [animation-delay:0.1s]">
            <h4 className="font-bold text-[10px] text-muted uppercase tracking-widest mb-2">{t('footer.education.title')}</h4>
            <ul className="space-y-1.5 text-xs text-muted">
              <li><Link to="/blog" className="hover:text-green transition-colors">{t('footer.education.blog')}</Link></li>
              <li><Link to="/checklist" className="hover:text-green transition-colors">{t('footer.education.checklist')}</Link></li>
              <li><Link to="/faq" className="hover:text-green transition-colors">{t('footer.education.faq')}</Link></li>
            </ul>
          </div>
          <div className="animate-fade-up [animation-delay:0.2s]">
            <h4 className="font-bold text-[10px] text-muted uppercase tracking-widest mb-2">{t('footer.products.title')}</h4>
            <ul className="space-y-1.5 text-xs text-muted">
              <li><Link to="/tips" className="hover:text-green transition-colors">{t('footer.products.tips')}</Link></li>
              <li><Link to="/products" className="hover:text-green transition-colors">{t('footer.products.productSupport')}</Link></li>
            </ul>
            <h4 className="font-bold text-[10px] text-muted uppercase tracking-widest mt-4 mb-2">{t('footer.legal.title')}</h4>
            <ul className="space-y-1.5 text-xs text-muted">
              <li>{t('footer.legal.notMedical')}</li>
              <li>{t('footer.legal.affiliate')}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[rgba(23,33,28,0.06)] pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-muted">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="text-[10px] text-muted/60">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
