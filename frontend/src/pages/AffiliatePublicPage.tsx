import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink, Heart, Lightbulb, Sparkles, Tag, Clock, CalendarDays, Package, TrendingUp } from 'lucide-react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Eyebrow from '../components/Eyebrow';
import { getPublicAffiliateProfile, type AffiliateProfile } from '../api/client';

interface ProgressUpdate {
  startDate: string;
  endDate: string;
  description: string;
  images: string[];
  products: string[];
  tips: string;
}

export default function AffiliatePublicPage() {
  const { referralCode } = useParams();
  const [profile, setProfile] = useState<AffiliateProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!referralCode) return;
    setLoading(true);
    getPublicAffiliateProfile(referralCode)
      .then(setProfile)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [referralCode]);

  if (!referralCode) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Affiliate page not found.</p>
      </div>
    );
  }

  const tips = splitLines(profile.tipsText);
  const guide = splitLines(profile.guideText);
  let progressPosts: ProgressUpdate[] = [];
  try {
    const parsed = JSON.parse(profile.progressText || '[]');
    progressPosts = Array.isArray(parsed) ? parsed : [];
  } catch {
    progressPosts = [];
  }

  return (
    <div className="min-h-screen">
      <Topbar />

      <section className="pt-24 pb-8">
        <div className="container-main max-w-[980px]">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green transition-colors">
            <ArrowLeft size={16} />
            Back home
          </Link>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-main max-w-[980px]">
          <div className="glass-card rounded-2xl p-8 md:p-10 animate-fade-up">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <img
                src={profile.avatarUrl || '/favicon.ico'}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-white/40 shadow-lg shrink-0"
              />
              <div className="flex-1">
                <Eyebrow icon={Sparkles} className="mb-2">
                  {profile.pageTitle || 'Affiliate profile'}
                </Eyebrow>
                <h1 className="clamp-heading-md mb-3">{profile.name}</h1>
                <p className="text-muted leading-relaxed max-w-[700px]">
                  {profile.pageIntro || profile.bio || 'A personal recovery page that shares the journey, the tips, the guide, and the progress updates.'}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs font-semibold text-green">
                    <Heart size={12} />
                    {profile.conditionLabel || 'Psoriasis fighter'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs font-semibold text-green">
                    <Tag size={12} />
                    {profile.referralCode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-main max-w-[980px] grid gap-6">
          <SectionCard title={profile.storyTitle || 'My journey'} body={profile.storyBody || profile.storySummary || profile.bio || ''} />
          <SectionCard
            title={profile.guideTitle || 'Guide'}
            body={profile.guideText || 'Add your step-by-step guide here so readers can follow your method.'}
            bullets={guide}
          />
          <SectionCard
            title={profile.tipsTitle || 'Tips'}
            body={profile.tipsText || 'Add quick tips here for your audience.'}
            bullets={tips}
          />
          <ProgressSection title={profile.progressTitle || 'Progress'} posts={progressPosts} />
          <SectionCard
            title={profile.blogTitle || 'Blog'}
            body={profile.blogExcerpt || 'Your blog teaser can live here and point to the full article or external page.'}
            link={profile.blogUrl}
            linkLabel="Open blog"
          />
        </div>
      </section>

      <section className="relative overflow-hidden py-14">
        <div className="absolute inset-0 gradient-green" />
        <div className="relative container-main text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Ready to start?</h2>
          <p className="text-[rgba(255,255,255,0.85)] text-lg mb-6 max-w-[500px] mx-auto">
            Use the affiliate link below to get the ebook through this page.
          </p>
          <Link to={`/checkout?ref=${profile.referralCode}`} className="button-base button-white gap-2 shadow-lg shadow-black/20">
            <BookOpen size={18} />
            Buy ebook
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function splitLines(value?: string | null) {
  return (value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function SectionCard({
  title,
  body,
  bullets,
  images,
  link,
  linkLabel,
}: {
  title: string;
  body: string;
  bullets?: string[];
  images?: string[];
  link?: string | null;
  linkLabel?: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-widest text-muted">
        <Clock size={14} />
        {title}
      </div>
      <p className="text-muted leading-relaxed whitespace-pre-line">{body}</p>
      {bullets && bullets.length > 0 && (
        <div className="mt-4 space-y-4">
          {bullets.map((bullet, idx) => (
            <div key={bullet} className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-muted">
                <span className="w-5 h-5 rounded-full bg-green/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb size={12} className="text-green" />
                </span>
                <span>{bullet}</span>
              </div>
              {images && images[idx] && (
                <img
                  src={images[idx]}
                  alt=""
                  className="ml-7 rounded-xl border border-white/10 max-h-60 w-auto object-cover"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      )}
      {link ? (
        <a href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-green font-semibold">
          <ExternalLink size={14} />
          {linkLabel || 'Open link'}
        </a>
      ) : null}
    </div>
  );
}

function ProgressSection({ title, posts }: { title: string; posts: ProgressUpdate[] }) {
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

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4 text-xs uppercase tracking-widest text-muted">
        <TrendingUp size={14} />
        {title}
      </div>
      {posts.length === 0 ? (
        <p className="text-muted leading-relaxed">No progress updates yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post, idx) => {
            const range = post.startDate
              ? post.endDate
                ? `${fmt(post.startDate)} → ${fmt(post.endDate)}`
                : `${fmt(post.startDate)}`
              : '';
            return (
              <div key={idx} className="rounded-xl bg-white/80 border border-gray-100 p-4 space-y-3">
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
          })}
        </div>
      )}
    </div>
  );
}
