import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';

/**
 * Botão flutuante de WhatsApp.
 * Só aparece quando o número oficial estiver configurado em src/config/site.ts.
 */
export function FloatingWhatsApp() {
  const link = buildWhatsAppLink(`Olá! Vim pelo site da ${siteConfig.name} e gostaria de mais informações.`);
  if (!link) return null;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Conversar com a ${siteConfig.name} pelo WhatsApp`}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-bright text-white shadow-glow transition-transform duration-300 hover:-translate-y-1 sm:bottom-7 sm:right-7"
    >
      <MessageCircle size={24} strokeWidth={2} />
    </a>
  );
}
