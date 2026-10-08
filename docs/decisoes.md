# Registro de decisões

Este registro guarda as decisões do projeto: **o que** foi decidido, **quando**, **por quê**, que alternativas existiam e **onde** a decisão vive no código. Quando uma decisão mudar, atualize aqui (ou peça ao Claude) para o projeto nunca contradizer a si mesmo.

Datas no formato dia/mês/ano. ✅ = decisão sua · 🔧 = padrão que adotei (você pode mudar) · ⏳ = pendente.

## 1. Decisões suas ✅

### D1. O site é em inglês — 08/10/2026

- **Decisão:** o idioma padrão do site é o inglês. Outros idiomas podem vir depois.
- **Onde:** `lang="en"` em todas as páginas, e todo o texto do site em inglês. A documentação do projeto está em português.
- **Se quiser português depois:** páginas numa pasta própria (ex.: `pt/`) com `lang="pt-BR"` e links entre as versões (`hreflang`). Ainda não planejado.

### D2. Trabalhar só no `larididone` — 08/10/2026

- **Decisão:** o projeto `dona-da-dona` não é usado, aberto nem alterado.
- **Onde:** todos os comandos e commits ficam restritos à pasta `larididone`.

### D3. Construir já, com as correções de acessibilidade no código — 08/10/2026

- **Decisão:** construir o site logo, aplicando no código as correções de acessibilidade, e atualizar o Figma depois. Você queria entender **se e quando** o código varia do design.
- **Regra que resulta disso:** o código segue o Figma; **toda** diferença é registrada e explicada. O Figma manda em cores, tipografia, espaços e componentes.
- **Onde:** [design-vs-codigo.md](design-vs-codigo.md).
- **Alternativa descartada:** esperar o Figma ser ajustado antes de construir.

### D4. Cor dos links: `#a31585` — 08/10/2026

- **Decisão:** usar o rosa de melhor contraste da sua paleta (`pink-purple/500`) nos links.
- **Por quê:** o rosa do Figma (`#d946b0`) dá 3,62:1 sobre o fundo, abaixo do mínimo de 4,5:1. O `#a31585` dá 6,57:1 (5,65:1 no hover) e já era a cor dos ícones, então texto e ícone ficam iguais.
- **Alternativas:** um rosa mais claro (`#ba2690`), que passa por apenas 0,01 no hover; ou manter `#d946b0`, que reprova.
- **Onde:** `--color-text-link` em [`css/tokens.css`](../css/tokens.css).
- **Pendente:** atualizar a variável `color/text/link` no Figma.

### D5. Os ícones da janela da Home são decorativos — 08/10/2026

- **Decisão:** são um elemento visual retrô e não funcionam como botões.
- **Onde:** a barra de título da janela (`.window__bar`) fica escondida de leitores de tela e fora da ordem do Tab. A variante "fantasma" (texto repetido a 26%) não foi construída; se entrar no design, será puramente decorativa.

### D6. O formulário de contato fica sem função por enquanto — 08/10/2026

- **Decisão:** a página mostra o formulário como no Figma, mas ele não envia nada. Um aviso substitui o envio.
- **Onde:** [`js/contact-form.js`](../js/contact-form.js).
- **Depois:** um serviço de envio (ex.: Formspree, Netlify Forms) ou um link de e-mail. Quando for conectado, os campos obrigatórios ganham `required` e o aviso no texto.

### D7. Menu do celular: dock flutuante — 08/10/2026

- **Decisão:** abaixo de 640px, o menu é uma barra flutuante no rodapé da tela (4 abas, ícone sobre o rótulo). Você escolheu a opção B depois de ver três mockups e confirmou depois de ver pronta.
- **Por quê:** a grade 2×2 da primeira proposta ocupava 112px e parecia uma grade comum. A dock fica ao alcance do polegar e mostra os 4 destinos o tempo todo.
- **Alternativas:** faixa compacta no topo (hoje é a versão de reserva), menu retrô com botão "Menu" (minha recomendação, descartada por você), menu hambúrguer, abas com rolagem horizontal.
- **Riscos tratados:** conteúdo e foco do teclado nunca ficam escondidos atrás da dock; ela cede lugar a uma faixa no topo em janelas baixas, estreitas ou com texto muito grande. Detalhes e testes em [responsivo.md](responsivo.md).
- **Onde:** blocos de navegação em [`css/styles.css`](../css/styles.css) e [`js/text-size.js`](../js/text-size.js).
- **Pendente:** desenhar a dock no Figma.

### D8. Separar o `larididone` em repositório próprio: ainda não — 08/10/2026

- **Decisão:** deixar para antes de publicar.
- **Situação hoje:** o Git está na pasta `~/Documents/codes`. O `larididone` não tem `.git` próprio e todos os commits só têm arquivos dele. O `dona-da-dona` tem um histórico separado na mesma pasta.
- **Plano combinado:** guardar uma cópia de segurança do histórico, recriar os commits num repositório dentro do `larididone` e aposentar (ou deixar de rastrear) o repositório antigo. O `dona-da-dona` não é tocado.

## 2. Padrões que adotei (você pode mudar) 🔧

| Padrão                                              | Por quê                                                                                                                                                         | Onde                                                         |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **HTML e CSS puros, sem framework**                 | Site leve, acessível por padrão e uma boa base para aprender. Migrar para o Astro só se a repetição de menu e rodapé incomodar                                  | [README](../README.md), seção 2                              |
| **Meta de acessibilidade: WCAG 2.2 nível AA**       | Você disse que acessibilidade é prioridade; AA é o padrão internacional                                                                                         | `npm run check` e teste manual                               |
| **Fonte Space Grotesk hospedada no site**           | É a fonte do Figma (licença livre, OFL). Sem pedir nada a serviços de terceiros, o que ajuda a privacidade e a velocidade                                       | `assets/fonts/`                                              |
| **Tokens com os nomes do Figma**                    | Cores, tamanhos e espaços mudam num lugar só                                                                                                                    | [`css/tokens.css`](../css/tokens.css)                        |
| **Correções de acessibilidade além do Figma**       | Borda dos campos `#17847a`, anel de foco de 2px em `#0d0081`, texto dos campos em 16px, hover do botão, link "Pular para o conteúdo"                            | [design-vs-codigo.md](design-vs-codigo.md), seção 2          |
| **Onde o Figma era inconsistente, escolhi um lado** | Altura da navegação, ícones das abas, versão do rodapé, tamanho dos rótulos e outros                                                                            | [design-vs-codigo.md](design-vs-codigo.md), seção 3          |
| **Redimensionamento: um ponto de quebra (640px)**   | Título fluido, cartões em 1 coluna, rótulos e rodapé empilhados, margens de 16px. **Implementado como proposta; aguarda sua aprovação explícita**               | [responsivo.md](responsivo.md)                               |
| **Texto do corpo em 14px**                          | É o que está no Figma (em `rem`). 16px é recomendação, não exigência da WCAG                                                                                    | `--fs-body` em `css/tokens.css`                              |
| **Texto da Home: a versão da página**               | "Hello, I’m Lari. I lead designers through change…", e não a variante "Welcome, I’m Lari…"                                                                      | `index.html`                                                 |
| **Sem Stylelint**                                   | A dependência dele gerava 6 avisos de segurança no `npm audit`, sem correção disponível; o VS Code já valida o CSS                                              | Configuração do projeto                                      |
| **Ferramentas de qualidade**                        | Prettier com 100 colunas; validador de HTML compatível com o Prettier (aceita `role="list"`); auditoria de acessibilidade própria, com o axe-core, em português | `.prettierrc.json`, `.htmlvalidate.json`, `scripts/a11y.mjs` |
| **Uma branch por tarefa**                           | A `main` fica estável; o trabalho em andamento fica à parte até estar bom                                                                                       | [README](../README.md), seção 6                              |

## 3. Pendências ⏳

| Pendência                                                                               | Quem                          | Observação                                                   |
| --------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------ |
| Aprovar o resto do redimensionamento (título fluido, cartões, rótulos, rodapé, margens) | Você                          | Checklist em [responsivo.md](responsivo.md)                  |
| Atualizar o Figma com as correções e a dock                                             | Você (ou eu, com o seu OK)    | Lista em [design-vs-codigo.md](design-vs-codigo.md), seção 2 |
| Desenhar as telas de celular no Figma                                                   | Você (ou eu, com o seu OK)    | [responsivo.md](responsivo.md)                               |
| Conteúdo real: endereço do LinkedIn, projetos e páginas dos estudos de caso             | Você                          | Os links dos cartões são `#` e o LinkedIn é genérico         |
| Teste em um celular de verdade e com o VoiceOver                                        | Você                          | Principalmente a dock com a barra do Safari embaixo          |
| Definir como o formulário envia mensagens                                               | Você                          | Veja D6                                                      |
| Texto final da Home e projetos reais                                                    | Você                          |                                                              |
| Corpo do texto: manter 14px ou subir para 16px                                          | Você                          | Recomendável, não obrigatório                                |
| Separar o repositório                                                                   | Você decide quando            | Antes de publicar (D8)                                       |
| Antes de publicar: favicon, imagem de compartilhamento, página 404                      | Combinar quando chegar a hora | Checklist no [README](../README.md), seção 7                 |

## 4. Como mudar uma decisão

Diga ao Claude o que mudou. Ele atualiza o código, a documentação afetada e este registro.

**Não apague a decisão antiga:** registre a nova com a data e marque a anterior como _substituída_. Assim dá para entender o caminho que o projeto percorreu.
