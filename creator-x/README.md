# Creator X — Site institucional

Landing page oficial da Creator X, feita com React, TypeScript, Vite, Tailwind CSS, GSAP e Lucide React.

## Executar localmente

Requisito: Node.js 18 ou superior.

```bash
npm install
npm run dev        # servidor de desenvolvimento em http://localhost:5173
npm run build      # checagem de TypeScript + build de produção (pasta dist/)
npm run preview    # serve o build de produção em http://localhost:4173
npm run typecheck  # apenas a checagem de TypeScript
```

## Onde editar o conteúdo

| O que | Arquivo |
|---|---|
| **WhatsApp, e-mail, redes sociais, cidade** | `src/config/site.ts` → `contact` e `social` |
| Textos de todas as seções (hero, sobre, orçamento, rodapé) | `src/config/site.ts` → `content` |
| Itens do menu | `src/config/site.ts` → `nav` |
| Serviços | `src/data/services.ts` |
| Projetos / portfólio | `src/data/projects.ts` |
| Equipe (fotos e nomes) | `src/data/team.ts` |
| Etapas de "Como trabalhamos" | `src/data/process.ts` |
| Opções do formulário (tipos de projeto, faixas de orçamento) | `src/data/quoteForm.ts` |
| Título, descrição e Open Graph (SEO) | `index.html` |
| Cores da marca | `tailwind.config.js` → `colors.brand` |
| Logo | `src/assets/` (favicons e imagem de compartilhamento em `public/`) |

### WhatsApp oficial

Em `src/config/site.ts`, preencha só com números, incluindo o código do país e o DDD:

```ts
whatsapp: '5511999999999',
```

Enquanto o campo estiver vazio:
- o formulário aparece completo, valida os campos e mostra o aviso "Configuração pendente" no lugar de enviar;
- o botão flutuante de WhatsApp não aparece;
- o rodapé mostra "WhatsApp — em breve".

Depois de preenchido, tudo é ativado automaticamente.

### Adicionar projetos reais

1. Coloque a imagem em `src/assets/projects/` (ex.: `meu-projeto.webp`, cerca de 1200×800).
2. Em `src/data/projects.ts`, importe a imagem e adicione um item com `image`, `url` e `isDemo: false`.
3. Remova os três itens de demonstração.

Sem `url`, o botão "Ver projeto" continua desativado com o selo "Em breve".

### Redes sociais e e-mail

Preencha `social.instagram`, `social.linkedin`, `social.behance` e `contact.email` com as URLs/endereços completos. Campos vazios aparecem como "em breve", sem links falsos.

## Publicar na Vercel

**Pelo site (recomendado):**
1. Suba esta pasta para um repositório no GitHub.
2. Em vercel.com, clique em **Add New → Project** e importe o repositório.
3. A Vercel detecta o Vite automaticamente (build `npm run build`, saída `dist`). Clique em **Deploy**.
4. Cada novo `git push` publica uma versão atualizada.

**Pela linha de comando:**
```bash
npm i -g vercel
vercel          # primeira publicação (preview)
vercel --prod   # publicação em produção
```

Depois de configurar o domínio definitivo, ajuste em `index.html` a tag `canonical` e use uma URL absoluta em `og:image`.

## Estrutura

```
src/
  config/site.ts      configuração central e textos
  data/               serviços, projetos, equipe, processo, opções do formulário
  sections/           seções da página (Header, Hero, Services, Projects, About, Process, Quote, Footer)
  components/         componentes reutilizáveis (Logo, Button, ilustrações, WhatsApp flutuante)
  hooks/useReveal.ts  animações de revelação na rolagem (GSAP)
  lib/whatsapp.ts     máscara, validação de telefone e geração do link wa.me
  lib/gsap.ts         registro do GSAP/ScrollTrigger
  assets/             logo
public/               favicon, ícones e imagem de compartilhamento (Open Graph)
```

As animações respeitam `prefers-reduced-motion`: para quem pede menos movimento, o conteúdo aparece direto, sem animações.
