# Atualizações no Figma

**Arquivo:** [UI-Design](https://www.figma.com/design/kTQyYilEA2rApHxS9cB0Da/UI-Design) · **Feito em:** 13/10/2026, com o seu OK · **Por quê:** o código tinha correções de acessibilidade que o Figma não tinha ([design-vs-codigo.md](design-vs-codigo.md), seção 2). Agora o Figma volta a ser a referência.

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

Quatro telas de 375px de largura, desenhadas **a partir do site já construído** (por isso batem com ele). A dock aparece onde fica na primeira tela (12px das bordas e do fundo de uma tela de 812px). Nas páginas compridas, a dock real fica fixa na tela enquanto a pessoa rola; no desenho ela aparece só na posição inicial.

O que mostram: título fluido, cartões em 1 coluna, rótulos e rodapé empilhados e margens de 16px (a proposta de [responsivo.md](responsivo.md), ainda não aprovada por você: se mudar, as telas mudam).

## 4. Limites, para você não se surpreender

1. **As telas de celular são camadas editáveis, mas não são componentes.** O Figma recebeu o desenho do site pronto, então o texto, as caixas e os ícones são editáveis, mas **não** estão ligados aos componentes (Nav, Footer, Cases/Card) nem às variáveis de cor. Mudar uma variável não recolore as telas de celular. Se quiser que sejam componentes, é um trabalho à parte.
2. **Os componentes de desktop não ganharam variantes novas.** `NavTab` ainda tem só as variantes que já tinha; hover e foco estão **desenhados na página States**, não dentro do componente.
3. **A tabela "Pairings" (contraste) não foi tocada.** Se ela ainda mostra o rosa antigo `#d946b0`, vale atualizá-la.
4. **Os frames de desktop não mudaram de tamanho ou de layout.** As diferenças da seção 3 do [design-vs-codigo.md](design-vs-codigo.md) (altura da navegação, rodapé de Contact etc.) continuam como estavam.
5. **Fundo pontilhado nas telas de celular:** vem do mesmo padrão do desktop (`BGPattern`).
6. **Fonte:** Space Grotesk, a mesma do arquivo.

## 5. Como manter isso em dia

- Uma cor ou tamanho muda? Mude a **variável** no Figma e o `css/tokens.css` (os nomes são os mesmos: `color/text/link` ↔ `--color-text-link`).
- Mudou o site? Peça "atualize as telas de celular no Figma" e eu regero as quatro a partir do código.
- Toda decisão nova entra no [registro de decisões](decisoes.md).
