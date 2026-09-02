import { readFileSync, readdirSync } from 'node:fs';
import { join, sep } from 'node:path';

const rows = (f) =>
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

const SRC = join('packages', 'ui', 'src');
const files = walk(SRC).filter(
  (f) => /\.(tsx?|css)$/.test(f) && !f.includes('.stories.') && !f.endsWith('.d.ts')
);

const g = { reused: 0, shared: 0, web: 0, native: 0 };
for (const f of files) {
  const r = f.split(sep).join('/');
  const c = rows(f);
  if (r.includes('/tokens/') || r.endsWith('useControllableState.ts')) g.reused += c;
  else if (r.includes('/core/')) g.shared += c;
  else if (r.includes('/web/')) g.web += c;
  else if (r.includes('/native/')) g.native += c;
}

const comp = g.reused + g.shared;
const plat = g.web + g.native;
const tot = comp + plat;

console.log('SPIKE (Button, Checkbox, Dialog, Stack, Screen)');
console.log('  reaproveitado sem alteracao :', g.reused);
console.log('  compartilhado novo          :', g.shared);
console.log('  web                         :', g.web);
console.log('  native                      :', g.native);
console.log('  ---');
console.log('  compartilhado  :', comp);
console.log('  por plataforma :', plat);
console.log('  TOTAL          :', tot);
console.log('  % compartilhado:', ((comp / tot) * 100).toFixed(1) + '%');

console.log('\nStack + Screen — Tamagui vs spike');
const tamaguiFiles = [
  'packages/ui/src/components/Stack/Stack.tsx',
  'packages/ui/src/components/Screen/Screen.web.tsx',
  'packages/ui/src/components/Screen/Screen.native.tsx',
  'packages/ui/src/components/Screen/types.ts',
];
let t = 0;
for (const f of tamaguiFiles) {
  const c = rows(f);
  t += c;
  console.log('  ' + String(c).padStart(4), f.split('components/')[1]);
}
console.log('  ' + String(t).padStart(4), 'TOTAL Tamagui');

const sw =
  rows('packages/ui/src/web/Stack.tsx') + rows('packages/ui/src/web/Screen.tsx');
const sn =
  rows('packages/ui/src/native/Stack.tsx') +
  rows('packages/ui/src/native/Screen.tsx');
const sl = rows('packages/ui/src/core/layout.ts');
console.log(`  ${String(sw + sn + sl).padStart(4)} TOTAL spike (${sl} compartilhado + ${sw} web + ${sn} native)`);
