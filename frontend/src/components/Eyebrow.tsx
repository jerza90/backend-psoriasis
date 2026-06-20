import type { ComponentType, ReactNode } from 'react';

type EyebrowProps = {
  /** Optional Lucide icon component. */
  icon?: ComponentType<{ size?: number | string; className?: string }>;
  children: ReactNode;
  /** Override the default green accent color. Pass a token like 'rose' | 'gold' | 'green'. */
  tone?: 'green' | 'rose' | 'gold';
  className?: string;
};

/**
 * The repeating "icon + uppercase tracked label" badge used on nearly every
 * page section header. Centralized here to keep spacing/color consistent.
 *
 * Renders:
 *   <span className="eyebrow ...">
 *     {icon && <Icon size={14} />}
 *     {children}
 *   </span>
 */
export default function Eyebrow({ icon: Icon, children, tone = 'green', className = '' }: EyebrowProps) {
  const toneClass = tone === 'green' ? '' : tone === 'rose' ? 'text-rose' : 'text-gold';
  return (
    <span className={`eyebrow ${toneClass} ${className}`.trim().replace(/\s+/g, ' ')}>
      {Icon && <Icon size={14} />}
      {children}
    </span>
  );
}
