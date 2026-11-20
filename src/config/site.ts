/**
 * ============================================================
 *  CONFIGURAÇÃO CENTRAL DO SITE — CREATOR X
 * ============================================================
 *  Este é o principal arquivo para editar informações da agência.
 *
 *  - Contatos (WhatsApp, e-mail)          → siteConfig.contact
 *  - Redes sociais                        → siteConfig.social
 *  - Textos das seções                    → siteConfig.content
 *  - Menu de navegação                    → siteConfig.nav
 *
 *  Regra geral: enquanto um campo estiver vazio (''), o site
 *  NÃO exibe links falsos — ele mostra "em breve" / desativa o botão.
 * ============================================================
 */

export const siteConfig = {
  name: 'Creator X',
  legalName: 'Creator X', // Ex.: razão social, se quiser exibir no rodapé
  tagline: 'Desenvolvimento de sites e soluções digitais',

  contact: {
    /**
     * WHATSAPP OFICIAL DA AGÊNCIA
     * Formato: somente números, com código do país (55) + DDD + número.
     * Exemplo: '5511999999999'
     *
     * Enquanto estiver vazio, o formulário de orçamento e o botão
     * flutuante ficam desativados com aviso de "configuração pendente".
     */
    whatsapp: '',

    /**
     * E-MAIL OFICIAL — usado no rodapé e na seção de orçamento/contato (link mailto:).
     * Vazio = aparece como "em breve".
     */
    email: 'creatorxcontatoo@gmail.com',

    /** Cidade/estado opcional para o rodapé. Ex.: 'São Paulo — SP' */
    location: '',
  },

  /** Redes sociais. Preencha a URL completa. Vazio = aparece como "em breve". */
  social: {
    instagram: '',
    linkedin: '',
    behance: '',
  },

  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#orcamento' },
  ],

  content: {
    hero: {
      eyebrow: 'Agência de desenvolvimento web',
      // O título é montado em partes para permitir destacar palavras com gradiente.
      title: [
        { text: 'Transformamos ', highlight: false },
        { text: 'ideias', highlight: true },
        { text: ' em ', highlight: false },
        { text: 'experiências digitais.', highlight: true },
      ],
      subtitle:
        'Criamos sites modernos, estratégicos e personalizados para transformar sua presença digital.',
      primaryCta: 'Solicitar orçamento',
      secondaryCta: 'Conhecer projetos',
      highlights: ['Design sob medida', 'Responsivo', 'Pronto para crescer'],
    },

    services: {
      eyebrow: 'Serviços',
      title: 'Soluções digitais para levar sua marca mais longe.',
      subtitle:
        'Estruturas pensadas para cada objetivo — da primeira página institucional a projetos sob medida.',
    },

    projects: {
      eyebrow: 'Portfólio',
      title: 'Projetos que transformam ideias em realidade.',
      subtitle: 'Conheça algumas das experiências digitais desenvolvidas pela Creator X.',
      /** Exibida abaixo dos cards quando houver algum projeto do tipo 'conceitual'. */
      conceptNote:
        'Projetos conceituais são estudos autorais da Creator X, criados para demonstrar soluções em diferentes segmentos. Não representam empresas reais nem clientes contratados.',
      exploreLabel: 'Explorar site completo',
    },

    /**
     * SOBRE — TEXTOS PROVISÓRIOS
     * Substitua pelos textos definitivos quando a história da agência for definida.
     * Não inclua números (anos, clientes, resultados) que não sejam reais.
     */
    about: {
      eyebrow: 'Sobre a Creator X',
      title: 'Muito mais que sites.',
      titleHighlight: 'Criamos experiências.', // exibido com gradiente azul
      paragraphs: [
        'A Creator X é uma agência dedicada ao desenvolvimento de sites e soluções digitais. Unimos design, estratégia e tecnologia para criar presenças online que representem cada marca com clareza.',
        'Acreditamos que um bom site vai além da aparência: ele precisa comunicar bem, funcionar em qualquer tela e ser fácil de evoluir com o tempo.',
      ],
      placeholderNote: 'Texto institucional provisório — o conteúdo definitivo será adicionado em breve.',
      pillars: [
        { title: 'Design autoral', text: 'Identidade visual pensada para cada marca, sem templates prontos.' },
        { title: 'Código moderno', text: 'Tecnologias atuais, com foco em desempenho e manutenção.' },
        { title: 'Transparência', text: 'Comunicação clara em todas as etapas do projeto.' },
      ],
    },

    process: {
      eyebrow: 'Como trabalhamos',
      title: 'Da primeira conversa ao seu site no ar.',
      subtitle: 'Um processo claro, em etapas bem definidas, para que você saiba sempre o que vem a seguir.',
    },

    quote: {
      eyebrow: 'Orçamento',
      title: 'Vamos tirar sua ideia do papel?',
      subtitle: 'Conte um pouco sobre seu projeto e descubra como podemos ajudar.',
      submitLabel: 'Enviar solicitação pelo WhatsApp',
      pendingConfigMessage:
        'O WhatsApp oficial da Creator X ainda está sendo configurado. Em breve você poderá enviar sua solicitação por aqui.',
      emailTitle: 'Prefere e-mail?',
      emailText: 'Se preferir não usar o WhatsApp, envie sua mensagem diretamente para o nosso e‑mail.', // \u2011 = hífen que não quebra linha
      budgetDisclaimer:
        'As faixas de orçamento servem apenas para entendermos sua expectativa — não representam uma tabela de preços.',
    },

    footer: {
      description:
        'Agência de desenvolvimento de sites e soluções digitais. Design, estratégia e tecnologia para marcas que querem ir mais longe.',
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
