import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Quote, ArrowRight, ChevronRight, Clock, Lightbulb, X } from 'lucide-react';
import { testimonials, type Testimonial, type ProgressEntry } from '../data/testimonials';

function ProgressModal({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 md:p-8 md:pt-12 overflow-y-auto">
      <div className="fixed inset-0 bg-[rgba(10,20,30,0.6)] backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-strong rounded-2xl w-full max-w-[640px] md:max-w-4xl animate-scale-in overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/30 transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="p-7 md:p-9">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-muted text-xs">{testimonial.age} years · {testimonial.location}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="glass rounded-full px-2.5 py-1 text-xs text-muted">
                  {testimonial.category}
                </span>
                <span className="glass rounded-full px-2.5 py-1 text-xs text-muted">
                  {testimonial.conditionDuration}
                </span>
              </div>
            </div>
          </div>

          {/* Quotes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="glass rounded-xl p-4">
              <Quote size={16} className="text-rose mb-2" />
              <p className="text-sm text-muted italic leading-relaxed">"{testimonial.initialQuote}"</p>
              <p className="text-xs text-muted/60 mt-1.5">{t('testimonialCarousel.before')}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <Quote size={16} className="text-green mb-2" />
              <p className="text-sm text-muted italic leading-relaxed">"{testimonial.resultQuote}"</p>
              <p className="text-xs text-muted/60 mt-1.5">{t('testimonialCarousel.now')}</p>
            </div>
          </div>

          {/* Summary */}
          <p className="text-sm text-muted leading-relaxed mb-6 glass rounded-xl p-4">
            {testimonial.summary}
          </p>

          {/* Progress Timeline */}
          <h4 className="font-bold text-xs text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
            <Clock size={14} />
            {t('testimonialCarousel.progressJourney')}
          </h4>
          <div className="max-h-[400px] overflow-y-auto space-y-3 pr-1 scroll-smooth" style={{ scrollbarWidth: 'thin', msOverflowStyle: 'auto' }}>
            {testimonial.progressHistory.map((entry, i) => (
              <ProgressEntryCard
                key={entry.id}
                entry={entry}
                index={i}
                isLast={i === testimonial.progressHistory.length - 1}
                expandedTip={expandedTip}
                onToggleTip={setExpandedTip}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressEntryCard({
  entry,
  index,
  isLast,
  expandedTip,
  onToggleTip,
}: {
  entry: ProgressEntry;
  index: number;
  isLast: boolean;
  expandedTip: string | null;
  onToggleTip: (id: string | null) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="relative flex gap-4">
      {/* Timeline line */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-7 h-7 rounded-full gradient-green flex items-center justify-center text-xs font-bold text-white relative z-10">
          {index + 1}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-[rgba(42,157,143,0.2)] mt-1" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-1">
            <h5 className="font-bold text-sm">{entry.title}</h5>
            <span className="text-xs text-muted bg-white/30 px-2 py-0.5 rounded-full">
              {entry.date}
            </span>
          </div>
          <p className="text-sm text-muted leading-relaxed mb-3">{entry.description}</p>

          {/* Notes */}
          <div className="glass rounded-lg p-3 mb-3">
            <p className="text-xs text-muted/80 leading-relaxed">
              <span className="font-semibold text-muted">{t('testimonialCarousel.note')} </span>
              {entry.notes}
            </p>
          </div>

          {/* Tips */}
          <button
            onClick={() => onToggleTip(expandedTip === entry.id ? null : entry.id)}
            className="flex items-center gap-1.5 text-xs text-green font-semibold hover:gap-2 transition-all"
          >
            <Lightbulb size={14} />
            {t('testimonialCarousel.tips', { count: entry.tips.length })}
            <ChevronRight
              size={14}
              className={`transition-transform ${expandedTip === entry.id ? 'rotate-90' : ''}`}
            />
          </button>
          {expandedTip === entry.id && (
            <div className="mt-3 space-y-1.5 animate-fade-up">
              {entry.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted">
                  <span className="w-4 h-4 rounded-full bg-green/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-green" />
                  </span>
                  {tip}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const cardAccents = [
  'from-rose/10 via-transparent to-transparent',
  'from-green/10 via-transparent to-transparent',
  'from-gold/10 via-transparent to-transparent',
  'from-purple-400/10 via-transparent to-transparent',
  'from-ocean-teal/10 via-transparent to-transparent',
];

function CarouselCard({
  testimonial,
  onViewDetails,
  isActive,
  index,
}: {
  testimonial: Testimonial;
  onViewDetails: () => void;
  isActive: boolean;
  index: number;
}) {
  const { t } = useTranslation();
  return (
    <div
      className={`shrink-0 w-[260px] md:w-[300px] glass-card rounded-xl p-4 cursor-pointer transition-all duration-300 relative overflow-hidden ${
        isActive ? 'glass-card-hover scale-[1.02]' : 'opacity-50 hover:opacity-90'
      }`}
      onClick={onViewDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onViewDetails(); }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${cardAccents[index % cardAccents.length]}`} />
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <img src={testimonial.avatar} alt={testimonial.name} className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-white/40" />
          <div>
            <h3 className="font-bold text-xs text-ink">{testimonial.name}</h3>
            <p className="text-muted text-[10px]">{testimonial.age} · {testimonial.location}</p>
          </div>
        </div>

        {/* Quote */}
        <p className="text-xs text-ink/70 leading-relaxed mb-2 line-clamp-2 italic">
          "{testimonial.resultQuote}"
        </p>

        {/* Steps + CTA */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted/70">
            {t('testimonialCarousel.progressUpdate', { count: testimonial.progressHistory.length })}
          </span>
          <span className="inline-flex items-center gap-0.5 text-[10px] text-green font-semibold">
            {t('testimonialCarousel.viewDetails')}
            <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialCarousel() {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const isPaused = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();

  const featured = testimonials.filter((t) => t.featured);
  const allDoubled = [...testimonials, ...testimonials];

  const pause = useCallback(() => {
    isPaused.current = true;
    clearTimeout(idleTimer.current);
  }, []);

  const resume = useCallback(() => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      isPaused.current = false;
    }, 3000);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.5;
    let animId: number;

    function tick() {
      if (!scrollRef.current) return;
      if (!isPaused.current) {
        scrollRef.current.scrollLeft += speed;
        const halfway = scrollRef.current.scrollWidth / 2;
        if (scrollRef.current.scrollLeft >= halfway) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div>
      {/* Featured cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {featured.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-xl p-6 cursor-pointer glass-card-hover"
            onClick={() => setSelectedTestimonial(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setSelectedTestimonial(item); }}
          >
            <div className="flex items-center gap-3 mb-3">
              <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div>
                <h3 className="font-bold text-sm">{item.name}</h3>
                <p className="text-muted text-xs">{item.age} · {item.location}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="glass rounded-full px-2 py-0.5 text-xs text-muted">{item.category}</span>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-3">"{item.resultQuote}"</p>
            <p className="text-xs text-muted/70 line-clamp-2 mb-3">{item.summary}</p>
            <div className="flex items-center gap-1 text-xs text-green font-semibold">
              {t('testimonialCarousel.seeFullJourney')} <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>

      {/* Carousel title */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-xs text-muted uppercase tracking-widest">
          {t('testimonialCarousel.allStories')}
        </h3>
      </div>

      {/* Scrollable carousel */}
      <div
        ref={scrollRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        className="flex gap-3 overflow-x-hidden pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {allDoubled.map((t, i) => (
          <div key={`${t.id}-${i}`} className="shrink-0">
            <CarouselCard
              testimonial={t}
              onViewDetails={() => setSelectedTestimonial(t)}
              isActive={false}
              index={i}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTestimonial && (
        <ProgressModal
          testimonial={selectedTestimonial}
          onClose={() => setSelectedTestimonial(null)}
        />
      )}
    </div>
  );
}
