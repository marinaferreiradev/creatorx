import { siteConfig } from '@/config/site';
import { services } from '@/data/services';
import { SectionHeading } from '@/components/SectionHeading';
import { useReveal } from '@/hooks/useReveal';

export function Services() {
  const ref = useReveal<HTMLElement>();
  const { services: copy } = siteConfig.content;

  return (
    <section ref={ref} id="servicos" aria-labelledby="servicos-title" className="relative py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading id="servicos-title" eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

        <ul data-reveal-group className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            // 3 cards na primeira linha e 2 mais largos na segunda (desktop)
            const span = i < 3 ? 'lg:col-span-2' : 'lg:col-span-3';
            return (
              <li
                key={service.id}
                className={`card-surface group relative overflow-hidden p-7 transition-[transform,box-shadow,border-color,background-color,color] duration-500 hover:-translate-y-1 hover:border-brand/40 sm:p-8 ${span} ${
                  i === services.length - 1 && services.length % 2 === 1 ? 'sm:col-span-2' : ''
                }`}
              >
                {/* Brilho no hover */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-brand/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div
                  className="hairline absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="relative flex h-full flex-col">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-7 text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-brand-muted">{service.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
