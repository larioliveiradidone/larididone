# Lari Didone — Portfólio

Guia deste projeto, escrito para quem está fazendo um site de ponta a ponta pela primeira vez, com **design** e **acessibilidade** como prioridades.

## A "cola" (o que mais vai ser usado)

| Quero…                                 | Faço isto                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| Abrir o projeto no VS Code             | Terminal: `cd ~/Documents/codes/larididone` e depois `code .`                   |
| Ver o site no navegador, ao vivo       | No VS Code, clique em **Go Live** (canto inferior direito). Cada ⌘S atualiza a tela |
| Procurar problemas de HTML e acessibilidade | `npm run check`                                                            |
| Deixar o código organizado             | Só salvar com ⌘S (automático). Ou `npm run format`                              |
| Salvar uma versão do trabalho          | Seção 6 (Git)                                                                   |

> **Importante:** abra a pasta `larididone` no VS Code (não a pasta `codes`). É ela que carrega as configurações deste projeto (`.vscode/`).

---

## 1. O que está instalado neste computador

| Ferramenta                       | Para que serve                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------ |
| **Node.js + npm**                | Roda as ferramentas de verificação. O site em si **não** depende de Node       |
| **Comando `code`**               | Abre o VS Code pelo terminal                                                   |
| **Git**                          | Guarda o histórico de versões (já configurado com seu nome e e-mail)           |
| **Live Server** (VS Code)        | Mostra o site no navegador e atualiza sozinho                                  |
| **Prettier** (VS Code)           | Mantém o código sempre bem indentado e padronizado                             |
| **axe Accessibility Linter**     | Sublinha problemas de acessibilidade no HTML enquanto você escreve             |
| **HTML CSS Support** (VS Code)   | Autocompleta no HTML os nomes de classes que existem no seu CSS                |
| **Figma for VS Code**            | Mostra o design do Figma dentro do VS Code (abra o painel do Figma e faça login) |
| **`npm run check`**              | Valida o HTML e roda uma auditoria de acessibilidade (WCAG 2.2 AA) em português |

## 2. O processo, do começo ao fim

Marque aqui conforme avançar.

- [x] **0. Preparar o computador** — feito.
- [ ] **1. Fechar o design no Figma** ([arquivo UI-Design](https://www.figma.com/design/kTQyYilEA2rApHxS9cB0Da/UI-Design); a [revisão de acessibilidade do design](docs/revisao-do-design.md) lista o que ajustar). Antes de codar, defina o que falta: conteúdo real (textos, imagens), cores, tipografia, espaçamentos, versões **celular** e **desktop**, e os estados dos elementos clicáveis (normal, hover, **foco**). Rode o checklist de acessibilidade do design (seção 4). Corrigir contraste no Figma custa minutos; corrigir depois de programado custa horas.
- [ ] **2. Escrever o HTML.** Primeiro só estrutura e conteúdo, sem se preocupar com aparência: títulos, parágrafos, links, listas, imagens com texto alternativo. Uma página bem estruturada já é acessível pela metade.
- [ ] **3. Estilizar com CSS.** Transforme as cores, fontes e espaços do Figma em variáveis CSS (seção 3) e construa o layout, começando pelo celular.
- [ ] **4. JavaScript só se for preciso.** Um portfólio quase nunca precisa. Se precisar (ex.: menu no celular), prefira o mínimo.
- [ ] **5. Testar.** `npm run check` + teste manual (seção 4). Em cada etapa, não só no final.
- [ ] **6. Salvar versões.** Um _commit_ a cada avanço que funciona (seção 6).
- [ ] **7. Publicar** (seção 7).
- [ ] **8. Manter.** Atualizar projetos, textos e repetir `npm run check` a cada mudança.

**Por que HTML e CSS "puros", sem framework?** O site fica leve, rápido e acessível por padrão, e você aprende a base que qualquer ferramenta usa. Se um dia a repetição de cabeçalho/rodapé entre páginas incomodar, dá para migrar para o [Astro](https://astro.build) sem refazer o design.

## 3. Do Figma para o código

| No Figma                                       | No código                                                                    |
| ---------------------------------------------- | ---------------------------------------------------------------------------- |
| Variables / Styles (cores, tipografia, espaços) | Variáveis CSS em `:root`: `--cor-fundo`, `--espaco-4`… (use os mesmos nomes) |
| Components e variants                          | Elementos HTML + classes CSS reutilizáveis                                   |
| Auto layout                                    | Flexbox ou Grid                                                              |
| Frames de celular / tablet / desktop           | CSS que começa no celular + `@media (min-width: …)` onde o layout pede       |
| Estados do protótipo (hover, pressed…)         | `:hover`, `:active` e, principalmente, **`:focus-visible`**                  |
| Ordem das camadas                              | **Não vale como ordem de leitura.** A ordem é a do HTML (títulos, landmarks) |
| Px                                             | `rem` para texto (respeita o tamanho de fonte que a pessoa escolheu)         |

## 4. Acessibilidade

**Meta: WCAG 2.2 nível AA.** É o padrão internacional e o que ferramentas e leis costumam exigir.

### No design (Figma)

- **Contraste do texto:** mínimo **4,5:1** (texto grande, a partir de 24px ou 19px em negrito: **3:1**).
- **Contraste de elementos de interface** (bordas de campos, ícones, indicador de foco) contra o fundo: **3:1**.
- **Não deixe texto "mais claro" com transparência** (opacity). Isso derruba o contraste sem aparecer nas contas do Figma.
- **Desenhe o estado de foco** de cada link e botão, bem visível. É o estado mais esquecido.
- **Não use só cor** para comunicar algo (link, erro, selecionado): some sublinhado, ícone ou texto.
- **Alvos de clique/toque:** no mínimo **24×24px** (ideal 44×44px no celular).
- **Texto:** corpo a partir de 16px, entrelinha em torno de 1,5, linhas de no máximo ~75 caracteres.
- **Texto sobre imagem:** garanta o contraste com um fundo/overlay.
- **Planeje os títulos:** um H1 por página, depois H2, H3… em ordem.

### No HTML

- `lang` correto em `<html>` e um `<title>` diferente em cada página.
- Estrutura com `<header>`, `<nav>`, `<main>`, `<footer>`, e **um** `<h1>` por página (sem pular níveis).
- Um link "Pular para o conteúdo" como primeiro elemento da página.
- **Link navega, botão executa uma ação.** Use `<a>` e `<button>`, nunca `<div>` clicável.
- Imagens com `alt` que descreva o que importa (ou `alt=""` se for só decoração).
- `aria-current="page"` no link da página atual no menu.
- Texto de link que faça sentido sozinho ("Ver o projeto Atlas", não "clique aqui").
- Regra de ouro do ARIA: se o HTML nativo resolve, não use ARIA.

### No CSS

- **Nunca** use `outline: none` sem colocar outro indicador de foco no lugar. Use `:focus-visible`.
- Respeite `@media (prefers-reduced-motion: reduce)` em qualquer animação.
- Tamanhos de texto em `rem`; o layout não pode quebrar com zoom de 200%.

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

## 5. Comandos

| Comando                          | O que faz                                                                  |
| -------------------------------- | -------------------------------------------------------------------------- |
| `npm run check`                  | Roda tudo: validação do HTML + acessibilidade                              |
| `npm run check:html`             | Só valida o HTML (mensagens em inglês; cada uma tem link explicando)       |
| `npm run check:a11y`             | Só a auditoria de acessibilidade, em português                             |
| `node scripts/a11y.mjs index.html` | Auditoria de uma página específica                                       |
| `npm run format`                 | Reorganiza todos os arquivos com o Prettier                                |
| `npm install`                    | Reinstala as ferramentas (necessário só em um computador novo)             |

## 6. Git: salvar versões

Pense em cada _commit_ como uma foto do projeto naquele momento, com uma legenda. Dá para voltar a qualquer foto.

```bash
git status                      # o que mudou desde a última versão
git add .                       # separa tudo o que mudou para a próxima foto
git commit -m "Adiciona seção de projetos"   # tira a foto, com uma legenda curta
git log --oneline               # lista as versões salvas
```

Prefere uma interface visual? O **GitHub Desktop** já está instalado e faz o mesmo com botões.

> **Atenção:** o repositório Git está na pasta `~/Documents/codes`, que também contém o projeto `dona-da-dona`. Funciona, mas para publicar o site é bem mais simples ter o `larididone` como repositório próprio. Vale resolver isso **antes** da etapa de publicar.

## 7. Publicar

Para um site estático existem opções gratuitas com HTTPS automático: **GitHub Pages**, **Netlify**, **Cloudflare Pages** e **Vercel**. Todas publicam a partir de um repositório no GitHub. Um domínio próprio (ex.: `larididone.com`) é opcional e pago à parte, por ano.

Checklist antes de publicar:

- [ ] `npm run check` sem problemas, e teste manual feito
- [ ] Nada de texto ou imagem "placeholder", nem link `#` que não leva a lugar nenhum
- [ ] `<title>` e `<meta name="description">` em cada página
- [ ] Favicon e imagem de compartilhamento (Open Graph)
- [ ] Testado em um celular de verdade

## 8. Estrutura de pastas

```
larididone/
├── index.html, projects.html, contact.html   ← as páginas
├── style.css                                 ← o visual
├── assets/                                   ← imagens, fontes, ícones
├── scripts/a11y.mjs                          ← o verificador de acessibilidade
├── package.json                              ← lista de ferramentas e comandos (npm)
├── .vscode/                                  ← configurações do VS Code para este projeto
└── README.md                                 ← este guia
```

## 9. Se algo der errado

| Sintoma                                          | O que fazer                                                                 |
| ------------------------------------------------ | --------------------------------------------------------------------------- |
| `command not found: code` (ou `node`, `npm`)     | Feche e **abra um terminal novo** (o do Mac ou o do VS Code). Terminais que já estavam abertos não enxergam a configuração nova, inclusive o do Claude Code |
| `Não encontrei o Google Chrome` no `npm run check` | Instale o Chrome, ou use `CHROME_PATH="/caminho/do/chrome" npm run check`   |
| Algo estranho depois de `npm install`            | `rm -rf node_modules && npm install`                                        |
| O Prettier reorganizou um arquivo antigo ao salvar | Normal na primeira vez: ele só ajusta indentação e quebras de linha         |
| Dúvida em qualquer etapa                         | Peça ajuda ao Claude citando a seção deste guia                             |
