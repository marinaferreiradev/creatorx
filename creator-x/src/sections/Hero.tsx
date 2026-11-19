import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ButtonLink } from '@/components/Button';
import { HeroVisual } from '@/components/HeroVisual';
import { gsap, MOTION_OK } from '@/lib/gsap';

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { hero } = siteConfig.content;

  // Quebra o título em palavras para a animação de entrada, mantendo os destaques.
  const words = hero.title.flatMap((part) =>
    part.text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((w) => ({ text: w, highlight: part.highlight })),
  );

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el); // escopo: seletores só dentro do hero

    mm.add(MOTION_OK, () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero="eyebrow"]', { y: 16, autoAlpha: 0, duration: 0.7 })
        .from('[data-hero-word]', { yPercent: 110, duration: 1, stagger: 0.055 }, '-=0.35')
        .from('[data-hero="subtitle"]', { y: 18, autoAlpha: 0, duration: 0.8 }, '-=0.6')
        .from('[data-hero="cta"] > *', { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, '-=0.55')
        .from('[data-hero="highlights"] > *', { y: 10, autoAlpha: 0, duration: 0.6, stagger: 0.06 }, '-=0.5')
        .from('[data-hero="visual"]', { y: 40, autoAlpha: 0, scale: 0.96, duration: 1.3 }, 0.35)
        .from('[data-hero-float]', { y: 30, autoAlpha: 0, duration: 1, stagger: 0.12 }, 0.9)
        .from('[data-hero="glow"]', { autoAlpha: 0, duration: 2 }, 0);

      // Flutuação contínua e muito sutil dos elementos decorativos
      gsap.utils.toArray<HTMLElement>('[data-hero-float]').forEach((node, i) => {
        gsap.to(node, {
          y: i % 2 === 0 ? -10 : 10,
          duration: 4 + i,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 2,
        });
      });
    });

    // Parallax com o mouse — apenas desktop com mouse e sem redução de movimento
    mm.add(`${MOTION_OK} and (pointer: fine) and (min-width: 1024px)`, () => {
      const layers = gsap.utils.toArray<HTMLElement>('[data-depth]');
      const setters = layers.map((layer) => ({
        depth: Number(layer.dataset.depth ?? 0),
        x: gsap.quickTo(layer, 'x', { duration: 1.2, ease: 'power3.out' }),
        y: gsap.quickTo(layer, 'y', { duration: 1.2, ease: 'power3.out' }),
      }));
      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        setters.forEach((s) => {
          s.x(nx * s.depth);
          s.y(ny * s.depth);
        });
      };
      el.addEventListener('pointermove', onMove);
      return () => el.removeEventListener('pointermove', onMove);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44"
    >
      {/* Fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0b1f42_0%,#030914_60%)]" />
        <div className="bg-grid mask-fade-b absolute inset-0" />
        <div data-hero="glow">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]" />
          <div className="absolute right-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-brand-bright/15 blur-[110px]" />
        </div>
        {/* Linhas diagonais inspiradas no "X" da marca */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.22]" preserveAspectRatio="none" viewBox="0 0 1440 900">
          <defs>
            <linearGradient id="heroLine" x1="0" x2="1">
              <stop offset="0" stopColor="#008CFF" stopOpacity="0" />
              <stop offset="0.5" stopColor="#008CFF" stopOpacity="0.9" />
              <stop offset="1" stopColor="#008CFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M-100 120 L760 900" stroke="url(#heroLine)" strokeWidth="1" />
          <path d="M1540 60 L840 900" stroke="url(#heroLine)" strokeWidth="1" />
          <path d="M300 -40 L1100 900" stroke="url(#heroLine)" strokeWidth="0.6" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-brand-ink" />
      </div>

      <div className="container-site grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="relative z-10 max-w-2xl">
          <span data-hero="eyebrow" className="eyebrow">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-bright" />
            </span>
            {hero.eyebrow}
          </span>

          <h1
            id="hero-title"
            className="mt-7 text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.1rem] xl:text-[4.5rem]"
          >
            {words.map((w, i) =>
              /^\s+$/.test(w.text) ? (
                ' '
              ) : (
                <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <span data-hero-word className={`inline-block ${w.highlight ? 'text-gradient' : ''}`}>
                    {w.text}
                  </span>
                </span>
              ),
            )}
          </h1>

          <p data-hero="subtitle" className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-brand-muted sm:text-xl">
            {hero.subtitle}
          </p>

          <div data-hero="cta" className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#orcamento" size="lg">
              {hero.primaryCta}
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="#projetos" size="lg" variant="secondary">
              {hero.secondaryCta}
              <ArrowUpRight
                size={18}
                className="text-brand-bright transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </ButtonLink>
          </div>

          <ul data-hero="highlights" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
            {hero.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/15 text-brand-bright">
                  <Check size={12} strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div data-hero="visual" className="relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
