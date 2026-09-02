import { defineConfig } from 'vitest/config';

// `node` por padrão: a maioria dos testes é de função pura (tokens, paridade de
// API) e jsdom só atrasaria. Quem precisa de DOM declara no topo do arquivo com
// `// @vitest-environment jsdom`.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    setupFiles: ['./vitest.setup.ts'],
  },
});
