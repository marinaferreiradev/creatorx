import type { ReactNode } from 'react';
import { CheckCircle2, Gauge, MonitorSmartphone } from 'lucide-react';
import logoMark from '@/assets/creator-x-mark-256.png';
import { BrowserFrame, Bar } from './BrowserFrame';

/**
 * Composição visual do hero: prévia estilizada de um site em perspectiva,
 * com um trecho de código e um celular flutuando à frente.
 * Feita 100% com HTML/CSS — sem imagens genéricas.
 *
 * data-depth   → intensidade do parallax com o mouse (px)
 * data-hero-float → flutuação contínua sutil
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[600px] [perspective:1600px]" aria-hidden>
      {/* Halo atrás da composição */}
      <div className="absolute inset-[12%] rounded-full bg-brand/30 blur-[80px]" />

      {/* Janela principal */}
      <div data-depth="14" className="absolute inset-x-[4%] top-[6%]">
        <div className="[transform:rotateY(-14deg)_rotateX(6deg)] [transform-style:preserve-3d]">
          <BrowserFrame url="seusite.com.br" className="ring-1 ring-brand/20">
            <div className="flex flex-col gap-4 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <img src={logoMark} alt="" className="h-3.5 w-auto opacity-90" />
                <div className="hidden gap-3 sm:flex">
                  <Bar className="h-1.5 w-8" />
                  <Bar className="h-1.5 w-8" />
                  <Bar className="h-1.5 w-8" />
                </div>
                <span className="h-4 w-14 rounded-full bg-brand" />
              </div>

              <div className="grid grid-cols-5 gap-4 pt-2">
                <div className="col-span-3 flex flex-col gap-2.5">
                  <span className="h-2 w-20 rounded-full bg-brand-bright/30" />
                  <Bar className="h-3.5 w-full bg-white/25" />
                  <Bar className="h-3.5 w-4/5 bg-white/25" />
                  <Bar className="mt-1 h-1.5 w-full" />
                  <Bar className="h-1.5 w-5/6" />
                  <div className="mt-2 flex gap-2">
                    <span className="h-5 w-16 rounded-full bg-gradient-to-r from-brand to-brand-bright" />
                    <span className="h-5 w-16 rounded-full border border-white/15" />
                  </div>
                </div>
                <div className="relative col-span-2 overflow-hidden rounded-lg border border-white/[0.06] bg-gradient-to-br from-brand/50 via-brand/20 to-transparent">
                  <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-brand-bright/40 blur-2xl" />
                  <div className="absolute inset-3 rounded-md border border-white/10" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5">
                    <span className="h-4 w-4 rounded-md bg-brand/50" />
                    <Bar className="h-1.5 w-4/5" />
                    <Bar className="h-1 w-3/5" />
                  </div>
                ))}
              </div>
            </div>
          </BrowserFrame>
        </div>
      </div>

      {/* Card de código */}
      <div data-depth="34" className="absolute bottom-[4%] left-0 w-[52%] sm:left-[-4%]">
        <div data-hero-float>
          <div className="rounded-xl border border-white/10 bg-[#050f22]/90 p-4 font-mono text-[10.5px] leading-[1.75] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md sm:text-[11.5px]">
            <div className="mb-2 flex items-center gap-2 text-[10px] text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-bright" />
              Hero.tsx
            </div>
            <p>
              <span className="text-brand-bright">export function</span> <span className="text-white">Hero</span>
              <span className="text-slate-500">() {'{'}</span>
            </p>
            <p className="pl-3">
              <span className="text-brand-bright">return</span> <span className="text-slate-500">(</span>
            </p>
            <p className="pl-6 text-slate-400">
              {'<'}
              <span className="text-[#7cb8ff]">Experience</span>
            </p>
            <p className="pl-9">
              <span className="text-[#7cb8ff]">design</span>
              <span className="text-slate-500">=</span>
              <span className="text-emerald-300/80">"premium"</span>
            </p>
            <p className="pl-9">
              <span className="text-[#7cb8ff]">responsive</span>
              <span className="text-slate-400"> /{'>'}</span>
            </p>
            <p className="pl-3 text-slate-500">);</p>
            <p className="text-slate-500">{'}'}</p>
          </div>
        </div>
      </div>

      {/* Celular */}
      <div data-depth="26" className="absolute bottom-[2%] right-[2%] w-[24%] sm:right-[-2%]">
        <div data-hero-float>
          <div className="rounded-[22px] border border-white/15 bg-[#06122a] p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]">
            <div className="flex aspect-[9/18] flex-col gap-2 overflow-hidden rounded-[17px] bg-gradient-to-b from-[#0a1d3d] to-brand-ink p-2.5">
              <span className="mx-auto h-1 w-8 rounded-full bg-white/15" />
              <span className="mt-1 h-2 w-8 rounded-full bg-brand-bright/60" />
              <Bar className="h-2 w-full bg-white/25" />
              <Bar className="h-2 w-3/4 bg-white/25" />
              <Bar className="h-1 w-full" />
              <span className="mt-1 h-3.5 w-3/5 rounded-full bg-brand" />
              <div className="mt-auto aspect-square rounded-lg bg-gradient-to-br from-brand/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Chips de atributos (sem números inventados) */}
      <div data-depth="40" className="absolute right-[8%] top-0 hidden sm:block">
        <div data-hero-float>
          <Chip icon={<MonitorSmartphone size={14} />} label="Responsivo" />
        </div>
      </div>
      <div data-depth="22" className="absolute left-[-2%] top-[34%] hidden md:block">
        <div data-hero-float>
          <Chip icon={<Gauge size={14} />} label="Performance" />
        </div>
      </div>
      <div data-depth="30" className="absolute bottom-[34%] right-[24%] hidden lg:block">
        <div data-hero-float>
          <Chip icon={<CheckCircle2 size={14} />} label="Pronto para publicar" />
        </div>
      </div>
    </div>
  );
}

function Chip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-brand-navy/80 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md">
      <span className="text-brand-bright">{icon}</span>
      {label}
    </div>
  );
}
