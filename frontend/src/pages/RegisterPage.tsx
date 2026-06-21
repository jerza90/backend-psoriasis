import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Key, User, Lock, Check, Send } from 'lucide-react';
import { sendRegistrationOtp, verifyRegistration } from '../api/client';
import { useAuth } from '../hooks/useAuth';
import { AuthCard, AuthBanner, AuthField, OtpInput } from '../components/AuthCard';

type Step = 'email' | 'verify';

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await sendRegistrationOtp(email);
      setStep('verify');
      setMessage(t('auth.otpSent'));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await verifyRegistration(email, otpCode, password, fullName, username || undefined);
      const nextUser = {
        id: result.userId,
        email,
        fullName,
        username: username || email.split('@')[0],
        role: result.role,
      };
      setUser(nextUser);
      navigate(nextUser.role === 'affiliate' ? '/affiliate/dashboard' : '/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'verify') {
    return (
      <AuthCard
        icon={Key}
        title={t('auth.verifyTitle')}
        subtitle={email}
        back={{ label: t('auth.back'), onClick: () => setStep('email') }}
      >
        {message && <AuthBanner tone="success">{message}</AuthBanner>}
        {error && <AuthBanner tone="error">{error}</AuthBanner>}

        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <AuthField label={t('auth.otpCode')}>
            <OtpInput value={otpCode} onChange={setOtpCode} />
          </AuthField>

          <AuthField label={t('auth.fullName')} icon={User}>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t('auth.fullNamePlaceholder')}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm outline-none transition-all"
            />
          </AuthField>

          <AuthField label={<>{t('auth.username')} <span className="text-muted font-normal">({t('auth.optional')})</span></>} icon={User}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={email.split('@')[0]}
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
            {loading ? t('auth.creating') : <><Check size={18} /> {t('auth.createAccount')}</>}
          </button>
        </form>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      icon={Mail}
      title={t('auth.registerTitle')}
      subtitle={t('auth.registerSubtitle')}
      back={{ label: t('auth.backToLogin'), to: '/login' }}
      footer={
        <p className="mt-6 text-center text-sm text-muted">
          {t('auth.haveAccount')}{' '}
          <Link to="/login" className="text-green hover:underline no-underline">{t('auth.login')}</Link>
        </p>
      }
    >
      {error && <AuthBanner tone="error">{error}</AuthBanner>}

      <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
        <AuthField label={t('auth.email')} icon={Mail}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.emailPlaceholder')}
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm outline-none transition-all"
          />
        </AuthField>

        <button
          type="submit"
          disabled={loading}
          className="button-base button-primary w-full mt-2 gap-2"
        >
          {loading ? t('auth.sending') : <><Send size={18} /> {t('auth.sendOtp')}</>}
        </button>
      </form>
    </AuthCard>
  );
}
