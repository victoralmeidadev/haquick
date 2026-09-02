import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PKG_DIR = join(ROOT, 'packages', 'ui');
const APP_DIR = join(ROOT, 'apps', 'consumer-check');

const pkg = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
const TARBALL = join(PKG_DIR, `${pkg.name}-${pkg.version}.tgz`);

const problems = [];
const ok = (msg) => console.log('  ok   ', msg);
const fail = (msg) => {
  problems.push(msg);
  console.log('  FALHA', msg);
};

const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], shell: true });

console.log(`\nconsumo do tarball ${pkg.name}@${pkg.version}`);

console.log('\npnpm pack');
rmSync(TARBALL, { force: true });
run('pnpm', ['--filter', pkg.name, 'pack', '--pack-destination', PKG_DIR], ROOT);
if (existsSync(TARBALL)) ok(`gerado ${pkg.name}-${pkg.version}.tgz`);
else {
  fail('pnpm pack não gerou o tarball');
  process.exit(1);
}

console.log('\ninstalação e build do app consumidor');
rmSync(join(APP_DIR, 'dist'), { recursive: true, force: true });
rmSync(join(APP_DIR, 'node_modules', 'haquick'), { recursive: true, force: true });
rmSync(join(APP_DIR, 'pnpm-lock.yaml'), { force: true });
try {
  run('pnpm', ['install', '--no-frozen-lockfile'], APP_DIR);
  ok('pnpm install com haquick vindo do tarball');
} catch (e) {
  fail(`instalação falhou: ${String(e.stderr || e.message).split('\n').slice(-6).join(' ')}`);
  process.exit(1);
}

try {
  run('pnpm', ['build'], APP_DIR);
  ok('vite build passou');
} catch (e) {
  fail(`build do consumidor falhou: ${String(e.stdout || e.stderr || e.message).slice(-800)}`);
  process.exit(1);
}

console.log('\nsaída do app consumidor');
const assets = join(APP_DIR, 'dist', 'assets');
const files = existsSync(assets) ? readdirSync(assets) : [];
const cssFile = files.find((f) => f.endsWith('.css'));
const jsFile = files.find((f) => f.endsWith('.js'));

if (!cssFile) {
  fail('nenhum CSS no build do consumidor — o import de haquick/styles.css não chegou');
} else {
  const css = readFileSync(join(assets, cssFile), 'utf8');
  if (css.includes('--haquick-primary:')) ok('CSS do app traz o tema padrão');
  else fail('CSS do app sem as variáveis do tema');
  if (css.includes('.haquick-btn')) ok('CSS do app traz as regras dos componentes');
  else fail('CSS do app sem as regras dos componentes');
}

if (!jsFile) fail('nenhum JS no build do consumidor');
else ok(`JS empacotado (${Math.round(readFileSync(join(assets, jsFile)).length / 1024)} KB)`);

console.log('');
if (problems.length) {
  console.log(`${problems.length} problema(s) no consumo do pacote`);
  process.exit(1);
}
console.log('consumo do pacote ok');
