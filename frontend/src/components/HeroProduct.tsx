import { useEffect, useState } from 'react';
import { Star, ShoppingCart, Shield, AlertTriangle, ExternalLink, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProducts, type Product } from '../data/useProducts';
import ProductImage from './ProductImage';

function EvidenceBadge({ level }: { level: Product['evidenceLevel'] }) {
  const { t } = useTranslation();
  const colors = {
    Strong: 'bg-green/20 text-green border-green/30',
    Moderate: 'bg-gold/20 text-gold border-gold/30',
    Emerging: 'bg-rose/20 text-rose border-rose/30',
  };
  const levelLabel = t(`heroProduct.evidenceLevels.${level.toLowerCase()}`);
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${colors[level]}`}>
      <Info size={12} />
      {t('heroProduct.evidence', { level: levelLabel })}
    </span>
  );
}

export default function HeroProduct() {
  const { t } = useTranslation();
  const products = useProducts();
  const p = products.find((x) => x.isHero) ?? products[0];
  const [selectedOptionId, setSelectedOptionId] = useState(p.purchaseOptions?.[0]?.id ?? '');

  useEffect(() => {
    setSelectedOptionId(p.purchaseOptions?.[0]?.id ?? '');
  }, [p.id, p.purchaseOptions]);

  const selectedOption = p.purchaseOptions?.find((option) => option.id === selectedOptionId) ?? p.purchaseOptions?.[0];
  const heroImage = selectedOption?.imageUrl ?? p.imageUrl;
  const heroDosage = selectedOption?.dosage ?? p.dosage;
  const heroBestTime = p.bestTime;
  const heroAffiliateUrl = selectedOption?.affiliateUrl ?? p.affiliateUrl;

  return (
    <section className="relative overflow-hidden rounded-2xl mb-8">
      <div className="absolute inset-0 gradient-green opacity-10" />
      <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[35%] h-[35%] rounded-full bg-leaf/10 blur-3xl" />

      <div className="relative glass-strong rounded-2xl p-7 md:p-9">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8 items-start">
          {/* Main content */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full gradient-green text-xs font-bold text-white">
                {t('heroProduct.editorsPick')}
              </span>
              <EvidenceBadge level={p.evidenceLevel} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black leading-[1.05] mt-3 mb-1">{p.name}</h2>
            <p className="text-muted text-sm mb-1">{p.brand}</p>

            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < p.rating ? 'text-gold fill-gold' : 'text-muted/30'}
                />
              ))}
            </div>

            <p className="text-sm text-muted leading-relaxed mb-4">{p.shortDesc}</p>

            {p.purchaseOptions && p.purchaseOptions.length > 0 && (
              <div className="glass rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-xs text-muted uppercase tracking-widest">
                    Choose your format
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {p.purchaseOptions.map((option) => {
                    const active = option.id === (selectedOption?.id ?? p.purchaseOptions?.[0]?.id);
                    const optionLink = option.affiliateUrl ?? p.affiliateUrl;
                    return (
                      <div
                        key={option.id}
                        className={`text-left rounded-xl border px-4 py-3 transition-all h-full flex flex-col ${
                          active
                            ? 'border-green bg-green/10 shadow-sm shadow-green/10'
                            : 'border-white/20 bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedOptionId(option.id)}
                          className="w-full text-left flex-1"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-semibold text-sm text-ink">{option.label}</span>
                            <div className="flex items-center gap-2">
                              {option.supplyBadge && (
                                <span className="rounded-full bg-green/15 text-green px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                                  {option.supplyBadge}
                                </span>
                              )}
                              {active && <span className="text-[11px] font-bold uppercase tracking-widest text-green">Selected</span>}
                            </div>
                          </div>
                          <p className="text-xs text-muted mt-1">{option.subtitle}</p>
                          <p className="text-xs text-muted/80 mt-2">{option.packInfo}</p>
                        </button>
                        <a
                          href={optionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-green px-3 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-green/20 hover:opacity-95 transition-opacity"
                        >
                          <ShoppingCart size={14} />
                          Buy this version
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    );
                  })}
                </div>
                {selectedOption && (
                  <p className="text-xs text-muted/70 mt-3 leading-relaxed">
                    {selectedOption.note}
                  </p>
                )}
              </div>
            )}

            {/* Why it helps */}
            <div className="glass rounded-xl p-5 mb-4">
              <h4 className="font-bold text-sm text-green mb-2 flex items-center gap-1.5">
                <Shield size={16} />
                {t('heroProduct.whyHelps')}
              </h4>
              <p className="text-sm text-muted leading-relaxed">{p.whyItHelps}</p>
            </div>

            {/* How it works */}
            <details className="group mb-4">
              <summary className="flex items-center gap-1.5 text-sm text-muted font-semibold cursor-pointer hover:text-green transition-colors list-none">
                <Info size={14} />
                {t('heroProduct.howWorks')}
                <span className="ml-auto text-muted transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="text-sm text-muted/80 mt-2 leading-relaxed glass rounded-xl p-4">{p.howItWorks}</p>
            </details>

            {/* Evidence note */}
            <p className="text-xs text-muted/60 italic mb-4">
              {p.evidenceNote}
            </p>

            {/* Dosage & timing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <div className="glass rounded-xl p-4">
                <span className="font-bold text-xs text-muted uppercase tracking-widest block mb-1">{t('heroProduct.dosage')}</span>
                <p className="text-sm text-muted">{heroDosage}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <span className="font-bold text-xs text-muted uppercase tracking-widest block mb-1">{t('heroProduct.bestTime')}</span>
                <p className="text-sm text-muted">{heroBestTime}</p>
              </div>
            </div>

            {/* Ingredients */}
            <div className="glass rounded-xl p-4 mb-5">
              <span className="font-bold text-xs text-muted uppercase tracking-widest block mb-2">{t('heroProduct.keyIngredients')}</span>
              <ul className="space-y-1">
                {p.keyIngredients.map((ing) => (
                  <li key={ing} className="flex items-start gap-2 text-sm text-muted">
                    <span className="w-1 h-1 rounded-full bg-green mt-2 shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a
              href={heroAffiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-base button-primary gap-2 shadow-lg shadow-green/20"
            >
              <ShoppingCart size={18} />
              {t('heroProduct.cta')}
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Right panel */}
          <div className="space-y-3">
            <div className="flex justify-center">
              <ProductImage name={p.name} category={p.category} imageUrl={heroImage} size="xxl" />
            </div>

            <div className="glass rounded-xl p-5">
              <div className="flex items-center gap-1.5 font-bold text-xs text-green uppercase tracking-widest mb-3">
                <Shield size={14} />
                {t('heroProduct.suitable')}
              </div>
              <ul className="space-y-2">
                {p.suitableFor.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted">
                    <span className="w-5 h-5 rounded-full bg-green/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-xl p-5">
              <div className="flex items-center gap-1.5 font-bold text-xs text-rose uppercase tracking-widest mb-3">
                <AlertTriangle size={14} />
                {t('heroProduct.notSuitable')}
              </div>
              <ul className="space-y-2">
                {p.notSuitableFor.map((n) => (
                  <li key={n} className="flex items-start gap-2 text-sm text-muted">
                    <span className="w-5 h-5 rounded-full bg-rose/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose" />
                    </span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-xl p-5">
              <div className="flex items-center gap-1.5 font-bold text-xs text-gold uppercase tracking-widest mb-3">
                <AlertTriangle size={14} />
                {t('heroProduct.safety')}
              </div>
              <ul className="space-y-2">
                {p.safety.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted">
                    <span className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        {p.testimonialText && (
          <div className="glass rounded-xl p-5 mt-6 flex items-start gap-4">
            {p.testimonialImage ? (
              <img src={p.testimonialImage} alt={p.testimonialAuthor || 'Testimonial'} className="w-12 h-12 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-full avatar-gradient flex items-center justify-center shrink-0 text-white font-bold text-lg">
                {p.testimonialAuthor?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              <p className="text-sm text-muted leading-relaxed italic">"{p.testimonialText}"</p>
              {p.testimonialAuthor && (
                <p className="text-xs text-muted/60 mt-2 font-semibold">— {p.testimonialAuthor}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
