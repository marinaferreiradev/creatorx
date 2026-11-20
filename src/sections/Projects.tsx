import { ArrowUpRight, Info } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { projects, projectTypeLabels, type Project } from '@/data/projects';
import { SectionHeading } from '@/components/SectionHeading';
import { useReveal } from '@/hooks/useReveal';

const hostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

export function Projects() {
  const ref = useReveal<HTMLElement>();
  const { projects: copy } = siteConfig.content;
  const hasConcept = projects.some((p) => p.type === 'conceitual');

  return (
    <section ref={ref} id="projetos" aria-labelledby="projetos-title" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline opacity-40" aria-hidden />
      <div className="container-site">
        <SectionHeading id="projetos-title" eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

        <ul data-reveal-group className="mx-auto mt-16 grid max-w-xl gap-6 lg:max-w-none lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id} className="flex">
              <ProjectCard project={project} exploreLabel={copy.exploreLabel} />
            </li>
          ))}
        </ul>

        {hasConcept && (
          <p
            data-reveal
            className="mx-auto mt-10 flex max-w-2xl items-start gap-2.5 text-sm leading-relaxed text-slate-400 lg:justify-center lg:text-center"
          >
            <Info size={16} className="mt-0.5 shrink-0 text-brand-bright" aria-hidden />
            {copy.conceptNote}
          </p>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, exploreLabel }: { project: Project; exploreLabel: string }) {
  const isReal = project.type === 'real';

  return (
    <article className="card-surface group flex w-full flex-col overflow-hidden transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_30px_60px_-30px_rgba(8,102,245,0.55)]">
      {/* Captura do site em uma moldura de navegador discreta */}
      <div className="p-3 pb-0">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className="block overflow-hidden rounded-xl border border-white/[0.08] bg-brand-ink"
        >
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2">
            <span className="flex gap-1" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            </span>
            <span className="min-w-0 truncate text-[11px] text-slate-500">{hostname(project.url)}</span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt=""
              width={800}
              height={500}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-brand-ink/80 via-brand-ink/10 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-white/15 bg-brand-ink/80 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur transition-transform duration-500 group-hover:translate-y-0">
                {exploreLabel}
                <ArrowUpRight size={14} className="text-brand-bright" />
              </span>
            </div>
          </div>
        </a>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
            isReal ? 'border-brand/40 bg-brand/15 text-brand-bright' : 'border-white/15 bg-white/[0.03] text-slate-300'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isReal ? 'bg-brand-bright' : 'bg-slate-400'}`} aria-hidden />
          {projectTypeLabels[project.type]}
        </span>

        <h3 className="mt-5 text-xl font-semibold text-white">{project.title}</h3>
        <dl className="mt-2 space-y-0.5 text-[13px] leading-snug">
          <div>
            <dt className="sr-only">Categoria</dt>
            <dd className="font-semibold text-brand-bright">{project.category}</dd>
          </div>
          <div>
            <dt className="sr-only">Segmento</dt>
            <dd className="text-slate-500">{project.segment}</dd>
          </div>
        </dl>
        <p className="mt-4 text-[15px] leading-relaxed text-brand-muted">{project.description}</p>

        <ul className="mt-5 flex flex-1 flex-wrap content-start gap-2" aria-label={`Destaques de ${project.title}`}>
          {project.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-xs text-slate-300"
            >
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/[0.06] pt-6">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 text-sm font-semibold text-white transition-[border-color,background-color,color] duration-300 hover:border-brand-bright/60 hover:bg-brand/10"
          >
            Ver projeto
            <ArrowUpRight
              size={16}
              className="text-brand-bright transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="sr-only">: {project.title} (abre em nova aba)</span>
          </a>
          {project.extraLinks?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {link.label}
              <ArrowUpRight size={14} />
              <span className="sr-only"> do {project.title} (abre em nova aba)</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
