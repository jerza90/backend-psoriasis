import { useTranslation } from 'react-i18next';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function BlogPage() {
  const { t } = useTranslation();

  const posts = [
    {
      id: '1',
      title: t('blog.posts.0.title'),
      excerpt: t('blog.posts.0.excerpt'),
      category: t('blog.posts.0.category'),
      date: t('blog.posts.0.date'),
    },
    {
      id: '2',
      title: t('blog.posts.1.title'),
      excerpt: t('blog.posts.1.excerpt'),
      category: t('blog.posts.1.category'),
      date: t('blog.posts.1.date'),
    },
    {
      id: '3',
      title: t('blog.posts.2.title'),
      excerpt: t('blog.posts.2.excerpt'),
      category: t('blog.posts.2.category'),
      date: t('blog.posts.2.date'),
    },
    {
      id: '4',
      title: t('blog.posts.3.title'),
      excerpt: t('blog.posts.3.excerpt'),
      category: t('blog.posts.3.category'),
      date: t('blog.posts.3.date'),
    },
    {
      id: '5',
      title: t('blog.posts.4.title'),
      excerpt: t('blog.posts.4.excerpt'),
      category: t('blog.posts.4.category'),
      date: t('blog.posts.4.date'),
    },
    {
      id: '6',
      title: t('blog.posts.5.title'),
      excerpt: t('blog.posts.5.excerpt'),
      category: t('blog.posts.5.category'),
      date: t('blog.posts.5.date'),
    },
  ];

  const categories = [t('blog.filterAll'), ...new Set(posts.map((p) => p.category))];

  return (
    <div className="min-h-screen">
      <Topbar />

      <section className="container-main pt-16 pb-12">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <div className="inline-flex items-center gap-2 text-green font-bold text-xs uppercase tracking-widest mb-3">
              <Sparkles size={14} />
              {t('blog.badge')}
            </div>
            <h1 className="clamp-heading-md mb-3">
              {t('blog.heading')}
            </h1>
            <p className="text-muted text-lg max-w-[500px] mx-auto leading-relaxed">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center animate-fade-up [animation-delay:0.1s]">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-1.5 rounded-full text-sm text-muted glass hover:bg-white/70 hover:text-green transition-all"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post, i) => (
              <article
                key={post.id}
                className="glass-card glass-card-hover rounded-xl p-6 animate-fade-up"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <div className="flex items-center gap-3 text-xs text-muted mb-3">
                  <span className="bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                </div>
                <h2 className="text-xl font-bold leading-snug mb-2">{post.title}</h2>
                <p className="text-muted text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center gap-1 text-green font-bold text-sm hover:gap-2 transition-all"
                >
                  {t('blog.readMore')}
                  <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
