/**
 * ============================================================
 *  PROJETOS / PORTFÓLIO
 * ============================================================
 *  A seção "Portfólio" é gerada automaticamente a partir desta lista.
 *
 *  COMO ADICIONAR UM NOVO PROJETO:
 *  1. Salve a captura da página inicial em public/images/portfolio/
 *     (proporção 16:10, ex.: 1440x900 reduzida para 800x500 ou mais, em .webp).
 *  2. Copie um dos objetos abaixo e preencha os campos.
 *  3. Use type: 'real' para trabalhos de clientes e
 *     type: 'conceitual' para estudos autorais da Creator X.
 *
 *  A ordem da lista é a ordem de exibição no site.
 * ============================================================
 */

export type ProjectType = 'real' | 'conceitual';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  segment: string;
  description: string;
  /** Caminho a partir de /public. Ex.: '/images/portfolio/meu-projeto.webp' */
  image: string;
  /** Endereço aberto pelo botão "Ver projeto" (nova aba). */
  url: string;
  type: ProjectType;
  highlights: string[];
  /** Links secundários opcionais, exibidos discretamente no card. */
  extraLinks?: ProjectLink[];
}

/** Rótulos exibidos para cada tipo de projeto. */
export const projectTypeLabels: Record<ProjectType, string> = {
  real: 'Projeto real',
  conceitual: 'Projeto conceitual',
};

export const projects: Project[] = [
  {
    id: 'clarissa-dias-advocacia',
    title: 'Clarissa Dias Advocacia',
    category: 'Website Institucional',
    segment: 'Advocacia / Serviços Jurídicos',
    description:
      'Website institucional desenvolvido para apresentar uma atuação jurídica profissional, organizar as áreas de especialidade e facilitar o contato com potenciais clientes.',
    image: '/images/portfolio/clarissa-dias-advocacia.webp',
    url: 'https://draclarissadias.com.br/',
    type: 'real',
    highlights: [
      'Design institucional',
      'Navegação responsiva',
      'Apresentação das áreas de atuação',
      'Integração de contato via WhatsApp',
    ],
  },
  {
    id: 'atelier-noma',
    title: 'Atelier Noma',
    category: 'Website Institucional',
    segment: 'Arquitetura & Interiores',
    description:
      'Website conceitual de arquitetura e interiores, com direção de arte editorial, identidade minimalista e experiência de navegação refinada.',
    image: '/images/portfolio/atelier-noma.webp',
    url: 'https://atelier-noma-iota.vercel.app/',
    type: 'conceitual',
    highlights: ['Design editorial premium', 'Galeria de projetos', 'Animações sofisticadas', 'Layout responsivo'],
  },
  {
    id: 'brasa-burger',
    title: 'Brasa Burger',
    category: 'Cardápio Digital / Sistema de Pedidos',
    segment: 'Gastronomia',
    description:
      'Experiência digital desenvolvida para uma hamburgueria conceitual, reunindo identidade visual marcante, cardápio interativo, personalização de produtos e carrinho de compras.',
    image: '/images/portfolio/brasa-burger.webp',
    url: 'https://brasa-burger-jade.vercel.app/',
    type: 'conceitual',
    highlights: [
      'Cardápio digital',
      'Carrinho de compras',
      'Personalização de produtos',
      'Fluxo demonstrativo de pedidos',
    ],
    extraLinks: [{ label: 'Ver cardápio', url: 'https://brasa-burger-jade.vercel.app/cardapio' }],
  },
];
