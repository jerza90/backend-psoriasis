import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function BlogPostPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const content: Record<string, { title: string; body: string }> = {
    '1': {
      title: t('blogPost.content.1.title'),
      body: t('blogPost.content.1.body'),
    },
  };

  const post = id ? content[id] : null;

  if (!post) {
    return (
      <div className="min-h-screen">
        <Topbar />
        <section className="container-main pt-16 pb-12 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('blogPost.notFound')}</h1>
          <Link to="/blog" className="button-base button-secondary gap-2">
            <ArrowLeft size={18} />
            {t('blogPost.back')}
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Topbar />

      <article className="container-main pt-10 pb-12 max-w-[700px] mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green mb-6 transition-all"
        >
          <ArrowLeft size={16} />
          {t('blogPost.back')}
        </Link>

        <h1 className="text-[clamp(28px,5vw,44px)] font-black leading-[0.95] mb-6 animate-fade-up">{post.title}</h1>

        <div className="text-muted leading-relaxed space-y-4 animate-fade-up [animation-delay:0.1s]">
          {post.body.split('\n\n').map((para, i) => {
            if (para.startsWith('• ')) {
              return (
                <ul key={i} className="list-disc list-inside space-y-1">
                  {para.split('\n').map((line, j) => (
                    <li key={j}>{line.replace('• ', '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{para}</p>;
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 glass rounded-xl p-8 text-center animate-fade-up">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-green mb-4 shadow-lg shadow-green/20">
            <Shield size={22} className="text-white" />
          </div>
          <h2 className="font-bold text-xl mb-2">{t('blogPost.cta.heading')}</h2>
          <p className="text-muted text-sm mb-5 max-w-[400px] mx-auto leading-relaxed">
            {t('blogPost.cta.desc')}
          </p>
          <Link to="/checklist" className="button-base button-primary gap-2 text-sm shadow-lg shadow-green/20">
            {t('blogPost.cta.button')}
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
