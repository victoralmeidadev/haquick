import { defineConfig } from 'tsup';

// Build de publicação.
//
// Três entradas independentes, porque são três superfícies que nunca se
// encontram: `web` puxa Radix e TanStack, `native` puxa React Native e Gorhom,
// `tokens` não puxa nada. Empacotar junto faria um app web baixar tipos e
// código de React Native.
//
// `dependencies` e `peerDependencies` ficam externas por padrão no tsup — é o
// que se quer numa biblioteca: quem instala resolve as próprias versões.
const common = {
  format: ['esm', 'cjs'] as const,
  dts: true,
  // Sem sourcemap no publicado: são dois terços do tarball e o padrão dos
  // pacotes deste porte é não mandar (MUI e TanStack não mandam; o Radix
  // manda, mas cada pacote dele tem meia dúzia de arquivos). Quem desenvolve
  // aqui não perde nada — os apps do repositório resolvem para `src`.
  sourcemap: false,
  outExtension: ({ format }: { format: string }) => ({
    js: format === 'cjs' ? '.cjs' : '.js',
  }),
  // Sem code splitting: cada entrada é auto-contida. Duplica a camada `core`
  // entre web e native, mas um app só carrega uma das duas — e evita chunks
  // compartilhados, que o Metro resolve mal.
  splitting: false,
  treeshake: true,
};

export default defineConfig([
  {
    ...common,
    entry: { 'web/index': 'src/web/index.ts' },
    // Limpa só aqui: esta config roda primeiro e a seguinte escreve por cima.
    clean: true,
    // A diretiva `"use client"` desta entrada é escrita por
    // scripts/finish-build.mjs, e não aqui: com `treeshake: true` a saída
    // ainda passa pelo Rollup, que descarta o banner do esbuild.
    // O CSS importado pelos componentes web é empacotado num arquivo só, ao
    // lado do JS. O `import './index.css'` fica no bundle, então o empacotador
    // de quem consome resolve sozinho — e `haquick/styles.css` existe para
    // quem preferir importar à mão.
  },
  {
    ...common,
    entry: { 'native/index': 'src/native/index.ts', 'tokens/index': 'src/tokens/index.ts' },
    clean: false,
  },
]);
