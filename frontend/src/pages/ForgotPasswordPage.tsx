import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Key, Lock, ArrowLeft, Check, Send } from 'lucide-react';
import { sendForgotPasswordOtp, resetPassword } from '../api/client';

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
    } catch (err: any) {
      setError(err.message);
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'reset') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm glass-card rounded-2xl p-8 animate-fade-up">
          <button onClick={() => setStep('email')} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green mb-6">
            <ArrowLeft size={16} /> {t('auth.back')}
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center">
              <Key size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold">{t('auth.resetTitle')}</h1>
              <p className="text-sm text-muted">{email}</p>
            </div>
          </div>

          {message && (
            <div className="mb-4 p-3 rounded-xl bg-leaf/10 border border-leaf/20 text-sm text-green">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose/10 border border-rose/20 text-sm text-rose">
              {error}
            </div>
          )}

          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-semibold mb-1.5 block">{t('auth.otpCode')}</label>
              <input
                type="text"
                value={otpCode}
                onChange={e => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                required
                maxLength={6}
                className="w-full px-4 py-3 rounded-xl glass-input text-sm text-center text-2xl tracking-[0.5em] font-bold outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block">{t('auth.newPassword')}</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
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
              {loading ? t('auth.resetting') : <><Check size={18} /> {t('auth.resetPassword')}</>}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm glass-card rounded-2xl p-8 animate-fade-up">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green no-underline mb-6">
          <ArrowLeft size={16} />
          {t('auth.backToLogin')}
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center">
            <Mail size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">{t('auth.forgotTitle')}</h1>
            <p className="text-sm text-muted">{t('auth.forgotSubtitle')}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose/10 border border-rose/20 text-sm text-rose">
            {error}
          </div>
        )}

        <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
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

          <button
            type="submit"
            disabled={loading}
            className="button-base button-primary w-full mt-2 gap-2"
          >
            {loading ? t('auth.sending') : <><Send size={18} /> {t('auth.sendOtp')}</>}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {t('auth.rememberPassword')}{' '}
          <Link to="/login" className="text-green hover:underline no-underline">{t('auth.login')}</Link>
        </p>
      </div>
    </div>
  );
}
