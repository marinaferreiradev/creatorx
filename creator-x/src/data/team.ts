/**
 * EQUIPE — ainda não definida.
 *
 * Quando quiser exibir a equipe na seção "Sobre":
 * 1. Coloque as fotos em src/assets/team/ (quadradas, ~600x600, .webp ou .jpg).
 * 2. Importe as fotos aqui e preencha a lista abaixo.
 *
 * Exemplo:
 *   import foto from '@/assets/team/nome.webp';
 *   { name: 'Nome Sobrenome', role: 'Cargo', photo: foto }
 *
 * Enquanto a lista estiver vazia, a seção "Sobre" mostra espaços
 * reservados elegantes para as futuras fotos.
 */

export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
}

export const team: TeamMember[] = [];

/** Quantidade de espaços reservados exibidos enquanto `team` estiver vazio. */
export const teamPlaceholderSlots = 3;
