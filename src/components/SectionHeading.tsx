interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  id?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', id }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left';
  return (
    <div className={`flex max-w-2xl flex-col gap-5 ${alignment}`}>
      <span className="eyebrow" data-reveal>
        <span className="h-1.5 w-1.5 rounded-full bg-brand-bright" aria-hidden />
        {eyebrow}
      </span>
      <h2
        id={id}
        data-reveal
        className="text-balance text-[2rem] font-semibold leading-[1.1] text-white sm:text-[2.6rem] lg:text-5xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p data-reveal className="text-pretty text-base leading-relaxed text-brand-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
