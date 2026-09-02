# haquick

Biblioteca de componentes para **React** e **React Native** a partir de um único
pacote. As mesmas props nas duas plataformas; a implementação é escrita uma vez
por plataforma — HTML com CSS na web, `StyleSheet` no mobile.

```tsx
import { Button, Card, Typography } from 'haquick/web';
//                                          ~~~~~~~~~~~~~
// no app mobile, a única mudança:          'haquick/native'
```

Não há compilador nem plugin de build: os componentes web são HTML com CSS, e
o comportamento difícil — foco preso, ordenação de tabela, arraste com inércia —
vem de bibliotecas headless consolidadas.

## Instalação

```bash
pnpm add haquick
npm install haquick
yarn add haquick
bun add haquick
```

Os primitivos de comportamento da web (Radix) e o motor de tabela (TanStack)
já são dependências do pacote. `react-native` é peer **opcional** — só o app
mobile precisa.

O pacote só declara `exports` por subcaminho, sem entrada raiz: o TypeScript
precisa estar em `moduleResolution: "bundler"` ou `"node16"` para resolver
`haquick/web`. Em `"node"` (o padrão antigo) os imports não são encontrados.

## Entry points

| Import | Conteúdo |
|---|---|
| `haquick/web` | Implementação DOM. Radix nos comportamentais, CSS custom properties no estilo. |
| `haquick/native` | Implementação React Native. `StyleSheet` e primitivos nativos. |
| `haquick/tokens` | Só decisões de design, em TS puro: paleta, raios, sombras, espaçamento, temas. Não depende de plataforma. |

As props são idênticas nos dois entry points, e isso é garantido em tempo de
compilação — não por convenção.

## Setup

**Web:** importe a folha de estilo uma vez, no ponto de entrada do app.

```ts
import 'haquick/styles.css';
```

Esse arquivo traz as regras dos componentes **e** o tema padrão, gerado em
build — estático e cacheável, sem nada acontecendo em runtime. Um tema seu vem
do `ThemeProvider`, sem tirar esse import.

**Next.js (App Router):** o import vai no `app/layout.tsx`. Os componentes de
`haquick/web` já saem marcados com `"use client"`, então dá para usá-los
direto a partir de um Server Component.

```tsx
// app/layout.tsx
import 'haquick/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

**Native:** envolva o app no `ThemeProvider` — lá o tema é valor de Context, não
CSS, então sem ele os componentes usam a paleta clara.

```tsx
import { ThemeProvider } from 'haquick/native';

export default function App() {
  return <ThemeProvider defaultMode="system">{/* ... */}</ThemeProvider>;
}
```

O `BottomSheet` no native exige três peers opcionais:

```bash
npx expo install @gorhom/bottom-sheet react-native-reanimated react-native-worklets react-native-gesture-handler
```

e o `BottomSheetProvider` na raiz — que na web existe como passa-adiante, para
o código do app não precisar de import condicional.

### Versões mínimas

| pacote | mínimo | quando |
|---|---|---|
| `react` | 18.2 | sempre |
| `react-native` | 0.78 | app mobile — o Reanimated 4 exige a Nova Arquitetura |
| `@gorhom/bottom-sheet` | 5.0 | só `BottomSheet` |
| `react-native-reanimated` | 4.0 | só `BottomSheet` |
| `react-native-worklets` | 0.5 | peer direto do Reanimated 4 |
| `react-native-gesture-handler` | 2.20 | só `BottomSheet` |

A combinação verificada é a do Expo SDK 57: React Native 0.86, Reanimated 4.5,
worklets 0.10 e gesture handler 2.32.

## Tema

`ThemeProvider` tem a mesma API nas duas plataformas.

```tsx
import { ThemeProvider, useThemeMode } from 'haquick/web';

<ThemeProvider defaultMode="system">  {/* 'light' | 'dark' | 'system' */}
```

`useThemeMode()` devolve `{ mode, resolvedMode, setMode, toggle }`: `mode` é o
valor pedido e pode ser `system`; `resolvedMode` é o que está em vigor e nunca
é. Com `system`, alterar a preferência do sistema operacional atualiza o tema
imediatamente.

### Customização

```tsx
import { createTheme, ThemeProvider } from 'haquick/web';

const themes = {
  default: createTheme({
    colors: { primary: '#DB2777', secondary: '#7C3AED' },
    palette: { hoverShade: 400 },
    schemes: { light: { surfaces: { background: '#FFF7FB' } } },
    shape: { borderRadius: 2 },
    shadows: { intensity: 0 },
  }),
};

<ThemeProvider themes={themes}>…</ThemeProvider>
```

### Temas nomeados

`themes` aceita quantos quiser, e `theme` diz qual está em vigor. É um eixo
separado do claro/escuro: cada tema tem as duas versões.

```tsx
const themes = {
  default: createTheme(),
  natal: createTheme({ colors: { primary: '#C8102E' } }),
};

<ThemeProvider themes={themes} theme="natal" defaultMode="system">…</ThemeProvider>
```

```tsx
const { theme, themes, setTheme } = useThemeControl();
```

Na web dá também para sobrescrever uma custom property solta, sem passar pelo
`createTheme`. O CSS da biblioteca é injetado no **início** do `<head>`
justamente para que a folha do app venha depois e vença por ordem de documento:

```css
:root {
  --haquick-radiusLg: 20px;   /* só o Card fica mais redondo */
}
```

**Um `<ThemeProvider>` por documento na web.** O provider escreve `data-theme`
e `data-scheme` no `<html>`, então dois providers na mesma página disputam os
mesmos atributos. Para escopar um tema a uma subárvore, aplique os dois
atributos no elemento:

```html
<section data-theme="natal" data-scheme="dark">…</section>
```

No native, onde o tema é Context, basta aninhar outro `<ThemeProvider>`.

**Limitação conhecida:** no React Native, `themes` muda cores e superfícies,
mas não raios nem sombras. Esses valores são lidos do módulo, dentro de
`StyleSheet.create`, antes de o Context existir. Na web todos os eixos
funcionam.

### Intenções novas

```tsx
declare module 'haquick/tokens' {
  interface CustomIntents {
    brand: true;
  }
}

const theme = createTheme({ colors: { brand: '#DB2777' } });
```

A partir daí `intent="brand"` type-checa em todo componente com o eixo
`intent`, com shades, `contrastText`, `hover` e `press` derivados. Declare a
augmentation no seu app: ela reflete as intenções do seu tema.

## Padrão de API: `intent` × `variant`

Dois eixos independentes se repetem em quase todo componente:

- **`intent`** — a cor semântica: `primary`, `secondary`, `success`, `warning`,
  `error`, `info`, `neutral`, mais as suas.
- **`variant`** — o preenchimento: `solid`, `soft`, `outline`, `ghost`.

`intent="error"` com `variant="outline"` dá um botão de borda vermelha, não um
botão vermelho.

## Espaçamento

`gap` e `padding` são **passos de escala**, não pixels:

```tsx
<XStack gap={3} padding={4}>
```

A escala é ancorada em 4px: `0, 2, 8, 12, 16, 24, 32, 40, 48, 56, 64`.

## Componentes exclusivos da web

Três componentes saem apenas de `haquick/web`:

- **`Grid`** — grade de 12 colunas com breakpoints.
- **`Tooltip`** — depende de hover.
- **`DataTable`** — o React Native não tem papel de acessibilidade para tabela.

Importá-los de `haquick/native` é erro de tipo e de compilação.

## Props de estilo

Cada componente expõe apenas as props que declara. Contêineres (`Card`,
`Stack`, `Screen`) recebem um subconjunto de layout; os demais, nada.

```tsx
<Card raised={2} gap={3} width={280}>   ✅
<Badge marginTop={8}>                   ❌ não existe
```

Layout de aplicação fica no CSS do seu app.

## Sombras

A escala de 0 a 5 que `raised` usa. Dois eixos para mexer:

```ts
createTheme({
  shadows: { intensity: 1.5 },          // 0 desliga tudo, 1 é o padrão
  schemes: {
    light: { surfaces: { shadowColor: '#0B0B0C' } },
    dark: { surfaces: { shadowColor: '#8AB4FF' } },   // no escuro a sombra é clara
  },
});
```

## Unidades

`width` aceita número em px ou porcentagem, não string CSS:

```tsx
<Card width={280} />    ✅
<Card width="50%" />    ✅
<Card width="50vw" />   ❌
```

Onde uma prop existe nas duas plataformas, o tipo é o que **ambas** aceitam:
`calc()` e `vw` valeriam na web, mas não no React Native.

## Versionamento

A `0.1.x` é uma linha de validação: **qualquer release pode mudar a API**,
inclusive um patch. Fixe a versão exata se isso for um problema.

A partir do momento em que a API estabilizar, a regra passa a ser a do semver
para `0.x`: quebra sobe o minor, patch é correção compatível.

Mudanças ficam no [CHANGELOG](./CHANGELOG.md), com as limitações conhecidas.

## Problemas e contribuições

Código e issues em
[github.com/victoralmeidadev/haquick](https://github.com/victoralmeidadev/haquick).

## Licença

MIT.
