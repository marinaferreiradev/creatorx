import { ImagePlus, PenTool, CodeXml, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { team, teamPlaceholderSlots } from '@/data/team';
import { useReveal } from '@/hooks/useReveal';
import logoMark from '@/assets/creator-x-mark-256.png';

const pillarIcons = [PenTool, CodeXml, ShieldCheck];

export function About() {
  const ref = useReveal<HTMLElement>();
  const { about } = siteConfig.content;

  return (
    <section ref={ref} id="sobre" aria-labelledby="sobre-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-brand/15 blur-[120px]" aria-hidden />

      <div className="container-site grid gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Coluna de texto */}
        <div>
          <span className="eyebrow" data-reveal>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-bright" aria-hidden />
            {about.eyebrow}
          </span>
          <h2
            id="sobre-title"
            data-reveal
            className="mt-6 text-balance text-[2.2rem] font-semibold leading-[1.05] text-white sm:text-5xl lg:text-[3.4rem]"
          >
            {about.title} <span className="text-gradient">{about.titleHighlight}</span>
          </h2>

          <div className="mt-8 space-y-5">
            {about.paragraphs.map((p) => (
              <p key={p} data-reveal className="text-pretty text-lg leading-relaxed text-brand-muted">
                {p}
              </p>
            ))}
          </div>

          <p data-reveal className="mt-6 text-xs uppercase tracking-[0.14em] text-slate-500">
            {about.placeholderNote}
          </p>

          <ul data-reveal-group className="mt-10 grid gap-4 sm:grid-cols-3">
            {about.pillars.map((pillar, i) => {
              const Icon = pillarIcons[i % pillarIcons.length];
              return (
                <li key={pillar.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <Icon size={20} className="text-brand-bright" strokeWidth={1.75} />
                  <h3 className="mt-4 text-[15px] font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{pillar.text}</p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Coluna visual: espaço para fotos da equipe */}
        <div data-reveal className="relative">
          <div className="card-surface relative overflow-hidden p-6 sm:p-8">
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
            <img
              src={logoMark}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -right-10 w-64 opacity-[0.07]"
            />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Nossa equipe</span>
                {team.length === 0 && <span className="text-xs text-slate-500">Fotos em breve</span>}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {team.length > 0
                  ? team.map((m) => (
                      <figure key={m.name} className="flex flex-col gap-3">
                        <div className="aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-brand-navy">
                          {m.photo && (
                            <img src={m.photo} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
                          )}
                        </div>
                        <figcaption>
                          <p className="text-sm font-semibold text-white">{m.name}</p>
                          <p className="text-xs text-brand-muted">{m.role}</p>
                        </figcaption>
                      </figure>
                    ))
                  : Array.from({ length: teamPlaceholderSlots }).map((_, i) => (
                      <div key={i} className={`flex flex-col gap-3 ${i === 2 ? 'hidden sm:flex' : ''}`}>
                        <div className="flex aspect-[4/5] items-center justify-center rounded-xl border border-dashed border-white/15 bg-brand-ink/50 text-slate-600">
                          <ImagePlus size={26} strokeWidth={1.5} aria-hidden />
                          <span className="sr-only">Espaço reservado para foto da equipe</span>
                        </div>
                        <div className="space-y-1.5" aria-hidden>
                          <span className="block h-2 w-3/4 rounded-full bg-white/10" />
                          <span className="block h-1.5 w-1/2 rounded-full bg-white/[0.06]" />
                        </div>
                      </div>
                    ))}
              </div>

              <div className="mt-8 rounded-xl border border-brand/20 bg-brand/[0.07] p-5">
                <p className="font-display text-lg font-medium leading-snug text-white">
                  Design, estratégia e tecnologia trabalhando juntos em cada projeto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
