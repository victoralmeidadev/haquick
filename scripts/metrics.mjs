import { readFileSync, readdirSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'packages', 'ui', 'src');
const SITE_DIST = join(ROOT, 'apps', 'site', 'dist', 'assets');

const countLines = (f) =>
  readFileSync(f, 'utf8')
    .split('\n')
    .filter((l) => {
      const t = l.trim();
      return t && !t.startsWith('//') && !t.startsWith('*') && !t.startsWith('/*');
    }).length;

const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]
  );

const sources = walk(SRC).filter(
  (f) => /\.(tsx?|css)$/.test(f) && !f.includes('.stories.') && !f.endsWith('.d.ts')
);

const loc = { reused: 0, core: 0, web: 0, native: 0, shared: 0 };
for (const f of sources) {
  const rel = f.split(sep).join('/');
  const n = countLines(f);
  if (rel.includes('/tokens/') || rel.endsWith('useControllableState.ts')) loc.reused += n;
  else if (rel.includes('/core/')) loc.core += n;
  else if (rel.includes('/web/')) loc.web += n;
  else if (rel.includes('/native/')) loc.native += n;
}

loc.shared = loc.reused + loc.core;
const totalLoc = loc.shared + loc.web + loc.native;
const sharedPct = Math.round((loc.shared / totalLoc) * 1000) / 10;

function exportedFrom(entry) {
  const src = readFileSync(entry, 'utf8');
  const names = new Set();
  for (const m of src.matchAll(/^export\s+\{([^}]*)\}/gms)) {
    for (const raw of m[1].split(',')) {
      const name = raw.trim().split(/\s+as\s+/).pop()?.trim();
      if (name && /^[A-Z][A-Za-z0-9]*$/.test(name) && !/^[A-Z0-9_]+$/.test(name)) {
        names.add(name);
      }
    }
  }
  return names;
}

const webExports = exportedFrom(join(SRC, 'web', 'index.ts'));
const nativeExports = exportedFrom(join(SRC, 'native', 'index.ts'));
const webOnly = [...webExports].filter((n) => !nativeExports.has(n)).sort();

let bundle = null;
if (existsSync(SITE_DIST)) {
  const assets = readdirSync(SITE_DIST);
  const sum = (ext) =>
    assets
      .filter((a) => a.endsWith(ext))
      .reduce((total, a) => total + statSync(join(SITE_DIST, a)).size, 0);

  const cssText = assets
    .filter((a) => a.endsWith('.css'))
    .map((a) => readFileSync(join(SITE_DIST, a), 'utf8'))
    .join('');

  bundle = {
    jsBytes: sum('.js'),
    cssBytes: sum('.css'),
    cssRules: (cssText.match(/\{[^{}]*\}/g) ?? []).length,
  };
}

const metrics = {
  components: { web: webExports.size, native: nativeExports.size },
  webOnly,
  loc,
  totalLoc,
  sharedPct,
  bundle,
};

if (process.argv.includes('--write')) {
  const out = join(ROOT, 'apps/site/src/metrics.json');
  writeFileSync(out, JSON.stringify(metrics, null, 2) + '\n');
  console.log('gravado em', out);
}

console.log(JSON.stringify(metrics, null, 2));
