import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// A promessa do pacote é "as mesmas props nas duas plataformas". Com duas
// implementações por componente, o jeito de quebrá-la é silencioso: alguém
// adiciona um componente de um lado só e ninguém percebe até o app mobile não
// compilar.
//
// Este teste lê os dois entry points e exige que a diferença entre eles seja
// exatamente a lista abaixo — nem mais, nem menos. Componente novo universal
// falha aqui até existir dos dois lados; componente novo exclusivo falha até
// alguém dizer, aqui, que é exclusivo de propósito.

const SRC = join(import.meta.dirname, '.');

/** Só de haquick/web, com o motivo. */
const WEB_ONLY: Record<string, string> = {
  Grid: 'repartir uma linha em colunas é problema de tela grande',
  DataTable: 'planilha não é padrão de mobile; no celular vira lista',
  Tooltip: 'depende de hover, que no toque não existe',
  DialogTrigger: 'no native o Dialog é controlado por prop, sem gatilho declarativo',
  DialogClose: 'fecha o Dialog de forma declarativa, que só o Radix oferece',
  BottomSheetTrigger: 'no native a folha é controlada por prop, sem gatilho declarativo',
  BottomSheetClose: 'fecha a folha de forma declarativa, sem par no native',
};

/** Só de haquick/native, com o motivo. */
const NATIVE_ONLY: Record<string, string> = {
  RawBottomSheet: 'escape hatch para o componente do Gorhom sem a nossa API',
};

// Nomes em PascalCase nas listas de export — o que exclui tipos (export type),
// hooks (minúscula) e constantes (SCREAMING_CASE).
function componentsOf(entry: string): Set<string> {
  const source = readFileSync(join(SRC, entry, 'index.ts'), 'utf8');
  const names = new Set<string>();
  for (const m of source.matchAll(/^export\s+\{([^}]*)\}/gms)) {
    for (const raw of m[1].split(',')) {
      const name = raw.trim().split(/\s+as\s+/).pop()?.trim();
      if (name && /^[A-Z][A-Za-z0-9]*$/.test(name) && !/^[A-Z0-9_]+$/.test(name)) names.add(name);
    }
  }
  return names;
}

const web = componentsOf('web');
const native = componentsOf('native');

describe('paridade entre as plataformas', () => {
  it('acha componentes nos dois entry points', () => {
    expect(web.size).toBeGreaterThan(40);
    expect(native.size).toBeGreaterThan(40);
  });

  it('só tem na web o que está declarado como exclusivo', () => {
    const soWeb = [...web].filter((n) => !native.has(n)).sort();
    expect(soWeb).toEqual(Object.keys(WEB_ONLY).sort());
  });

  it('só tem no native o que está declarado como exclusivo', () => {
    const soNative = [...native].filter((n) => !web.has(n)).sort();
    expect(soNative).toEqual(Object.keys(NATIVE_ONLY).sort());
  });

  it('todo exclusivo tem motivo escrito', () => {
    for (const motivo of [...Object.values(WEB_ONLY), ...Object.values(NATIVE_ONLY)]) {
      expect(motivo.length).toBeGreaterThan(20);
    }
  });
});

describe('hooks de tema', () => {
  // O provider é o único ponto em que as duas plataformas precisam aceitar
  // exatamente as mesmas props, porque é o que o app escreve uma vez e usa nos
  // dois lados.
  const hooks = ['useTheme', 'useThemeMode', 'useThemeControl', 'useSystemMode', 'themeColor'];

  it('existem nos dois entry points', () => {
    const webSource = readFileSync(join(SRC, 'web', 'index.ts'), 'utf8');
    const nativeSource = readFileSync(join(SRC, 'native', 'index.ts'), 'utf8');
    for (const hook of hooks) {
      expect(webSource, `web sem ${hook}`).toContain(hook);
      expect(nativeSource, `native sem ${hook}`).toContain(hook);
    }
  });
});
