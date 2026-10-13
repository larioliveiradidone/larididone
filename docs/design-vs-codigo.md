# Design × código: onde e por que variam

**Referência:** [UI-Design no Figma](https://www.figma.com/design/kTQyYilEA2rApHxS9cB0Da/UI-Design) · **Medido em:** 08/10/2026 · **Cobertura:** as 4 páginas desktop (1440px). As telas de celular foram desenhadas no Figma em 13/10/2026 **a partir do site** (veja [figma-atualizacoes.md](figma-atualizacoes.md)), então não há o que comparar ali: o código veio primeiro (veja [responsivo.md](responsivo.md)).

> **Ideia central:** o Figma é um desenho num tamanho só; o navegador é um ambiente vivo (telas, fontes, zoom, teclado, leitor de tela). Por isso **sempre vai haver diferença**. O que importa é que cada diferença seja **conhecida, explicada e decidida por você**. Este documento é a lista dessas diferenças.

## 1. O que bateu e o que não bateu

Comparei o render do Figma (tamanho real, 1×) com o site no Chrome, medindo as caixas pixel a pixel pela cor das bordas.

| Elemento                                 | Figma                       | Código            | Diferença     | Explicação                                                                                                                                                            |
| ---------------------------------------- | --------------------------- | ----------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Janela da Home                           | 700×217, (370,314)          | idêntico          | **0**         |                                                                                                                                                                       |
| Fundo pontilhado                         | tile 16×8, pontos 2×2 a 38% | idêntico          | **0**         | Medi as cores dos pixels do Figma. A imagem de diferença fica preta no fundo                                                                                          |
| Cartões de projeto (4)                   | 314×486                     | idêntico          | **0**         | Posições nas colunas também idênticas                                                                                                                                 |
| Painel Projects                          | 686×1314                    | 686×1314          | **0**         |                                                                                                                                                                       |
| Painel Contact                           | 686×1058                    | 686×1058          | **0**         |                                                                                                                                                                       |
| Campos do formulário (4)                 | 475×52 e 475×156            | idêntico          | **0**         |                                                                                                                                                                       |
| Painel About                             | 686×1057                    | 686×1001          | **−56px**     | −40: sobra uma linha vazia de 36px na grade de "Skills" no Figma. −16: o rótulo "Relevant Links" está com 22px no Figma e quebra em 2 linhas; usei o estilo H2 (20px) |
| Botão "Send message"                     | 177×52                      | 153×52            | −24px         | No Figma o texto tem uma moldura fixa de 153px; no código o botão acompanha o texto                                                                                   |
| Largura da navegação                     | 602                         | 596               | −6px          | O Figma tem espaço duplo em "Hi, I’m Lari"; o HTML recolhe para um espaço                                                                                             |
| Altura da navegação (Projects e Contact) | 94                          | 78                | −16px         | Nessas duas páginas o Figma usa 24px de padding vertical; o componente `Nav` usa 16px. Usei o do componente em todas                                                  |
| Altura total da página Contact           | 1500                        | 1293              | −207px        | −16 (navegação) −45 (o Figma usa outra versão do rodapé, mais alta) −146 (o frame tem altura fixa com espaço vazio embaixo)                                           |
| Altura total (Home / About / Projects)   | 828 / 1292 / 1565           | 828 / 1236 / 1549 | 0 / −56 / −16 | As mesmas causas acima                                                                                                                                                |

Imagens lado a lado (Figma · Código · Diferença; **preto = igual**): [Home](imagens/comparacao-home.png) · [About](imagens/comparacao-about.png) · [Projects](imagens/comparacao-projects.png) · [Contact](imagens/comparacao-contact.png)

## 2. Diferenças que eu criei de propósito (o Figma deve ganhar o mesmo)

São mudanças de acessibilidade ou necessidades da web. Para o Figma e o código voltarem a concordar, é o **Figma** que precisa mudar.

| #   | Item                         | Figma                                                 | Código                                                    | Motivo                                                                                              |
| --- | ---------------------------- | ----------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1   | **Cor dos links**            | `color/text/link` `#d946b0` (3,62:1; 3,11:1 no hover) | `#a31585` (`pink-purple/500`): 6,57:1 e 5,65:1            | WCAG 1.4.3. **Decisão sua.** Os ícones já eram `#a31585`, então texto e ícone agora têm a mesma cor |
| 2   | **Borda dos campos**         | `color/border/default` `#38ccbe` (1,87:1)             | `#17847a` (`mint/600`): 4,27:1                            | WCAG 1.4.11 pede 3:1 para a borda de um campo                                                       |
| 3   | **Estado de foco**           | não existe                                            | anel de 2px em `indigo/500`, 2px de afastamento (14,79:1) | WCAG 2.4.7                                                                                          |
| 4   | **Texto dos campos**         | 14px                                                  | 16px (o digitado em `text/primary`)                       | O Safari do iPhone dá zoom sozinho em campos com menos de 16px                                      |
| 5   | **Hover do botão**           | não existe                                            | fundo `indigo/700`                                        | Feedback ao passar o mouse                                                                          |
| 6   | **Hover dos links de texto** | não existe                                            | sublinhado                                                | Idem                                                                                                |
| 7   | **"Skip to main content"**   | não existe                                            | link visível só quando recebe foco (primeiro Tab)         | WCAG 2.4.1: quem usa teclado pula a navegação                                                       |

**Alinhado no Figma em 13/10/2026** (itens 1 a 5): variável `color/text/link` trocada, `color/border/input` e `color/focus/ring` criadas, hover do botão em `indigo/700`, campos com texto de 16px, e estados desenhados na página States. O item 6 (sublinhado no hover) e o item 7 (Skip) também estão na página States. Detalhes e limites em [figma-atualizacoes.md](figma-atualizacoes.md).

## 3. Escolhas que fiz onde o próprio Figma era inconsistente

Em todos estes casos o Figma tinha duas versões ou um detalhe que parece acidente. **Escolhi um lado.** Se preferir o outro, é só pedir (ou corrigir o Figma).

| Item                      | No Figma                                                                 | No código                                                                                  |
| ------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Altura da navegação       | 16px (Home, About) × 24px (Projects, Contact)                            | 16px em todas (componente `Nav`)                                                           |
| Ícones das abas           | mudam de página para página                                              | Home = sorriso, Projects = palmas, About = sorriso, Contact = balão (como em Home e About) |
| Rodapé                    | Contact tem outra versão (16px, mais alta) e diz "Designed **in** Figma" | Componente `Footer` em todas, "Designed **on** Figma"                                      |
| Rótulos de seção          | 20px (estilo H2); "Skills" e "Relevant Links" com 22px                   | 20px em todos                                                                              |
| Grade de "Skills"         | linha vazia de 36px sobrando                                             | não replicada                                                                              |
| Botão "Send message"      | moldura de texto de 153px, botão com folga à direita                     | botão acompanha o texto                                                                    |
| Espaços duplos            | "Hi, I’m Lari", "Cancer survivor, married"                               | um espaço                                                                                  |
| "LinkedIn"                | "Linkedin" no About                                                      | "LinkedIn"                                                                                 |
| Altura dos cartões        | título fixo em 60px, descrição em 84px                                   | alturas **mínimas** (iguais hoje; crescem se o texto crescer)                              |
| Linha divisória da janela | imagem SVG                                                               | borda CSS (mesmo visual, acompanha a largura)                                              |
| Cor do texto no About     | preto (`#000`), enquanto os cartões usam `text/primary`                  | mantido como no Figma. É uma inconsistência pequena de design                              |

## 4. Diferenças inevitáveis da web

1. **Desenho das letras.** O Figma e o Chrome suavizam as bordas das letras de forma diferente. Na imagem de diferença isso aparece como contornos finos de ±1px em todo texto. Não é erro.
2. **Quebras de linha.** Dependem da largura real das letras no navegador. Nas 4 páginas todas as quebras coincidiram (as alturas dos blocos batem), mas isso pode mudar se o texto mudar.
3. **A seta ↗.** A versão web da Space Grotesk que hospedei (subconjunto "latin") não inclui esse símbolo (U+2197). O navegador usa uma fonte do sistema para ele, então o desenho da seta pode variar entre Mac, Windows e celular. É decorativa. Se quiser a mesma seta em todo lugar, dá para trocar por um ícone SVG.
4. **Barra de rolagem.** No Windows ocupa ~15px da largura; o site centraliza no espaço que sobra.
5. **Controles nativos.** O campo de mensagem tem a "alça" de redimensionar no canto, comportamento do navegador.
6. **Altura da página.** O frame do Figma tem altura fixa (Contact: 1500px, com ~146px vazios embaixo); a página real cresce com o conteúdo. Na Home a janela é centralizada na altura da janela do navegador (828px no Figma).
7. **Unidades relativas.** Tamanhos em `rem`: se a pessoa aumentar a fonte do navegador, o site cresce junto, **de propósito**. O Figma tem um tamanho só.
8. **Carregamento da fonte.** Por um instante o texto pode aparecer numa fonte do sistema até a Space Grotesk carregar (já está hospedada no site e pré-carregada, então é rápido).

## 5. O que o Figma ainda não tem (e eu improvisei)

- **Mobile:** agora há telas no Figma (página Mobile (375)), mas desenhadas a partir do código. **Tablet** continua sem desenho. Proposta completa em [responsivo.md](responsivo.md). O **menu do celular** é uma dock flutuante no rodapé da tela (escolha sua, 08/10), com uma faixa no topo como reserva para janelas baixas e texto muito grande. Existe um pequeno script para isso (`js/text-size.js`).
- **Estados:** foco e hover já estão na página States do Figma; **erro e sucesso do formulário** ainda não existem.
- **Mensagem ao enviar o formulário:** "This form isn’t connected yet, so nothing was sent."
- **Título e descrição** de cada página (`<title>`, `<meta description>`), escritos a partir dos textos do Figma.
- **Favicon, imagem de compartilhamento e página 404.**

## 6. Conteúdo provisório (resolver antes de publicar)

- Links `#` nos 4 cartões (precisam das páginas dos estudos de caso).
- LinkedIn: o endereço é genérico (`linkedin.com`) em About e Contact.
- Textos do Figma que parecem notas: "Sample project cards — replace these concepts…" e "Illustrative concept".
- "Skills" repete três linhas de "As a manager".
- Formulário **sem função** (decisão sua, por enquanto).
- Texto da Home: usei o da página ("Hello, I’m Lari. I lead designers through change…"), não o da variante "Welcome, I’m Lari…". Me avise se o texto final for o outro.
- Rodapé: "2026 Lari Didone" está sem o símbolo ©, como no Figma.

## 7. Quando o design e o código vão variar (e como manter alinhados)

**Já variam, por construção:** as seções 2 a 5.

**Vão variar de novo quando:**

1. **Você mudar o Figma e o código não acompanhar.** É o caso mais comum, e o nome técnico é _drift_. Regra: o **Figma manda** em cores, tipografia, espaços e componentes; o **código manda** em estados e adaptação a telas, até que sejam desenhados.
2. **O conteúdo mudar.** Texto maior, mais projetos, outra língua: o código se ajusta sozinho; o Figma, não. A página real pode ficar mais alta ou mais baixa que o frame.
3. **A pessoa que visita mudar o ambiente:** fonte maior, zoom, tela pequena, alto contraste, leitor de tela, sem JavaScript. O site se adapta **de propósito**, e o Figma mostra um único cenário (1440px).
4. **Você (ou eu) pedir um ajuste só no código**, como "aumenta esse espaço". Vira diferença, então precisa ir para o Figma ou para a lista da seção 3.

**Rotina para manter alinhado:**

1. Mude no Figma e me mande o link do frame.
2. Eu atualizo o `css/tokens.css` (as cores, tamanhos e espaços vivem **só ali**) e o componente afetado.
3. Repito a comparação e rodo o `npm run check`.
4. Atualizo este documento: o que foi resolvido sai da lista.

**Regra de bolso para ler uma diferença:**

- **Contorno de texto ou ±2px:** ignore, é a renderização.
- **Cor, tamanho de fonte ou espaçamento:** tem que estar nas seções 2 e 3. Se não estiver, é um **erro do código** e deve ser corrigido.
- **Comportamento (hover, foco, mobile):** o Figma deveria ganhar esses estados.

## 8. Como a comparação foi feita (dá para repetir)

1. Pedi ao Figma o render de cada página no tamanho real (1×).
2. Tirei um screenshot de cada página no Chrome, a 1440px de largura.
3. Medi as caixas por cor exata de borda (painel `#106059`, janela `#a31585`, cartões `#38ccbe` etc.) e comparei posição e tamanho.
4. Gerei a imagem de diferença (os dois renders sobrepostos: preto = igual).
5. Corrigi tudo o que era erro meu (por exemplo, dois espaçamentos do Projects) e documentei o resto.

Para repetir, peça: _"compare o site com o Figma"_.
