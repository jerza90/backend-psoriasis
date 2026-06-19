import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm glass-card rounded-2xl p-8 animate-fade-up">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green no-underline mb-6">
          <ArrowLeft size={16} />
          {t('auth.backToHome')}
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center">
            <LogIn size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">{t('auth.loginTitle')}</h1>
            <p className="text-sm text-muted">{t('auth.loginSubtitle')}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose/10 border border-rose/20 text-sm text-rose">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">{t('auth.email')}</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('auth.emailPlaceholder')}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-1.5 block">{t('auth.password')}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('auth.passwordPlaceholder')}
                required
                minLength={8}
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="button-base button-primary w-full mt-2 gap-2"
          >
            {loading ? t('auth.loggingIn') : t('auth.login')}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-2 text-sm text-muted">
          <Link to="/register" className="hover:text-green no-underline">
            {t('auth.noAccount')}
          </Link>
          <Link to="/forgot-password" className="hover:text-green no-underline">
            {t('auth.forgotPassword')}
          </Link>
        </div>
      </div>
    </div>
  );
}
