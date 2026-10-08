# Revisão do design: Figma → código

**Arquivo:** [UI-Design no Figma](https://www.figma.com/design/kTQyYilEA2rApHxS9cB0Da/UI-Design) · **Data da leitura:** 08/10/2026 · **Status do design:** em andamento (WIP)

Esta revisão foi feita lendo o arquivo do Figma e **calculando** o contraste de cada par de cores realmente usado nos componentes. Meta de acessibilidade: **WCAG 2.2 nível AA**.

> Limite da leitura: a página **Foundations** é grande demais para carregar de uma vez. Os tokens abaixo foram lidos a partir dos componentes e das páginas. Se houver algo só em Foundations (escala de cores completa, grid), basta enviar o link do quadro.

## 1. O que existe no Figma

| Item                              | Situação                                                                                       |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| Páginas desktop (1440px)          | **Home**, **About**, **Projects**, **Contact**, todas com conteúdo                             |
| Navegação (`Nav` + `NavTab`)      | 4 abas com ícone + texto; ativa em SemiBold com ícone preenchido; hover com fundo lavanda       |
| Rodapé, card de projeto, janela   | `Footer`, `Cases/Card`, `Heropopup` (a "janela" da Home)                                       |
| Formulário (página Contact)       | 4 campos (Name, Email, Subject, Message) + botão "Send message"                                |
| Ícones e ilustrações              | Smile, Clap, Chatting, House (ativo/inativo); Arrow, Corners; fundo pontilhado (`BGPattern`)   |
| Tabela de pares de cor            | `Pairings`: **os 6 valores de contraste estão corretos** (conferi um a um)                     |
| **Ainda não existe**              | Versões mobile/tablet · estado de **foco** · hover de links/cards/botão · erro do formulário · 404 |

## 2. Tokens (nome no Figma → nome sugerido no CSS)

**Cores**

| Variável do Figma           | Valor     | CSS sugerido               |
| --------------------------- | --------- | -------------------------- |
| `color/bg/primary` (mint/50) | `#e8fcfa` | `--color-bg-primary`       |
| `color/bg/secondary` (indigo/50) | `#e8e5f7` | `--color-bg-secondary` |
| `color/bg/accent`           | `#fbe8f6` | `--color-bg-accent`        |
| `color/surface/primary` (mint/200) | `#abf5ed` | `--color-surface-primary` |
| `color/text/primary` (indigo/700) | `#07004d` | `--color-text-primary` |
| `color/text/secondary` (mint/700) | `#106059` | `--color-text-secondary` |
| `color/text/link`           | `#d946b0` | `--color-text-link` ⚠ ver seção 3 |
| `color/border/default`      | `#38ccbe` | `--color-border-default` ⚠ ver seção 3 |
| `color/interactive/primary` (indigo/500) | `#0d0081` | `--color-interactive-primary` |
| pink-purple/200 · /500 · /700 | `#e88fcd` · `#a31585` · `#5b0c4c` | `--pink-purple-200` … |
| mint/600                    | `#17847a` | `--mint-600`               |

Os nomes entre parênteses são variáveis primitivas com o mesmo valor; não deu para ver se o Figma as usa como alias.

**Tipografia:** Space Grotesk (400, 500, 600, 700), fonte livre (licença OFL), que pode ser hospedada no próprio site.

| Uso                      | Tamanho / altura de linha | Peso            |
| ------------------------ | ------------------------- | --------------- |
| Título da Home           | 48 / 56 (espaçamento −1)  | Bold            |
| Subtítulo da Home        | 36 / 44 (−0,5)            | SemiBold        |
| H1 das páginas           | 36 / 44 (−0,5)            | Bold            |
| H2 (rótulos de seção)    | 20 / 30                   | Medium          |
| Título de card           | 22 / 30                   | Medium          |
| Navegação                | 18 / 28                   | SemiBold (ativa) · Regular |
| Link / rótulo de campo   | 16 / 28                   | Medium          |
| **Body/Base**            | **14 / 21**               | SemiBold        |
| Rótulos pequenos         | 12 / 28                   | Medium          |

**Espaços observados:** 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 px.

## 3. Contraste medido (WCAG 2.2 AA)

Mínimos: **4,5:1** para texto normal · **3:1** para texto grande (24px+, ou 19px+ em negrito) e para elementos de interface (bordas de campo, ícones, foco).

| Par                                                         | Contraste   | Resultado |
| ----------------------------------------------------------- | ----------- | --------- |
| Texto principal `#07004d` sobre mint/50                     | 17,68:1     | ✅        |
| Texto preto sobre mint/50 (parágrafos do About)             | 19,74:1     | ✅        |
| Título da Home `#5b0c4c` sobre lavanda `#e8e5f7`            | 10,60:1     | ✅        |
| Título de card `#0d0081` sobre mint/50                      | 14,79:1     | ✅        |
| Botão "Send message" (mint/50 sobre `#0d0081`)              | 14,79:1     | ✅        |
| H1 das páginas `#a31585` sobre mint/50                      | 6,57:1      | ✅        |
| Texto secundário e rodapé `#106059` sobre mint/50           | 6,95:1      | ✅        |
| Rodapé sobre `#abf5ed` (pior caso, se os pontinhos tiverem essa cor)   | 5,99:1      | ✅        |
| Ícones rosa da navegação (elemento gráfico)                 | 3,62:1      | ✅ (mín. 3) |
| **Links `#d946b0` sobre mint/50**                           | **3,62:1**  | ❌ (mín. 4,5) |
| **Links `#d946b0` sobre lavanda (hover da aba)**            | **3,11:1**  | ❌ (mín. 4,5) |
| **Borda dos campos `#38ccbe` sobre mint/50**                | **1,87:1**  | ❌ (mín. 3)   |

A cor `#d946b0` é usada em: abas inativas da navegação (18px), "View case study ↗" nos cards (16px), "Get in touch ↗", "My LinkedIn Profile ↗" e "My Linkedin Profile". **Todos os links do site hoje ficam abaixo do mínimo.**

## 4. O que ajustar no Figma, em ordem de importância

1. **Cor dos links.** Sugestão: `pink-purple/500` `#a31585`, que já está na sua paleta: **6,57:1** sobre mint/50 e **5,65:1** sobre o hover lavanda. Dá para manter `#d946b0` em ícones e elementos decorativos. (O rosa mais claro que ainda passa nos dois fundos é `#ba2690`, mas sobra só 0,01 de margem no hover.)
2. **Borda dos campos do formulário.** Sugestão: `mint/700` `#106059` (**6,95:1**) ou `mint/600` `#17847a` (**4,27:1**). Sem borda visível, quem tem baixa visão não encontra onde digitar. *(WCAG 1.4.11)*
3. **Estado de foco.** Não há nenhum desenhado. Sugestão: contorno de 2px em `indigo/500` `#0d0081`, com 2px de afastamento: **14,79:1** sobre mint/50 e **12,73:1** sobre lavanda. Desenhar para abas, links, card, campos e botão. *(WCAG 2.4.7)*
4. **Versão mobile (e tablet).** Só existe 1440px, com larguras fixas (container de 686px, cards de 314px, vários textos sem quebra de linha, rodapé de 566px). Com zoom de 400% o site equivale a uma tela de 320px, e o conteúdo **não pode exigir rolagem horizontal**. A navegação (4 abas com ícone e texto, 603px) precisa de um arranjo para telas estreitas. *(WCAG 1.4.10)*
5. **Tamanho do texto.** O padrão do corpo é 14px SemiBold, e há rótulos de 12px. Sugestão: 16px no corpo e nada abaixo de 14px. Em código, tudo em `rem`, para respeitar a preferência de fonte de quem usa o site. *(WCAG 1.4.4)*
6. **Estados que faltam:** hover de links, card e botão; pressionado; desabilitado; erro e sucesso do formulário.

## 5. Decisões em aberto (suas)

- **Janela da Home:** os ícones da barra de título (um círculo na Home; minimizar e fechar numa variante) são só enfeite ou funcionam (fechar/minimizar)? Se funcionam, viram botões com nome acessível; se não, ficam escondidos de leitores de tela.
- **Janela "fantasma":** a variante com texto repetido a 26% de opacidade atrás da janela é decorativa? Se for, o texto repetido **não** pode existir como texto real na página (o leitor de tela leria duas vezes).
- **Formulário:** o Figma diz "submission is not connected". Um site estático precisa de um serviço para receber mensagens (ex.: Formspree, Netlify Forms) ou de um link `mailto:`. Qual prefere?
- **Texto final da Home:** há duas versões ("Hello, I'm Lari. I lead designers through change…" na página e "Welcome, I'm Lari. I help business design…" na variante da janela). Qual vale?
- **Cases:** os 4 cards são exemplos ("Sample project cards — replace these"). Quais projetos reais entram, e cada um terá uma página própria?

## 6. Pequenas inconsistências encontradas

- Os ícones das abas mudam de página para página (Projects é palmas na Home e sorriso na Contact; Contact é balão de conversa na Home/About e sorriso na Projects), e Home e About usam o mesmo sorriso.
- Padding vertical da navegação: 16px (Home, About) × 24px (Projects, Contact).
- Rodapé da Contact difere do componente (16px Regular × 14px SemiBold); "Designed **on** Figma" × "Designed **in** Figma".
- H2 com 20px na maioria dos rótulos, mas 22px em "Skills" e "Relevant Links".
- Espaço duplo em "Hi,  I’m Lari" e "Cancer survivor,  married…".
- "Skills" repete três linhas de "As a manager" (provável texto provisório).
- Cards com altura fixa de título (60px) e descrição (84px): em código serão flexíveis, para o texto poder crescer.

## 7. Como o design vira HTML (resumo)

| No design                          | No HTML                                                                          |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| Título da página                   | Um `<h1>` por página (na Home, "Hello, I’m Lari.")                               |
| Navegação                          | `<nav aria-label="Main">` com `<a>` e `aria-current="page"` na página atual      |
| Ícones da navegação e ilustrações  | Decorativos (`alt=""`), porque o texto ao lado já diz tudo                       |
| 4 links "View case study ↗"        | Cada um com nome único (ex.: "View case study: A clearer checkout")              |
| Seta "↗"                           | Decorativa, escondida de leitor de tela                                          |
| Cards                              | `<article>` com título em `<h2>`/`<h3>` e um link                                |
| Formulário                         | `<label>` ligado a cada campo, `autocomplete="name"`/`"email"`, aviso de campo obrigatório em texto |
| Link do LinkedIn                   | `rel="noopener"`; se abrir em nova aba, avisar no texto                          |

## 8. Ordem de construção proposta

1. **Base:** fonte Space Grotesk hospedada no site, tokens (variáveis CSS), reset, tipografia, foco visível, respeito a `prefers-reduced-motion`.
2. **Estrutura comum:** link "Pular para o conteúdo", navegação, área principal, rodapé, fundo pontilhado.
3. **Componentes:** link, janela, card, campos de formulário e botão.
4. **Páginas:** Home → About → Projects → Contact.
5. **Responsivo, `npm run check` e teste manual** (teclado, VoiceOver, zoom 200% e 400%).
6. **Trocar o protótipo antigo** (que não vem deste design) e salvar a primeira versão no Git.
