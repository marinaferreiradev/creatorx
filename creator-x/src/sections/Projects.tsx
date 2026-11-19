import { ArrowUpRight, Clock3, Info } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { projects } from '@/data/projects';
import { SectionHeading } from '@/components/SectionHeading';
import { ProjectMock } from '@/components/ProjectMock';
import { useReveal } from '@/hooks/useReveal';

export function Projects() {
  const ref = useReveal<HTMLElement>();
  const { projects: copy } = siteConfig.content;
  const hasDemos = projects.some((p) => p.isDemo);

  return (
    <section ref={ref} id="projetos" aria-labelledby="projetos-title" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline opacity-40" aria-hidden />
      <div className="container-site">
        <SectionHeading id="projetos-title" eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

        {hasDemos && (
          <p
            data-reveal
            className="mx-auto mt-8 flex w-fit max-w-full items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-slate-300"
          >
            <Info size={16} className="mt-0.5 shrink-0 text-brand-bright" />
            {copy.demoNotice}
          </p>
        )}

        <ul data-reveal-group className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <article className="card-surface group flex h-full flex-col overflow-hidden transition-[transform,box-shadow,border-color,background-color,color] duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_30px_60px_-30px_rgba(8,102,245,0.6)]">
                <div className="relative aspect-[16/11] overflow-hidden border-b border-white/[0.06]">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`Prévia do projeto ${project.title}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <ProjectMock variant={project.mockVariant ?? 'institutional'} />
                  )}
                  {project.isDemo && (
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-brand-ink/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-200 backdrop-blur">
                      Exemplo de layout
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-bright">
                    {project.category}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2.5 flex-1 leading-relaxed text-brand-muted">{project.description}</p>

                  <div className="mt-6 border-t border-white/[0.06] pt-5">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-brand-bright"
                      >
                        Ver projeto
                        <ArrowUpRight size={16} />
                        <span className="sr-only">(abre em nova aba)</span>
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="inline-flex cursor-not-allowed items-center gap-2 text-sm font-medium text-slate-500"
                        title="Projeto será adicionado em breve"
                      >
                        <span className="line-through decoration-slate-600">Ver projeto</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.05] px-2 py-0.5 text-xs text-slate-400">
                          <Clock3 size={12} />
                          Em breve
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
