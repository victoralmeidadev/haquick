// Superfície de importação do React Native: `import { Button } from 'cross-ui/native'`.
//
// Hoje é exatamente a universal — nenhum componente é exclusivo de native
// ainda. O arquivo existe mesmo assim para o app native ter um ponto de entrada
// estável que, por contrato, nunca vai puxar componente de web: quando surgir um
// `Componente.native.tsx` sem contraparte web, ele entra aqui e só aqui.
//
// O guard em scripts/check-entrypoints.mjs falha o build se algo web-only
// vazar para cá.
export * from './index';
