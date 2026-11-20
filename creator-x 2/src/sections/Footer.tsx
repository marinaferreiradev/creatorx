import type { ComponentType, SVGProps } from 'react';
import { ArrowUp, Mail, MapPin, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { services } from '@/data/services';
import { Logo } from '@/components/Logo';
import { renderEmail } from '@/lib/email';
import { BehanceIcon, InstagramIcon, LinkedinIcon } from '@/components/SocialIcons';
import { buildWhatsAppLink, formatBrazilianPhone, getAgencyWhatsApp } from '@/lib/whatsapp';

type IconComp = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const socialItems: { key: keyof typeof siteConfig.social; label: string; icon: IconComp }[] = [
  { key: 'instagram', label: 'Instagram', icon: InstagramIcon },
  { key: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon },
  { key: 'behance', label: 'Behance', icon: BehanceIcon },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { contact, social } = siteConfig;
  const whatsappLink = buildWhatsAppLink();
  const agencyPhone = getAgencyWhatsApp();
  // Exibe o número formatado se for brasileiro (55 + DDD + número)
  const phoneLabel = agencyPhone?.startsWith('55') ? formatBrazilianPhone(agencyPhone.slice(2)) : agencyPhone;

  const headingCls = 'text-xs font-semibold uppercase tracking-[0.18em] text-slate-400';
  const linkCls = 'text-[15px] text-slate-300 transition-colors hover:text-white';

  return (
    <footer className="relative border-t border-white/[0.06] bg-brand-navy/40">
      <div className="hairline absolute inset-x-0 top-0 h-px opacity-60" aria-hidden />
      <div className="container-site py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Marca */}
          <div className="max-w-sm">
            <Logo size={28} />
            <p className="mt-6 leading-relaxed text-brand-muted">{siteConfig.content.footer.description}</p>

            <ul className="mt-7 flex gap-3" aria-label="Redes sociais">
              {socialItems.map(({ key, label, icon: Icon }) => {
                const url = social[key];
                const base =
                  'flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-[transform,box-shadow,border-color,background-color,color] duration-300';
                return (
                  <li key={key}>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} da ${siteConfig.name}`}
                        className={`${base} text-slate-300 hover:-translate-y-0.5 hover:border-brand-bright hover:bg-brand/15 hover:text-white`}
                      >
                        <Icon size={18} />
                      </a>
                    ) : (
                      <span
                        className={`${base} cursor-not-allowed text-slate-600`}
                        title={`${label} — em breve`}
                        aria-label={`${label} — em breve`}
                        role="img"
                      >
                        <Icon size={18} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé — navegação">
            <h2 className={headingCls}>Navegação</h2>
            <ul className="mt-5 space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkCls}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Serviços */}
          <div>
            <h2 className={headingCls}>Serviços</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#servicos" className={linkCls}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h2 className={headingCls}>Contato</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="shrink-0 text-brand-bright" />
                {whatsappLink ? (
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    {phoneLabel}
                  </a>
                ) : (
                  <span className="text-[15px] text-slate-500">WhatsApp — em breve</span>
                )}
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-brand-bright" aria-hidden />
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className={`${linkCls} min-w-0 [overflow-wrap:anywhere]`}>
                    {renderEmail(contact.email)}
                  </a>
                ) : (
                  <span className="text-[15px] text-slate-500">E-mail — em breve</span>
                )}
              </li>
              {contact.location && (
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="shrink-0 text-brand-bright" />
                  <span className="text-[15px] text-slate-300">{contact.location}</span>
                </li>
              )}
            </ul>
            <a
              href="#orcamento"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-bright transition-colors hover:text-white"
            >
              Solicitar orçamento →
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500">
            © {year} {siteConfig.legalName}. Todos os direitos reservados.
          </p>
          <a
            href="#inicio"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            Voltar ao topo
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
