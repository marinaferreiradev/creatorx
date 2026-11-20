import { siteConfig } from '@/config/site';

/** Mantém apenas dígitos. */
export const onlyDigits = (value: string) => value.replace(/\D/g, '');

/**
 * Número oficial da agência, normalizado.
 * Retorna null enquanto não estiver configurado (ou inválido) em src/config/site.ts.
 */
export function getAgencyWhatsApp(): string | null {
  const digits = onlyDigits(siteConfig.contact.whatsapp);
  // Formato internacional E.164 sem "+": 10 a 15 dígitos.
  if (digits.length < 10 || digits.length > 15) return null;
  return digits;
}

export const isWhatsAppConfigured = () => getAgencyWhatsApp() !== null;

/** Remove um eventual +55 colado pelo visitante e limita a 11 dígitos. */
function normalizeBrazilianInput(value: string): string {
  let digits = onlyDigits(value);
  if (digits.length > 11 && digits.startsWith('55')) digits = digits.slice(2);
  return digits.slice(0, 11);
}

/** Máscara progressiva: (11) 98765-4321 ou (11) 3456-7890. */
export function formatBrazilianPhone(value: string): string {
  const d = normalizeBrazilianInput(value);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/**
 * Valida telefone brasileiro: DDD válido (11–99) + 8 dígitos (fixo)
 * ou 9 dígitos começando com 9 (celular).
 */
export function isValidBrazilianPhone(value: string): boolean {
  const d = normalizeBrazilianInput(value);
  if (d.length !== 10 && d.length !== 11) return false;
  const ddd = Number(d.slice(0, 2));
  if (ddd < 11 || ddd > 99 || d[1] === '0') return false;
  if (d.length === 11) return d[2] === '9';
  return /[2-5]/.test(d[2]); // fixos começam com 2–5
}

export interface QuoteData {
  name: string;
  whatsapp: string;
  company: string;
  projectType: string;
  budget: string;
  description: string;
}

/** Monta a mensagem profissional enviada ao WhatsApp da agência. */
export function buildQuoteMessage(data: QuoteData): string {
  const fallback = 'Não informado';
  return [
    `Olá! Gostaria de solicitar um orçamento à ${siteConfig.name}.`,
    '',
    `Nome: ${data.name.trim()}`,
    `WhatsApp: ${formatBrazilianPhone(data.whatsapp)}`,
    `Empresa: ${data.company.trim() || fallback}`,
    `Tipo de projeto: ${data.projectType}`,
    `Orçamento previsto: ${data.budget}`,
    `Descrição do projeto: ${data.description.trim() || fallback}`,
  ].join('\n');
}

/** Gera o link wa.me com a mensagem codificada. Retorna null se o número não estiver configurado. */
export function buildWhatsAppLink(message?: string): string | null {
  const phone = getAgencyWhatsApp();
  if (!phone) return null;
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
