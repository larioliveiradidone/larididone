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
- **Figma:** variável `color/text/link` atualizada em 13/10/2026.

### D5. Os ícones da janela da Home são decorativos — 08/10/2026

- **Decisão:** são um elemento visual retrô e não funcionam como botões.
- **Onde:** a barra de título da janela (`.window__bar`) fica escondida de leitores de tela e fora da ordem do Tab. A variante "fantasma" (texto repetido a 26%) não foi construída; se entrar no design, será puramente decorativa.

### D6. O formulário de contato fica sem função por enquanto — 08/10/2026 (_substituída pela D11_)

- **Decisão:** a página mostra o formulário como no Figma, mas ele não envia nada. Um aviso substitui o envio.
- **Onde:** [`js/contact-form.js`](../js/contact-form.js).
- **Depois:** um serviço de envio (ex.: Formspree, Netlify Forms) ou um link de e-mail. Quando for conectado, os campos obrigatórios ganham `required` e o aviso no texto.

### D7. Menu do celular: dock flutuante — 08/10/2026

- **Decisão:** abaixo de 640px, o menu é uma barra flutuante no rodapé da tela (4 abas, ícone sobre o rótulo). Você escolheu a opção B depois de ver três mockups e confirmou depois de ver pronta.
- **Por quê:** a grade 2×2 da primeira proposta ocupava 112px e parecia uma grade comum. A dock fica ao alcance do polegar e mostra os 4 destinos o tempo todo.
- **Alternativas:** faixa compacta no topo (hoje é a versão de reserva), menu retrô com botão "Menu" (minha recomendação, descartada por você), menu hambúrguer, abas com rolagem horizontal.
- **Riscos tratados:** conteúdo e foco do teclado nunca ficam escondidos atrás da dock; ela cede lugar a uma faixa no topo em janelas baixas, estreitas ou com texto muito grande. Detalhes e testes em [responsivo.md](responsivo.md).
- **Onde:** blocos de navegação em [`css/styles.css`](../css/styles.css) e [`js/text-size.js`](../js/text-size.js).
- **Figma:** a dock está desenhada na página Mobile (375) desde 13/10/2026.

### D8. Separar o `larididone` em repositório próprio: ainda não — 08/10/2026

- **Decisão:** deixar para antes de publicar.
- **Situação hoje:** o Git está na pasta `~/Documents/codes`. O `larididone` não tem `.git` próprio e todos os commits só têm arquivos dele. O `dona-da-dona` tem um histórico separado na mesma pasta.
- **Plano combinado:** guardar uma cópia de segurança do histórico, recriar os commits num repositório dentro do `larididone` e aposentar (ou deixar de rastrear) o repositório antigo. O `dona-da-dona` não é tocado.

### D9. Estudos de caso: modelo A, com ícones do Phosphor — 13/10/2026

- **Decisão:** você escolheu o **modelo A**: a ficha de dados (Client, Role, Skills, Year) em colunas logo abaixo do título, e **um ícone do Phosphor para cada título**. Os modelos B (rótulo à esquerda) e C (ficha técnica) foram descartados e apagados.
- **Ícones** (Phosphor, estilo _regular_, licença MIT em `assets/icons/PHOSPHOR-LICENSE.txt`): Client = `buildings`, Role = `identification-badge`, Skills = `toolbox`, Year = `calendar-blank`. Escolhi esses; se preferir outros, é só dizer.
- **Acessibilidade:** a ficha é uma lista de definição (`<dl>`): o leitor de tela anuncia "Client: nome". Os ícones são decorativos e entram por CSS, então o leitor de tela não os vê; herdam a cor do rótulo (contraste 5,47:1 ou mais).
- **Seções:** Overview, The problem, What I did, The outcome. Imagens com `<figcaption>`; o texto entre colchetes é para você trocar. A página tem `noindex` (some quando virar um projeto real).
- **Onde:** [`modelos/estudo-de-caso.html`](../modelos/estudo-de-caso.html) e [`css/case-study.css`](../css/case-study.css). Imagens: [desktop](imagens/modelo-estudo-de-caso-desktop.png) · [celular](imagens/modelo-estudo-de-caso-celular.png).
- **Próximo passo:** copiar o modelo para cada projeto real quando o conteúdo chegar.

### D10. Corpo do texto em 16px — 13/10/2026

- **Decisão:** todo o texto do corpo passa de 14px para 16px. O **rodapé fica em 14px**, para caber numa linha.
- **Alternativas:** manter 14px (como no Figma); ou só os textos longos em 16px.
- **Onde:** `--fs-body` e `--fs-footer` em [`css/tokens.css`](../css/tokens.css); os cartões reservam 4 linhas de 24px (`.card__text`).
- **Figma:** estilo `Body/Base` e variável `font-size/body` atualizados para 16px (veja [figma-atualizacoes.md](figma-atualizacoes.md)).
- **Consequência:** as páginas ficam mais altas que no Figma original e as medidas de 08/10 em [design-vs-codigo.md](design-vs-codigo.md) estão desatualizadas.

### D11. Contato por `mailto:` na aba do header; sem página nem formulário — 13/10/2026

- **Decisão:** a aba **Contact** do menu é um link `mailto:` que abre direto o programa de e-mail, **sem abrir uma tela nova**. O botão "Get in touch" em Projects usa o mesmo link. A página `contact.html`, o formulário e `js/contact-form.js` foram removidos (continuam no histórico do Git). Isto **substitui a D6**.
- **Acessibilidade:** a aba leva um texto só para leitor de tela, "(opens your email app)", para ninguém se surpreender com a troca de programa. A aba não tem estado de "página atual".
- **Em aberto:** o e-mail real. Hoje os links usam `EMAIL@EXAMPLE.COM` (é preciso trocar antes de publicar; a pessoa que visita vê o endereço, e ele pode receber spam).
- **Figma:** o frame desktop "Contact" continua no arquivo, mas **está obsoleto**. A aba Contact segue no desenho, agora como link de e-mail.
- **Se voltar atrás:** `git log` mostra a página; um serviço de formulário seria a alternativa 2 da seção 5.

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
| ~~Texto do corpo em 14px~~ (substituído pela D10)   | É o que está no Figma (em `rem`). 16px é recomendação, não exigência da WCAG                                                                                    | `--fs-body` em `css/tokens.css`                              |
| **Texto da Home: a versão da página**               | "Hello, I’m Lari. I lead designers through change…", e não a variante "Welcome, I’m Lari…"                                                                      | `index.html`                                                 |
| **Sem Stylelint**                                   | A dependência dele gerava 6 avisos de segurança no `npm audit`, sem correção disponível; o VS Code já valida o CSS                                              | Configuração do projeto                                      |
| **Ferramentas de qualidade**                        | Prettier com 100 colunas; validador de HTML compatível com o Prettier (aceita `role="list"`); auditoria de acessibilidade própria, com o axe-core, em português | `.prettierrc.json`, `.htmlvalidate.json`, `scripts/a11y.mjs` |
| **Uma branch por tarefa**                           | A `main` fica estável; o trabalho em andamento fica à parte até estar bom                                                                                       | [README](../README.md), seção 6                              |

## 3. Pendências ⏳

Atualizado em 13/10/2026, depois da sua revisão da lista.

### Adiadas de propósito (você decidiu esperar)

| Pendência                                                                               | Quando                      | Observação                                                               |
| --------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------ |
| Conteúdo real: endereço do LinkedIn, projetos e páginas dos estudos de caso             | Daqui a um tempo            | Os links dos cartões são `#`. Os modelos já estão prontos (D9)           |
| Teste em celular de verdade e com o VoiceOver                                           | Final do projeto            | Principalmente a dock com a barra do Safari embaixo                      |
| Aprovar o resto do redimensionamento (título fluido, cartões, rótulos, rodapé, margens) | Por enquanto fica como está | Segue valendo como proposta; checklist em [responsivo.md](responsivo.md) |
| Separar o repositório                                                                   | Antes de publicar (D8)      |                                                                          |
| Favicon, imagem de compartilhamento e página 404                                        | Antes de publicar           | Checklist no [README](../README.md), seção 7                             |

### Em andamento ou esperando uma escolha sua

| Pendência                                                                 | Situação                                                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ~~Escolher um modelo de estudo de caso~~                                  | ✅ Modelo A (D9)                                                                                       |
| ~~Como o formulário envia mensagens~~                                     | ✅ `mailto:` na aba Contact (D11). Falta o e-mail real                                                 |
| ~~Corpo do texto: 14px ou 16px~~                                          | ✅ 16px (D10)                                                                                          |
| Texto final da Home e projetos reais                                      | Você escreve; os modelos servem de roteiro                                                             |
| ~~Atualizar o Figma (cor do link, borda dos campos, foco, hovers, dock)~~ | ✅ Feito em 13/10/2026: [figma-atualizacoes.md](figma-atualizacoes.md). Falta você conferir            |
| ~~Desenhar as telas de celular no Figma~~                                 | ✅ Feito em 13/10/2026 (página Mobile (375)), como camadas e não como componentes. Falta você conferir |

## 4. Como mudar uma decisão

Diga ao Claude o que mudou. Ele atualiza o código, a documentação afetada e este registro.

**Não apague a decisão antiga:** registre a nova com a data e marque a anterior como _substituída_. Assim dá para entender o caminho que o projeto percorreu.

## 5. Análise (histórico): como o formulário enviaria mensagens

> Resolvida em 13/10/2026 pela **D11** (alternativa 1, `mailto:`). Fica aqui para o caso de você voltar atrás.

Seus critérios: **menor custo** e **acessibilidade**. O site é estático (sem servidor), então enviar uma mensagem exige um serviço de fora ou um link de e-mail.

| Alternativa                                                                                       | Custo                                                                          | Acessibilidade                                                                                                                                | Pontos de atenção                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Só um link de e-mail** (`mailto:`) e tirar o formulário                                      | Zero                                                                           | A melhor: nada para errar                                                                                                                     | Abre o programa de e-mail da pessoa (quem usa só webmail estranha). O endereço fica público e recebe spam. Foge do desenho do Figma                                                                                          |
| **2. Formulário HTML + serviço de formulários** (Formspree, Web3Forms, Netlify Forms ou parecido) | Plano grátis, com limite mensal de mensagens (confira os limites atuais antes) | Boa, se eu fizer certo: `<label>` em cada campo, `required`, mensagens de erro em texto, página de agradecimento. Funciona **sem JavaScript** | A mensagem passa por uma empresa de terceiros: precisa de uma linha de privacidade (você mora na Europa, vale a LGPD/GDPR). Anti-spam por campo invisível (honeypot), **sem CAPTCHA** (CAPTCHA é barreira de acessibilidade) |
| **3. Função própria** (ex.: Cloudflare Workers enviando e-mail)                                   | Grátis em volume pequeno                                                       | Igual à 2                                                                                                                                     | Mais trabalho e manutenção para um resultado igual. Só vale se você quiser aprender isso                                                                                                                                     |
| **4. Formulário + `mailto:` como reserva** (junção de 2 e 1)                                      | Grátis                                                                         | Boa                                                                                                                                           | Mostrar o e-mail ao lado do formulário ajuda quem não consegue usar o formulário                                                                                                                                             |

**Recomendação:** a alternativa 2, com o e-mail visível como reserva (4). Mantém o design do Figma, custa zero e, feita com HTML nativo, é tão acessível quanto a alternativa 1. A alternativa 1 é a escolha certa se você prefere **nenhum** terceiro recebendo dados.

**Antes de conectar**, o que preciso de você: qual e-mail recebe as mensagens e qual serviço você prefere (posso comparar os planos atuais quando chegar a hora).

## 6. Análise (histórico): corpo do texto em 14px ou 16px

> Resolvida em 13/10/2026 pela **D10** (16px). As imagens de comparação continuam em `imagens/`.

**Fato importante:** a WCAG **não** exige 16px. Ela exige que o texto possa ser ampliado até 200% sem perder conteúdo, e o site já cumpre isso (tamanhos em `rem`, que respeitam a fonte escolhida no navegador). Então é uma decisão de conforto e de design, não de conformidade.

**Argumentos para 16px**

1. **Leitura longa.** Os estudos de caso são textos de vários parágrafos; 16px é o tamanho que o navegador usa por padrão e o que mais gente lê sem esforço, principalmente com baixa visão ou cansaço visual.
2. **Telas de celular.** O sistema já usa 16px nos campos do formulário (para o iPhone não dar zoom sozinho). Texto de corpo menor que os campos causa um salto de tamanho dentro da mesma página.
3. **A Space Grotesk é larga e de aberturas pequenas**, e o negrito/peso do corpo no Figma é denso; um pouco mais de tamanho dá mais respiro entre as letras.
4. **Linha mais curta:** com 14px cada linha do painel de 686px chega perto de 95 caracteres; com 16px cai para cerca de 80, mais perto do confortável (45–80).

**Argumentos para ficar em 14px**

1. **É o desenho do Figma**, e o visual retrô e compacto depende dele. Com 16px, as páginas ficam mais compridas e os cartões de projeto (descrição de 4 linhas) crescem.
2. É um tamanho comum em interfaces, aceitável se o contraste é alto (aqui é) e se o zoom funciona (funciona).

**Comparação lado a lado (About):** [14px](imagens/corpo-14px.png) · [16px](imagens/corpo-16px.png).

**Meio-termo possível:** 14px nos cartões e rótulos (peças de interface) e 16px só nos textos longos (estudos de caso e About). Funciona, mas cria dois tamanhos de corpo para manter.

**Minha recomendação:** 16px nos textos longos (estudos de caso). Para as demais páginas, a decisão é visual: veja as imagens e escolha. Qualquer opção que você escolher, registro aqui e no [design-vs-codigo.md](design-vs-codigo.md).
