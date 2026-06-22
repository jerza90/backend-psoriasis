import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink, Heart, Lightbulb, Sparkles, Tag, Clock } from 'lucide-react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Eyebrow from '../components/Eyebrow';
import { getPublicAffiliateProfile, type AffiliateProfile } from '../api/client';

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
  const progress = splitLines(profile.progressText);
  const progressImages: string[] = JSON.parse(profile.progressImages || '[]');

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
                    Affiliate story
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
          <SectionCard title={profile.storyTitle || 'My story'} body={profile.storyBody || profile.storySummary || profile.bio || ''} />
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
          <SectionCard
            title={profile.progressTitle || 'Progress'}
            body={profile.progressText || 'Add progress updates here so people can see the journey over time.'}
            bullets={progress}
            images={progressImages}
          />
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
