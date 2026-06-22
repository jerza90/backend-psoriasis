import { useEffect, useState, useRef } from 'react';
import type { ChangeEvent, FormEvent, ComponentType } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Copy, ExternalLink, PencilLine, ShieldCheck, Sparkles, Users, Coins, Save, Plus, Trash2, Upload } from 'lucide-react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Eyebrow from '../components/Eyebrow';
import { useAuth } from '../hooks/useAuth';
import {
  getAffiliateProfile,
  updateAffiliateProfile,
  uploadImage,
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
  progressImages: '[]',
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
  const [progressItems, setProgressItems] = useState<{ text: string; imageUrl: string }[]>([]);

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
          progressImages: data.progressImages || '[]',
        });
        const lines = (data.progressText || '').split('\n').map(l => l.trim()).filter(Boolean);
        const images: string[] = JSON.parse(data.progressImages || '[]');
        setProgressItems(lines.map((text, i) => ({ text, imageUrl: images[i] || '' })));
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

    const textLines = progressItems.map(p => p.text);
    const imageUrls = progressItems.map(p => p.imageUrl);

    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const updated = await updateAffiliateProfile(user.email, {
        ...draft,
        progressText: textLines.join('\n'),
        progressImages: JSON.stringify(imageUrls),
      });
      setProfile(updated);
      const lines = (updated.progressText || '').split('\n').map(l => l.trim()).filter(Boolean);
      const images: string[] = JSON.parse(updated.progressImages || '[]');
      setProgressItems(lines.map((text, i) => ({ text, imageUrl: images[i] || '' })));
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
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted">Progress updates</span>
                      <button
                        type="button"
                        onClick={() => setProgressItems(p => [...p, { text: '', imageUrl: '' }])}
                        className="text-xs text-green font-semibold flex items-center gap-1 hover:underline"
                      >
                        <Plus size={14} />
                        Add update
                      </button>
                    </div>
                    {progressItems.map((item, idx) => (
                      <ProgressItem
                        key={idx}
                        text={item.text}
                        imageUrl={item.imageUrl}
                        onTextChange={(val) => {
                          setProgressItems(p => p.map((pi, i) => i === idx ? { ...pi, text: val } : pi))
                        }}
                        onImageUpload={async (file) => {
                          try {
                            const url = await uploadImage(file);
                            setProgressItems(p => p.map((pi, i) => i === idx ? { ...pi, imageUrl: url } : pi))
                          } catch {
                            setError('Image upload failed.');
                          }
                        }}
                        onRemove={() => setProgressItems(p => p.filter((_, i) => i !== idx))}
                        onImageRemove={() => setProgressItems(p => p.map((pi, i) => i === idx ? { ...pi, imageUrl: '' } : pi))}
                      />
                    ))}
                    {progressItems.length === 0 && (
                      <p className="text-xs text-muted">No progress updates yet. Click "Add update" to add one.</p>
                    )}
                  </div>

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

function ProgressItem({
  text,
  imageUrl,
  onTextChange,
  onImageUpload,
  onImageRemove,
  onRemove,
}: {
  text: string;
  imageUrl: string;
  onTextChange: (val: string) => void;
  onImageUpload: (file: File) => Promise<void>;
  onImageRemove: () => void;
  onRemove: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  return (
    <div className="rounded-xl bg-white/50 border border-white/10 p-4 space-y-3">
      <div className="flex items-start gap-2">
        <input
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Update description..."
          className="flex-1 rounded-lg border border-white/10 bg-white/60 px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-green/40"
        />
        <button type="button" onClick={onRemove} className="shrink-0 p-2 text-red-400 hover:text-red-600">
          <Trash2 size={16} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setUploading(true);
            await onImageUpload(file);
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="text-xs flex items-center gap-1 text-green font-semibold hover:underline"
        >
          <Upload size={14} />
          {uploading ? 'Uploading...' : imageUrl ? 'Change image' : 'Add image'}
        </button>
        {imageUrl && (
          <>
            <img src={imageUrl} alt="" className="w-14 h-14 rounded-lg object-cover border border-white/20" />
            <button
              type="button"
              onClick={onImageRemove}
              className="text-xs text-red-400 hover:text-red-600"
            >
              Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
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
