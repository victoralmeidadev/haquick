# cross-ui-v0 — POC congelada

> **Prova de conceito em Tamagui, mantida só para comparação. Fora do build.**
>
> Este pacote **não faz parte do workspace pnpm** (ver `pnpm-workspace.yaml`):
> não instala dependências, não entra em Storybook, site ou `pnpm check`, e não
> segura versão de ninguém. São arquivos em disco, e nada mais.
>
> O design system em uso é [`packages/ui`](../ui/README.md), que
> publica como `cross-ui` e não depende de compilador. O relatório da migração,
> com o que foi ganho e perdido, está em
> [RESULTADO.md](../ui/RESULTADO.md).
>
> O documento segue completo porque registra seis arestas do Tamagui que
> custaram tempo a descobrir — todas na seção "Build e compilador" e ao longo
> das notas de componente. É o principal valor que sobrou aqui.
>
> Para mexer nele de novo, é preciso devolvê-lo ao `pnpm-workspace.yaml` e
> rodar `pnpm install`.

Biblioteca de componentes universal — os mesmos componentes rodam em **web**
(via `react-native-web`) e em **React Native**, a partir de um único pacote,
usando [Tamagui](https://tamagui.dev) por baixo.

```tsx
import { Button, Typography, Card } from 'cross-ui-v0';
```

## Não depende de `react-native-web`

Um app **React comum na web não precisa instalar `react-native-web`**. O
`@tamagui/core` renderiza DOM sozinho, então a única coisa que exigiria RNW
seriam primitivos do React Native importados por nós — e não importamos nenhum
em código que a web resolva.

Os três componentes que precisavam de um primitivo do RN têm versão por
plataforma:

| Componente | Web | Native |
|---|---|---|
| `Input` | `<input>` do DOM | `TextInput` |
| `Avatar` | `<img>` | `Image` |
| `Spinner` | anel girando em CSS | `ActivityIndicator` |

Nos três, a parte visual compartilhada (moldura, borda, foco, cores, tamanhos)
fica num arquivo universal só com Tamagui; o que troca é apenas o primitivo de
entrada/mídia.

Verificado: o app web deste repositório não tem nenhum pacote `react-native*`
instalado, não tem alias `react-native → react-native-web` no Vite, e o bundle
de produção não contém nenhuma referência a `react-native-web`.

> `react-native` é `peerDependency` **opcional**: só o app native precisa dela.

## Instalação

Peer dependencies (o app consumidor precisa ter instalado):

```
react
react-native
react-native-web   # só necessário no app web
```

Dentro deste monorepo, os apps consomem via `workspace:*`:

```json
{ "dependencies": { "haquick": "workspace:*" } }
```

## Setup — Web (Vite)

1. Alias `react-native` → `react-native-web` e o plugin do Tamagui no
   `vite.config.ts`:

   ```ts
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import { tamaguiPlugin } from '@tamagui/vite-plugin';

   export default defineConfig({
     plugins: [
       react(),
       tamaguiPlugin({ config: '../../packages/ui/src/config/tamagui.config.ts' }),
     ],
     resolve: {
       extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js', '.jsx'],
       alias: { 'react-native': 'react-native-web' },
     },
   });
   ```

2. Envolva a raiz do app com o `TamaguiProvider` e importe o CSS de reset:

   ```tsx
   import { TamaguiProvider } from '@tamagui/core';
   import { config } from 'cross-ui/config';
   import '@tamagui/core/reset.css';

   export function App() {
     return (
       <TamaguiProvider config={config} defaultTheme="light">
         {/* ... */}
       </TamaguiProvider>
     );
   }
   ```

Next.js segue a mesma ideia, trocando o vite-plugin pelo
`@tamagui/next-plugin` (não usado neste projeto ainda).

## Setup — Native (Expo)

Metro já resolve `Componente.native.tsx` antes de `Componente.tsx`
automaticamente, sem configuração extra. Só é preciso:

1. Ter `react-native-reanimated`/`react-native-svg` instalados se algum
   componente futuro depender deles (nenhum dos atuais depende).
2. Envolver a raiz do app:

   ```tsx
   import { TamaguiProvider } from '@tamagui/core';
   import { config } from 'cross-ui/config';
   import { useColorScheme } from 'react-native';

   export default function App() {
     const scheme = useColorScheme();
     return (
       <TamaguiProvider config={config} defaultTheme={scheme ?? 'light'}>
         {/* ... */}
       </TamaguiProvider>
     );
   }
   ```

## Customizando paleta, tokens e temas

A estrutura é inspirada no `createTheme` do MUI (`palette.primary.main / .light
/ .dark / .contrastText`), adaptada para o formato "mapa plano" que o Tamagui
exige (temas do Tamagui não podem ter objetos aninhados).

| Arquivo | Papel | Equivalente MUI |
|---|---|---|
| [src/config/palette.ts](src/config/palette.ts) | cor base de cada intenção (`primary`, `secondary`, `success`...) + gerador de shades 50–900 + cálculo de contrastText por luminosidade | `createPalette` |
| [src/config/tokens.ts](src/config/tokens.ts) | expõe os shades como tokens `$primary50`...`$primary900` + `$primary` (alias do 500), mesclado aos tokens padrão do Tamagui | `theme.palette.*` como tokens |
| [src/config/themes.ts](src/config/themes.ts) | achata cada intenção em `primary` / `primaryLight` / `primaryDark` / `primaryContrastText` / `primaryHover` / `primaryPress`, para os temas `light` e `dark` | `palette.primary.{main,light,dark,contrastText}` |
| [src/config/shape.ts](src/config/shape.ts) | raio base + escala `$radiusXs`..`$radiusXl`/`$radiusFull` e espessuras de borda | `shape.borderRadius` |
| [src/config/shadows.ts](src/config/shadows.ts) | escala de elevação 0–5, com cor vinda do tema | `shadows` |
| [src/config/tamagui.config.ts](src/config/tamagui.config.ts) | `createCrossUIConfig()` junta tudo em cima do `@tamagui/config/v3` (mantém fonts/animations/media já testados) | `createTheme({ palette, shape })` |

### Trocar uma cor base

Edite `baseColors` em `palette.ts`:

```ts
export const baseColors: Record<ColorIntent, string> = {
  primary: '#3B82F6', // troque aqui
  secondary: '#8B5CF6',
  // ...
};
```

Os shades 50–900, o `primaryContrastText` e os estados `Hover`/`Press` são
recalculados automaticamente a partir dessa cor — não precisa mexer em mais
nada.

### Adicionar uma nova intenção (ex: `brand`)

1. Adicione `'brand'` em `ColorIntent` e uma cor em `baseColors` (`palette.ts`).
2. Pronto — `tokens.ts`, `themes.ts` e as variantes `intent` dos componentes
   iteram sobre `ColorIntent`, então `$brand`, `$brand300`,
   `theme.brandContrastText` e `<Button intent="brand">` passam a existir sem
   mais nenhuma mudança.

As intenções atuais são `primary`, `secondary`, `success`, `warning`, `error`,
`info` e `neutral`.

### Ajustar o cálculo de contrastText

`getContrastText(hex, light, dark)` em `palette.ts` decide entre branco e
preto pela luminosidade (HSL). Se quiser outro texto de contraste (ex: um
cinza específico da marca), troque os parâmetros `light`/`dark` ou o corte
`l > 0.6`.

## Customizando o tema — `createCrossUIConfig`

O equivalente ao `createTheme` do MUI. Um objeto, quatro eixos: **paleta,
estados (hover/press), bordas e sombras**. Nenhum componente precisa ser tocado.

```tsx
import { createCrossUIConfig } from 'cross-ui';

export const config = createCrossUIConfig({
  colors: {
    // Atalho: só a cor principal, o resto é derivado.
    secondary: '#7C3AED',

    // Ou os slots na mão — como palette.primary do MUI.
    primary: {
      main: '#DB2777',
      light: '#F9A8D4',
      dark: '#9D174D',
      contrastText: '#FFFFFF',
      hover: '#BE185D',   // ganha do shade 600 derivado
      press: '#9D174D',   // ganha do shade 700 derivado
    },
  },

  // De quais shades cada slot é derivado quando não informado.
  // O análogo do `tonalOffset` do MUI — muda hover/press do sistema inteiro.
  palette: { hoverShade: 400, pressShade: 500 },

  // Fundo, texto, borda e cor da sombra, por tema.
  surfaces: {
    light: { background: '#FFF7FB', borderColor: '#F5D0E4' },
    dark: { background: '#1A0A12' },
  },

  shape: { borderRadius: 2 },

  // Temas nomeados extras, trocáveis em RUNTIME.
  themes: {
    natal: { colors: { primary: '#B91C1C' } },
  },
});
```

Passe o resultado ao `TamaguiProvider` no lugar do `config` padrão.

### Trocar de tema em runtime

Cada entrada em `themes` vira os sub-temas `light_<nome>` e `dark_<nome>` do
Tamagui, então o tema nomeado continua respeitando o light/dark de fora:

```tsx
import { Theme } from '@tamagui/core';

<Theme name="natal">
  <Button>Confirmar</Button>   {/* vermelho, sem nenhuma prop extra */}
</Theme>
```

### Criar uma intenção nova

Como no MUI, o tipo se estende por **module augmentation** e o valor vem do
config:

```tsx
declare module 'cross-ui' {
  interface CustomIntents {
    brand: true;
  }
}

export const config = createCrossUIConfig({
  colors: { brand: '#DB2777' },
});
```

A partir daí `intent="brand"` type-checa e funciona em **tudo que tem o eixo
`intent`** — `Button`, `IconButton`, `Chip`, `Badge`, `Alert`, `Avatar`,
`Typography`, `Switch`, `Checkbox`, `Radio`, `Progress`, `Spinner`, `Link` —
com shades 50–900, `contrastText`, `hover` e `press` derivados sozinhos.

> A augmentation deve morar no **app**, não no pacote: é ela que informa ao
> TypeScript quais temas e intenções ESTE config tem. Ver
> [apps/storybook/tamagui.config.ts](../../apps/storybook/tamagui.config.ts).

### Sombras

[src/config/shadows.ts](src/config/shadows.ts) define a escala de elevação
(0–5), usada por `<Card raised={n}>` e pelo polegar do `Switch`:

```tsx
<Card raised={0}>plano</Card>
<Card raised={3}>elevado</Card>
```

A **cor** da sombra é token de tema (`$shadowColor`, em `surfaces`), então light
e dark têm sombras diferentes e trocáveis em runtime. A **geometria** é
constante de build, com um multiplicador global:

```ts
createShadows({ intensity: 0 });    // desliga toda sombra do design system
createShadows({ intensity: 1.5 });  // tudo mais dramático
```

> A variante se chama `raised` e não `elevation` porque `elevation` já é prop de
> estilo do React Native — a mesma armadilha de `flex` e `direction`.

### O que é runtime e o que é build

| Eixo | Onde vive | Trocável em runtime? |
|---|---|---|
| Cores, hover, press, contrastText | tema do Tamagui | **sim** (`<Theme name>`) |
| Superfícies (fundo, texto, borda, sombra) | tema do Tamagui | **sim** |
| Raio (`$radiusMd`...) | token `radius` | sim, por config |
| Espessura de borda | constante (`shape.ts`) | não |
| Geometria da sombra | constante (`shadows.ts`) | não |

O corte não é arbitrário: o Tamagui só resolve `$token` em props que pertencem a
uma categoria de token (`radius`, `size`, `zIndex` e as props de cor). Nem
`borderWidth` nem as props de sombra pertencem a alguma — por isso essas duas
são constantes de build.

## Customizando a geometria (borda de tudo)

Nenhum componente escreve raio ou espessura literal. Tudo aponta para
[src/config/shape.ts](src/config/shape.ts), que é o equivalente ao `shape` do
`createTheme` do MUI:

```ts
export const defaultShape: ShapeConfig = {
  borderRadius: 8,        // raio base — toda a escala deriva dele
  borderWidth: 1,         // Card, Input, List, Button outline...
  controlBorderWidth: 2,  // Checkbox, Radio (controle pequeno pede borda mais pesada)
};
```

`borderRadius` gera a escala inteira por multiplicação:

| Token | Múltiplo | Valor com base 8 | Onde é usado |
|---|---|---|---|
| `$radiusNone` | 0 | 0 | — |
| `$radiusXs` | 0.5 | 4 | Checkbox, Skeleton `text` |
| `$radiusSm` | 0.75 | 6 | Button `sm`, Tooltip |
| `$radiusMd` | 1 | 8 | Button, Input, List, Alert |
| `$radiusLg` | 1.5 | 12 | Card |
| `$radiusXl` | 2 | 16 | — |
| `$radiusFull` | — | 9999 | Avatar, Badge, Chip, Switch, Progress, Radio |

Trocar `borderRadius: 8` por `borderRadius: 0` deixa **o design system inteiro
quadrado** — e `radiusFull: 0` esquadra até as pílulas.

### Por que raio é token e espessura não é

O Tamagui só resolve `$token` numa prop se ela pertencer a alguma categoria de
token. As categorias são `radius` (`borderRadius` e cantos), `size`
(`width`/`height`/...), `zIndex` e as props de cor — **`borderWidth` não está em
nenhuma**. Então:

- **raio** é token (`borderRadius="$radiusMd"`), resolvido em runtime e
  trocável por config;
- **espessura** é constante de build, importada direto
  (`borderWidth={shape.borderWidth}`).

Na prática, os dois se editam no mesmo arquivo; a diferença só aparece quando
você usa `createCrossUIConfig` (abaixo), que troca raio mas não espessura.

### `createCrossUIConfig` — customizar sem forkar

O app consumidor monta o próprio config a partir de overrides parciais, como o
`createTheme` do MUI:

```tsx
import { createCrossUIConfig } from 'cross-ui/config';

export const config = createCrossUIConfig({
  colors: { primary: '#DB2777', error: '#B91C1C' },
  shape: { borderRadius: 2 },   // quase quadrado em todo o design system
});
```

Shades 50–900, `contrastText`, `Hover`/`Press` e a escala de raios são
recalculados a partir desses valores. Passe o resultado para o
`TamaguiProvider` no lugar do `config` padrão.

### Criar um tema alternativo (ex: tema de marca "brandA")

Adicione uma entrada em `themes` dentro de `tamagui.config.ts`, do mesmo jeito
que `light`/`dark` são construídos, e troque `defaultTheme` no
`TamaguiProvider` do app que deve usá-lo.

## Componentes

Todos são **universais** (mesmo arquivo em web e native), exceto onde indicado.

### Layout

| Componente | Descrição |
|---|---|
| `Screen` | container de tela: padding, largura máxima centralizada e rolagem — `ScrollView` no native, documento na web (**implementação por plataforma**) |
| `PageHeader` | título, subtítulo, voltar e ações — o topo de toda tela |
| `Stack` / `XStack` / `YStack` | flexbox com atalhos `align`/`justify`/`wrap`/`fill`; espaçamento pela prop `gap` |
| `Spacer` | espaço fixo (`size`) ou elástico (`fill`) entre elementos |
| `Divider` | linha divisória `horizontal`/`vertical` |
| `Card` | superfície base (o `Paper` do MUI), com elevação `raised={0..5}` |
| `CardHeader` / `CardContent` / `CardFooter` / `CardTitle` / `CardMedia` | peças de composição do Card, como no MUI |

### Tipografia

| Componente | Descrição |
|---|---|
| `Typography` | escala `h1`–`h6`, `subtitle1/2`, `body1/2`, `caption`, `overline` + `intent` de cor |
| `Link` | texto navegável; `href` vira `<a>` de verdade na web, `onPress` no native |

### Ação

| Componente | Descrição |
|---|---|
| `Button` | `variant` × `intent` × `size`, mais `loading`, `startIcon`/`endIcon`, `fullWidth` |
| `IconButton` | botão só de ícone; `label` obrigatório (é o texto do leitor de tela) |

### Formulário

| Componente | Descrição |
|---|---|
| `Input` | campo de texto com API normalizada (`onChangeText`, `secure`, `inputMode`), foco e `error` |
| `Label` | rótulo de campo, com `required` (asterisco) |
| `HelperText` | texto de ajuda abaixo do campo; `error` o pinta de vermelho |
| `Checkbox` | controlado ou não-controlado, com estado `indeterminate` |
| `Radio` / `RadioGroup` | o grupo guarda o valor; cada `Radio` só declara o seu |
| `Switch` | toggle on/off |

### Exibição de dados

| Componente | Descrição |
|---|---|
| `Avatar` | círculo com imagem (`src`) ou `initials`, tamanhos `sm/md/lg`, `intent` |
| `Badge` | pill de status **estático**, por `intent` |
| `Chip` | a versão **interativa** do Badge: clicável (`onPress`), removível (`onRemove`), com slot `leading` |
| `List` / `ListItem` | lista com `leading`/`trailing` slots (ex: avatar + badge) |
| `Timeline` / `TimelineItem` | linha do tempo com marcador e conector; o conector some no último item |
| `Media` | imagem que preenche o container — `<img>` na web, `Image` no native |
| `StatCard` | número grande com rótulo e contexto; a peça de topo de dashboard |
| `Table` | grid HTML real na web; lista de "cards" empilhados no native — **implementação por plataforma** |

### Feedback

| Componente | Descrição |
|---|---|
| `Alert` | mensagem com `title` + corpo, slots `icon`/`action`, variantes `outline`/`solid` |
| `Spinner` | carregamento indeterminado (usa o `ActivityIndicator` do RN) |
| `Progress` | barra determinada, `value` de 0 a 100 |
| `Skeleton` | placeholder de carregamento (`text`/`circular`/`rectangular`) |
| `EmptyState` | lista sem resultados: glifo, título, descrição e ação de saída |

### Movimento

| Componente | Descrição |
|---|---|
| `Fade` | transição de opacidade, com `unmountOnExit` opcional |
| `Collapse` | anima a altura de 0 até a altura medida do conteúdo |
| `Accordion` / `AccordionItem` / `AccordionSingle` | divulgação progressiva, construída sobre o `Collapse` |

### Exclusivos de web

| Componente | Descrição |
|---|---|
| `Tooltip` | bolha no hover, com `placement` `top`/`bottom`/`left`/`right` — sai de `haquick/web` |

Ver exemplos rodáveis de cada um em `*.stories.tsx` ao lado do componente,
carregados pelo Storybook (`pnpm --filter storybook dev`).

## Padrão de API: `intent` × `variant`

Como no MUI (`color` + `variant`), os dois eixos são independentes:

```tsx
<Button intent="error" variant="outline">Excluir</Button>
<Chip intent="success" variant="solid">ativo</Chip>
<Alert intent="warning" title="Atenção">Seu plano expira em 3 dias.</Alert>
```

- **`intent`** — a cor semântica (`primary`, `secondary`, `success`, `warning`,
  `error`, `info`, `neutral`).
- **`variant`** — o preenchimento (`solid`, `soft`, `outline`, `ghost`).

`soft` é a superfície tingida (o "standard" do Alert do MUI, o "tonal" do
Material 3): fundo num tom da própria intenção, texto legível por cima. É onde
os slots `light` e `dark` da paleta ganham função — o texto sobre o tingido é o
`dark` no tema light e o `light` no tema dark, exatamente como o MUI faz.

Na prática isso não dá pra fazer com duas variantes estáticas do Tamagui: as
duas mexeriam em `backgroundColor` e a ordem de aplicação depende da ordem em
que as props chegam. Por isso `intent` é uma **variante funcional** que lê o
`variant` atual e devolve o par já combinado — a combinação em si mora em
[src/config/intents.ts](src/config/intents.ts) (`intentSurface` /
`intentContent`), compartilhada por `Button`, `IconButton`, `Chip` e `Alert`.

Consequência prática: hover/press de `outline` e `ghost` usam
`$backgroundHover`/`$backgroundPress` do tema, e não um shade claro da
intenção — assim continuam legíveis no tema dark.

### Duas armadilhas de nome de variante

Uma variante não pode se chamar como uma prop de estilo que já existe no
Tamagui, senão o tipo da prop colapsa para `undefined`. Por isso:

- `Stack`/`Spacer` usam `fill` e não `flex`;
- `Stack` não tem variante `direction` (o nome colide com a prop `direction`
  ltr/rtl do RN) — o eixo vem de `<XStack>`/`<YStack>` ou da própria prop
  `flexDirection`.

### Componentes controlados

`Checkbox`, `Switch` e `RadioGroup` funcionam nos dois modos, via o hook
[useControllableState](src/hooks/useControllableState.ts):

```tsx
<Checkbox defaultChecked />                                  {/* não-controlado */}
<Switch checked={notify} onCheckedChange={setNotify} />      {/* controlado */}
```

### Acessibilidade

Use as props **ARIA** (`role`, `aria-label`, `aria-checked`, `aria-disabled`...)
e não as `accessibility*` do React Native: o `@tamagui/core` não traduz as
`accessibility*` para o DOM (elas vazam como atributo inválido na web),
enquanto `role`/`aria-*` são entendidas pelas duas plataformas desde o
React Native 0.71.

## Entry points: `cross-ui`, `haquick/native`, `haquick/web`

Nem todo componente faz sentido nas duas plataformas. Em vez de um barril único
que obriga o app native a carregar (e resolver) coisa de web, o pacote expõe
três superfícies:

| Import | Contém | Use em |
|---|---|---|
| `cross-ui` | **só o universal** — roda nas duas plataformas | código compartilhado, packages intermediários |
| `haquick/native` | universal + exclusivos de native | app React Native / Expo |
| `haquick/web` | universal + exclusivos de web | app web (Vite, Next...) |

```tsx
import { Button, Card } from 'haquick/native';   // app Expo
import { Button, Tooltip } from 'haquick/web';   // app web
```

Hoje o único exclusivo é o `Tooltip` (web): hover não existe em touch, e o
equivalente mobile é outro componente — long-press + popover, com API e
ergonomia diferentes. Fingir que é "o mesmo componente" só esconderia o
problema. `haquick/native` é, por enquanto, idêntico ao universal; ele existe
para o app native já ter um ponto de entrada estável que **por contrato** nunca
vai puxar componente de web.

### Como um componente é classificado

Não existe lista declarada em lugar nenhum — a classificação vem dos arquivos
que existem na pasta, que é o mesmo critério que o Metro (native) e o
Vite/webpack (web) usam para resolver:

| Arquivos na pasta | Classificação | Sai de |
|---|---|---|
| `X.tsx` | universal | `cross-ui` |
| `X.web.tsx` **e** `X.native.tsx` | universal, implementação por plataforma (ex: `Table`) | `cross-ui` |
| só `X.web.tsx` | exclusivo de web (ex: `Tooltip`) | `haquick/web` |
| só `X.native.tsx` | exclusivo de native | `haquick/native` |

O `tsconfig.json` do pacote usa `"moduleSuffixes": [".ios", ".android",
".native", ".web", ""]` para o `tsc` seguir essa mesma prioridade ao
type-checar `import { Table } from './Table'`.

Importar um exclusivo de web no app native vira erro de build (o Metro não acha
arquivo para resolver) — que é exatamente o comportamento desejado.

### O guard

Disciplina de barril sozinha é frágil, então
[scripts/check-entrypoints.mjs](scripts/check-entrypoints.mjs) falha o build se
algo vazar:

```bash
pnpm --filter haquick check
```

```
Entry points inconsistentes:

  - cross-ui exporta "Tooltip", que não resolve no React Native
    (falta um arquivo .tsx ou .native.tsx). Mova para src/web.ts.
```

Para criar um exclusivo de plataforma: crie **só** o arquivo da plataforma que
deve tê-lo e exporte no barril correspondente (`src/web.ts` ou
`src/native.ts`), nunca em `src/index.ts`.

## Build e compilador

```bash
pnpm --filter haquick check      # tsc + guard de entry points
pnpm --filter storybook dev       # Storybook em http://localhost:6006
pnpm --filter storybook build     # build de produção
```

### O compilador está ligado

O `tamaguiPlugin` no [vite.config.ts](../../apps/storybook/vite.config.ts) faz
extração estática por padrão — não existe flag `optimize`. O build mostra o
resultado por arquivo:

```
🐥 [tamagui] web Button    ·  2 found  ·  2 opt  ·  0 flat
🐥 [tamagui] web ListItem  ·  5 found  ·  5 opt  ·  4 flat
```

`opt` = componentes cujos estilos viraram CSS atômico; `flat` = componentes
achatados para um elemento DOM. O CSS sai por componente:

```css
/* assets/Button-*.css */
._btlr-t-radius-ra1331483942 { border-top-left-radius: var(--t-radius-radiusMd) }
._fd-row { flex-direction: row }
```

Os raios do `shape` viram CSS variables, então trocá-los não invalida as
classes extraídas.

**Limite conhecido:** variantes funcionais (a `intent` de `Button`,
`IconButton`, `Chip` e `Alert`) não são estaticamente extraíveis — elas
dependem de `props.variant` em runtime. É o preço do eixo `intent` × `variant`
ser ortogonal; o restante do estilo desses componentes continua sendo extraído.

### Duas armadilhas de build (já corrigidas, não repita)

1. **`@tamagui/web` precisa estar declarado no app que empacota.** O
   `@tamagui/core` importa `@tamagui/web`, e com o linking estrito do pnpm o
   Rollup não resolvia isso a partir de `.pnpm/` — o build de produção falhava
   com `Rollup failed to resolve import "@tamagui/web"` (o `dev` funcionava,
   porque o esbuild pré-empacota as deps com outra resolução). Está declarado
   em `apps/storybook/package.json`.
2. **Sobrescrever `resolve.extensions` descarta os defaults do Vite.** Como o
   Tamagui distribui ESM em `.mjs`, `.mjs` e `.json` precisam ser repostos à
   mão junto das entradas `.web.*`.

## Apps do repositório

| App | O que é | Rodar |
|---|---|---|
| `apps/site` | site do design system (home + documentação), feito **com o próprio cross-ui** | `pnpm site` → http://localhost:5173 |
| `apps/storybook` | catálogo de stories de cada componente | `pnpm storybook` → http://localhost:6006 |
| `apps/native-demo` | app Expo consumindo `haquick/native` | `pnpm native` |

O site é a prova de que o pacote funciona num app React comum: ele não tem
`react-native` nem `react-native-web` instalados.

## Animações

O `@tamagui/config/v3` resolve o driver por plataforma sozinho — CSS na web,
`Animated` no React Native — então `Fade`, `Collapse` e o chevron do `Accordion`
são universais, sem arquivo por plataforma.

Três detalhes que custaram tempo e vale não redescobrir:

1. **A prop é `transition`, não `animation`.** `animation` era o nome da v1 do
   Tamagui; na 2.x ela não existe mais e passá-la é ignorado em silêncio — não
   dá erro, só não anima.
2. **`animations` precisa ser repassado explicitamente** ao `createTamagui`, e
   não só pelo spread do config padrão, senão o TypeScript não infere os nomes
   e a prop `transition` não aparece.
3. **`AnimatePresence` não está instalado** (é pacote à parte). Sem ele o
   Tamagui anima a entrada, mas não segura o componente montado durante a
   saída — por isso o `Fade` controla a desmontagem na mão, com um timer do
   mesmo tamanho da animação.

Velocidades: `quick` (150ms), `medium` (300ms), `slow` (450ms) — os mesmos
nomes do Tamagui, reexportados em `DURATIONS` para quem precisar do valor.

Altura não interpola a partir de `auto` em nenhuma das duas plataformas, então
o `Collapse` mede o conteúdo com `onLayout` (que o Tamagui implementa também na
web) e anima até o número medido.

## Templates de tela

Shells de página prontos, em `src/templates/`. São montados só com componentes
do pacote, e **não sabem de navegação nem de dados** — recebem tudo por props e
slots, então servem igual em web e mobile.

| Template | Para | Resolve |
|---|---|---|
| `AuthTemplate` | login, cadastro, recuperação | card centralizado, marca, ações secundárias e rodapé |
| `ListTemplate` | listagem | cabeçalho, busca, filtros e os três estados: carregando, vazio, com dados |
| `DetailTemplate` | detalhe de um registro | cabeçalho com identificação, seções com divisória e barra de ações |
| `DashboardTemplate` | visão geral | cabeçalho, faixa de indicadores e área livre de painéis |

```tsx
import { ListTemplate, EmptyState, Button } from 'haquick/web';

<ListTemplate
  title="Equipe"
  subtitle="12 pessoas"
  actions={<Button size="sm">Convidar</Button>}
  search={{ value: busca, onChangeText: setBusca }}
  empty={visiveis.length === 0}
  emptyState={<EmptyState icon="🔍" title="Nada encontrado" />}
>
  <List>{/* ... */}</List>
</ListTemplate>
```

Onde a API recebe **dados** em vez de composição (`sections` do `DetailTemplate`,
`stats` do `DashboardTemplate`), é porque o container precisa saber do conjunto:
a divisória entre seções tem de saber quem é a última, e a faixa de indicadores
precisa distribuí-los por igual.

### Armadilha: `flex={1}` em container de conteúdo

`flex={1}` no Tamagui expande para `flex: 1 1 0%` — **flex-basis zero**. Num
container de coluna isso deixa a caixa ficar *menor* que o conteúdo, e o
resultado aparece de duas formas:

- com `justifyContent: center`, o excedente vaza para cima e fica fora de
  alcance (não há rolagem para chegar nele);
- sem ele, a caixa colapsa para altura 0 e o irmão seguinte renderiza por cima.

As duas aconteceram aqui — a primeira no `AuthTemplate`, a segunda no rodapé do
`DetailTemplate`. Em container que envolve conteúdo, use **`flexGrow={1}`**, que
mantém `flex-basis: auto` (tamanho do conteúdo) e só cresce.

## Storybook: documentação e "Show code"

O Storybook 8 **não liga a documentação sozinho**. Sem opt-in existem apenas as
stories, com os painéis Controls e Actions — nenhuma página de Docs, nenhuma
tabela de props e nenhum botão de ver o código. Duas configurações resolvem, em
[.storybook/preview.tsx](../../apps/storybook/.storybook/preview.tsx):

```ts
const preview: Preview = {
  tags: ['autodocs'],                       // cria a página Docs de cada componente
  parameters: {
    docs: { source: { type: 'dynamic' } },  // serializa o JSX realmente renderizado
  },
};
```

`type: 'dynamic'` importa porque a maioria das nossas stories usa
`render: () => (...)`; sem ele o "Show code" mostraria a função em vez do
markup.

### `displayName` nos componentes `styled()`

O `styled()` do Tamagui envolve o componente em `React.memo`. O serializador do
Storybook não recupera o nome de um memo anônimo, então o código saía assim:

```tsx
<React.Memo gap="$3">        {/* era para ser <YStack> */}
  <React.Memo gap="$2" wrap> {/* era para ser <XStack> */}
```

Por isso todo componente `styled()` do pacote declara `displayName` no fim do
arquivo. É a única razão dessas linhas existirem — ao criar um componente novo,
acrescente a dele, ou a documentação sai errada.

A tabela de props vem dos tipos e dos comentários JSDoc: a descrição que
aparece no Storybook é o `/** ... */` em cima da prop.

## Agentes conversacionais

Componentes de chat com agente, em `src/components/Chat/`. São **universais** —
nenhum precisa de arquivo por plataforma.

| Componente | Papel |
|---|---|
| `Message` | balão por papel (`user`/`assistant`/`system`), com autor, horário, status e cursor de streaming |
| `MessageList` | empilhamento das mensagens, com slot de estado vazio |
| `TypingIndicator` | três pontos pulsando enquanto o agente pensa |
| `ToolCall` | chamada de ferramenta recolhível, com argumentos, resultado e status |
| `Composer` | campo multilinha + enviar, que vira **parar** enquanto o agente responde |
| `Suggestions` | respostas rápidas |
| `ChatTemplate` | a tela inteira: cabeçalho, histórico e composer fixo |

### Relação com o AG-UI

O [AG-UI](https://docs.ag-ui.com/introduction) é um **protocolo de transporte**:
o cliente faz um POST e escuta um stream de eventos JSON (`TEXT_MESSAGE_CONTENT`,
`TOOL_CALL_START`, `STATE_DELTA`, `RUN_STARTED`/`RUN_FINISHED`).

O design system **não implementa o protocolo** — implementa o que renderiza os
eventos dele. A tradução é direta:

| Evento AG-UI | Componente |
|---|---|
| `TEXT_MESSAGE_CONTENT` | `<Message streaming>` acumulando o texto |
| `TOOL_CALL_START` | `<ToolCall status="running">` |
| `TOOL_CALL_END` | `<ToolCall status="success">` ou `"error"` |
| `RUN_STARTED` / `RUN_FINISHED` | `busy` do `<Composer>` |

Manter o protocolo fora do pacote é deliberado: o `ChatTemplate` serve igual
com AG-UI, com SSE próprio ou com uma API REST comum.

### O transporte é que não é universal

Este é o ponto onde "funciona nos dois" deixa de ser verdade, e vale saber
antes de escolher a arquitetura:

- **Web**: `fetch` devolve `Response.body` como `ReadableStream` — leitura
  incremental nativa.
- **React Native**: o `fetch` é o `whatwg-fetch` por cima de `XMLHttpRequest`, e
  **não expõe `Response.body`**. O `responseType` do XHR aceita só
  `'' | 'text' | 'json' | 'blob' | 'arraybuffer'` — não há `'stream'`.

Verificado no `react-native@0.86` deste repositório, não presumido.

Streaming no native **é possível**, mas por outro caminho: o XHR emite
`readyState === 3 (LOADING)` com o `responseText` crescendo, então dá para ler
o que já chegou a cada progresso. Ou seja, um cliente AG-UI universal precisa
de um **adaptador com split de plataforma** — `fetch`+`ReadableStream` na web,
XHR progressivo no native — os dois entregando o mesmo formato de evento.

Esse adaptador é infraestrutura do app, não do design system, e por isso não
está aqui.

## Nomenclatura

**Identificadores em inglês; comentários e textos de interface em português.**
A separação é deliberada: o código é a superfície pública da biblioteca — nomes
de componente, prop, tipo e função aparecem no autocomplete de quem instala o
pacote —, enquanto comentário é documentação interna do time e string de UI é
conteúdo do produto.

Na prática:

```tsx
// A altura precisa ser um número para interpolar.   <- comentário: português
const [measuredHeight, setMeasuredHeight] = useState(0);   // <- código: inglês

<Typography>Não conseguimos processar o arquivo.</Typography>  // <- UI: português
```

Um guard roda em `pnpm check` e falha se um identificador em português entrar:

```bash
node scripts/check-naming.mjs
```

Ele percorre a AST com o parser do TypeScript e olha **só os nós `Identifier`**
— por isso não confunde a palavra "cor" no meio de uma frase com uma variável
chamada `cor`. Nomes compostos são quebrados em `camelCase`/`PascalCase`, então
`corIntencao` e `temDetalhe` também são pegos.

Onde a prop resolvida conviveria com a prop pública de mesmo nome, o estado
local ganha o prefixo `is`:

```tsx
export function AccordionItem({ open, defaultOpen, onOpenChange }: Props) {
  const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, onOpenChange);
```
