// Verificador automático de acessibilidade.
//
// O que ele faz:
//   1. Sobe um servidor local temporário com os arquivos do projeto.
//   2. Abre cada página .html num Chrome "invisível", em tela de celular e de desktop.
//   3. Roda o axe-core (o mesmo motor do Lighthouse e do axe DevTools) com as regras
//      WCAG 2.0, 2.1 e 2.2 níveis A e AA, mais boas práticas.
//   4. Mostra os problemas em português, com um link que explica como corrigir cada um.
//
// Uso:
//   npm run check:a11y                  -> todas as páginas
//   node scripts/a11y.mjs index.html    -> só as páginas indicadas
//
// Atenção: ferramenta automática encontra só uma parte dos problemas. Teclado, leitor de
// tela, qualidade do texto alternativo e estados de hover/foco pedem teste manual
// (veja o README).

import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import puppeteer from 'puppeteer-core';

const raiz = resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);

// Telas em que cada página é testada (o layout muda, e os problemas também).
const TELAS = [
  { nome: 'celular', largura: 375, altura: 812 },
  { nome: 'desktop', largura: 1280, altura: 800 },
];

// Conjuntos de regras do axe: WCAG A e AA (2.0, 2.1, 2.2) + boas práticas.
const REGRAS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

const IMPACTO = { critical: 'crítico', serious: 'sério', moderate: 'moderado', minor: 'leve' };
const ORDEM = Object.keys(IMPACTO);

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

// Cores no terminal (só quando há um terminal de verdade).
const cor = (codigo) => (texto) =>
  process.stdout.isTTY ? `\x1b[${codigo}m${texto}\x1b[0m` : texto;
const vermelho = cor(31);
const verde = cor(32);
const amarelo = cor(33);
const cinza = cor(90);
const negrito = cor(1);

// --- Chrome ----------------------------------------------------------------
const chrome = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
]
  .filter(Boolean)
  .find((caminho) => existsSync(caminho));

if (!chrome) {
  console.error(
    'Não encontrei o Google Chrome. Instale-o ou indique o caminho com CHROME_PATH=/caminho/do/chrome',
  );
  process.exit(2);
}

// --- Páginas a verificar ---------------------------------------------------
async function acharHtml(pasta) {
  const achados = [];
  for (const item of await readdir(pasta, { withFileTypes: true })) {
    if (item.name.startsWith('.') || item.name === 'node_modules') continue;
    const caminho = join(pasta, item.name);
    if (item.isDirectory()) achados.push(...(await acharHtml(caminho)));
    else if (item.name.endsWith('.html')) achados.push(caminho);
  }
  return achados;
}

const argumentos = process.argv.slice(2);
const paginas = (argumentos.length ? argumentos.map((a) => resolve(a)) : await acharHtml(raiz)).sort();

if (paginas.length === 0) {
  console.log('Nenhuma página .html encontrada.');
  process.exit(0);
}

// --- Servidor local temporário ---------------------------------------------
const servidor = createServer(async (req, res) => {
  try {
    const caminhoUrl = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let arquivo = resolve(raiz, `.${caminhoUrl}`);
    if (arquivo !== raiz && !arquivo.startsWith(raiz + sep)) {
      res.writeHead(403).end();
      return;
    }
    if (caminhoUrl.endsWith('/')) arquivo = join(arquivo, 'index.html');
    const conteudo = await readFile(arquivo);
    res.writeHead(200, { 'Content-Type': TIPOS[extname(arquivo)] ?? 'application/octet-stream' });
    res.end(conteudo);
  } catch {
    res.writeHead(404).end('Não encontrado');
  }
});
await new Promise((pronto) => servidor.listen(0, '127.0.0.1', pronto));
const { port } = servidor.address();

// --- axe-core (com textos em português do Brasil) --------------------------
const pastaAxe = dirname(require.resolve('axe-core'));
const axeFonte = await readFile(join(pastaAxe, 'axe.min.js'), 'utf8');
const axePtBR = JSON.parse(await readFile(join(pastaAxe, 'locales', 'pt_BR.json'), 'utf8'));

// --- Execução --------------------------------------------------------------
const problemas = new Map(); // erros que o axe tem certeza
const revisar = new Map(); // dúvidas que exigem olhar humano

function acumular(destino, pagina, tela, regras) {
  for (const regra of regras) {
    const chave = `${pagina}::${regra.id}`;
    const item = destino.get(chave) ?? { pagina, regra, elementos: new Map() };
    for (const no of regra.nodes) {
      const elemento = item.elementos.get(no.target) ?? { ...no, telas: new Set() };
      elemento.telas.add(tela);
      item.elementos.set(no.target, elemento);
    }
    destino.set(chave, item);
  }
}

let navegador;
try {
  navegador = await puppeteer.launch({ executablePath: chrome, headless: true });
  for (const arquivo of paginas) {
    const pagina = relative(raiz, arquivo).split(sep).join('/');
    for (const tela of TELAS) {
      const aba = await navegador.newPage();
      await aba.setViewport({ width: tela.largura, height: tela.altura });
      await aba.goto(`http://127.0.0.1:${port}/${pagina}`, { waitUntil: 'networkidle0' });
      await aba.addScriptTag({ content: axeFonte });
      const resultado = await aba.evaluate(
        async (idioma, regras) => {
          window.axe.configure({ locale: idioma });
          const r = await window.axe.run(document, {
            runOnly: { type: 'tag', values: regras },
            resultTypes: ['violations', 'incomplete'],
          });
          const enxuto = (lista) =>
            lista.map((v) => ({
              id: v.id,
              impact: v.impact,
              help: v.help,
              helpUrl: v.helpUrl,
              tags: v.tags,
              nodes: v.nodes.map((n) => ({
                target: n.target.join(' '),
                html: n.html,
                resumo: n.failureSummary ?? '',
              })),
            }));
          return { violations: enxuto(r.violations), incomplete: enxuto(r.incomplete) };
        },
        axePtBR,
        REGRAS,
      );
      await aba.close();
      acumular(problemas, pagina, tela.nome, resultado.violations);
      acumular(revisar, pagina, tela.nome, resultado.incomplete);
    }
  }
} catch (erro) {
  console.error('Não consegui rodar a verificação:', erro.message);
  process.exitCode = 2;
} finally {
  await navegador?.close();
  servidor.closeAllConnections?.();
  servidor.close();
}
if (process.exitCode === 2) process.exit(2);

// --- Relatório -------------------------------------------------------------
const wcag = (tags) =>
  tags
    .filter((t) => /^wcag\d{3,}$/.test(t))
    .map((t) => `WCAG ${t.replace(/^wcag(\d)(\d)(\d+)$/, '$1.$2.$3')}`)
    .join(', ');

const cortar = (texto, max) => {
  const linha = texto.replace(/\s+/g, ' ').trim();
  return linha.length > max ? `${linha.slice(0, max - 1)}…` : linha;
};

const porPagina = (mapa) => {
  const grupos = new Map();
  for (const item of mapa.values()) {
    grupos.set(item.pagina, [...(grupos.get(item.pagina) ?? []), item]);
  }
  return grupos;
};

const gravidade = (item) => {
  const posicao = ORDEM.indexOf(item.regra.impact);
  return posicao === -1 ? ORDEM.length : posicao;
};

let totalElementos = 0;
for (const [pagina, itens] of porPagina(problemas)) {
  console.log(`\n${negrito(`━━ ${pagina}`)}`);
  for (const item of itens.sort((a, b) => gravidade(a) - gravidade(b))) {
    const { regra, elementos } = item;
    console.log(`\n${vermelho('✖')} ${negrito(regra.help)}`);
    console.log(
      cinza(
        `  ${[`regra ${regra.id}`, `impacto ${IMPACTO[regra.impact] ?? 'n/d'}`, wcag(regra.tags)]
          .filter(Boolean)
          .join(' · ')}`,
      ),
    );
    const lista = [...elementos.values()];
    for (const el of lista.slice(0, 5)) {
      totalElementos += 1;
      console.log(`  • ${el.target}  ${cinza(`[${[...el.telas].join(', ')}]`)}`);
      console.log(cinza(`      ${cortar(el.html, 110)}`));
      const detalhes = el.resumo
        .split('\n')
        .slice(1)
        .map((linha) => linha.trim())
        .filter(Boolean)
        .slice(0, 2);
      for (const linha of detalhes) console.log(`      ${cortar(linha, 280)}`);
    }
    if (lista.length > 5) {
      totalElementos += lista.length - 5;
      console.log(cinza(`  … e mais ${lista.length - 5} elemento(s) com o mesmo problema`));
    }
    console.log(`  Como corrigir: ${regra.helpUrl}`);
  }
}

if (revisar.size > 0) {
  console.log(`\n${amarelo('⚠')} ${negrito('Para revisar manualmente')} ${cinza('(o axe não conseguiu decidir sozinho)')}`);
  for (const [pagina, itens] of porPagina(revisar)) {
    for (const item of itens) {
      const alvos = [...item.elementos.keys()].slice(0, 3).join(' | ');
      console.log(`  • ${pagina}: ${item.regra.help} ${cinza(`(${item.regra.id}) → ${alvos}`)}`);
    }
  }
}

const regrasComProblema = problemas.size;
console.log('');
if (regrasComProblema === 0) {
  console.log(`${verde('✔')} Nenhum problema automático em ${paginas.length} página(s).`);
  console.log(cinza('  Isso NÃO garante que o site seja acessível: faça também o teste manual (README).'));
} else {
  console.log(
    `${vermelho('✖')} ${regrasComProblema} problema(s) encontrado(s), afetando ${totalElementos} elemento(s) — ${paginas.length} página(s) testadas em ${TELAS.map((t) => `${t.nome} ${t.largura}px`).join(' e ')}.`,
  );
  process.exitCode = 1;
}
