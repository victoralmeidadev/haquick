import { registerRootComponent } from 'expo';

import App from './App';

// Duas entradas no mesmo app:
//
//   pnpm native             -> a tela de demonstração
//   pnpm native:storybook   -> o Storybook on-device
//
// O `require` é condicional de propósito: com import estático o Metro puxaria
// o Storybook inteiro para o bundle da demo.
const Root =
  process.env.EXPO_PUBLIC_STORYBOOK === '1'
    ? (require('./.storybook').default as typeof App)
    : App;

registerRootComponent(Root);
