import { useLayoutEffect } from 'react';
import { siteConfig } from '@/config/site';
import { processSteps } from '@/data/process';
import { SectionHeading } from '@/components/SectionHeading';
import { useReveal } from '@/hooks/useReveal';
import { gsap, MOTION_OK } from '@/lib/gsap';

export function Process() {
  const ref = useReveal<HTMLElement>();
  const { process } = siteConfig.content;

  // Linha de conexão que "se desenha" conforme a rolagem
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        '[data-process-line]',
        { scaleX: 0, scaleY: 0 },
        {
          scaleX: 1,
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-process-list]', start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
        },
      );
    });
    return () => mm.revert();
  }, [ref]);

  return (
    <section ref={ref} id="processo" aria-labelledby="processo-title" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline opacity-40" aria-hidden />
      <div className="container-site">
        <SectionHeading id="processo-title" eyebrow={process.eyebrow} title={process.title} subtitle={process.subtitle} />

        <div data-process-list className="relative mt-16 lg:mt-20">
          {/* Trilho + linha de progresso: horizontal no desktop, vertical no mobile */}
          <div className="absolute bottom-6 left-[27px] top-6 w-px bg-white/[0.08] lg:bottom-auto lg:left-[12.5%] lg:right-[12.5%] lg:top-[27px] lg:h-px lg:w-auto" aria-hidden>
            <div
              data-process-line
              className="h-full w-full origin-top bg-gradient-to-b from-brand-bright to-brand lg:origin-left lg:bg-gradient-to-r"
            />
          </div>

          <ol data-reveal-group className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <li key={step.number} className="group flex gap-6 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand/30 bg-brand-navy text-brand-bright shadow-[0_0_0_6px_#030914] transition-[transform,box-shadow,border-color,background-color,color] duration-500 group-hover:border-brand-bright group-hover:bg-brand group-hover:text-white">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <div className="lg:mt-8 lg:px-2">
                    <span className="font-display text-sm font-semibold tracking-widest text-brand-bright">
                      {step.number}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-2.5 leading-relaxed text-brand-muted">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
