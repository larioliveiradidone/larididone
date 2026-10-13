# Lari Didone — Portfólio

Guia deste projeto, escrito para quem está fazendo um site de ponta a ponta pela primeira vez, com **design** e **acessibilidade** como prioridades.

## A "cola" (o que mais vai ser usado)

| Quero…                                       | Faço isto                                                                                               |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Abrir o projeto no VS Code                   | Terminal: `cd ~/Documents/codes/larididone` e depois `code .`                                           |
| Ver o site no navegador, ao vivo             | No VS Code, abra `index.html` e clique em **Go Live** (canto inferior direito). Cada ⌘S atualiza a tela |
| Procurar problemas de HTML e acessibilidade  | `npm run check`                                                                                         |
| Deixar o código organizado                   | Só salvar com ⌘S (automático). Ou `npm run format`                                                      |
| Mudar uma cor, tamanho de texto ou espaço    | `css/tokens.css`: é o único lugar onde esses valores vivem                                              |
| Saber onde o site difere do Figma, e por quê | [docs/design-vs-codigo.md](docs/design-vs-codigo.md)                                                    |
| Ver o que já foi decidido, e o que falta     | [docs/decisoes.md](docs/decisoes.md)                                                                    |
| Salvar uma versão do trabalho                | Seção 6 (Git)                                                                                           |

> **Importante:** abra a pasta `larididone` no VS Code (não a pasta `codes`). É ela que carrega as configurações deste projeto (`.vscode/`).

---

## 1. O que está instalado neste computador

| Ferramenta                     | Para que serve                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------- |
| **Node.js + npm**              | Roda as ferramentas de verificação. O site em si **não** depende de Node         |
| **Comando `code`**             | Abre o VS Code pelo terminal                                                     |
| **Git**                        | Guarda o histórico de versões (já configurado com seu nome e e-mail)             |
| **Live Server** (VS Code)      | Mostra o site no navegador e atualiza sozinho                                    |
| **Prettier** (VS Code)         | Mantém o código sempre bem indentado e padronizado                               |
| **axe Accessibility Linter**   | Sublinha problemas de acessibilidade no HTML enquanto você escreve               |
| **HTML CSS Support** (VS Code) | Autocompleta no HTML os nomes de classes que existem no seu CSS                  |
| **Figma for VS Code**          | Mostra o design do Figma dentro do VS Code (abra o painel do Figma e faça login) |
| **`npm run check`**            | Valida o HTML e roda uma auditoria de acessibilidade (WCAG 2.2 AA) em português  |

## 2. O processo, do começo ao fim

Marque aqui conforme avançar.

- [x] **0. Preparar o computador** — feito.
- [ ] **1. Fechar o design no Figma** — **em andamento.** ([arquivo UI-Design](https://www.figma.com/design/kTQyYilEA2rApHxS9cB0Da/UI-Design); [revisão de acessibilidade do design](docs/revisao-do-design.md).) Em 13/10/2026 o Figma ganhou as telas de celular, os estados de foco e hover e os ajustes de cor ([docs/figma-atualizacoes.md](docs/figma-atualizacoes.md)); falta você conferir. Corrigir contraste no Figma custa minutos; corrigir depois de programado custa horas.
- [x] **2. Escrever o HTML** — feito: as 3 páginas (Home, About, Projects) e o modelo de estudo de caso em `modelos/`. A aba Contact é um link `mailto:` (D11 em docs/decisoes.md), com títulos, listas e landmarks.
- [x] **3. Estilizar com CSS** — feito: tokens em `css/tokens.css` e layout em `css/styles.css`. O menu do celular é uma dock flutuante no rodapé (escolha sua); o comportamento em telas pequenas foi aprovado em 13/10/2026 ([docs/responsivo.md](docs/responsivo.md)).
- [x] **4. JavaScript só se for preciso** — feito, com um script pequeno (a detecção de texto muito grande, que devolve o menu do celular para o topo (`js/text-size.js`). O site funciona sem eles.
- [ ] **5. Testar** — os testes automáticos passam (HTML, acessibilidade, teclado, larguras de 320 a 1440px, texto a 200%). **Falta** o teste manual em um celular de verdade e com o VoiceOver (seção 4).
- [x] **6. Salvar versões** — em dia: tudo está commitado na `main`.
- [ ] **7. Publicar** (seção 7).
- [ ] **8. Manter.** Atualizar projetos, textos e repetir `npm run check` a cada mudança.

**Por que HTML e CSS "puros", sem framework?** O site fica leve, rápido e acessível por padrão, e você aprende a base que qualquer ferramenta usa. Se um dia a repetição de cabeçalho/rodapé entre páginas incomodar, dá para migrar para o [Astro](https://astro.build) sem refazer o design.

## 3. Do Figma para o código

| No Figma                                        | No código                                                                                          |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Variables / Styles (cores, tipografia, espaços) | Variáveis CSS em `css/tokens.css` com os mesmos nomes (`color/text/link` vira `--color-text-link`) |
| Components e variants                           | Elementos HTML + classes CSS reutilizáveis (`.tab`, `.card`, `.window`, `.button`…)                |
| Auto layout                                     | Flexbox ou Grid                                                                                    |
| Frames de celular / tablet / desktop            | CSS que começa no celular + `@media (min-width: 40em)` onde o layout pede                          |
| Estados do protótipo (hover, pressed…)          | `:hover`, `:active` e, principalmente, **`:focus-visible`**                                        |
| Ordem das camadas                               | **Não vale como ordem de leitura.** A ordem é a do HTML (títulos, landmarks)                       |
| Px                                              | `rem` para texto e espaços (respeita o tamanho de fonte que a pessoa escolheu)                     |
| Ícones                                          | SVGs exportados do Figma, em `assets/icons/`                                                       |
| Fundo pontilhado (`BGPattern`)                  | Imagem de fundo repetida: `assets/pattern-dots.svg`                                                |

**Onde ler mais:**

- [docs/decisoes.md](docs/decisoes.md): o registro das decisões do projeto (o que, quando, por quê e onde), os padrões adotados e as pendências.
- [docs/revisao-do-design.md](docs/revisao-do-design.md): o que o design tem, tokens, contraste medido e o que ajustar no Figma.
- [docs/figma-atualizacoes.md](docs/figma-atualizacoes.md): o que mudou no Figma em 13/10/2026 e os limites do que foi feito.
- [docs/design-vs-codigo.md](docs/design-vs-codigo.md): cada diferença entre o Figma e o código, com o motivo, e como mantê-los alinhados.
- [docs/responsivo.md](docs/responsivo.md): como o site se adapta a telas pequenas (aprovado em 13/10/2026).

## 4. Acessibilidade

**Meta: WCAG 2.2 nível AA.** É o padrão internacional e o que ferramentas e leis costumam exigir.

### No design (Figma)

- **Contraste do texto:** mínimo **4,5:1** (texto grande, a partir de 24px ou 19px em negrito: **3:1**).
- **Contraste de elementos de interface** (bordas de campos, ícones, indicador de foco) contra o fundo: **3:1**.
- **Não deixe texto "mais claro" com transparência** (opacity). Isso derruba o contraste sem aparecer nas contas do Figma.
- **Desenhe o estado de foco** de cada link e botão, bem visível. É o estado mais esquecido.
- **Não use só cor** para comunicar algo (link, erro, selecionado): some sublinhado, ícone ou texto.
- **Alvos de clique/toque:** no mínimo **24×24px** (ideal 44×44px no celular).
- **Texto:** corpo a partir de 16px, entrelinha em torno de 1,5, linhas de no máximo ~75 caracteres. (Decidido em 13/10/2026: o corpo é 16px, D10 em [docs/decisoes.md](docs/decisoes.md).)
- **Texto sobre imagem ou fundo com padrão:** garanta o contraste no **pior ponto** do fundo, não só na cor principal.
- **Planeje os títulos:** um H1 por página, depois H2, H3… em ordem.

### No HTML

- `lang` correto em `<html>` e um `<title>` diferente em cada página.
- Estrutura com `<header>`, `<nav>`, `<main>`, `<footer>`, e **um** `<h1>` por página (sem pular níveis).
- Um link "Pular para o conteúdo" como primeiro elemento da página.
- **Link navega, botão executa uma ação.** Use `<a>` e `<button>`, nunca `<div>` clicável.
- Imagens com `alt` que descreva o que importa (ou `alt=""` se for só decoração). Ícones e ilustrações decorativos ficam escondidos de leitores de tela (`aria-hidden`).
- `aria-current="page"` no link da página atual no menu.
- Texto de link que faça sentido sozinho. Quando vários links têm o mesmo texto (os 4 "View case study"), cada um ganha um complemento só para leitores de tela.
- Listas sem marcador (`list-style: none`) ganham `role="list"`: sem isso o VoiceOver deixa de anunciá-las como lista. O validador de HTML (`.htmlvalidate.json`) está configurado para aceitar essa exceção.
- Regra de ouro do ARIA: se o HTML nativo resolve, não use ARIA.

### No CSS

- **Nunca** use `outline: none` sem colocar outro indicador de foco no lugar. Use `:focus-visible`.
- Respeite `@media (prefers-reduced-motion: reduce)` em qualquer animação. (Hoje o site não tem animações.)
- Tamanhos de texto em `rem`; o layout não pode quebrar com zoom de 200%.
- Cuidado com a **ordem** das regras: um `outline` definido num estilo que vem depois da regra de foco a anula. Aconteceu com o botão de enviar, e o teste de teclado pegou.

### Teste manual (leva ~10 minutos por página)

A ferramenta automática encontra só uma parte dos problemas. O resto é com você:

1. **Teclado:** aperte `Tab` pelo site todo. Dá para chegar em tudo? A ordem faz sentido? Você **vê** onde está o foco o tempo todo? `Enter` ativa links, `Espaço` ativa botões.
2. **Leitor de tela:** o VoiceOver já vem no Mac (⌘F5, ou Ajustes do Sistema → Acessibilidade → VoiceOver). Teste no Safari. Com `Control+Option+U` abre o Rotor, que lista títulos, links e landmarks: se a lista faz sentido, a estrutura está boa.
3. **Zoom:** ⌘+ até 200% e depois 400%. Nada pode ser cortado e não pode haver rolagem horizontal.
4. **Cores e movimento:** no Chrome, abra o DevTools, `⇧⌘P`, digite _Rendering_. Use _Emulate vision deficiencies_ (daltonismo) e _prefers-reduced-motion_.
5. **Segunda opinião:** DevTools → aba **Lighthouse** → categoria _Accessibility_.

### O que o `npm run check` cobre (e o que não)

Cobre: estrutura do HTML, contraste do estado normal, nomes e textos alternativos faltando, títulos, landmarks, tamanho de alvo, em celular (375px) e desktop (1280px).
**Não cobre:** estados de hover/foco, qualidade do texto alternativo, ordem de leitura, uso do teclado, leitor de tela. Por isso o teste manual existe.

**Sobre o aviso "Para revisar manualmente" no rodapé:** é esperado. O texto do rodapé fica sobre o fundo pontilhado e o axe não consegue calcular contraste sobre imagem de fundo. Já conferi à mão: no pior ponto (o pontinho teal mais escuro) o contraste é de **5,47:1**, acima do mínimo de 4,5:1. Se aparecer um aviso **novo**, vale olhar.

**Já testado neste projeto:** ordem do Tab e anel de foco em todos os elementos, link "Pular para o conteúdo", larguras de 320 a 1440px sem rolagem horizontal, texto a 200%, espaçamento de texto aumentado, e a dock do celular (nunca esconde o foco do teclado nem o fim da página). Detalhes em [docs/responsivo.md](docs/responsivo.md).

## 5. Comandos

| Comando                            | O que faz                                                            |
| ---------------------------------- | -------------------------------------------------------------------- |
| `npm run check`                    | Roda tudo: validação do HTML + acessibilidade                        |
| `npm run check:html`               | Só valida o HTML (mensagens em inglês; cada uma tem link explicando) |
| `npm run check:a11y`               | Só a auditoria de acessibilidade, em português                       |
| `node scripts/a11y.mjs about.html` | Auditoria de uma página específica                                   |
| `npm run format`                   | Reorganiza todos os arquivos com o Prettier                          |
| `npm install`                      | Reinstala as ferramentas (necessário só em um computador novo)       |

**Configurações:** `.prettierrc.json` faz o Prettier quebrar linhas em 100 colunas; `.htmlvalidate.json` usa as regras recomendadas, compatíveis com o Prettier, e aceita `role="list"`.

## 6. Git: salvar versões

Pense em cada _commit_ como uma foto do projeto naquele momento, com uma legenda. Dá para voltar a qualquer foto.

```bash
git status                      # o que mudou desde a última versão
git add .                       # separa tudo o que mudou para a próxima foto
git commit -m "Adiciona seção de projetos"   # tira a foto, com uma legenda curta
git log --oneline               # lista as versões salvas
```

**Trabalhe em branches.** Uma _branch_ é uma linha de trabalho separada: a `main` fica estável e o que está em construção fica à parte, até estar bom.

```bash
git switch -c nome-da-tarefa    # cria uma branch nova e vai para ela
# ...trabalha e faz commits...
git switch main                 # volta para a main
git merge nome-da-tarefa        # traz o trabalho para a main
git branch -d nome-da-tarefa    # apaga a branch (já incorporada)
```

Prefere uma interface visual? O **GitHub Desktop** já está instalado e faz o mesmo com botões.

> **Atenção:** o repositório Git está na pasta `~/Documents/codes`, que também contém o projeto `dona-da-dona`. Funciona, mas para publicar o site é bem mais simples ter o `larididone` como repositório próprio. Vale resolver isso **antes** da etapa de publicar.

## 7. Publicar

Para um site estático existem opções gratuitas com HTTPS automático: **GitHub Pages**, **Netlify**, **Cloudflare Pages** e **Vercel**. Todas publicam a partir de um repositório no GitHub. Um domínio próprio (ex.: `larididone.com`) é opcional e pago à parte, por ano.

Checklist antes de publicar:

- [x] `npm run check` sem problemas
- [ ] Teste manual feito, em um celular de verdade e com o VoiceOver
- [ ] Trocar o que é provisório (lista completa em [docs/design-vs-codigo.md](docs/design-vs-codigo.md), seção 6): endereço real do LinkedIn, links `#` dos cartões, textos "Sample project cards…" e "Illustrative concept", seção "Skills"
- [ ] Conferir se `larissadidone@gmail.com` é o e-mail que você quer deixar público nos links `mailto:` (aba Contact e "Get in touch")
- [x] `<title>` e `<meta name="description">` em cada página (conferir o texto final)
- [x] Favicon (`favicon.ico`, "LD" numa janela, 16×16px; D13)
- [ ] Imagem de compartilhamento (Open Graph)
- [ ] Página 404
- [ ] Separar o `larididone` em um repositório próprio

## 8. Estrutura de pastas

```
larididone/
├── index.html, about.html, projects.html            ← as páginas
├── modelos/estudo-de-caso.html                       ← molde de cada estudo de caso (modelo A)
├── css/
│   ├── tokens.css           ← cores, tamanhos e espaços (espelham as variáveis do Figma)
│   └── styles.css           ← layout, componentes e comportamento em telas pequenas
├── js/
│   └── text-size.js         ← detecta texto muito grande e devolve o menu do celular para o topo
├── assets/
│   ├── fonts/               ← Space Grotesk, hospedada no site (licença OFL)
│   ├── icons/               ← ícones exportados do Figma e ícones Phosphor (`ph-*.svg`, licença MIT)
│   └── pattern-dots.svg     ← fundo pontilhado
├── docs/
│   ├── decisoes.md          ← registro das decisões do projeto e das pendências
│   ├── revisao-do-design.md ← revisão do Figma: tokens, contraste, ajustes
│   ├── design-vs-codigo.md  ← onde e por que o código difere do Figma
│   ├── responsivo.md        ← como o site se adapta a telas pequenas
│   └── imagens/             ← comparações Figma × código e folhas de redimensionamento
├── scripts/a11y.mjs         ← o verificador de acessibilidade
├── package.json             ← lista de ferramentas e comandos (npm)
├── .htmlvalidate.json       ← regras do validador de HTML
├── .prettierrc.json         ← regras do formatador
├── .vscode/                 ← configurações do VS Code para este projeto
└── README.md                ← este guia
```

## 9. Se algo der errado

| Sintoma                                                   | O que fazer                                                                                                                                                          |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `command not found: code` (ou `node`, `npm`)              | Feche e **abra um terminal novo** (o do Mac ou o do VS Code). Terminais que já estavam abertos não enxergam a configuração nova, inclusive o do Claude Code          |
| `Não encontrei o Google Chrome` no `npm run check`        | Instale o Chrome, ou use `CHROME_PATH="/caminho/do/chrome" npm run check`                                                                                            |
| O `npm run check` lista o rodapé em "revisar manualmente" | É esperado (fundo pontilhado). Veja a seção 4                                                                                                                        |
| A seta ↗ parece diferente em outro computador             | A fonte do site não inclui esse símbolo, então o navegador usa uma fonte do sistema. É só decorativa ([docs/design-vs-codigo.md](docs/design-vs-codigo.md), seção 4) |
| Algo estranho depois de `npm install`                     | `rm -rf node_modules && npm install`                                                                                                                                 |
| O Prettier reorganizou um arquivo ao salvar               | Normal: ele só ajusta indentação e quebras de linha                                                                                                                  |
| Dúvida em qualquer etapa                                  | Peça ajuda ao Claude citando a seção deste guia                                                                                                                      |
