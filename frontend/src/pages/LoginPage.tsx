import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { AuthCard, AuthBanner, AuthField } from '../components/AuthCard';

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
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin/testimonials');
      } else if (user.role === 'affiliate') {
        navigate('/affiliate/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      icon={LogIn}
      title={t('auth.loginTitle')}
      subtitle={t('auth.loginSubtitle')}
      back={{ label: t('auth.backToHome'), to: '/' }}
      footer={
        <div className="mt-6 flex flex-col items-center gap-2 text-sm text-muted">
          <Link to="/register" className="hover:text-green no-underline">
            {t('auth.noAccount')}
          </Link>
          <Link to="/forgot-password" className="hover:text-green no-underline">
            {t('auth.forgotPassword')}
          </Link>
        </div>
      }
    >
      {error && <AuthBanner tone="error">{error}</AuthBanner>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthField label="Email or username" icon={Mail}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="aishaaffiliate or aishaaffiliate@example.com"
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm outline-none transition-all"
          />
        </AuthField>

        <AuthField label={t('auth.password')} icon={Lock}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.passwordPlaceholder')}
            required
            minLength={8}
            className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm outline-none transition-all"
          />
        </AuthField>

        <button
          type="submit"
          disabled={loading}
          className="button-base button-primary w-full mt-2 gap-2"
        >
          {loading ? t('auth.loggingIn') : t('auth.login')}
        </button>
      </form>
      <p className="mt-4 text-xs text-muted">
        Affiliate users can log in with either their username or email.
      </p>
    </AuthCard>
  );
}
