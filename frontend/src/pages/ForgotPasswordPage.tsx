import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Key, Lock, Check, Send } from 'lucide-react';
import { sendForgotPasswordOtp, resetPassword } from '../api/client';
import { AuthCard, AuthBanner, AuthField, OtpInput } from '../components/AuthCard';

type Step = 'email' | 'reset';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await sendForgotPasswordOtp(email);
      setStep('reset');
      setMessage(t('auth.otpSent'));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await resetPassword(email, otpCode, newPassword);
      navigate('/login');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'reset') {
    return (
      <AuthCard
        icon={Key}
        title={t('auth.resetTitle')}
        subtitle={email}
        back={{ label: t('auth.back'), onClick: () => setStep('email') }}
      >
        {message && <AuthBanner tone="success">{message}</AuthBanner>}
        {error && <AuthBanner tone="error">{error}</AuthBanner>}

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <AuthField label={t('auth.otpCode')}>
            <OtpInput value={otpCode} onChange={setOtpCode} />
          </AuthField>

          <AuthField label={t('auth.newPassword')} icon={Lock}>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            {loading ? t('auth.resetting') : <><Check size={18} /> {t('auth.resetPassword')}</>}
          </button>
        </form>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      icon={Mail}
      title={t('auth.forgotTitle')}
      subtitle={t('auth.forgotSubtitle')}
      back={{ label: t('auth.backToLogin'), to: '/login' }}
      footer={
        <p className="mt-6 text-center text-sm text-muted">
          {t('auth.rememberPassword')}{' '}
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
