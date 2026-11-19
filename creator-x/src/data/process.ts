/** Etapas da seção "Como trabalhamos". Edite livremente. */
import type { LucideIcon } from 'lucide-react';
import { MessagesSquare, Compass, CodeXml, Rocket } from 'lucide-react';

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Entendimento',
    description: 'Conversamos para compreender o negócio, os objetivos e as necessidades do projeto.',
    icon: MessagesSquare,
  },
  {
    number: '02',
    title: 'Planejamento',
    description: 'Estruturamos a experiência, a organização das informações e a direção visual.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'Desenvolvimento',
    description: 'Transformamos o planejamento em um site moderno, responsivo e funcional.',
    icon: CodeXml,
  },
  {
    number: '04',
    title: 'Entrega',
    description: 'Realizamos os testes finais e preparamos o projeto para publicação.',
    icon: Rocket,
  },
];
