/**
 * ============================================================
 *  PROJETOS / PORTFÓLIO
 * ============================================================
 *  Os itens abaixo são EXEMPLOS DE LAYOUT (isDemo: true).
 *  Nenhum deles é um trabalho real.
 *
 *  COMO ADICIONAR UM PROJETO REAL:
 *  1. Coloque a imagem em src/assets/projects/ (ex.: meu-projeto.webp, ~1200x800).
 *  2. Importe no topo deste arquivo:
 *       import meuProjeto from '@/assets/projects/meu-projeto.webp';
 *  3. Adicione um objeto à lista com:
 *       image: meuProjeto, url: 'https://...', isDemo: false
 *  4. Remova os itens de demonstração quando não forem mais necessários.
 *
 *  Sem `image`, o card mostra uma ilustração de interface gerada em CSS.
 *  Sem `url`, o botão "Ver projeto" fica desativado ("Em breve").
 * ============================================================
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  /** Caminho da imagem importada. Opcional. */
  image?: string;
  /** Link público do projeto. Opcional — sem link, o botão fica desativado. */
  url?: string;
  /** true = card de exemplo (exibe selo "Exemplo de layout"). */
  isDemo: boolean;
  /** Variação visual da ilustração demonstrativa (apenas para demos). */
  mockVariant?: 'institutional' | 'landing' | 'store';
}

export const projects: Project[] = [
  {
    id: 'demo-institucional',
    title: 'Projeto Demonstrativo 01',
    category: 'Site institucional',
    description: 'Exemplo de layout para apresentação de um site institucional. Projeto real a ser adicionado.',
    isDemo: true,
    mockVariant: 'institutional',
  },
  {
    id: 'demo-landing',
    title: 'Projeto Demonstrativo 02',
    category: 'Landing page',
    description: 'Exemplo de layout para uma landing page de campanha. Projeto real a ser adicionado.',
    isDemo: true,
    mockVariant: 'landing',
  },
  {
    id: 'demo-loja',
    title: 'Projeto Demonstrativo 03',
    category: 'Loja virtual',
    description: 'Exemplo de layout para uma loja virtual. Projeto real a ser adicionado.',
    isDemo: true,
    mockVariant: 'store',
  },
];
