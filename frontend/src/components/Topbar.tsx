import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Menu, X, LogIn, User, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';
import { useAuth } from '../hooks/useAuth';

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const navLinks = [
    { label: t('topbar.nav.tips'), href: '/tips' },
    { label: t('topbar.nav.story'), href: '/story/aisha' },
    { label: t('topbar.nav.checklist'), href: '/checklist' },
    { label: t('topbar.nav.products'), href: '/products' },
    { label: t('topbar.nav.faq'), href: '/faq' },
  ];

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ms' ? 'en' : 'ms');
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 glass-strong" />
      <div className="relative container-main flex items-center justify-between min-h-[64px] gap-4">
        <Link to="/" className="flex items-center gap-2.5 font-extrabold no-underline text-ink z-10">
          <span
            className="w-[34px] h-[34px] rounded-full border-2 border-white shadow-[0_2px_8px_rgba(23,33,28,0.12)]"
            style={{
              background: 'conic-gradient(from 40deg, var(--color-green), var(--color-leaf), var(--color-gold), var(--color-rose), var(--color-green))',
            }}
            aria-hidden="true"
          />
          <span className="text-sm">{t('common.brand')}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-muted text-sm" aria-label={t('topbar.toggleMenu')}>
          {navLinks.map((l) =>
            l.href.startsWith('/') ? (
              <Link
                key={l.href}
                to={l.href}
                className="no-underline px-3 py-2 rounded-lg hover:bg-white/50 hover:text-green transition-all"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="no-underline px-3 py-2 rounded-lg hover:bg-white/50 hover:text-green transition-all"
              >
                {l.label}
              </a>
            )
          )}

          <Link
            to="/checklist"
            className="button-base button-primary gap-2 text-sm"
          >
            <BookOpen size={16} />
            {t('topbar.cta')}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/50 transition-all"
              >
                <div className="w-7 h-7 rounded-full gradient-green flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-ink max-w-[100px] truncate">
                  {user.fullName || user.email}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/50 text-muted ml-1">
                  {i18n.language === 'ms' ? 'EN' : 'BM'}
                </span>
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl p-2 z-20 animate-fade-in">
                    <div className="px-3 py-2 text-sm text-muted border-b border-line mb-1">
                      {user.email}
                    </div>
                    <button
                      onClick={() => { toggleLanguage(); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-white/50 transition-all mb-1"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/50">
                        {i18n.language === 'ms' ? 'EN' : 'BM'}
                      </span>
                      {t('topbar.language')}
                    </button>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-rose rounded-lg hover:bg-rose/5 transition-all"
                    >
                      <LogOut size={16} />
                      {t('auth.logout')}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="button-base button-white gap-2 text-sm"
            >
              <LogIn size={16} />
              {t('auth.login')}
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/50 text-muted ml-1">
                {i18n.language === 'ms' ? 'EN' : 'BM'}
              </span>
            </Link>
          )}
        </nav>

        <div className="md:hidden flex items-center gap-2 z-10">
          {user ? (
            <div className="w-7 h-7 rounded-full gradient-green flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
          ) : (
            <Link to="/login" className="no-underline">
              <LogIn size={18} className="text-muted" />
            </Link>
          )}
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-white/30 hover:bg-white/50 transition-colors"
            aria-label={t('topbar.language')}
          >
            {i18n.language === 'ms' ? 'EN' : 'BM'}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/50 transition-colors"
            aria-label={t('topbar.toggleMenu')}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden animate-fade-in">
          <div className="absolute inset-x-0 top-full glass-strong border-t border-white/20">
            <nav className="container-main py-4 flex flex-col gap-1">
              {navLinks.map((l) =>
                l.href.startsWith('/') ? (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-3 rounded-lg hover:bg-white/50 transition-colors"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-3 rounded-lg hover:bg-white/50 transition-colors"
                  >
                    {l.label}
                  </a>
                )
              )}
              {user && (
                <button
                  onClick={() => { logout(); setOpen(false); }}
                  className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-rose/5 text-rose transition-colors"
                >
                  <LogOut size={16} />
                  {t('auth.logout')}
                </button>
              )}
              <Link
                to="/checklist"
                onClick={() => setOpen(false)}
                className="button-base button-primary gap-2 justify-center mt-2"
              >
                <BookOpen size={16} />
                {t('topbar.cta')}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
