import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent, ComponentType } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Copy, ExternalLink, PencilLine, ShieldCheck, Sparkles, Users, Coins, Save } from 'lucide-react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Eyebrow from '../components/Eyebrow';
import { useAuth } from '../hooks/useAuth';
import {
  getAffiliateProfile,
  updateAffiliateProfile,
  type AffiliateProfile,
  type AffiliateProfileUpdateInput,
} from '../api/client';

const EMPTY_DRAFT: AffiliateProfileUpdateInput = {
  name: '',
  avatarUrl: '',
  bio: '',
  storyTitle: '',
  storySummary: '',
  storyBody: '',
  socialLinks: '',
  paymentInfo: '',
  pageTitle: '',
  pageIntro: '',
  blogTitle: '',
  blogExcerpt: '',
  blogUrl: '',
  blogImageUrl: '',
  tipsTitle: '',
  tipsText: '',
  guideTitle: '',
  guideText: '',
  progressTitle: '',
  progressText: '',
};

export default function AffiliateDashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<AffiliateProfile | null>(null);
  const [draft, setDraft] = useState<AffiliateProfileUpdateInput>(EMPTY_DRAFT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email || user.role !== 'affiliate') {
      setLoading(false);
      return;
    }
    setLoading(true);
    getAffiliateProfile(user.email)
      .then((data) => {
        setProfile(data);
        setDraft({
          name: data.name || '',
          avatarUrl: data.avatarUrl || '',
          bio: data.bio || '',
          pageTitle: data.pageTitle || '',
          pageIntro: data.pageIntro || '',
          storyTitle: data.storyTitle || '',
          storySummary: data.storySummary || '',
          storyBody: data.storyBody || '',
          socialLinks: data.socialLinks || '',
          paymentInfo: data.paymentInfo || '',
          blogTitle: data.blogTitle || '',
          blogExcerpt: data.blogExcerpt || '',
          blogUrl: data.blogUrl || '',
          blogImageUrl: data.blogImageUrl || '',
          tipsTitle: data.tipsTitle || '',
          tipsText: data.tipsText || '',
          guideTitle: data.guideTitle || '',
          guideText: data.guideText || '',
          progressTitle: data.progressTitle || '',
          progressText: data.progressText || '',
        });
      })
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'affiliate') {
    return <Navigate to="/" replace />;
  }

  const handleCopy = async () => {
    const shareLink = getShareLink(profile?.referralCode);
    if (!shareLink) return;
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleChange = (field: keyof AffiliateProfileUpdateInput) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDraft((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user.email) return;

    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const updated = await updateAffiliateProfile(user.email, draft);
      setProfile(updated);
      setMessage('Profile saved successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Topbar />

      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="relative container-main max-w-[1100px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
            <div className="glass-card rounded-2xl p-8 animate-fade-up">
              <Eyebrow icon={Sparkles} className="mb-3">Affiliate dashboard</Eyebrow>
              <h1 className="clamp-heading-md mb-3">
                Welcome back, {user.fullName || user.username}
              </h1>
              <p className="text-muted leading-relaxed max-w-[680px]">
                This is your affiliate hub. You can edit your public profile, tell your recovery story, and manage the public page that links to your ebook.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <InfoCard icon={Users} label="Role" value={user.role} />
                <InfoCard
                  icon={Coins}
                  label="Commission"
                  value={profile?.commissionRate ? `${Number(profile.commissionRate) * 100}%` : '50%'}
                />
                <InfoCard
                  icon={ShieldCheck}
                  label="Status"
                  value={profile?.status || 'active'}
                />
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <PencilLine size={16} className="text-green" />
                  <h2 className="text-xl font-bold text-ink">Edit profile and story</h2>
                </div>

                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Display name" value={draft.name || ''} onChange={handleChange('name')} />
                    <Field label="Avatar URL" value={draft.avatarUrl || ''} onChange={handleChange('avatarUrl')} />
                  </div>

                  <TextArea label="Bio" value={draft.bio || ''} onChange={handleChange('bio')} rows={4} />
                  <Field label="Public page title" value={draft.pageTitle || ''} onChange={handleChange('pageTitle')} />
                  <TextArea label="Public page intro" value={draft.pageIntro || ''} onChange={handleChange('pageIntro')} rows={3} />
                  <Field label="Social links" value={draft.socialLinks || ''} onChange={handleChange('socialLinks')} placeholder="Instagram, TikTok, WhatsApp, Telegram..." />
                  <TextArea label="Payment info" value={draft.paymentInfo || ''} onChange={handleChange('paymentInfo')} rows={3} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Story title" value={draft.storyTitle || ''} onChange={handleChange('storyTitle')} />
                    <Field label="Blog title" value={draft.blogTitle || ''} onChange={handleChange('blogTitle')} />
                  </div>

                  <TextArea label="Story summary" value={draft.storySummary || ''} onChange={handleChange('storySummary')} rows={4} />
                  <TextArea label="Story body" value={draft.storyBody || ''} onChange={handleChange('storyBody')} rows={7} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Tips title" value={draft.tipsTitle || ''} onChange={handleChange('tipsTitle')} />
                    <Field label="Guide title" value={draft.guideTitle || ''} onChange={handleChange('guideTitle')} />
                  </div>

                  <TextArea label="Tips text, one line per tip" value={draft.tipsText || ''} onChange={handleChange('tipsText')} rows={5} />
                  <TextArea label="Guide text" value={draft.guideText || ''} onChange={handleChange('guideText')} rows={6} />

                  <Field label="Progress title" value={draft.progressTitle || ''} onChange={handleChange('progressTitle')} />
                  <TextArea label="Progress updates, one line per update" value={draft.progressText || ''} onChange={handleChange('progressText')} rows={5} />

                  <TextArea label="Blog excerpt" value={draft.blogExcerpt || ''} onChange={handleChange('blogExcerpt')} rows={4} />
                  <Field label="Blog URL" value={draft.blogUrl || ''} onChange={handleChange('blogUrl')} placeholder="https://..." />
                  <Field label="Blog image URL" value={draft.blogImageUrl || ''} onChange={handleChange('blogImageUrl')} placeholder="https://..." />

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button type="submit" disabled={saving} className="button-base button-primary gap-2">
                      <Save size={16} />
                      {saving ? 'Saving...' : 'Save changes'}
                    </button>
                    {profile?.referralCode ? (
                      <Link
                        to={`/affiliate/${profile.referralCode}`}
                        target="_blank"
                        rel="noreferrer"
                        className="button-base button-secondary gap-2"
                      >
                        <ExternalLink size={16} />
                        Open public page
                      </Link>
                    ) : null}
                    {message ? <p className="text-sm text-green font-medium">{message}</p> : null}
                    {error ? <p className="text-sm text-red-600 font-medium">{error}</p> : null}
                  </div>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 animate-fade-up [animation-delay:0.08s]">
                <div className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Your ebook link</div>
                {loading ? (
                  <p className="text-muted">Loading profile...</p>
                ) : profile ? (
                  <>
                    <div className="rounded-xl bg-white/50 border border-white/10 p-4 break-all text-sm text-ink leading-relaxed">
                      {getShareLink(profile.referralCode)}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <button onClick={handleCopy} className="button-base button-primary gap-2">
                        <Copy size={16} />
                        {copied ? 'Copied' : 'Copy public page'}
                      </button>
                      <a href={getShareLink(profile.referralCode)} target="_blank" rel="noreferrer" className="button-base button-secondary gap-2">
                        <ExternalLink size={16} />
                        Open
                      </a>
                    </div>
                    <div className="mt-5 text-sm text-muted space-y-2">
                      <p><span className="font-semibold text-ink">Code:</span> {profile.referralCode}</p>
                      <p><span className="font-semibold text-ink">Earnings:</span> RM {profile.totalEarned}</p>
                      <p><span className="font-semibold text-ink">Paid:</span> RM {profile.totalPaid}</p>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted space-y-3">
                    <p>No affiliate profile found yet for this account.</p>
                    <p>If this is meant to be an affiliate, register the same email in the affiliate flow first.</p>
                  </div>
                )}
              </div>

              <div className="glass-card rounded-2xl p-6 animate-fade-up [animation-delay:0.12s]">
                <div className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Public preview</div>
                <div className="space-y-4 text-sm text-muted">
                  <PreviewBlock title={profile?.storyTitle || 'Your story title'} body={profile?.storySummary || 'Share the first result, the turning point, and what changed.'} />
                  <PreviewBlock title={profile?.blogTitle || 'Your blog title'} body={profile?.blogExcerpt || 'Use this space for a blog teaser that supports the ebook and trust-building journey.'} />
                  <PreviewBlock title={profile?.guideTitle || 'Your guide title'} body={profile?.guideText || 'Add the guide details readers should follow.'} />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/admin/testimonials" className="button-base button-secondary gap-2">
                  Manage testimonials
                </Link>
                <Link to="/" className="button-base button-secondary gap-2">
                  Back home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-widest text-muted">{label}</span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/60 px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-green/40"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  rows: number;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-widest text-muted">{label}</span>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full rounded-xl border border-white/10 bg-white/60 px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-green/40 resize-y"
      />
    </label>
  );
}

function PreviewBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-white/50 border border-white/10 p-4">
      <div className="font-semibold text-ink mb-1">{title}</div>
      <p>{body}</p>
    </div>
  );
}

function getShareLink(referralCode?: string | null) {
  if (!referralCode || typeof window === 'undefined') return '';
  return `${window.location.origin}/affiliate/${referralCode}`;
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ size?: number | string; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white/50 border border-white/10 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted mb-2">
        <Icon size={14} />
        {label}
      </div>
      <div className="font-bold text-lg text-ink capitalize">{value}</div>
    </div>
  );
}
