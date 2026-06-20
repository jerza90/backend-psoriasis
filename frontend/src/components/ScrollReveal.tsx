import type { ElementType, ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

type ScrollRevealProps = {
  children: ReactNode;
  /** Delay in ms before the reveal transition kicks in (stagger). */
  delay?: number;
  /** Element/tag to render as. Defaults to div. */
  as?: ElementType;
  /** Extra classes to merge alongside reveal utilities. */
  className?: string;
};

/**
 * Wraps children in a scroll-triggered reveal.
 * Renders `<Tag className="reveal [reveal-visible] {className}" style={{ delay }}>`.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  as,
  className = '',
}: ScrollRevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
