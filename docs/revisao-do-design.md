# Revisão do design: Figma → código

**Arquivo:** [UI-Design no Figma](https://www.figma.com/design/kTQyYilEA2rApHxS9cB0Da/UI-Design) · **Lido em:** 08/10/2026 · **Atualizado em:** 08/10/2026, depois da construção do site · **Status do design:** em andamento (WIP)

Esta revisão foi feita lendo o arquivo do Figma e **calculando** o contraste de cada par de cores realmente usado nos componentes. Meta de acessibilidade: **WCAG 2.2 nível AA**. Os itens marcados com ✅ já estão resolvidos **no código**; os marcados com ⏳ ainda dependem do Figma ou de uma decisão sua.

> Limite da leitura: a página **Foundations** é grande demais para carregar de uma vez. Os tokens abaixo foram lidos a partir dos componentes e das páginas. Se houver algo só em Foundations (escala de cores completa, grid), basta enviar o link do quadro.

## 1. O que existe no Figma

| Item                            | Situação                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| Páginas desktop (1440px)        | **Home**, **About**, **Projects**, **Contact**, todas com conteúdo                                 |
| Navegação (`Nav` + `NavTab`)    | 4 abas com ícone + texto; ativa em SemiBold com ícone preenchido; hover com fundo lavanda          |
| Rodapé, card de projeto, janela | `Footer`, `Cases/Card`, `Heropopup` (a "janela" da Home)                                           |
| Formulário (página Contact)     | 4 campos (Name, Email, Subject, Message) + botão "Send message"                                    |
| Ícones e ilustrações            | Smile, Clap, Chatting, House (ativo/inativo); Arrow, Corners; fundo pontilhado (`BGPattern`)       |
| Tabela de pares de cor          | `Pairings`: **os 6 valores de contraste estão corretos** (conferi um a um)                         |
| **Ainda não existe**            | Versões mobile/tablet · estado de **foco** · hover de links/cards/botão · erro do formulário · 404 |

## 2. Tokens: do Figma para o código

Vivem em [`css/tokens.css`](../css/tokens.css). Uma cor, um tamanho ou um espaço muda **só ali**.

**Cores**

| Variável do Figma                        | Valor no Figma                    | No código                                                                                                    |
| ---------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `color/bg/primary` (mint/50)             | `#e8fcfa`                         | `--color-bg-primary`                                                                                         |
| `color/bg/secondary` (indigo/50)         | `#e8e5f7`                         | `--color-bg-secondary`                                                                                       |
| `color/bg/accent`                        | `#fbe8f6`                         | `--color-bg-accent`                                                                                          |
| `color/surface/primary` (mint/200)       | `#abf5ed`                         | `--color-surface-primary`                                                                                    |
| `color/text/primary` (indigo/700)        | `#07004d`                         | `--color-text-primary`                                                                                       |
| `color/text/secondary` (mint/700)        | `#106059`                         | `--color-text-secondary`                                                                                     |
| `color/text/link`                        | `#d946b0`                         | `--color-text-link` = **`#a31585`** ✅ (≠ Figma; decisão sua)                                                |
| `color/border/default` (mint/400)        | `#38ccbe`                         | `--color-border-default` (cartões). Os campos usam `--color-border-input` = **`#17847a`** ✅ (≠ Figma; novo) |
| `color/interactive/primary` (indigo/500) | `#0d0081`                         | `--color-interactive-primary`                                                                                |
| pink-purple/200 · /500 · /700            | `#e88fcd` · `#a31585` · `#5b0c4c` | `--pink-purple-200` …                                                                                        |
| mint/400 · /600 · /700                   | `#38ccbe` · `#17847a` · `#106059` | `--mint-400` …                                                                                               |
| _(novo)_ anel de foco                    | não existe                        | `--color-focus-ring` = `#0d0081`                                                                             |

Os nomes entre parênteses são variáveis primitivas com o mesmo valor; não deu para ver se o Figma as usa como alias.

**Tipografia:** Space Grotesk (400, 500, 600, 700), fonte livre (licença OFL), hospedada no próprio site.

| Uso                    | Tamanho / altura de linha | Peso                       | Token no código          |
| ---------------------- | ------------------------- | -------------------------- | ------------------------ |
| Título da Home         | 48 / 56 (espaçamento −1)  | Bold                       | `--fs-hero` (fluido)     |
| Subtítulo da Home      | 36 / 44 (−0,5)            | SemiBold                   | `--fs-hero-sub` (fluido) |
| H1 das páginas         | 36 / 44 (−0,5)            | Bold                       | `--fs-h1` (fluido)       |
| H2 (rótulos de seção)  | 20 / 30                   | Medium                     | `--fs-h2`                |
| Título de card         | 22 / 30                   | Medium                     | `--fs-card-title`        |
| Navegação              | 18 / 28                   | SemiBold (ativa) · Regular | `--fs-nav`               |
| Link / rótulo de campo | 16 / 28                   | Medium                     | `--fs-label`             |
| **Body/Base**          | **14 / 21**               | SemiBold                   | `--fs-body`              |
| Rótulos pequenos       | 12 / 28                   | Medium                     | `--fs-small`             |

Tudo em `rem` (1rem = 16px). Os três tamanhos "fluidos" encolhem em telas pequenas e param no valor do Figma a partir de ~720px.

**Espaços:** 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 px = `--space-1` … `--space-12`.

## 3. Contraste medido (WCAG 2.2 AA)

Mínimos: **4,5:1** para texto normal · **3:1** para texto grande (24px+, ou 19px+ em negrito) e para elementos de interface (bordas de campo, ícones, foco).

**Como o Figma foi desenhado**

| Par                                                                            | Contraste  | Resultado     |
| ------------------------------------------------------------------------------ | ---------- | ------------- |
| Texto principal `#07004d` sobre mint/50                                        | 17,68:1    | ✅            |
| Texto preto sobre mint/50 (parágrafos do About)                                | 19,74:1    | ✅            |
| Título da Home `#5b0c4c` sobre lavanda `#e8e5f7`                               | 10,60:1    | ✅            |
| Título de card `#0d0081` sobre mint/50                                         | 14,79:1    | ✅            |
| Botão "Send message" (mint/50 sobre `#0d0081`)                                 | 14,79:1    | ✅            |
| H1 das páginas `#a31585` sobre mint/50                                         | 6,57:1     | ✅            |
| Texto secundário `#106059` sobre mint/50                                       | 6,95:1     | ✅            |
| Rodapé `#106059` sobre o pontinho mais escuro do fundo (teal a 38%, `#a7eae4`) | 5,47:1     | ✅            |
| Ícones rosa da navegação (elemento gráfico)                                    | 3,62:1     | ✅ (mín. 3)   |
| **Links `#d946b0` sobre mint/50**                                              | **3,62:1** | ❌ (mín. 4,5) |
| **Links `#d946b0` sobre lavanda (hover da aba)**                               | **3,11:1** | ❌ (mín. 4,5) |
| **Borda dos campos `#38ccbe` sobre mint/50**                                   | **1,87:1** | ❌ (mín. 3)   |

A cor `#d946b0` é usada em: abas inativas da navegação (18px), "View case study ↗" nos cards (16px), "Get in touch ↗", "My LinkedIn Profile ↗" e "My Linkedin Profile". **No Figma, todos os links do site ficam abaixo do mínimo.**

> **Uma correção minha:** na primeira versão desta revisão eu supus que os pontinhos do fundo tinham a cor cheia do tile (`#38ccbe`) e que o texto do rodapé ficaria com 3,72:1 sobre eles. Ao medir os pixels do render do Figma, vi que os pontinhos são bem mais suaves (2×2px a ~38% de opacidade), e o pior caso real é **5,47:1**. Por isso o rodapé **não** precisou mudar de cor.

**Como ficou no código**

| Par aplicado                                 | Contraste | Resultado   |
| -------------------------------------------- | --------- | ----------- |
| Links `#a31585` sobre mint/50                | 6,57:1    | ✅          |
| Links `#a31585` sobre lavanda (hover da aba) | 5,65:1    | ✅          |
| Borda dos campos `#17847a` sobre mint/50     | 4,27:1    | ✅ (mín. 3) |
| Anel de foco `#0d0081` sobre mint/50         | 14,79:1   | ✅          |
| Anel de foco `#0d0081` sobre lavanda         | 12,73:1   | ✅          |

## 4. Ajustes no Figma, em ordem de importância

| #   | Ajuste                     | No código     | No Figma | Detalhe                                                                                                                                                                 |
| --- | -------------------------- | ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Cor dos links**          | ✅            | ⏳       | Trocar `color/text/link` para `#a31585` (`pink-purple/500`): 6,57:1 e 5,65:1. Dá para manter `#d946b0` em elementos decorativos                                         |
| 2   | **Borda dos campos**       | ✅            | ⏳       | Criar `color/border/input` = `mint/600` `#17847a` (4,27:1) e aplicar nos 4 campos. _(WCAG 1.4.11)_                                                                      |
| 3   | **Estado de foco**         | ✅            | ⏳       | Contorno de 2px em `indigo/500`, com 2px de afastamento, em abas, links, campos e botão. _(WCAG 2.4.7)_                                                                 |
| 4   | **Versão mobile e tablet** | ✅ (proposta) | ⏳       | Só existe 1440px. A proposta já está no código e aguarda sua aprovação: [responsivo.md](responsivo.md). _(WCAG 1.4.10)_                                                 |
| 5   | **Tamanho do texto**       | não           | ⏳       | O corpo é 14px SemiBold e há rótulos de 12px. O código **manteve** o Figma (em `rem`). Subir o corpo para 16px é recomendável, não é exigência da WCAG: **decisão sua** |
| 6   | **Estados que faltam**     | em parte      | ⏳       | No código: hover do botão (fundo `indigo/700`) e sublinhado nos links de texto. Ainda sem desenho: pressionado, desabilitado, erro e sucesso do formulário              |

## 5. Decisões

| Pergunta                                 | Resposta / situação                                                                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cor dos links                            | ✅ `#a31585`, o rosa de melhor contraste da paleta (decidido em 08/10)                                                                                 |
| Idioma do site                           | ✅ Inglês como padrão (decidido em 08/10)                                                                                                              |
| Ícones da janela da Home                 | ✅ **Decorativos**: um elemento visual retrô. No código ficam escondidos de leitores de tela e fora do Tab (decidido em 08/10)                         |
| Janela "fantasma" (texto repetido a 26%) | Não foi construída: a página Home do Figma não a usa. Se entrar no design, será puramente decorativa, sem texto real                                   |
| Formulário de contato                    | ✅ Sem função por enquanto (decidido em 08/10). Um aviso substitui o envio. Depois: serviço de envio (ex.: Formspree, Netlify Forms) ou link de e-mail |
| Texto final da Home                      | ⏳ Usei o da página ("Hello, I’m Lari. I lead designers through change…"), não o da variante "Welcome, I’m Lari…". Me avise se for o outro             |
| Cases                                    | ⏳ Os 4 cards são exemplos ("Sample project cards — replace these"). Quais projetos reais entram, e cada um terá uma página própria?                   |
| Tamanho do texto do corpo (14px × 16px)  | ⏳ Veja o item 5 da seção 4                                                                                                                            |
| Redimensionamento (celular e tablet)     | ⏳ Proposta pronta, aguardando sua aprovação: [responsivo.md](responsivo.md)                                                                           |

## 6. Pequenas inconsistências encontradas

Todas foram resolvidas **no código** escolhendo um lado (tabela na seção 3 de [design-vs-codigo.md](design-vs-codigo.md)). O Figma pode ser corrigido para refletir a mesma escolha.

- Os ícones das abas mudam de página para página (Projects é palmas na Home e sorriso na Contact; Contact é balão de conversa na Home/About e sorriso na Projects), e Home e About usam o mesmo sorriso.
- Padding vertical da navegação: 16px (Home, About) × 24px (Projects, Contact).
- Rodapé da Contact difere do componente (16px Regular × 14px SemiBold); "Designed **on** Figma" × "Designed **in** Figma".
- H2 com 20px na maioria dos rótulos, mas 22px em "Skills" e "Relevant Links".
- Espaço duplo em "Hi, I’m Lari" e "Cancer survivor, married…".
- "Skills" repete três linhas de "As a manager" (provável texto provisório).
- Cards com altura fixa de título (60px) e descrição (84px): no código são alturas mínimas, para o texto poder crescer.

## 7. Como o design virou HTML

| No design                       | No HTML                                                                                                                                                                                                                    |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Título da página                | Um `<h1>` por página (na Home, "Hello, I’m Lari.")                                                                                                                                                                         |
| Navegação                       | `<nav aria-label="Main">` com uma lista de `<a>` e `aria-current="page"` na página atual                                                                                                                                   |
| Ícones da navegação e da janela | Decorativos: são imagens de fundo no CSS, então leitores de tela não os veem                                                                                                                                               |
| Ilustrações dos cartões         | SVG inline com `aria-hidden="true"` (decorativas)                                                                                                                                                                          |
| 4 links "View case study ↗"     | Cada um com nome único para leitores de tela (ex.: "View case study: A clearer checkout")                                                                                                                                  |
| Seta "↗"                        | Decorativa, escondida de leitor de tela                                                                                                                                                                                    |
| Cards                           | `<article>` com título em `<h2>` e um link                                                                                                                                                                                 |
| Listas sem marcador             | `<ul role="list">`, para o VoiceOver continuar anunciando como lista                                                                                                                                                       |
| Formulário                      | `<label>` ligado a cada campo, `autocomplete="name"` e `"email"`, dica do campo de mensagem ligada com `aria-describedby`, aviso numa região `role="status"`. Sem `required` por enquanto, já que o envio ainda não existe |
| Link do LinkedIn                | Abre na mesma aba (sem `target="_blank"`), então não precisa de aviso. O endereço ainda é provisório                                                                                                                       |

## 8. Como a construção foi feita

1. ✅ **Base:** fonte Space Grotesk hospedada no site, tokens, reset, tipografia e foco visível. (O site não tem animações, então não há movimento para reduzir.)
2. ✅ **Estrutura comum:** link "Pular para o conteúdo", navegação, área principal, rodapé, fundo pontilhado.
3. ✅ **Componentes:** link, janela, cartão, campos de formulário e botão.
4. ✅ **Páginas:** Home → About → Projects → Contact.
5. ✅ **Verificação automática:** `npm run check`, comparação com o Figma ([design-vs-codigo.md](design-vs-codigo.md)), larguras de 320 a 1440px, texto a 200%, teclado.
6. ⏳ **Teste manual** em celular de verdade e com VoiceOver (só você consegue).
7. ✅ **Protótipo antigo trocado** e primeira versão salva no Git (`main`).
