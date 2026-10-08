/*
  TEXTO MUITO GRANDE
  ------------------
  Em telas pequenas a navegação é uma "dock" flutuante no rodapé. Se a pessoa aumenta muito o
  tamanho do texto (por exemplo, "Tamanho do texto" no Safari do iPhone), as abas passam para
  várias linhas e a dock cobriria boa parte da tela e o fim da página.

  Este script marca a página (atributo data-big-text no <html>) quando o texto está bem acima
  do padrão, e o CSS volta para a faixa no topo (que rola junto com a página), com as abas em
  2×2. Sem JavaScript tudo continua funcionando; só esse caso extremo fica menos elegante.
*/
const TAMANHO_PADRAO_PX = 16;

const marcar = () => {
  const px = parseFloat(getComputedStyle(document.documentElement).fontSize);
  document.documentElement.toggleAttribute("data-big-text", px > TAMANHO_PADRAO_PX * 1.25);
};

marcar();
addEventListener("resize", marcar);
