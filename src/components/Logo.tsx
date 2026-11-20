import logoMark from '@/assets/creator-x-mark-256.png';
import { siteConfig } from '@/config/site';

interface LogoProps {
  className?: string;
  /** Altura do símbolo em px. */
  size?: number;
  showWordmark?: boolean;
}

/**
 * Logo oficial da Creator X (símbolo extraído da arte original, proporções preservadas)
 * acompanhado do nome da marca.
 */
export function Logo({ className = '', size = 30, showWordmark = true }: LogoProps) {
  // Proporção original do símbolo recortado: 256 x 187
  const width = Math.round(size * (256 / 187));
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={logoMark}
        alt={showWordmark ? '' : siteConfig.name}
        width={width}
        height={size}
        style={{ width, height: size }}
        className="shrink-0 object-contain"
        decoding="async"
      />
      {showWordmark && (
        <span className="font-display text-[17px] font-semibold tracking-[0.14em] text-white">
          CREATOR<span className="text-brand-bright"> X</span>
        </span>
      )}
    </span>
  );
}
