import { existsSync, readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PKG_DIR = join(ROOT, 'packages', 'ui');
const pkg = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));

const problems = [];
const ok = (msg) => console.log('  ok   ', msg);
const fail = (msg) => {
  problems.push(msg);
  console.log('  FALHA', msg);
};

console.log(`\n${pkg.name}@${pkg.version}`);

console.log('\ncampos obrigatórios');
for (const field of ['name', 'version', 'license', 'description']) {
  if (pkg[field]) ok(`${field}: ${pkg[field]}`);
  else fail(`${field} ausente — o npm recusa ou publica sem metadado`);
}
if (pkg.private) fail('`private: true` impede a publicação');
else ok('não é private');

if (pkg.repository?.url) ok(`repository: ${pkg.repository.url}`);
else fail('repository ausente — a publicação com provenance falha sem ele');
for (const field of ['homepage', 'bugs']) {
  if (pkg[field]) ok(`${field} presente`);
  else fail(`${field} ausente — o npm mostra a página do pacote sem link`);
}

console.log('\nconteúdo publicado');
if (!pkg.files?.length) fail('`files` ausente — o tarball levaria o repositório inteiro');
else ok(`files: ${pkg.files.join(', ')}`);

const published = pkg.publishConfig?.exports ?? pkg.exports;
if (!published) fail('sem exports');

console.log('\nexports do publicado');
const targets = [];
for (const [entry, value] of Object.entries(published ?? {})) {
  const paths = typeof value === 'string' ? [value] : Object.values(value);
  for (const rel of paths) {
    const abs = resolve(PKG_DIR, rel);
    if (existsSync(abs)) ok(`${entry} -> ${rel}`);
    else fail(`${entry} -> ${rel} NÃO existe (faltou build?)`);
    if (/\.(js|cjs)$/.test(rel)) targets.push({ entry, rel, abs });
  }
}

console.log('\ncarregamento');
const require_ = createRequire(join(PKG_DIR, 'package.json'));
for (const { entry, rel, abs } of targets) {
  if (entry.includes('native')) {
    ok(`${entry} -> ${rel} (carregamento não verificável fora do React Native)`);
    continue;
  }
  try {
    if (rel.endsWith('.cjs')) {
      const m = require_(abs);
      ok(`${entry} -> ${rel} (${Object.keys(m).length} exports)`);
    } else {
      const m = await import(pathToFileURL(abs).href);
      ok(`${entry} -> ${rel} (${Object.keys(m).length} exports)`);
    }
  } catch (e) {
    fail(`${entry} -> ${rel} não carrega: ${e.message.split('\n')[0]}`);
  }
}

console.log('');
console.log('SSR e React Server Components');

const DIRECTIVE = '"use client"';
for (const rel of ['dist/web/index.js', 'dist/web/index.cjs']) {
  const content = readFileSync(join(PKG_DIR, rel), 'utf8');
  if (content.startsWith(DIRECTIVE)) ok(`${rel} começa com ${DIRECTIVE}`);
  else fail(`${rel} sem ${DIRECTIVE} — quebra como Server Component no App Router`);
}

const tokensJs = readFileSync(join(PKG_DIR, 'dist/tokens/index.js'), 'utf8');
if (tokensJs.startsWith(DIRECTIVE)) {
  fail('dist/tokens/index.js com "use client" — tokens é código puro e precisa rodar no servidor');
} else {
  ok('dist/tokens/index.js sem "use client"');
}

const css = readFileSync(join(PKG_DIR, 'dist/web/index.css'), 'utf8');
const varCount = (css.match(/--haquick-[\w-]+:/g) ?? []).length;
if (css.includes('--haquick-primary:')) ok(`CSS com o tema padrão embutido (${varCount} variáveis)`);
else fail('CSS sem as variáveis do tema — a página fica sem cor até o JS rodar');

if (css.includes('[data-scheme="dark"]')) ok('CSS com o bloco do tema escuro');
else fail('CSS sem o bloco escuro');

console.log('');
if (problems.length) {
  console.log(`${problems.length} problema(s) na embalagem do pacote`);
  process.exit(1);
}
console.log('pacote publicável ok');
