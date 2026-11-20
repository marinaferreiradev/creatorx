import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, Clock3, Lock, Mail, MessageCircle, Send, TriangleAlert } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { budgetRanges, projectTypes } from '@/data/quoteForm';
import { Button } from '@/components/Button';
import { useReveal } from '@/hooks/useReveal';
import {
  buildQuoteMessage,
  buildWhatsAppLink,
  formatBrazilianPhone,
  isValidBrazilianPhone,
  isWhatsAppConfigured,
  type QuoteData,
} from '@/lib/whatsapp';
import { renderEmail } from '@/lib/email';

type Errors = Partial<Record<keyof QuoteData, string>>;

const initial: QuoteData = { name: '', whatsapp: '', company: '', projectType: '', budget: '', description: '' };
const DESCRIPTION_MAX = 1000;

function validate(data: QuoteData): Errors {
  const errors: Errors = {};
  if (data.name.trim().length < 3) errors.name = 'Informe seu nome completo.';
  if (!data.whatsapp.trim()) errors.whatsapp = 'Informe seu WhatsApp.';
  else if (!isValidBrazilianPhone(data.whatsapp)) errors.whatsapp = 'Número inválido. Use DDD + número, ex.: (11) 98765-4321.';
  if (!data.projectType) errors.projectType = 'Selecione o tipo de projeto.';
  if (!data.budget) errors.budget = 'Selecione uma faixa de orçamento.';
  return errors;
}

const fieldOrder: (keyof QuoteData)[] = ['name', 'whatsapp', 'projectType', 'budget'];

export function Quote() {
  const ref = useReveal<HTMLElement>();
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const { quote } = siteConfig.content;
  const configured = isWhatsAppConfigured();
  const email = siteConfig.contact.email;

  const [data, setData] = useState<QuoteData>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'pending-config' | 'opened'>('idle');

  const id = (name: keyof QuoteData) => `${uid}-${name}`;

  const update = (name: keyof QuoteData) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = name === 'whatsapp' ? formatBrazilianPhone(e.target.value) : e.target.value;
    const next = { ...data, [name]: value };
    setData(next);
    if (status === 'opened') setStatus('idle');
    // Após a primeira tentativa de envio, revalida em tempo real
    if (submitted) setErrors(validate(next));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(data);
    setErrors(found);

    const firstInvalid = fieldOrder.find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus();
      setStatus('idle');
      return;
    }

    const link = buildWhatsAppLink(buildQuoteMessage(data));
    if (!link) {
      // Número oficial ainda não configurado em src/config/site.ts
      setStatus('pending-config');
      return;
    }

    const win = window.open(link, '_blank', 'noopener,noreferrer');
    if (!win) window.location.href = link; // fallback caso o navegador bloqueie a nova aba
    setStatus('opened');
  };

  const errorProps = (name: keyof QuoteData) => ({
    'aria-invalid': errors[name] ? (true as const) : undefined,
    'aria-describedby': errors[name] ? `${id(name)}-error` : undefined,
  });

  const ErrorText = ({ name }: { name: keyof QuoteData }) =>
    errors[name] ? (
      <p id={`${id(name)}-error`} className="mt-2 text-sm text-red-300">
        {errors[name]}
      </p>
    ) : null;

  return (
    <section ref={ref} id="orcamento" aria-labelledby="orcamento-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.13] blur-[140px]" />
      </div>

      <div className="container-site grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Texto */}
        <div className="lg:pt-6">
          <span className="eyebrow" data-reveal>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-bright" aria-hidden />
            {quote.eyebrow}
          </span>
          <h2
            id="orcamento-title"
            data-reveal
            className="mt-6 text-balance text-[2.2rem] font-semibold leading-[1.05] text-white sm:text-5xl lg:text-[3.4rem]"
          >
            {quote.title}
          </h2>
          <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-brand-muted">
            {quote.subtitle}
          </p>

          <ul data-reveal-group className="mt-10 space-y-4">
            {[
              { icon: MessageCircle, text: 'Sua solicitação chega direto no nosso WhatsApp.' },
              { icon: Lock, text: 'Seus dados não ficam armazenados no site.' },
              { icon: Send, text: 'Você revisa a mensagem antes de enviar.' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-4 text-slate-300">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-brand-bright">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                {text}
              </li>
            ))}
          </ul>

          {/* Alternativa por e-mail (configurada em src/config/site.ts → contact.email) */}
          {email && (
            <div data-reveal className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
              <p className="text-sm font-semibold text-white">{quote.emailTitle}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{quote.emailText}</p>
              <a
                href={`mailto:${email}`}
                className="group/email mt-4 flex min-h-11 min-w-0 items-center gap-3 text-sm font-semibold sm:text-[15px] text-white transition-colors hover:text-brand-bright"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright transition-colors duration-300 group-hover/email:bg-brand group-hover/email:text-white">
                  <Mail size={18} strokeWidth={1.75} aria-hidden />
                </span>
                <span className="min-w-0 [overflow-wrap:anywhere]">{renderEmail(email)}</span>
                <ArrowUpRight size={16} className="hidden shrink-0 text-brand-bright sm:block" aria-hidden />
              </a>
            </div>
          )}
        </div>

        {/* Formulário */}
        <div data-reveal className="card-surface relative p-6 shadow-[0_40px_100px_-40px_rgba(8,102,245,0.45)] sm:p-9">
          <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />
          <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor={id('name')} className="field-label">
                Nome completo <span className="text-brand-bright" aria-hidden>*</span>
              </label>
              <input
                id={id('name')}
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={120}
                placeholder="Seu nome"
                className="field"
                value={data.name}
                onChange={update('name')}
                {...errorProps('name')}
              />
              <ErrorText name="name" />
            </div>

            <div>
              <label htmlFor={id('whatsapp')} className="field-label">
                WhatsApp <span className="text-brand-bright" aria-hidden>*</span>
              </label>
              <input
                id={id('whatsapp')}
                name="whatsapp"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                required
                placeholder="(00) 00000-0000"
                className="field"
                value={data.whatsapp}
                onChange={update('whatsapp')}
                {...errorProps('whatsapp')}
              />
              <ErrorText name="whatsapp" />
            </div>

            <div>
              <label htmlFor={id('company')} className="field-label">
                Nome da empresa <span className="font-normal text-slate-500">(opcional)</span>
              </label>
              <input
                id={id('company')}
                name="company"
                type="text"
                autoComplete="organization"
                maxLength={120}
                placeholder="Sua empresa"
                className="field"
                value={data.company}
                onChange={update('company')}
              />
            </div>

            <div>
              <label htmlFor={id('projectType')} className="field-label">
                Tipo de projeto <span className="text-brand-bright" aria-hidden>*</span>
              </label>
              <select
                id={id('projectType')}
                name="projectType"
                required
                className={`field ${data.projectType ? '' : 'text-slate-500'}`}
                value={data.projectType}
                onChange={update('projectType')}
                {...errorProps('projectType')}
              >
                <option value="" disabled>
                  Selecione
                </option>
                {projectTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ErrorText name="projectType" />
            </div>

            <div>
              <label htmlFor={id('budget')} className="field-label">
                Orçamento previsto <span className="text-brand-bright" aria-hidden>*</span>
              </label>
              <select
                id={id('budget')}
                name="budget"
                required
                className={`field ${data.budget ? '' : 'text-slate-500'}`}
                value={data.budget}
                onChange={update('budget')}
                {...errorProps('budget')}
              >
                <option value="" disabled>
                  Selecione
                </option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <ErrorText name="budget" />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={id('description')} className="field-label">
                Descrição do projeto <span className="font-normal text-slate-500">(opcional)</span>
              </label>
              <textarea
                id={id('description')}
                name="description"
                rows={4}
                maxLength={DESCRIPTION_MAX}
                placeholder="Conte o que você deseja: objetivo do site, referências, prazos..."
                className="field resize-y"
                value={data.description}
                onChange={update('description')}
                aria-describedby={`${id('description')}-count`}
              />
              <p id={`${id('description')}-count`} className="mt-1.5 text-right text-xs text-slate-500">
                {data.description.length}/{DESCRIPTION_MAX}
              </p>
            </div>

            <p className="text-xs leading-relaxed text-slate-500 sm:col-span-2">{quote.budgetDisclaimer}</p>

            {/* Aviso de configuração pendente (some quando o WhatsApp for configurado) */}
            {!configured && (
              <div
                role={status === 'pending-config' ? 'alert' : undefined}
                className={`flex items-start gap-3 rounded-xl border p-4 text-sm transition-colors sm:col-span-2 ${
                  status === 'pending-config'
                    ? 'border-amber-400/40 bg-amber-400/10 text-amber-100'
                    : 'border-white/10 bg-white/[0.03] text-slate-300'
                }`}
              >
                {status === 'pending-config' ? (
                  <TriangleAlert size={18} className="mt-0.5 shrink-0 text-amber-300" />
                ) : (
                  <Clock3 size={18} className="mt-0.5 shrink-0 text-brand-bright" />
                )}
                <span>
                  <strong className="font-semibold text-white">Configuração pendente. </strong>
                  {quote.pendingConfigMessage}
                </span>
              </div>
            )}

            {status === 'opened' && (
              <div role="status" className="flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100 sm:col-span-2">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-300" />
                Abrimos o WhatsApp com sua mensagem pronta. Agora é só revisar e tocar em enviar.
              </div>
            )}

            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full">
                <MessageCircle size={18} />
                {quote.submitLabel}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
