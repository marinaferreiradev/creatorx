import { BrowserFrame, Bar } from './BrowserFrame';

type Variant = 'institutional' | 'landing' | 'store';

/**
 * Ilustração esquemática de interface usada nos cards demonstrativos do portfólio.
 * Quando houver imagens reais, elas substituem este componente automaticamente
 * (basta preencher `image` em src/data/projects.ts).
 */
export function ProjectMock({ variant }: { variant: Variant }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#0a1d3d] via-brand-navy to-brand-ink p-5 sm:p-6">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/30 blur-3xl"
        aria-hidden
      />
      <BrowserFrame
        url="exemplo-de-layout"
        className="relative h-full transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.015]"
      >
        {variant === 'institutional' && <Institutional />}
        {variant === 'landing' && <Landing />}
        {variant === 'store' && <Store />}
      </BrowserFrame>
    </div>
  );
}

const Nav = () => (
  <div className="flex items-center justify-between px-4 pt-3">
    <span className="h-2.5 w-10 rounded-full bg-brand-bright/70" />
    <div className="flex gap-2">
      <Bar className="h-1.5 w-6" />
      <Bar className="h-1.5 w-6" />
      <Bar className="h-1.5 w-6" />
    </div>
  </div>
);

function Institutional() {
  return (
    <div className="flex flex-col gap-3 pb-4">
      <Nav />
      <div className="grid grid-cols-5 gap-3 px-4 pt-2">
        <div className="col-span-3 flex flex-col gap-2 pt-2">
          <Bar className="h-2.5 w-11/12 bg-white/25" />
          <Bar className="h-2.5 w-3/4 bg-white/25" />
          <Bar className="mt-1 h-1.5 w-full" />
          <Bar className="h-1.5 w-2/3" />
          <span className="mt-2 h-4 w-14 rounded-full bg-brand" />
        </div>
        <div className="col-span-2 rounded-lg bg-gradient-to-br from-brand/50 to-brand-bright/10" />
      </div>
      <div className="grid grid-cols-3 gap-2 px-4 pt-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] p-2">
            <span className="h-3 w-3 rounded bg-brand-bright/50" />
            <Bar className="h-1.5 w-4/5" />
            <Bar className="h-1 w-3/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="flex flex-col items-center gap-2.5 pb-4">
      <Nav />
      <span className="mt-2 h-2 w-16 rounded-full bg-brand-bright/30" />
      <Bar className="h-3 w-3/5 bg-white/25" />
      <Bar className="h-3 w-2/5 bg-white/25" />
      <Bar className="h-1.5 w-1/2" />
      <div className="mt-1 flex gap-2">
        <span className="h-4 w-14 rounded-full bg-brand" />
        <span className="h-4 w-14 rounded-full border border-white/20" />
      </div>
      <div className="mx-4 mt-2 h-14 w-[85%] rounded-lg bg-gradient-to-r from-brand/40 via-brand-bright/25 to-brand/10" />
    </div>
  );
}

function Store() {
  return (
    <div className="flex flex-col gap-3 pb-4">
      <Nav />
      <div className="mx-4 flex h-9 items-center rounded-md bg-gradient-to-r from-brand/45 to-transparent px-3">
        <Bar className="h-2 w-1/3 bg-white/30" />
      </div>
      <div className="grid grid-cols-4 gap-2 px-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="aspect-square rounded-md bg-gradient-to-b from-white/[0.08] to-white/[0.02]" />
            <Bar className="h-1.5 w-4/5" />
            <span className="h-1.5 w-1/2 rounded-full bg-brand-bright/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
