# Proposta de redimensionamento (aguardando sua aprovação)

O Figma só tem frames de desktop (1440px). Esta é a minha proposta de como o site se adapta a telas menores. **Já está implementada no código** para você poder ver e testar, mas nada disso existe no Figma até você aprovar (ou ajustar).

## Princípios

1. **Um único ponto de quebra: 640px.** A partir dele vale exatamente o layout do Figma; abaixo dele o conteúdo empilha. Os cartões e a navegação ainda "quebram" sozinhos quando faltar espaço.
2. **Medido em `em`, não em `px`.** `40em` equivale a 640px, mas se a pessoa aumentar a fonte do navegador o ponto de quebra sobe junto, e ela ganha o layout empilhado mais cedo. Isso ajuda quem precisa de texto grande.
3. **Nenhuma largura fixa.** Painel, janela, campos e cartões usam "no máximo X, senão a largura disponível".
4. **O texto grande encolhe com a tela** (título e subtítulo da Home, H1 das páginas) e para no tamanho do Figma a partir de ~720px. O texto pequeno (14px) não muda.
5. **Alvos de toque de 44px ou mais** nas abas, e 52px nos campos e no botão.

## Elemento por elemento

| Elemento                              | 640px ou mais (= Figma)                                         | Menos de 640px (proposta)                                               | Por quê                                                                   |
| ------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Navegação**                         | 1 linha, centralizada, com borda e cantos de baixo arredondados | Barra de ponta a ponta, abas em **2×2**, cada uma com 44px de altura    | 4 abas com ícone e texto (603px) não cabem em 320px. Mantém ícone e texto |
| **Janela da Home**                    | 700px, centralizada                                             | Largura total com 16px de margem, centralizada na altura da tela        | Mantém o "pop-up" retrô sem cortar texto                                  |
| **Título da Home**                    | 48px                                                            | 32px (320px de largura) → 34px (375px) → 48px (720px ou mais)           | Escala suave, sem saltos                                                  |
| **Subtítulo da Home**                 | 36px                                                            | 24px (320px) → 26px (375px) → 36px (720px ou mais)                      | Idem                                                                      |
| **H1 das páginas**                    | 36px                                                            | 28px (320px) → 29px (375px) → 36px (770px ou mais)                      | Idem                                                                      |
| **Painel** (About, Projects, Contact) | 686px, centralizado                                             | Largura total com 16px de margem e o mesmo padding interno              | Aproveita a largura                                                       |
| **Linhas rótulo + conteúdo**          | 2 colunas: rótulo de 145px + conteúdo                           | **Empilha**: rótulo em cima, conteúdo embaixo                           | Em 375px, 145px de rótulo deixaria só ~130px para o conteúdo              |
| **Cartões de projeto**                | 2 colunas de 314px                                              | **1 coluna** de largura total; a partir de ~620px de largura, 2 colunas | A ilustração mantém a proporção 280:164 em qualquer largura               |
| **Formulário**                        | Campos de 475px à direita do rótulo                             | Campos de largura total, empilhados sob o rótulo                        | Campo largo é mais fácil de tocar e de ler                                |
| **Rodapé**                            | 2 textos nas pontas, numa faixa de 566px                        | Empilhado e centralizado; o texto longo pode quebrar em 2 linhas        | Não cabe em uma linha em 375px                                            |
| **Fundo pontilhado**                  | tile de 16×8px                                                  | igual                                                                   | Não depende da largura                                                    |

## Veja como ficou (celular · tablet · desktop)

[![Home](imagens/responsivo-home.png)](imagens/responsivo-home.png)
[![About](imagens/responsivo-about.png)](imagens/responsivo-about.png)
[![Projects](imagens/responsivo-projects.png)](imagens/responsivo-projects.png)
[![Contact](imagens/responsivo-contact.png)](imagens/responsivo-contact.png)

## O que já foi testado

Em Chrome, nas 4 páginas:

- **Larguras de 320, 375, 640, 768, 1024 e 1440px:** nenhuma rolagem horizontal. (320px é o que a WCAG usa para o zoom de 400%.)
- **Texto a 200%** (tamanho da fonte do navegador) numa janela de 1280px: nada estoura.
- **Espaçamento de texto aumentado** (altura de linha 1,5, espaço entre letras e palavras maiores, regra WCAG 1.4.12): nada é cortado.
- **Teclado:** ordem do Tab lógica, anel de foco visível em todos os elementos, link "Pular para o conteúdo" funcionando.
- **`npm run check`** (axe em 375px e 1280px): nenhum problema.

Ainda falta, e só você ou um aparelho real faz: **testar num celular de verdade** e com **VoiceOver**.

## Alternativas que considerei e descartei

| Alternativa                             | Por que não                                                                                                               |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Menu "hambúrguer"                       | Precisa de JavaScript, esconde os 4 destinos atrás de um toque extra. Com só 4 itens, 2×2 é mais simples e mais acessível |
| Abas numa linha com rolagem horizontal  | Esconde itens e a rolagem horizontal dificulta o uso (e desrespeita o reflow da WCAG 1.4.10)                              |
| Barra de abas fixa no rodapé do celular | Ocupa tela, briga com as barras do navegador e foge do desenho (navegação no topo)                                        |

## Para você decidir

- [ ] Navegação em **2×2** no celular
- [ ] Título e subtítulo da Home **fluidos** (32 → 48px)
- [ ] Cartões em **1 coluna** no celular (2 a partir de ~620px)
- [ ] Rótulos **empilhados** acima do conteúdo no celular
- [ ] Rodapé **empilhado** e centralizado
- [ ] Margens laterais de **16px**

**Depois de aprovar, como levar isso para o Figma:**

1. Você desenha os frames de 375px (e 768px, se quiser) usando esta proposta como referência; ou
2. eu desenho esses frames no seu arquivo do Figma a partir desta proposta (isso escreve no seu arquivo, então só faço com o seu "pode fazer"); ou
3. o comportamento fica só no código e este documento é a referência. É o mais rápido, mas o Figma fica sem as versões pequenas e o risco de o design e o código se afastarem aumenta.
