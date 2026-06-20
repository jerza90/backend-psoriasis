import { useState, type FormEvent } from 'react';
import { Download, Check, Mail, User as UserIcon, ArrowRight, Sparkles } from 'lucide-react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { registerUser } from '../api/client';
import { useTranslation, Trans } from 'react-i18next';

export default function ChecklistPage() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const supportAreas = [
    t('checklist.areas.items.0'),
    t('checklist.areas.items.1'),
    t('checklist.areas.items.2'),
    t('checklist.areas.items.3'),
    t('checklist.areas.items.4'),
    t('checklist.areas.items.5'),
    t('checklist.areas.items.6'),
  ];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser({
        username: email.split('@')[0] + Date.now(),
        email,
        passwordHash: 'checklist-download',
        fullName: name,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('checklist.form.error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Topbar />

      <section className="container-main pt-16 pb-12">
        <div className="max-w-[560px] mx-auto">
          <div className="text-center mb-10 animate-fade-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-green mb-5 shadow-lg shadow-green/20">
              <Download size={30} className="text-white" />
            </div>
            <h1 className="clamp-heading-md mb-3">
              {t('checklist.heading')}
            </h1>
            <p className="text-muted text-lg max-w-[500px] mx-auto leading-relaxed">
              {t('checklist.subtitle')}
            </p>
          </div>

          {!submitted ? (
            <div className="animate-fade-up [animation-delay:0.1s]">
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="font-bold text-xs text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sparkles size={14} />
                  {t('checklist.areas.title')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {supportAreas.map((area) => (
                    <div key={area} className="flex items-center gap-2.5 text-sm">
                      <span className="w-5 h-5 rounded-full gradient-green flex items-center justify-center shrink-0">
                        <Check size={12} className="text-white" />
                      </span>
                      {area}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="glass-card rounded-xl p-7">
                <h2 className="font-bold text-xs text-muted uppercase tracking-widest mb-5">
                  {t('checklist.form.title')}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="sr-only">{t('checklist.form.namePlaceholder')}</label>
                    <div className="relative">
                      <UserIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder={t('checklist.form.namePlaceholder')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">{t('checklist.form.emailPlaceholder')}</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder={t('checklist.form.emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm outline-none transition-all"
                      />
                    </div>
                  </div>
                  {error && (
                    <p className="text-rose text-sm">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="button-base button-primary w-full justify-center gap-2 shadow-lg shadow-green/20"
                  >
                    {loading ? t('checklist.form.sending') : t('checklist.form.submit')}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                  <p className="text-xs text-muted text-center">
                    {t('checklist.form.noSpam')}
                  </p>
                </div>
              </form>

              <div className="mt-8 text-center animate-fade-up">
                <p className="text-muted text-sm mb-4">
                  {t('checklist.softCta.text')}
                </p>
                <a href="/#buy" className="button-base button-primary gap-2 text-sm shadow-lg shadow-green/20">
                  {t('checklist.softCta.button')}
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-10 text-center animate-scale-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-green mb-5 shadow-lg shadow-green/20">
                <Check size={36} className="text-white" />
              </div>
              <h2 className="text-2xl font-black mb-2">{t('checklist.success.heading')}</h2>
              <p className="text-muted mb-8 leading-relaxed">
                <Trans i18nKey="checklist.success.text" values={{ email }} components={{ strong: <strong className="text-ink" /> }} />
              </p>
              <Link to="/" className="button-base button-secondary gap-2">
                {t('checklist.success.back')}
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
