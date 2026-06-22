import { useEffect, useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { Copy, ExternalLink, LayoutDashboard, User, BookOpen, TrendingUp, Eye, Save, Plus, Trash2, Upload, Loader2, CheckCircle2, AlertCircle, DollarSign, Users, Share2, Camera, LogOut, Clock } from 'lucide-react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import {
  getAffiliateProfile,
  updateAffiliateProfile,
  uploadImage,
  getAffiliateConversions,
  type AffiliateProfile,
  type AffiliateProfileUpdateInput,
  type AffiliateConversion,
} from '../api/client';

type Tab = 'overview' | 'profile' | 'story' | 'progress' | 'earnings' | 'preview';

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'story', label: 'Story', icon: BookOpen },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'earnings', label: 'Earnings', icon: DollarSign },
  { id: 'preview', label: 'Preview', icon: Eye },
];

export default function AffiliateDashboardPage() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<AffiliateProfile | null>(null);
  const [draft, setDraft] = useState<AffiliateProfileUpdateInput>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [progressItems, setProgressItems] = useState<{ text: string; imageUrl: string }[]>([]);
  const [conversions, setConversions] = useState<AffiliateConversion[]>([]);
  const [conversionsLoading, setConversionsLoading] = useState(false);

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
          storyTitle: data.storyTitle || '',
          storyBody: data.storyBody || '',
        });
        const lines = (data.progressText || '').split('\n').map(l => l.trim()).filter(Boolean);
        const images: string[] = JSON.parse(data.progressImages || '[]');
        setProgressItems(lines.map((text, i) => ({ text, imageUrl: images[i] || '' })));
      })
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    if (!profile?.id) return;
    setConversionsLoading(true);
    getAffiliateConversions(profile.id)
      .then((res) => setConversions(res.conversions))
      .catch(() => {})
      .finally(() => setConversionsLoading(false));
  }, [profile?.id]);

  const [onboardingStep, setOnboardingStep] = useState(0);
  const onboardingSetup = useRef<AffiliateProfileUpdateInput>({});

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'affiliate') return <Navigate to="/" replace />;

  const handleChange = (field: keyof AffiliateProfileUpdateInput) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setDraft(p => ({ ...p, [field]: e.target.value }));

  const handleSave = async () => {
    if (!user.email) return;
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const textLines = progressItems.map(p => p.text);
      const imageUrls = progressItems.map(p => p.imageUrl);
      const updated = await updateAffiliateProfile(user.email, {
        ...draft,
        progressText: textLines.join('\n'),
        progressImages: JSON.stringify(imageUrls),
      });
      setProfile(updated);
      setMessage('Saved successfully.');
      setTimeout(() => setMessage(null), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const url = await uploadImage(file);
      return url;
    } catch {
      setError('Upload failed.');
      return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-green" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen">
        <Topbar />
        <div className="gradient-subtle min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="container-main max-w-[520px] py-16">
            <div className="glass-card rounded-3xl p-10 text-center space-y-8">
              <div className="w-16 h-16 rounded-full bg-green/15 flex items-center justify-center mx-auto">
                <Users size={32} className="text-green" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-ink">Welcome to the affiliate program!</h1>
                <p className="text-sm text-muted">Set up your public profile to start sharing your story and earning commissions.</p>
              </div>

              {onboardingStep === 0 && (
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-4 rounded-xl bg-white/50 border border-white/10 p-4">
                    <div className="w-8 h-8 rounded-full bg-green/15 flex items-center justify-center shrink-0">
                      <User size={16} className="text-green" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink">1. Complete your profile</div>
                      <div className="text-xs text-muted">Add your name, bio, and photo so visitors know who you are.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl bg-white/50 border border-white/10 p-4">
                    <div className="w-8 h-8 rounded-full bg-green/15 flex items-center justify-center shrink-0">
                      <BookOpen size={16} className="text-green" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink">2. Share your story</div>
                      <div className="text-xs text-muted">Tell your psoriasis journey — how the ebook helped you.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl bg-white/50 border border-white/10 p-4">
                    <div className="w-8 h-8 rounded-full bg-green/15 flex items-center justify-center shrink-0">
                      <TrendingUp size={16} className="text-green" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink">3. Show your progress</div>
                      <div className="text-xs text-muted">Add photos and updates so others see real results.</div>
                    </div>
                  </div>
                  <button onClick={() => setOnboardingStep(1)} className="w-full button-base button-primary mt-4 gap-2">
                    <User size={16} />
                    Get started
                  </button>
                </div>
              )}

              {onboardingStep === 1 && (
                <div className="text-left space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-ink mb-1">Your profile</h2>
                    <p className="text-sm text-muted">Set up your public-facing info first.</p>
                  </div>
                  <Field label="Display name" value={onboardingSetup.current.name || ''} onChange={(e) => { onboardingSetup.current.name = e.target.value; setOnboardingStep(1); }} placeholder="Your name" />
                  <TextArea label="Bio" value={onboardingSetup.current.bio || ''} onChange={(e) => { onboardingSetup.current.bio = e.target.value; setOnboardingStep(1); }} rows={3} placeholder="Short intro about you..." />
                  <div className="flex gap-3 pt-2">
                    <button onClick={async () => {
                      if (!user.email) return;
                      setSaving(true);
                      try {
                        const updated = await updateAffiliateProfile(user.email, {
                          name: onboardingSetup.current.name || '',
                          bio: onboardingSetup.current.bio || '',
                        });
                        setProfile(updated);
                        setDraft({ name: updated.name || '', bio: updated.bio || '' });
                      } catch (err) {
                        setError(err instanceof Error ? err.message : 'Failed to save.');
                      } finally {
                        setSaving(false);
                      }
                    }} disabled={saving} className="button-base button-primary gap-2 flex-1 justify-center">
                      {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      {saving ? 'Saving...' : 'Save & continue to dashboard'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Topbar />
      <div className="gradient-subtle min-h-[calc(100vh-4rem)]">
        <div className="container-main max-w-[1200px] py-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-green/15 flex items-center justify-center">
              <Users size={20} className="text-green" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-ink">{user.fullName || user.username}</h1>
              <p className="text-sm text-muted">Affiliate dashboard</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 items-start">
            <aside className="glass-card rounded-2xl p-3 space-y-1 sticky top-24">
              {TABS.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isComplete = tab.id === 'profile' ? !!profile?.name : tab.id === 'story' ? !!profile?.storyTitle : tab.id === 'progress' ? progressItems.length > 0 : true;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                      isActive
                        ? 'bg-green text-white shadow-md'
                        : 'text-muted hover:text-ink hover:bg-white/50'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="flex-1">{tab.label}</span>
                    {profile && isComplete && !isActive && (
                      <CheckCircle2 size={14} className="text-green" />
                    )}
                  </button>
                );
              })}
              <hr className="border-white/10 my-2" />
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted hover:text-red-500 hover:bg-white/50 transition-all text-left"
              >
                <LogOut size={18} />
                <span>Sign out</span>
              </button>
            </aside>

            <main className="glass-card rounded-2xl p-8 min-h-[500px]">
              {message && (
                <div className="flex items-center gap-2 text-sm text-green font-medium bg-green/5 rounded-xl px-4 py-3 mb-6">
                  <CheckCircle2 size={16} />
                  {message}
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-500 font-medium bg-red-500/5 rounded-xl px-4 py-3 mb-6">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-lg font-bold text-ink mb-1">Your referral link</h2>
                    <p className="text-sm text-muted mb-4">Share this link with your audience to start earning.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 rounded-xl border border-white/10 bg-white/60 px-4 py-3 text-sm text-ink break-all">
                        {getShareLink(profile?.referralCode)}
                      </div>
                      <button onClick={async () => {
                        const link = getShareLink(profile?.referralCode);
                        if (!link) return;
                        await navigator.clipboard.writeText(link);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1800);
                      }} className="button-base button-primary shrink-0 gap-2">
                        <Copy size={16} />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl bg-white/50 border border-white/10 p-5">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted mb-2">
                        <DollarSign size={14} />
                        Earnings
                      </div>
                      <div className="text-2xl font-bold text-ink">
                        RM {profile?.totalEarned || '0.00'}
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/50 border border-white/10 p-5">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted mb-2">
                        <Share2 size={14} />
                        Commission
                      </div>
                      <div className="text-2xl font-bold text-ink">
                        {profile?.commissionRate ? `${Number(profile.commissionRate) * 100}%` : '50%'}
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/50 border border-white/10 p-5">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted mb-2">
                        <Users size={14} />
                        Referrals
                      </div>
                      <div className="text-2xl font-bold text-ink">
                        {profile?.referralCode || '-'}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setActiveTab('profile')} className="button-base button-primary gap-2">
                      <User size={16} />
                      Complete your profile
                    </button>
                    {profile?.referralCode && (
                      <a href={getShareLink(profile.referralCode)} target="_blank" rel="noreferrer" className="button-base button-secondary gap-2">
                        <ExternalLink size={16} />
                        View public page
                      </a>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-6 max-w-[560px]">
                  <div>
                    <h2 className="text-lg font-bold text-ink mb-1">Profile</h2>
                    <p className="text-sm text-muted">This is how you appear on your public page.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center overflow-hidden">
                      {draft.avatarUrl ? (
                        <img src={draft.avatarUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Camera size={24} className="text-green" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Field
                        label="Avatar URL"
                        value={draft.avatarUrl || ''}
                        onChange={handleChange('avatarUrl')}
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </div>
                  <Field label="Display name" value={draft.name || ''} onChange={handleChange('name')} placeholder="Your name" />
                  <TextArea label="Bio" value={draft.bio || ''} onChange={handleChange('bio')} rows={4} placeholder="Short intro about you..." />
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSave} disabled={saving} className="button-base button-primary gap-2">
                      {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      {saving ? 'Saving...' : 'Save profile'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="space-y-6 max-w-[560px]">
                  <div>
                    <h2 className="text-lg font-bold text-ink mb-1">Your story</h2>
                    <p className="text-sm text-muted">Share your psoriasis journey — the turning point, what changed, and how the ebook helped.</p>
                  </div>
                  <Field label="Story title" value={draft.storyTitle || ''} onChange={handleChange('storyTitle')} placeholder="e.g. My 6-month journey to clear skin" />
                  <TextArea label="Story" value={draft.storyBody || ''} onChange={handleChange('storyBody')} rows={10} placeholder="Tell your story in detail..." />
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSave} disabled={saving} className="button-base button-primary gap-2">
                      {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      {saving ? 'Saving...' : 'Save story'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'progress' && (
                <div className="space-y-6 max-w-[560px]">
                  <div>
                    <h2 className="text-lg font-bold text-ink mb-1">Progress updates</h2>
                    <p className="text-sm text-muted">Show your audience the real results over time. Add photos to each update.</p>
                  </div>
                  <Field label="Section title" value={draft.progressTitle || ''} onChange={handleChange('progressTitle')} placeholder="e.g. Perjalanan perkembangan" />
                  <div className="space-y-3">
                    {progressItems.map((item, idx) => (
                      <ProgressItem
                        key={idx}
                        text={item.text}
                        imageUrl={item.imageUrl}
                        onTextChange={(val) => setProgressItems(p => p.map((pi, i) => i === idx ? { ...pi, text: val } : pi))}
                        onImageUpload={async (file) => {
                          const url = await handleImageUpload(file);
                          if (url) setProgressItems(p => p.map((pi, i) => i === idx ? { ...pi, imageUrl: url } : pi));
                        }}
                        onRemove={() => setProgressItems(p => p.filter((_, i) => i !== idx))}
                        onImageRemove={() => setProgressItems(p => p.map((pi, i) => i === idx ? { ...pi, imageUrl: '' } : pi))}
                      />
                    ))}
                    <button onClick={() => setProgressItems(p => [...p, { text: '', imageUrl: '' }])} className="w-full rounded-xl border-2 border-dashed border-white/20 py-4 text-sm text-muted hover:text-green hover:border-green/40 transition-all flex items-center justify-center gap-2">
                      <Plus size={16} />
                      Add update
                    </button>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSave} disabled={saving} className="button-base button-primary gap-2">
                      {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      {saving ? 'Saving...' : 'Save progress'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'earnings' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-ink mb-1">Earnings</h2>
                    <p className="text-sm text-muted">Track your commissions from referred sales.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl bg-white/50 border border-white/10 p-5">
                      <div className="text-xs uppercase tracking-widest text-muted mb-1">Total earned</div>
                      <div className="text-2xl font-bold text-ink">RM {profile?.totalEarned || '0.00'}</div>
                    </div>
                    <div className="rounded-xl bg-white/50 border border-white/10 p-5">
                      <div className="text-xs uppercase tracking-widest text-muted mb-1">Conversions</div>
                      <div className="text-2xl font-bold text-ink">{conversions.length}</div>
                    </div>
                    <div className="rounded-xl bg-white/50 border border-white/10 p-5">
                      <div className="text-xs uppercase tracking-widest text-muted mb-1">Commission rate</div>
                      <div className="text-2xl font-bold text-ink">{profile?.commissionRate ? `${Number(profile.commissionRate) * 100}%` : '50%'}</div>
                    </div>
                  </div>
                  {conversionsLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 size={24} className="animate-spin text-green" />
                    </div>
                  ) : conversions.length === 0 ? (
                    <div className="rounded-xl bg-white/50 border border-white/10 p-8 text-center">
                      <DollarSign size={32} className="text-muted mx-auto mb-3" />
                      <p className="text-sm text-muted">No conversions yet. Share your referral link and start earning!</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-xs uppercase tracking-widest text-muted">
                            <th className="pb-3 pr-4 font-bold">Date</th>
                            <th className="pb-3 pr-4 font-bold">Order amount</th>
                            <th className="pb-3 pr-4 font-bold">Commission</th>
                            <th className="pb-3 font-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {conversions.map((c) => (
                            <tr key={c.id} className="border-t border-white/10">
                              <td className="py-3 pr-4 text-muted whitespace-nowrap">
                                {new Date(c.createdAt).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </td>
                              <td className="py-3 pr-4 text-ink font-medium">
                                RM {Number(c.orderAmount).toFixed(2)}
                              </td>
                              <td className="py-3 pr-4 text-green font-medium">
                                RM {Number(c.commissionAmount).toFixed(2)}
                              </td>
                              <td className="py-3">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  c.status === 'paid'
                                    ? 'bg-green/10 text-green'
                                    : c.status === 'pending'
                                    ? 'bg-amber/10 text-amber'
                                    : 'bg-white/10 text-muted'
                                }`}>
                                  {c.status === 'pending' && <Clock size={12} />}
                                  {c.status === 'paid' && <CheckCircle2 size={12} />}
                                  {c.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-ink mb-1">Public page preview</h2>
                    <p className="text-sm text-muted">This is what your audience sees when they visit your page.</p>
                  </div>
                  <div className="rounded-2xl bg-white/50 border border-white/10 p-8 space-y-6">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-20 h-20 rounded-full bg-green/10 flex items-center justify-center overflow-hidden">
                        {profile?.avatarUrl ? (
                          <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User size={32} className="text-green" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-ink">{profile?.name || 'Your name'}</h3>
                      <p className="text-sm text-muted max-w-[500px]">{profile?.bio || 'Your bio will appear here.'}</p>
                    </div>
                    <hr className="border-white/10" />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-muted font-bold mb-2">{profile?.storyTitle || 'Story'}</h4>
                      <p className="text-sm text-muted whitespace-pre-line">{profile?.storyBody || 'Share your story to connect with your audience.'}</p>
                    </div>
                    <hr className="border-white/10" />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-muted font-bold mb-2">{draft.progressTitle || 'Progress'}</h4>
                      <div className="space-y-3">
                        {progressItems.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-muted">
                            <span className="w-5 h-5 rounded-full bg-green/15 flex items-center justify-center shrink-0 mt-0.5">
                              <TrendingUp size={12} className="text-green" />
                            </span>
                            <div className="space-y-1">
                              <span>{item.text}</span>
                              {item.imageUrl && (
                                <img src={item.imageUrl} alt="" className="rounded-xl border border-white/10 max-h-48 w-auto object-cover" loading="lazy" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {profile?.referralCode && (
                    <a href={getShareLink(profile.referralCode)} target="_blank" rel="noreferrer" className="button-base button-secondary gap-2 inline-flex">
                      <ExternalLink size={16} />
                      Open live page
                    </a>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-bold uppercase tracking-widest text-muted">{label}</span>
      <input value={value} onChange={onChange} placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/60 px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-green/40" />
    </label>
  );
}

function TextArea({ label, value, onChange, rows, placeholder }: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows: number;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-bold uppercase tracking-widest text-muted">{label}</span>
      <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/60 px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-green/40 resize-y" />
    </label>
  );
}

function ProgressItem({ text, imageUrl, onTextChange, onImageUpload, onImageRemove, onRemove }: {
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
        <input value={text} onChange={(e) => onTextChange(e.target.value)} placeholder="Describe your progress..."
          className="flex-1 rounded-lg border border-white/10 bg-white/60 px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-green/40" />
        <button type="button" onClick={onRemove} className="shrink-0 p-2 text-red-400 hover:text-red-600">
          <Trash2 size={16} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setUploading(true);
            await onImageUpload(file);
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
          }} />
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          className="text-xs flex items-center gap-1 text-green font-semibold hover:underline">
          <Upload size={14} />
          {uploading ? 'Uploading...' : imageUrl ? 'Change photo' : 'Add photo'}
        </button>
        {imageUrl && (
          <>
            <img src={imageUrl} alt="" className="w-14 h-14 rounded-lg object-cover border border-white/20" />
            <button type="button" onClick={onImageRemove} className="text-xs text-red-400 hover:text-red-600">Remove</button>
          </>
        )}
      </div>
    </div>
  );
}

function getShareLink(referralCode?: string | null) {
  if (!referralCode || typeof window === 'undefined') return '';
  return `${window.location.origin}/affiliate/${referralCode}`;
}
