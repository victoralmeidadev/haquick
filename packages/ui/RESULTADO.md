# Migração completa: Tamagui → Radix (web) + StyleSheet (native)

Todo o design system reimplementado sem Tamagui. A versão original segue
intacta em `packages/ui` para comparação lado a lado.

## Resultado

| | Tamagui (`packages/poc-tamagui`) | Migrado (`packages/ui`) |
|---|---:|---:|
| Linhas | 2.621 | **4.922** (+88%) |
| Compartilhado entre plataformas | **87,8%** | **23,2%** |
| Componentes exportados | 60 | 62 web / 57 native |
| Dependência de estilo | `@tamagui/core` + compilador | nenhuma |
| Dependência de comportamento | — | 3 pacotes Radix, TanStack Table, Gorhom |

Funciona, o visual ficou equivalente, e as duas plataformas compilam.

## Distribuição de código

| Camada | Linhas |
|---|---:|
| Reaproveitado **sem alteração** (tokens + hook) | 389 |
| Compartilhado novo (tipos, escalas, layout, tema, templates) | 754 |
| Web (Radix + CSS + TanStack) | 2.118 |
| Native (StyleSheet + Gorhom) | 1.713 |
| **Total** | **4.974** |

### O reuso piora conforme a biblioteca cresce

Este é o dado mais importante, e só apareceu ao migrar tudo:

| Etapa | Componentes | Compartilhado |
|---|---:|---:|
| Spike inicial | 3 | 42,6% |
| + Stack e Screen | 5 | 41,3% |
| Migração completa | ~50 | 19,6% |
| + tema, tabela e bottom sheet | ~57 | 18,4% |
| **+ 5 templates de tela** | **~62** | **23,2%** |

A camada compartilhada é quase toda **custo fixo** — paleta, escalas, tipos. O
código de plataforma cresce linearmente com o número de componentes. Então
quanto maior o design system, menor a fração compartilhada.

Com 3 componentes a migração parecia custar pouco. Com 50, o número real é
**um quinto**, não metade.

## O que foi ganho

**Nenhum compilador no caminho.** Vite e Metro padrão. As seis arestas do
Tamagui documentadas no README do `packages/ui` deixam de existir: colisão de
nome de variante, `animation` virando no-op silencioso, `components` descartando
props booleanas, `AnimatePresence` ausente, `elevation` sem tipo,
`accessibility*` não traduzido.

**HTML semântico.** `Typography` agora renderiza `<h1>`–`<h6>` de verdade,
`Link` com `href` vira `<a>` e sem `href` vira `<button>`, `Badge` é `<span>`,
`ListItem` clicável é `<button>`. Na versão Tamagui tudo era `<div>` ou
`<span>`. É um ganho de acessibilidade que não aparece em métrica de linhas.

**Radix onde ele importa.** `Dialog` (foco preso, portal, Esc, trava de
rolagem, ARIA), `Checkbox` (estado `mixed`, input escondido) e `Tooltip` —
este último substituindo a implementação na unha, que não tinha atraso de
abertura nem detecção de colisão de borda.

**CSS resolve variantes melhor que o motor.** 7 intenções × 4 variantes = 28
combinações em 11 regras, com custom properties intermediárias. É o mesmo
problema que no Tamagui exigiu variantes funcionais — e que no CSS não existe.

## O que foi perdido

**A propriedade de "um arquivo, duas plataformas".** Era a promessa central do
projeto. Dos ~50 componentes, agora todos têm duas implementações.

**Props de estilo arbitrárias.** No Tamagui qualquer componente aceitava
`<Card width={280} gap="$3" marginTop="$2">`. Sem motor de estilo, cada
componente expõe só as props que declara. Contêineres (`Card`, `Stack`,
`Screen`) recebem um subconjunto de layout; os demais, nada. É uma API mais
restrita — e mais previsível.

## Composição é portátil; desenho não é

Os cinco templates de tela (`Auth`, `List`, `Detail`, `Dashboard`, `Chat`) são
o **único código 100% compartilhado** da biblioteca, e sozinhos levaram o
compartilhado de 18,4% para 23,2%.

O motivo é simples: template não desenha nada. Só compõe componentes cujas
props já são idênticas nos dois lados. A única coisa específica de plataforma é
*de qual módulo* os componentes vêm — então `core/templates.tsx` recebe o
conjunto por injeção e `web/templates.ts` e `native/templates.ts` têm três
linhas cada.

```tsx
export const { AuthTemplate, ... } = makeTemplates({ Screen, Card, Typography, ... });
```

Isso delimita bem onde a duplicação é inevitável: nas folhas, que traduzem
estilo para o alvo. Tudo acima delas é portátil. Vale para os templates e
valeria para qualquer camada de composição que um app construa por cima.

## A POC em Tamagui saiu do build

`packages/ui` continua no repositório, mas **fora do workspace pnpm**: não
instala dependências, não entra em Storybook, site nem `pnpm check`, e não
segura versão de ninguém. Tirá-la removeu 136 pacotes da instalação e o
compilador do Tamagui dos dois apps de build.

Sobrou como registro: o README dela documenta seis arestas do Tamagui que
custaram tempo a descobrir, e é o principal valor que resta ali.

Tirar o Tamagui do Storybook obrigou a reescrever a story de customização
contra o pacote novo — e foi isso que revelou o bug abaixo.

## Intenção customizada não funcionava na web

Um recurso que a documentação anunciava e que estava **silenciosamente
quebrado**: `createTheme({ colors: { brand: '#DB2777' } })` mais a
augmentation de `CustomIntents` fazia `intent="brand"` type-checar e renderizar
`data-intent="brand"` — e nenhuma regra CSS casava. O componente saía sem cor
alguma, sem erro em lugar nenhum.

A causa era arquitetural: as regras que ligam `data-intent` às custom
properties estavam **escritas à mão**, uma por intenção embutida, em
`components.css` e `parts.css`. Cobriam as sete que vêm no pacote e mais nada.

Agora saem de `generateThemeCSS`, derivadas das chaves do tema — uma intenção é
toda chave `X` para a qual existe `XContrastText`. Duas consequências: a
intenção do app ganha CSS igual às nativas, e o CSS estático encolheu (o bundle
do site caiu de 29 KB para 22,5 KB, porque o que era fixo para sete intenções
agora é gerado só para as que o tema tem).

Vale o registro do porquê passou despercebido: enquanto o Storybook rodava as
duas versões lado a lado, a story de customização exercitava o **v0**, onde
variantes funcionais do Tamagui resolviam isso em runtime. O recurso nunca
tinha sido testado no pacote novo.

## Um tema por documento na web

Na web o tema vira custom properties globais no `<head>`, então **vale um tema
por documento**: dois `<ThemeProvider>` com temas diferentes na mesma página se
sobrescrevem. No native, onde o tema é Context, subárvores podem ter temas
distintos. É uma assimetria real, e a story `Customização/Tema` alterna entre
os dois temas em vez de mostrá-los lado a lado por causa dela.

## Componentes que não são universais

Nem todo componente deve existir nas duas plataformas, e insistir nisso produz
API pior. Dois saem só de `haquick/web`:

- **`Tooltip`** — depende de hover, que no toque não existe. A primeira versão
  migrada renderizava o gatilho sem a bolha no native, para o import não
  quebrar: uma prop que aceita `label` e não mostra label. Pior que não existir.
- **`DataTable`** — planilha não é padrão de mobile. No celular o mesmo dado
  vira lista de cartões, com outra hierarquia de informação, não uma grade
  rolando na horizontal. A restrição é de produto: o TanStack Table é headless
  e rodaria no native sem problema.

O caminho contrário também vale: `BottomSheet` é padrão de mobile, mas funciona
em web mobile, então fica universal — com mecanismos sem nada em comum
(@gorhom/bottom-sheet no native, Radix Dialog ancorado embaixo na web).

## Tema, tabela e folha

**`ThemeProvider` com a mesma API nos dois lados.** `mode` (`light`/`dark`/
`system`), controlado ou não, `useThemeMode()` para trocar e `useTheme()` para
ler o objeto resolvido. O mecanismo é que difere: na web o provider escreve
`data-theme` no `<html>` e o CSS já carrega as duas paletas — nenhum componente
re-renderiza por causa de cor; no native o tema é o valor do Context, então
quem consome o hook re-renderiza. `system` sai de `matchMedia` na web e de
`Appearance` no native, os dois via `useSyncExternalStore`.

Antes disso a web **não tinha provider nenhum**: `applyTheme()` injetava o CSS
e nada jamais escrevia `data-theme`, então a paleta escura existia no bundle e
era inalcançável.

**`DataTable` com TanStack Table.** A biblioteca é headless e MIT: calcula
ordenação, filtro global, página e seleção sem tocar em DOM. O componente só
desenha um `<table>` com `<th scope>`, `aria-sort` e o par de checkboxes.

**`BottomSheet` com @gorhom/bottom-sheet no native.** Arraste com inércia,
snap points e backdrop em Reanimated na thread de UI — escrever isso com
`Animated` + `PanResponder` no JS thread dá resultado visivelmente pior em
lista longa. O preço é o setup: o Gorhom exige gesture handler na raiz, daí o
`<BottomSheetProvider>` — que na web é um passa-adiante, para o código do app
ficar igual dos dois lados.

**O React Native não tem semântica de tabela.** A união de `AccessibilityRole`
vai até `list`: não há `table`, `grid`, `row` nem `cell`. Foi o que fechou a
decisão de deixar `DataTable` só na web — mesmo que fizesse sentido de produto,
a versão native seria inacessível.

## Descobertas que valem mesmo sem migrar

**1. Não havia escala de espaçamento própria.** Os `$1..$10` vinham do default
do Tamagui, derivados de `size * 0.7 - 12`, produzindo 2, 7, 13, 18, 24, 32,
39, 46, 53, 60. Ninguém escolheu 13px nem 39px. Agora há `tokens/spacing.ts`
ancorado em 4px.

**2. Tipo compartilhado tem de ser a INTERSEÇÃO das plataformas.**
`width?: number | string` compila na web e quebra no React Native, que só
aceita número ou porcentagem.

**3. A camada de decisão de design é portável.** As 344 linhas de paleta,
raios, sombras e temas foram copiadas sem editar uma vírgula.

## Como manter as duas em sincronia

- **tokens e escalas em um lugar só** (`tokens/`, `core/scales.ts`,
  `core/scales2.ts`, `core/typography.ts`)
- **`VARIANT_SLOTS`** define qual slot do tema cada variante usa, em TS puro; a
  web materializa em CSS custom property, o native em lookup no objeto de tema
- **tipos de prop compartilhados** (`core/components.ts`, `core/chat.ts`),
  então a API não pode divergir sem quebrar a compilação

O que **não** está protegido é o valor visual: mudar um padding só no CSS não
quebra nada. Isso exige teste visual nas duas plataformas — que não existe.

## O native rodou

O `apps/native-demo` consome `haquick/native` e foi executado em **emulador
Android API 35**, via Expo Go. O que ficou provado, com captura de tela:

- Todos os átomos renderizam — tipografia, Card, Alert, Input, Label,
  HelperText, Checkbox, Switch, RadioGroup, Button, IconButton, Chip, Badge,
  Avatar, List, ListItem, Progress, Spinner, Skeleton, Divider, Link.
- **Troca de tema funciona.** `mode=system` resolve por `Appearance` para
  `resolvedMode=light`; tocar em "Alternar" leva a `mode=dark` e a paleta
  inteira acompanha — fundo, bordas, texto e as cores de intenção.
- O bundle monta: 1.286 módulos servidos pelo Metro.

O caminho até aqui encontrou dois problemas que nenhum typecheck pegaria:

1. Reanimated 3.16 importa `react-native/Libraries/Renderer/shims/ReactNative`,
   removido no React Native 0.86. O Expo SDK 57 pede Reanimated 4.5, que exige
   `react-native-worklets` como peer direto — e ele não vem por arrasto.
2. Um `overrides` em `pnpm-workspace.yaml` fixava `react-native: 0.86.0` para o
   workspace inteiro, e derrubava em silêncio todo `expo install --fix`: o
   package.json ia para 0.86.3, o lockfile continuava em 0.86.0. Enquanto isso o
   Expo Go do emulador roda 57.0.9. JS e nativo descasados é o tipo de coisa que
   não aparece em typecheck nem em bundle.
3. O `BottomSheet` não abre (abaixo).

## Storybook on-device

O `apps/native-demo` roda também um Storybook **dentro do app**
(`@storybook/react-native`), com os mesmos componentes e as mesmas cinco telas
do Storybook da web. A diferença é o que está sendo renderizado: lá é
HTML+CSS, aqui é StyleSheet no runtime real do React Native.

```bash
cd apps/native-demo && pnpm storybook
```

## BottomSheet no Android: resolvido

A folha não abria, e a causa era nossa: um efeito que fazia
`isOpen ? present() : dismiss()`.

O `BottomSheetModal` do Gorhom não tolera `dismiss()` fora de apresentação. A
chamada não lança, não loga e não falha — deixa o modal surdo a todo `present()`
seguinte. O efeito ingênuo acertava esse estado duas vezes: na montagem, com
`isOpen` false e nada apresentado, e de novo quando a folha se fechava sozinha e
o `onDismiss` devolvia `isOpen` para false com o modal já fechado.

O que confundiu o diagnóstico por tanto tempo:

- **A instrumentação parecia inocentar o nosso código.** `present()` executava
  sem lançar, o `ref` trazia o handle completo e o Reanimated animava no mesmo
  app. Tudo verdade — e irrelevante, porque o modal já estava envenenado.
- **O fast refresh preservava o modal envenenado.** Depois de corrigir o
  código, o primeiro teste continuou falhando: a instância antiga sobrevivia à
  troca de código. Só o reload completo do app provou a correção.

Verificado em Android físico (POCO X3 NFC, Expo Go, SDK 57) nos três caminhos
de fechamento: arraste para baixo, toque no backdrop e fechamento controlado
pelo app. A regra virou `sheetAction()` em `core/sheet.ts`, com teste.

## O que não foi verificado

- **iOS.** Nada foi executado em iOS — a máquina de desenvolvimento é Windows.
- **Bundle web real.** Os três pacotes Radix somam ~300 KB de fonte no disco.
  Medindo pelo site deste repositório, a versão Radix dá 393 KB de JS e 29 KB
  de CSS contra 383 KB e 7 KB da versão Tamagui — mas são apps com conteúdo
  diferente, então o número não é uma comparação limpa.
- **Templates.** Os cinco (`Auth`, `List`, `Detail`, `Dashboard`, `Chat`) não
  foram migrados — são composição pura dos componentes, então o custo é
  previsível, mas não medido.

## Como rodar

```bash
pnpm storybook                  # seção "Spike Radix"
pnpm site                       # documentação
pnpm native                     # demo React Native (Expo)
node scripts/measure-spike.mjs  # reproduz as medições
```
