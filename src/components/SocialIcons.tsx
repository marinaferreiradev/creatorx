import type { SVGProps } from 'react';

/** Ícones de redes sociais em traço, no mesmo estilo do Lucide (que não inclui marcas). */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const common = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export const InstagramIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...common(size)} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const LinkedinIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...common(size)} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
  </svg>
);

export const BehanceIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...common(size)} {...p}>
    <path d="M3 6h5a3 3 0 0 1 0 6H3zM3 12h5.5a3 3 0 0 1 0 6H3zM14 7h6M14 14.5h7a3.5 3.5 0 1 0-1 2.5" />
  </svg>
);
