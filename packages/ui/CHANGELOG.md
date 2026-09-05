# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).
Enquanto a versão for `0.x`, **um minor pode quebrar a API** — veja
"Versionamento" no README.

## [Não publicado]

## [0.1.1] — 2026-09-05

- **Nova paleta padrão.** Uma cor de marca (índigo `#3B5BDB`), secondary em
  teal, semânticas no tom 700 no claro e tons claros no escuro, neutros
  ardósia e fundos `#FBFBFD` / `#0F1117`. No escuro, hover e press das
  intenções sobem em vez de descer, e as superfícies `soft` ficam mais legíveis
  (tom 800 em vez de 900).
- `ListItem`, `AccordionItem` e `ToolCall` não cortam mais o conteúdo à
  direita.
- `Badge` alinha ao centro numa linha, nas duas plataformas.
- Storybook: código de exemplo sem o layout de apresentação; uma story por
  variante.

## [0.1.0] — 2026-09-05

O que existe:

**Componentes.** 63 na web e 57 no React Native, com as mesmas props. As
diferenças são declaradas e testadas em `src/api-parity.test.ts`:

- só na web: `Grid`, `DataTable`, `Tooltip`, `DialogTrigger`, `DialogClose`,
  `BottomSheetTrigger`, `BottomSheetClose`;
- só no native: `RawBottomSheet`.

**Tema em dois eixos.** `themes` leva temas nomeados e `theme` diz qual está em
vigor; `mode` continua sendo claro/escuro/sistema. Na web isso vira
`data-theme` e `data-scheme` no `<html>`, com todos os temas já no CSS — trocar
qualquer um dos dois é trocar um atributo, sem re-render.

**Customização.** `createTheme` recebe `colors`, `palette`, `shape`, `shadows`
e `schemes` (o que difere entre claro e escuro, incluindo cores por scheme).
Intenções criadas pelo app ganham CSS igual às embutidas.

**Sem passo de build.** Vite e Metro padrão, nenhum plugin. `haquick/web` sai
com `"use client"` e o CSS publicado já traz o tema padrão, então App Router e
SSR funcionam sem flash.

### Limitações conhecidas

- **iOS nunca foi executado** — o desenvolvimento acontece em Windows. O
  `BottomSheet` foi verificado em Android físico (POCO X3, Expo Go, SDK 57).
- **No native, a prop `themes` muda cores e superfícies, mas não raios nem
  sombras.** Os componentes leem esses valores do módulo, inclusive dentro de
  `StyleSheet.create` no topo do arquivo, antes de existir Context.
- **Sem teste de regressão visual.** A suíte cobre o CSS gerado, a paridade de
  API e a montagem dos componentes web — não a aparência.
