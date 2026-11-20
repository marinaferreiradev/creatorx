import { useLayoutEffect, useRef } from 'react';
import { gsap, MOTION_OK } from '@/lib/gsap';

/**
 * Revela elementos de uma seção durante a rolagem.
 *
 * Marcação:
 *  - data-reveal                → o elemento sobe e aparece sozinho
 *  - data-reveal-group          → os filhos diretos aparecem em sequência (stagger)
 *
 * Com `prefers-reduced-motion: reduce`, nada é animado e o conteúdo aparece direto.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      root.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
        gsap.from(group.children, {
          y: 32,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: group, start: 'top 85%', once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return ref;
}
