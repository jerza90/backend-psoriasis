import { useEffect, useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { Copy, ExternalLink, LayoutDashboard, User, BookOpen, TrendingUp, Eye, Save, Plus, Trash2, Upload, Loader2, CheckCircle2, AlertCircle, DollarSign, Users, Share2, Camera, LogOut, Clock, Image, Package, CalendarDays, Edit3, X, Lightbulb } from 'lucide-react';
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

type Tab = 'overview' | 'profile' | 'identity' | 'progress' | 'earnings' | 'preview';

const CONDITION_OPTIONS = [
  'Psoriasis fighter',
  'Mom with eczema child',
  'Eczema child',
  'Nail psoriasis',
  'Guttate psoriasis',
];

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'identity', label: 'Identity', icon: BookOpen },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'earnings', label: 'Earnings', icon: DollarSign },
  { id: 'preview', label: 'Preview', icon: Eye },
];

export interface ProgressUpdate {
  startDate: string;
  endDate: string;
  description: string;
  images: string[];
  products: string[];
  tips: string;
}

const MAX_IMAGES = 5;

function defaultUpdate(): ProgressUpdate {
  return { startDate: '', endDate: '', description: '', images: [], products: [], tips: '' };
}

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
  const [progressPosts, setProgressPosts] = useState<ProgressUpdate[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [composer, setComposer] = useState<ProgressUpdate>(defaultUpdate());
  const [showComposer, setShowComposer] = useState(false);
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
          conditionLabel: data.conditionLabel || 'Psoriasis fighter',
          storyTitle: data.storyTitle || '',
          storyBody: data.storyBody || '',
        });
        try {
          const parsed: ProgressUpdate[] = JSON.parse(data.progressText || '[]');
          setProgressPosts(Array.isArray(parsed) ? parsed : []);
        } catch {
          setProgressPosts([]);
        }
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
      const updated = await updateAffiliateProfile(user.email, {
        ...draft,
        progressText: JSON.stringify(progressPosts),
        progressImages: '[]',
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
      return await uploadImage(file);
    } catch {
      setError('Upload failed.');
      return null;
    }
  };

  const openComposer = (idx: number | null) => {
    if (idx !== null) {
      setComposer({ ...progressPosts[idx] });
      setEditingIndex(idx);
    } else {
      setComposer(defaultUpdate());
      setEditingIndex(null);
    }
    setShowComposer(true);
  };

  const cancelComposer = () => {
    setShowComposer(false);
    setEditingIndex(null);
    setComposer(defaultUpdate());
  };

  const saveComposer = () => {
    if (!composer.startDate || !composer.description) {
      setError('Start date and description are required.');
      return;
    }
    setProgressPosts(prev => {
      if (editingIndex !== null) {
        const next = [...prev];
        next[editingIndex] = { ...composer };
        return next;
      }
      return [...prev, { ...composer }];
    });
    cancelComposer();
  };

  const deletePost = (idx: number) => {
    setProgressPosts(prev => prev.filter((_, i) => i !== idx));
    if (editingIndex === idx) cancelComposer();
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
        <div className="bg-gray-50/80 min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="max-w-[520px] w-full px-6 py-16">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center space-y-8">
              <div className="w-16 h-16 rounded-full bg-green/15 flex items-center justify-center mx-auto">
                <Users size={32} className="text-green" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-ink">Welcome to the affiliate program!</h1>
                <p className="text-sm text-muted">Set up your public profile to start sharing your journey and earning commissions.</p>
              </div>

              {onboardingStep === 0 && (
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-4 rounded-xl bg-white border border-gray-100 shadow-sm p-4">
                    <div className="w-8 h-8 rounded-full bg-green/15 flex items-center justify-center shrink-0">
                      <User size={16} className="text-green" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink">1. Complete your profile</div>
                      <div className="text-xs text-muted">Add your name, bio, and photo so visitors know who you are.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl bg-white border border-gray-100 shadow-sm p-4">
                    <div className="w-8 h-8 rounded-full bg-green/15 flex items-center justify-center shrink-0">
                      <BookOpen size={16} className="text-green" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink">2. Choose your label</div>
                      <div className="text-xs text-muted">Pick the journey label that best fits your current situation.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl bg-white border border-gray-100 shadow-sm p-4">
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
                  <SelectField
                    label="Journey label"
                    value={onboardingSetup.current.conditionLabel || 'Psoriasis fighter'}
                    onChange={(e) => { onboardingSetup.current.conditionLabel = e.target.value; setOnboardingStep(1); }}
                    options={CONDITION_OPTIONS}
                  />
                  <div className="flex gap-3 pt-2">
                    <button onClick={async () => {
                      if (!user.email) return;
                      setSaving(true);
                      try {
                        const updated = await updateAffiliateProfile(user.email, {
                          name: onboardingSetup.current.name || '',
                          bio: onboardingSetup.current.bio || '',
                          conditionLabel: onboardingSetup.current.conditionLabel || 'Psoriasis fighter',
                        });
                        setProfile(updated);
                        setDraft({ name: updated.name || '', bio: updated.bio || '', conditionLabel: updated.conditionLabel || 'Psoriasis fighter' });
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
      <div className="bg-gray-50/80 min-h-[calc(100vh-4rem)]">
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center">
              <Users size={20} className="text-green" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-ink">{user.fullName || user.username}</h1>
              <p className="text-sm text-muted">Affiliate dashboard</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 items-start">
            <aside className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 space-y-1 sticky top-24">
              {TABS.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isComplete = tab.id === 'profile'
                  ? !!profile?.name
                  : tab.id === 'identity'
                    ? !!profile?.conditionLabel
                    : tab.id === 'progress'
                      ? progressPosts.length > 0
                      : true;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                      isActive
                        ? 'bg-green text-white shadow-sm'
                        : 'text-muted hover:text-ink hover:bg-gray-100'
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
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted hover:text-red-500 hover:bg-gray-100 transition-all text-left"
              >
                <LogOut size={18} />
                <span>Sign out</span>
              </button>
            </aside>

            <main className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[500px]">
              {message && (
                <div className="flex items-center gap-2 text-sm text-green font-medium bg-green-50 rounded-xl px-4 py-3 mb-6">
                  <CheckCircle2 size={16} />
                  {message}
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-500 font-medium bg-red-50 rounded-xl px-4 py-3 mb-6">
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
                      <div className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink break-all">
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
                    <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted mb-2">
                        <DollarSign size={14} />
                        Earnings
                      </div>
                      <div className="text-2xl font-bold text-ink">
                        RM {profile?.totalEarned || '0.00'}
                      </div>
                    </div>
                    <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted mb-2">
                        <Share2 size={14} />
                        Commission
                      </div>
                      <div className="text-2xl font-bold text-ink">
                        {profile?.commissionRate ? `${Number(profile.commissionRate) * 100}%` : '50%'}
                      </div>
                    </div>
                    <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
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

              {activeTab === 'identity' && (
                <div className="space-y-6 max-w-[560px]">
                  <div>
                    <h2 className="text-lg font-bold text-ink mb-1">Your identity</h2>
                    <p className="text-sm text-muted">Choose the label that best fits your journey and update it anytime.</p>
                  </div>
                  <SelectField
                    label="Journey label"
                    value={draft.conditionLabel || 'Psoriasis fighter'}
                    onChange={(e) => setDraft((p) => ({ ...p, conditionLabel: e.target.value }))}
                    options={CONDITION_OPTIONS}
                  />
                  <Field label="Journey headline" value={draft.storyTitle || ''} onChange={handleChange('storyTitle')} placeholder="e.g. My 6-month journey to clear skin" />
                  <TextArea label="Journey story" value={draft.storyBody || ''} onChange={handleChange('storyBody')} rows={10} placeholder="Tell your journey in detail..." />
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSave} disabled={saving} className="button-base button-primary gap-2">
                      {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      {saving ? 'Saving...' : 'Save identity'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'progress' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-ink mb-1">Progress updates</h2>
                      <p className="text-sm text-muted">Share your journey — each post can have photos, products you use, and tips.</p>
                    </div>
                    {!showComposer && (
                      <button onClick={() => openComposer(null)} className="button-base button-primary gap-2 shrink-0">
                        <Plus size={16} />
                        New update
                      </button>
                    )}
                  </div>

                  {showComposer && (
                    <div className="rounded-2xl bg-white border border-green-200 shadow-sm p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-ink">
                          {editingIndex !== null ? 'Edit update' : 'New update'}
                        </h3>
                        <button onClick={cancelComposer} className="p-1 text-muted hover:text-ink">
                          <X size={18} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <label className="grid gap-1.5">
                          <span className="text-xs font-bold uppercase tracking-widest text-muted flex items-center gap-1">
                            <CalendarDays size={12} /> Start
                          </span>
                          <input type="month" value={composer.startDate} onChange={(e) => setComposer(p => ({ ...p, startDate: e.target.value }))}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-green/40 focus:border-green-300" />
                        </label>
                        <label className="grid gap-1.5">
                          <span className="text-xs font-bold uppercase tracking-widest text-muted flex items-center gap-1">
                            <CalendarDays size={12} /> End
                          </span>
                          <input type="month" value={composer.endDate} onChange={(e) => setComposer(p => ({ ...p, endDate: e.target.value }))}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-green/40 focus:border-green-300" />
                        </label>
                        <label className="grid gap-1.5">
                          <span className="text-xs font-bold uppercase tracking-widest text-muted flex items-center gap-1">
                            <Package size={12} /> Products used
                          </span>
                          <input type="text" value={composer.products.join(', ')} placeholder="Ebook Psoriasis, Moisturizer..."
                            onChange={(e) => setComposer(p => ({ ...p, products: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-green/40 focus:border-green-300" />
                        </label>
                      </div>

                      <label className="grid gap-1.5">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted">Description</span>
                        <textarea value={composer.description} onChange={(e) => setComposer(p => ({ ...p, description: e.target.value }))} rows={3} placeholder="What happened? How are you feeling?"
                          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-green/40 focus:border-green-300 resize-y" />
                      </label>

                      <label className="grid gap-1.5">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted flex items-center gap-1">
                          <Lightbulb size={12} /> Tips & notes
                        </span>
                        <textarea value={composer.tips} onChange={(e) => setComposer(p => ({ ...p, tips: e.target.value }))} rows={2} placeholder="Any tips or observations..."
                          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-green/40 focus:border-green-300 resize-y" />
                      </label>

                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted flex items-center gap-1">
                          <Image size={12} /> Photos ({composer.images.length}/{MAX_IMAGES})
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {composer.images.map((url, i) => (
                            <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                              <img src={url} alt="" className="w-full h-full object-cover" />
                              <button type="button" onClick={() => setComposer(p => ({ ...p, images: p.images.filter((_, j) => j !== i) }))}
                                className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center text-white">
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                          {composer.images.length < MAX_IMAGES && (
                            <ImageUploadButton onUpload={async (file) => {
                              const url = await handleImageUpload(file);
                              if (url) setComposer(p => ({ ...p, images: [...p.images, url] }));
                            }} />
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-1">
                        <button onClick={saveComposer} className="button-base button-primary gap-2">
                          <CheckCircle2 size={16} />
                          {editingIndex !== null ? 'Save changes' : 'Publish update'}
                        </button>
                        <button onClick={cancelComposer} className="button-base button-ghost">Cancel</button>
                      </div>
                    </div>
                  )}

                  <Field label="Section title" value={draft.progressTitle || ''} onChange={handleChange('progressTitle')} placeholder="e.g. Perjalanan perkembangan" />

                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                    {progressPosts.length === 0 && !showComposer && (
                      <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-8 text-center">
                        <TrendingUp size={32} className="text-muted mx-auto mb-3" />
                        <p className="text-sm text-muted">No updates yet. Share your first progress post!</p>
                      </div>
                    )}
                    {[...progressPosts].reverse().map((post, ri) => {
                      const idx = progressPosts.length - 1 - ri;
                      return (
                        <ProgressPostCard
                          key={idx}
                          post={post}
                          onEdit={() => openComposer(idx)}
                          onDelete={() => deletePost(idx)}
                        />
                      );
                    })}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSave} disabled={saving} className="button-base button-primary gap-2">
                      {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      {saving ? 'Saving...' : 'Save all progress'}
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
                    <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
                      <div className="text-xs uppercase tracking-widest text-muted mb-1">Total earned</div>
                      <div className="text-2xl font-bold text-ink">RM {profile?.totalEarned || '0.00'}</div>
                    </div>
                    <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
                      <div className="text-xs uppercase tracking-widest text-muted mb-1">Conversions</div>
                      <div className="text-2xl font-bold text-ink">{conversions.length}</div>
                    </div>
                    <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
                      <div className="text-xs uppercase tracking-widest text-muted mb-1">Commission rate</div>
                      <div className="text-2xl font-bold text-ink">{profile?.commissionRate ? `${Number(profile.commissionRate) * 100}%` : '50%'}</div>
                    </div>
                  </div>
                  {conversionsLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 size={24} className="animate-spin text-green" />
                    </div>
                  ) : conversions.length === 0 ? (
                    <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-8 text-center">
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
                            <tr key={c.id} className="border-t border-gray-100">
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
                                    ? 'bg-green-50 text-green'
                                    : c.status === 'pending'
                                    ? 'bg-amber-50 text-amber'
                                    : 'bg-gray-50 text-muted'
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
                  <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-8 space-y-6">
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
                    <hr className="border-gray-100" />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-muted font-bold mb-2">{profile?.storyTitle || 'Journey'}</h4>
                      <p className="text-sm text-muted whitespace-pre-line">{profile?.storyBody || 'Share your journey to connect with your audience.'}</p>
                    </div>
                    <hr className="border-gray-100" />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-muted font-bold mb-3">{draft.progressTitle || 'Progress'}</h4>
                      {progressPosts.length === 0 ? (
                        <p className="text-sm text-muted">No progress updates yet.</p>
                      ) : (
                        <div className="space-y-4">
                          {progressPosts.map((post, idx) => (
                            <PreviewPostCard key={idx} post={post} />
                          ))}
                        </div>
                      )}
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
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-green/40 focus:border-green-300" />
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
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-green/40 focus:border-green-300 resize-y" />
    </label>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-bold uppercase tracking-widest text-muted">{label}</span>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-green/40 focus:border-green-300"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function ProgressPostCard({ post, onEdit, onDelete }: {
  post: ProgressUpdate;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const fmt = (d: string) => {
    if (!d) return '';
    if (d.length === 7) {
      const [y, m] = d.split('-');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[parseInt(m) - 1] || ''} ${y}`;
    }
    const [y, m, day] = d.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[parseInt(m) - 1] || ''} ${y}`;
  };

  const range = post.startDate
    ? post.endDate
      ? `${fmt(post.startDate)} → ${fmt(post.endDate)}`
      : `${fmt(post.startDate)}`
    : '';

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted">
          <CalendarDays size={14} className="shrink-0" />
          <span className="font-semibold">{range}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onEdit} className="p-1.5 text-muted hover:text-green rounded-lg hover:bg-green-50 transition-colors">
            <Edit3 size={14} />
          </button>
          <button onClick={onDelete} className="p-1.5 text-muted hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <p className="text-sm text-ink leading-relaxed whitespace-pre-line">{post.description}</p>

      {post.products.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.products.map((p, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-xs font-medium text-green">
              <Package size={11} />
              {p}
            </span>
          ))}
        </div>
      )}

      {post.images.length > 0 && (
        <div className={`grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : post.images.length <= 3 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {post.images.map((url, i) => (
            <img key={i} src={url} alt="" className="rounded-xl border border-gray-200 w-full h-40 object-cover" loading="lazy" />
          ))}
        </div>
      )}

      {post.tips && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2.5 flex items-start gap-2">
          <Lightbulb size={14} className="text-amber shrink-0 mt-0.5" />
          <p className="text-xs text-muted leading-relaxed">{post.tips}</p>
        </div>
      )}
    </div>
  );
}

function PreviewPostCard({ post }: { post: ProgressUpdate }) {
  const fmt = (d: string) => {
    if (!d) return '';
    if (d.length === 7) {
      const [y, m] = d.split('-');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[parseInt(m) - 1] || ''} ${y}`;
    }
    const [y, m, day] = d.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[parseInt(m) - 1] || ''} ${y}`;
  };

  const range = post.startDate
    ? post.endDate
      ? `${fmt(post.startDate)} → ${fmt(post.endDate)}`
      : `${fmt(post.startDate)}`
    : '';

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-3">
      {range && (
        <div className="flex items-center gap-2 text-xs text-muted">
          <CalendarDays size={14} className="shrink-0" />
          <span className="font-semibold">{range}</span>
        </div>
      )}
      <p className="text-sm text-muted leading-relaxed whitespace-pre-line">{post.description}</p>
      {post.products.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.products.map((p, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-xs font-medium text-green">
              <Package size={11} />
              {p}
            </span>
          ))}
        </div>
      )}
      {post.images.length > 0 && (
        <div className={`grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : post.images.length <= 3 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {post.images.map((url, i) => (
            <img key={i} src={url} alt="" className="rounded-xl border border-gray-200 w-full h-40 object-cover" loading="lazy" />
          ))}
        </div>
      )}
      {post.tips && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2.5 flex items-start gap-2">
          <Lightbulb size={14} className="text-amber shrink-0 mt-0.5" />
          <p className="text-xs text-muted leading-relaxed">{post.tips}</p>
        </div>
      )}
    </div>
  );
}

function ImageUploadButton({ onUpload }: { onUpload: (file: File) => Promise<void> }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  return (
    <>
      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setUploading(true);
          await onUpload(file);
          setUploading(false);
          if (fileRef.current) fileRef.current.value = '';
        }} />
      <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
        className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-muted hover:text-green hover:border-green-400 transition-all">
        {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
      </button>
    </>
  );
}

function getShareLink(referralCode?: string | null) {
  if (!referralCode || typeof window === 'undefined') return '';
  return `${window.location.origin}/affiliate/${referralCode}`;
}
