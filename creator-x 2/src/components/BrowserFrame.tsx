import type { ReactNode } from 'react';

interface BrowserFrameProps {
  children: ReactNode;
  className?: string;
  url?: string;
}

/** Moldura de navegador estilizada usada nas ilustrações de interface. */
export function BrowserFrame({ children, className = '', url = 'creatorx' }: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#071428] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="mx-auto flex h-5 w-1/2 min-w-0 items-center justify-center rounded-md bg-white/[0.05] px-2 text-[10px] text-slate-500">
          <span className="truncate">{url}</span>
        </div>
        <span className="w-[42px]" aria-hidden />
      </div>
      {children}
    </div>
  );
}

/** Barra de "texto" esquemática. */
export const Bar = ({ className = '' }: { className?: string }) => (
  <span className={`block rounded-full bg-white/10 ${className}`} />
);
