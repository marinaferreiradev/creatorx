import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold transition-[transform,box-shadow,border-color,background-color,color] duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-brand to-brand-bright text-white shadow-[0_8px_30px_-8px_rgba(8,102,245,0.7)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(0,140,255,0.85)] active:translate-y-0 disabled:hover:translate-y-0',
  secondary:
    'border border-white/15 bg-white/[0.03] text-white backdrop-blur hover:border-brand-bright/60 hover:bg-brand/10',
  ghost: 'text-slate-200 hover:text-white',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-[52px] px-7 text-[15px]',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </a>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
