// Garante que as três superfícies de importação continuem coerentes:
//
//   cross-ui-v0         (src/index.ts)  -> só o que roda nas DUAS plataformas
//   cross-ui-v0/native  (src/native.ts) -> universal + exclusivos de native
//   cross-ui-v0/web     (src/web.ts)    -> universal + exclusivos de web
//
// A classificação não é declarada em lugar nenhum: ela é deduzida dos arquivos
// que existem na pasta do componente, que é o mesmo critério que o Metro (no
// native) e o Vite/webpack (na web) usam para resolver. Assim não dá pra a
// documentação e a realidade divergirem.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');

// Pastas de módulo que os barris podem exportar. `components/<Nome>` é uma
// pasta por componente; `templates` é uma pasta só, com vários arquivos —
// classify() lida com os dois porque olha todos os arquivos do diretório.
const MODULE_DIRS = /from '\.\/((?:components|templates)(?:\/[^'\/]+)?)'/g;

const NATIVE_SUFFIXES = ['.native', '.ios', '.android'];
const WEB_SUFFIXES = ['.web'];

/** Extrai os módulos (`components/<Nome>`, `templates`) exportados por um barril. */
function exportedComponents(barrel) {
  const source = readFileSync(join(SRC, barrel), 'utf8');
  // `lastIndex` é compartilhado num regex /g de escopo de módulo: reinicia
  // para o segundo barril não começar de onde o primeiro parou.
  MODULE_DIRS.lastIndex = 0;
  return [...source.matchAll(MODULE_DIRS)].map((m) => m[1]);
}

/**
 * Uma pasta é segura para uma plataforma se TODOS os componentes dela
 * resolvem nessa plataforma. Basta um arquivo sem contraparte para a pasta
 * inteira deixar de ser exportável ali.
 */
function classify(componentDir) {
  const files = readdirSync(join(SRC, componentDir)).filter(
    (f) => /\.tsx?$/.test(f) && !f.includes('.stories.') && f !== 'index.ts' && f !== 'types.ts'
  );

  const bases = new Set(files.map((f) => f.replace(/\.(tsx?|native|ios|android|web)+$/g, '').replace(/\.(native|ios|android|web)$/, '')));

  let supportsNative = true;
  let supportsWeb = true;

  for (const base of bases) {
    const has = (suffix) => files.includes(`${base}${suffix}.tsx`) || files.includes(`${base}${suffix}.ts`);
    const universal = has('');

    if (!universal && !NATIVE_SUFFIXES.some(has)) supportsNative = false;
    if (!universal && !WEB_SUFFIXES.some(has)) supportsWeb = false;
  }

  return { supportsNative, supportsWeb };
}

const RULES = [
  { barrel: 'index.ts', entry: 'cross-ui-v0', needsNative: true, needsWeb: true },
  { barrel: 'native.ts', entry: 'cross-ui-v0/native', needsNative: true, needsWeb: false },
  { barrel: 'web.ts', entry: 'cross-ui-v0/web', needsNative: false, needsWeb: true },
];

const errors = [];

for (const rule of RULES) {
  if (!existsSync(join(SRC, rule.barrel))) {
    errors.push(`barril ausente: src/${rule.barrel}`);
    continue;
  }

  for (const component of exportedComponents(rule.barrel)) {
    const { supportsNative, supportsWeb } = classify(component);

    if (rule.needsNative && !supportsNative) {
      errors.push(
        `${rule.entry} exporta "${component}", que não resolve no React Native ` +
          `(falta um arquivo .tsx ou .native.tsx). Mova para src/web.ts.`
      );
    }
    if (rule.needsWeb && !supportsWeb) {
      errors.push(
        `${rule.entry} exporta "${component}", que não resolve na web ` +
          `(falta um arquivo .tsx ou .web.tsx). Mova para src/native.ts.`
      );
    }
  }
}

if (errors.length) {
  console.error('\nEntry points inconsistentes:\n');
  errors.forEach((e) => console.error(`  - ${e}`));
  console.error('');
  process.exit(1);
}

console.log('entry points ok: index.ts (universal), native.ts, web.ts');
