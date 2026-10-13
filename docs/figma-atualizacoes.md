# Atualizações no Figma

**Arquivo:** [UI-Design](https://www.figma.com/design/kTQyYilEA2rApHxS9cB0Da/UI-Design) · **Feito em:** 13/10/2026 (primeira rodada) e atualizado no mesmo dia (componentes, 16px, sem Contact), com o seu OK · **Por quê:** o código tinha correções de acessibilidade que o Figma não tinha ([design-vs-codigo.md](design-vs-codigo.md), seção 2). Agora o Figma volta a ser a referência.

## 1. Resumo: o que mudou e onde achar

| O quê                                                        | Onde no Figma                                   | Tipo de mudança                                                                                                                                          |
| ------------------------------------------------------------ | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cor dos links                                                | variável `color/text/link` (coleção Semantic)   | **Editada:** agora aponta para `pink-purple/500` (`#a31585`). Tudo que usava o link recolore sozinho (abas, "View case study", "Get in touch", LinkedIn) |
| Borda dos campos                                             | variável nova `color/border/input` → `mint/600` | **Criada** e ligada às 4 caixas do formulário (Contact)                                                                                                  |
| Texto dos campos                                             | os 4 campos da página Contact                   | **Editado:** 14px → 16px                                                                                                                                 |
| Anel de foco                                                 | variável nova `color/focus/ring` → `indigo/500` | **Criada** e desenhada na página States                                                                                                                  |
| Hover do botão                                               | variável `color/interactive/hover`              | **Editada:** de `indigo/400` para `indigo/700` (a variável não era usada em nenhum lugar, então nada mudou de cor por acidente)                          |
| Estados (foco, hover, aba atual, campo, "Skip")              | página **States**                               | **Nova**                                                                                                                                                 |
| Telas de celular (Home, Projects, About, Contact) com a dock | página **Mobile (375)**                         | **Nova**                                                                                                                                                 |

## 2. Página States

Uma folha de especificação com: anel de foco (link, aba, botão, campo), hover (link, aba, botão), aba da página atual, campo padrão/preenchido/com foco e o link "Skip to main content". Cada item traz o nome da variável usada.

## 3. Página Mobile (375)

Três telas de 375px (Home, Projects, About) desenhadas **a partir do site já construído**, com a dock onde ela fica na primeira tela (12px das bordas e do fundo de uma tela de 812px). Nas páginas compridas a dock real fica fixa enquanto a pessoa rola; no desenho ela aparece só na posição inicial.

**Componentes** (seção "Mobile components", ao lado das telas):

| Componente      | Variantes                           | Onde é usado                                                                               |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `Mobile/Dock`   | `Current` = Home · Projects · About | uma instância em cada tela                                                                 |
| `Mobile/Footer` | n/a                                 | uma instância em cada tela                                                                 |
| `Mobile/Card`   | `Art` = Cards · Rows                | 4 instâncias em Projects; o texto e a cor da ilustração são sobrescritos em cada instância |

O que mostram: título fluido, cartões em 1 coluna, rótulos e rodapé empilhados e margens de 16px (aprovados em 13/10/2026, D12: se mudar, as telas mudam).

## 4. Limites, para você não se surpreender

1. **Só Dock, Footer e Card são componentes.** O restante das telas (a janela da Home, os blocos de texto de About, o cabeçalho de Projects) são camadas editáveis que o Figma recebeu do site pronto. Textos de About e Projects usam o estilo `Body/Base` só nos desktops; nas telas de celular o texto não está ligado a estilos de texto.
2. **Cores:** as camadas e componentes do celular têm as cores ligadas às variáveis (79 ligações). O texto preto de About (`#000`) não tem variável.
3. **Os componentes de desktop não ganharam variantes novas.** `NavTab` ainda tem só as variantes que já tinha; hover e foco estão **desenhados na página States**, não dentro do componente. Os do celular (`Mobile/*`) são independentes dos de desktop (`Nav`, `Footer`, `Cases/Card`): são dois conjuntos, porque o layout muda (aba com ícone em cima, cartão em largura total).
4. **A tabela "Pairings" (contraste) não foi tocada.** Se ela ainda mostra o rosa antigo `#d946b0`, vale atualizá-la.
5. **Os frames de desktop não mudaram de layout.** Com o corpo em 16px eles cresceram só 3px (auto-layout). As diferenças da seção 3 do [design-vs-codigo.md](design-vs-codigo.md) continuam como estavam.
6. **O modelo de estudo de caso (D9) ainda não existe no Figma**, só no código. Dá para desenhá-lo, se quiser.
7. **Fundo pontilhado e fonte** vêm dos mesmos `BGPattern` e Space Grotesk do desktop.

## 5. Como manter isso em dia

- Uma cor ou tamanho muda? Mude a **variável** no Figma e o `css/tokens.css` (os nomes são os mesmos: `color/text/link` ↔ `--color-text-link`).
- Mudou o site? Peça "atualize as telas de celular no Figma" e eu regero as quatro a partir do código.
- Toda decisão nova entra no [registro de decisões](decisoes.md).
