import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/Logo';
import { ButtonLink } from '@/components/Button';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trava a rolagem do body e fecha com Esc quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Fecha o menu se a tela for ampliada para desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,box-shadow,border-color,background-color,color] duration-500 ${
        solid
          ? 'border-b border-white/[0.06] bg-brand-ink/75 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>
      <div className={`container-site flex items-center justify-between transition-[height] duration-500 ${scrolled ? 'h-[68px]' : 'h-20'}`}>
        <a href="#inicio" aria-label={`${siteConfig.name} — voltar ao início`} onClick={() => setOpen(false)}>
          <Logo size={26} />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-brand-bright transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="#orcamento" size="md">
            Solicitar orçamento
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out lg:hidden ${
          open ? 'max-h-[calc(100dvh-80px)] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Navegação mobile" className="container-site flex h-[calc(100dvh-80px)] flex-col pb-8 pt-4">
          <ul className="flex flex-col">
            {siteConfig.nav.map((item) => (
              <li key={item.href} className="border-b border-white/[0.06]">
                <a
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 font-display text-2xl font-medium text-white"
                >
                  {item.label}
                  <ArrowRight size={18} className="text-brand-bright" />
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink
            href="#orcamento"
            size="lg"
            className="mt-8 w-full"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            Solicitar orçamento
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
