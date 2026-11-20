/**
 * SERVIÇOS — estrutura comercial demonstrativa.
 * Para editar: altere título/descrição. Para remover: apague o objeto da lista.
 * Para adicionar: copie um item e troque o ícone (nomes em https://lucide.dev/icons).
 */
import type { LucideIcon } from 'lucide-react';
import { Building2, LayoutTemplate, ShoppingBag, SquareUser, Puzzle } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: 'institucional',
    title: 'Sites Institucionais',
    description: 'Sites profissionais para empresas que desejam fortalecer sua presença digital.',
    icon: Building2,
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    description: 'Páginas estratégicas projetadas para apresentar produtos, serviços e campanhas.',
    icon: LayoutTemplate,
  },
  {
    id: 'lojas-virtuais',
    title: 'Lojas Virtuais',
    description: 'Experiências de compra modernas, intuitivas e adaptadas às necessidades do negócio.',
    icon: ShoppingBag,
  },
  {
    id: 'portfolios',
    title: 'Portfólios Profissionais',
    description: 'Sites personalizados para profissionais e marcas apresentarem seus trabalhos.',
    icon: SquareUser,
  },
  {
    id: 'personalizadas',
    title: 'Soluções Personalizadas',
    description: 'Projetos digitais desenvolvidos de acordo com as necessidades específicas de cada cliente.',
    icon: Puzzle,
  },
];
