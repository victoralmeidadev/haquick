import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PKG = join(dirname(fileURLToPath(import.meta.url)), '..', 'packages', 'ui');
const DIST = join(PKG, 'dist');

function mustExist(file) {
  if (!existsSync(file)) {
    console.error(`finish-build: falta ${file}. Rode o tsup antes.`);
    process.exit(1);
  }
  return file;
}

const DIRECTIVE = '"use client";';

for (const name of ['web/index.js', 'web/index.cjs']) {
  const file = mustExist(join(DIST, name));
  const current = readFileSync(file, 'utf8');
  if (current.startsWith(DIRECTIVE)) continue;
  writeFileSync(file, `${DIRECTIVE}\n${current}`);
}

const CSS = mustExist(join(DIST, 'web', 'index.css'));
const { generateThemeCSS } = await import(pathToFileURL(mustExist(join(DIST, 'tokens', 'index.js'))).href);

const theme = generateThemeCSS();
const components = readFileSync(CSS, 'utf8');

writeFileSync(
  CSS,
  ['/* Tema padrão, gerado em build por scripts/finish-build.mjs. */', theme, '', components].join(
    '\n'
  )
);

const varCount = (theme.match(/--haquick-[\w-]+:/g) ?? []).length;
console.log(`finish-build: "use client" na entrada web; ${varCount} variáveis do tema no CSS`);
