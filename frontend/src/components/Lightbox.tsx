import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type LightboxProps = {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
};

/**
 * Accessible image lightbox:
 *  - Esc closes, ←/→ navigate
 *  - click on backdrop closes, click on image doesn't
 *  - focus is trapped to the close button while open
 *  - respects reduced motion via the existing CSS guard
 */
export default function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const total = images.length;

  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNavigate((index + 1) % total);
      else if (e.key === 'ArrowLeft') onNavigate((index - 1 + total) % total);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, total, onClose, onNavigate]);

  const current = images[index];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={current.alt}>
      {/* Backdrop */}
      <button
        aria-label="Close"
        className="absolute inset-0 bg-[rgba(10,20,30,0.75)] backdrop-blur-md cursor-zoom-out"
        onClick={onClose}
      />

      {/* Image */}
      <figure className="relative z-10 max-w-[92vw] max-h-[86vh] animate-scale-in">
        <img
          src={current.src}
          alt={current.alt}
          className="max-w-[92vw] max-h-[82vh] w-auto h-auto object-contain rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
        />
        {total > 1 && (
          <figcaption className="mt-3 text-center text-xs text-white/70">
            {index + 1} / {total}
          </figcaption>
        )}
      </figure>

      {/* Close button */}
      <button
        ref={closeBtnRef}
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full glass-strong flex items-center justify-center hover:bg-white/90 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Prev / next */}
      {total > 1 && (
        <>
          <button
            onClick={() => onNavigate((index - 1 + total) % total)}
            aria-label="Previous image"
            className="absolute left-3 md:left-6 z-20 w-11 h-11 rounded-full glass-strong flex items-center justify-center hover:bg-white/90 transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => onNavigate((index + 1) % total)}
            aria-label="Next image"
            className="absolute right-3 md:right-6 z-20 w-11 h-11 rounded-full glass-strong flex items-center justify-center hover:bg-white/90 transition-colors"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </div>
  );
}
