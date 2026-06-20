import type { ComponentType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type IconType = ComponentType<{ size?: number | string; className?: string }>;

/* ---------- Banner (error / success) ---------- */
export function AuthBanner({
  tone,
  children,
}: {
  tone: 'error' | 'success';
  children: ReactNode;
}) {
  const cls =
    tone === 'error'
      ? 'bg-rose/10 border-rose/20 text-rose'
      : 'bg-leaf/10 border-leaf/20 text-green';
  return (
    <div className={`mb-4 p-3 rounded-xl border text-sm animate-fade-in ${cls}`}>
      {children}
    </div>
  );
}

/* ---------- Labeled input with optional leading icon ---------- */
export function AuthField({
  label,
  icon: Icon,
  children,
}: {
  label: ReactNode;
  icon?: IconType;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-semibold mb-1.5 block">{label}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />}
        {children}
      </div>
    </div>
  );
}

/* ---------- 6-digit OTP code input (digits only, monospace tracking) ---------- */
export function OtpInput({
  value,
  onChange,
  placeholder = '000000',
  length = 6,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  length?: number;
}) {
  return (
    <input
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, length))}
      placeholder={placeholder}
      required
      maxLength={length}
      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-center text-2xl tracking-[0.5em] font-bold outline-none transition-all"
    />
  );
}

/* ---------- Shared auth screen shell ---------- */
export function AuthCard({
  icon: Icon,
  title,
  subtitle,
  back,
  children,
  footer,
}: {
  icon: IconType;
  title: string;
  subtitle?: string;
  /** Back link rendered at the top of the card. */
  back: { label: string; to?: string; onClick?: () => void };
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Soft ambient backdrop so the floating card isn't sparse */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[12%] w-[40vw] h-[40vw] max-w-[420px] max-h-[420px] rounded-full bg-ocean-teal/15 blur-3xl animate-float-slow" />
        <div className="absolute bottom-[8%] right-[10%] w-[36vw] h-[36vw] max-w-[380px] max-h-[380px] rounded-full bg-leaf/15 blur-3xl animate-float-slower" />
      </div>

      <div className="w-full max-w-sm glass-card rounded-2xl p-8 animate-fade-up">
        {back.to ? (
          <Link to={back.to} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green no-underline mb-6">
            <ArrowLeft size={16} />
            {back.label}
          </Link>
        ) : (
          <button type="button" onClick={back.onClick} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green mb-6">
            <ArrowLeft size={16} />
            {back.label}
          </button>
        )}

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center shadow-lg shadow-green/20">
            <Icon size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold leading-tight">{title}</h1>
            {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
          </div>
        </div>

        {children}
        {footer}
      </div>
    </div>
  );
}
