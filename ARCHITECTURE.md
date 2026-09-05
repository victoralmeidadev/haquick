# Decisões de arquitetura

O que não é óbvio lendo o código, e custa caro redescobrir. Cada item diz o que
foi decidido, a restrição que forçou e o que quebra se desfizer. Quando existe
um teste que prende a decisão, ele está apontado — é ali que a verdade fica.

Este arquivo não vai para o npm.

## Tema

### O tema padrão fica só em `:root`, e é emitido antes dos nomeados

`generateThemeCSS` gera `:root` para o tema padrão claro e `[data-scheme="dark"]`
para o escuro. Um tema nomeado gera `[data-theme="x"]` e
`[data-theme="x"][data-scheme="dark"]`.

O tema padrão **não** ganha também um bloco `[data-theme="default"]`. `:root`,
`[data-scheme="dark"]` e `[data-theme="x"]` têm a mesma especificidade, então a
ordem no documento decide: um bloco keyed do padrão, emitido depois do escuro,
venceria o escuro e o tema padrão nunca escureceria. Pelo mesmo empate, o tema
padrão precisa vir antes dos nomeados — senão o escuro padrão venceria o claro
de um tema nomeado.

Guarda: `packages/ui/src/tokens/css.test.ts` ("seletores").

### `schemes` é separado de `colors`

Dentro de uma intenção, as chaves `light` e `dark` já significam os tons claro e
escuro da **mesma** cor — o texto sobre superfície tingida. O eixo claro/escuro
do tema não podia reusar esses nomes no mesmo objeto, então vive em
`schemes.light` / `schemes.dark`, e é lá que moram as superfícies e as cores por
scheme.

Guarda: `css.test.ts` ("cores por scheme").

### O escuro padrão só vale onde o app não definiu a cor

`baseDarkColors` traz tons mais claros para as intenções no tema escuro, com
hover e press explícitos — derivados dos shades 600/700 de um tom claro, eles
sairiam quase pretos. Esses padrões entram apenas nas intenções ausentes de
`colors`: quem escreve `colors: { primary }` espera que valha nos dois schemes,
e um override escuro embutido quebraria essa expectativa em silêncio.

Guarda: `css.test.ts` ("cores por scheme").

### Elevação é sombra, não fundo

`raised` muda só a sombra. No tema escuro, quem inverte é a **cor** da sombra
(`shadowColor` claro), com um fator de opacidade por scheme
(`shadows.opacityScale`). Clarear o fundo do item resolveria o contraste, mas
acoplaria elevação a cor: um Card em `raised={5}` deixaria de ter a cor de
superfície que o tema define.

Guarda: `css.test.ts` ("sombra").

### A prop chama-se `raised`, não `elevation`

`elevation` é prop de estilo do React Native. Um componente universal com uma
prop desse nome colidiria com o `ViewStyle` no lado native.

## Web

### O tema padrão vai dentro do CSS publicado

`scripts/finish-build.mjs` gera o CSS do tema padrão em build e o concatena no
início de `dist/web/index.css`. Sem isso as variáveis `--haquick-*` só existiam
depois que o JS rodava, e uma página renderizada no servidor chegava com as
classes certas e nenhuma cor até hidratar.

`applyTheme()` continua existindo como fallback para quem consome só o JS ou
pelo `src` (os apps deste repositório): ele checa se `--haquick-primary` já
está definida e, se está, não faz nada.

Guarda: `scripts/check-package.mjs` ("SSR e React Server Components").

### `"use client"` é escrito no pós-build

O `banner` do tsup não funciona aqui: com `treeshake: true` a saída ainda passa
pelo Rollup, que descarta o banner do esbuild. A diretiva é prefixada por
`finish-build.mjs` só na entrada `web` — `tokens` precisa continuar utilizável
no servidor, e `native` não tem RSC.

Guarda: `check-package.mjs`, que também falha se `tokens` ganhar a diretiva.

### Grid em flexbox, não em CSS Grid

O motivo é `offset`. Dentro de uma grade CSS, porcentagem de margem resolve
contra a **área do item**, não contra o container, então "deslocar N colunas"
sairia com o número errado. Em flexbox `100%` é a largura do container e a
conta fecha:

```
largura de S colunas em C, com gap G:   S/C * 100% - (1 - S/C) * G
deslocamento de O colunas:              O/C * (100% + G)
```

Sem guarda: depende de layout real, que o jsdom não calcula. Verificado no
navegador em três larguras e em grade aninhada.

### As variáveis de span do Grid são resetadas com `initial`

Custom property herda, e um container de Grid também é item. Sem o reset em
`.haquick-gi` (`--haquick-s-xs: initial` etc.), o filho de uma grade aninhada
lia o `--haquick-s-md` do container pai e se media com o span dele — 330 px onde
devia ter 246 px. O inline do item vence o reset; o que ele não declara cai no
fallback da cadeia de breakpoints.

Sem guarda, pelo mesmo motivo.

### Colunas e gap do Grid vão por Context, não por herança de variável

Um container também é item, e a largura **dele** se mede contra as colunas e o
gap do pai. Se lesse a custom property herdada, leria a que acabou de escrever
para os filhos. Cada item recebe do Context o gap e as colunas do container mais
próximo acima e os escreve inline em si mesmo.

Sem guarda, pelo mesmo motivo.

## Native

### Nunca chamar `dismiss()` num BottomSheetModal que não está apresentado

O modal do Gorhom não lança, não loga e não falha: fica surdo a todo `present()`
seguinte. Um efeito `isOpen ? present() : dismiss()` acerta esse estado na
montagem e de novo quando a folha se fecha sozinha. `sheetAction()` em
`core/sheet.ts` só age na transição, e `onDismiss` sincroniza o espelho.

Guarda: `packages/ui/src/core/sheet.test.ts`.

### Raios e sombras não seguem o provider no native

Os componentes leem esses valores do módulo, dentro de `StyleSheet.create` no
topo do arquivo, antes de existir Context. `themes` no provider muda cores e
superfícies; geometria, não. Mudar isso exige tirar a geometria do escopo de
módulo em todos os componentes native. Limitação documentada no CHANGELOG.

## API compartilhada

### Um tipo compartilhado é a interseção do que as duas plataformas aceitam

`width?: number | \`${number}%\``, e não `string`: a web engoliria `calc()` e
`vw`, o React Native não. Tipar pela web adiaria o erro para o runtime no
mobile. Mesma regra para `Spinner` (`sm | lg`, porque `ActivityIndicator` só tem
esses dois).

Guarda: o próprio tipo, no typecheck.

### A diferença entre os entry points é declarada, não descoberta

`api-parity.test.ts` lê `web/index.ts` e `native/index.ts` e exige que a
diferença seja exatamente a lista declarada, com motivo. Componente novo
universal falha até existir dos dois lados; exclusivo falha até alguém escrever
por que é exclusivo.

### Os templates são o único código 100% compartilhado

`core/templates.tsx` recebe os componentes por injeção (`makeTemplates(deps)`) e
compõe telas. É o único lugar onde web e native rodam o mesmo código: composição
é portátil, desenho não.

## Empacotamento

### `exports` aponta para `src` em desenvolvimento e para `dist` no publicado

`package.json` tem `exports` para `src/` e `publishConfig.exports` para `dist/`.
Os apps do repositório consomem o fonte, com HMR e sem build; o pnpm troca os
caminhos na hora de publicar. Por isso o publish é `pnpm publish` — o npm não
aplica `publishConfig.exports`.

Guarda: `check-package.mjs` e `check-consumer.mjs`.

### `apps/consumer-check` fica fora do workspace

Ele instala o **tarball** (`pnpm pack`), não o pacote do workspace — é o único
teste do que quem instala recebe. Depende de um arquivo que não é versionado,
então dentro do workspace um `pnpm install --frozen-lockfile` limpo (o do CI)
falharia. Tem `pnpm-workspace.yaml` próprio e o lockfile fora do git.

### Sem sourcemap no pacote

Medido nos tarballs: `@mui/material` (2548 arquivos), `@mui/system` e
`@tanstack/react-table` não publicam mapas; o Radix publica, mas cada pacote
dele tem nove arquivos. Os mapas eram dois terços do nosso tarball. O bundle não
é minificado, então o devtools mostra código legível sem eles.
