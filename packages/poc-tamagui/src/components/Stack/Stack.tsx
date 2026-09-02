import type { GetProps } from '@tamagui/core';
import { View, styled } from '@tamagui/core';

// Primitivo de layout (equivalente ao <Stack> do MUI): encapsula flexbox com
// nomes curtos, para os outros componentes não precisarem repetir
// `alignItems`/`justifyContent` na mão.
//
// O eixo continua sendo a prop `flexDirection` do próprio Tamagui — não viramos
// uma variante `direction` porque esse nome colide com a prop de estilo
// `direction` (ltr/rtl) do RN. Na prática use <XStack>/<YStack>.
// O espaçamento é a prop `gap` (`gap="$3"`).
export const Stack = styled(View, {
  name: 'Stack',
  flexDirection: 'column',

  variants: {
    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
      baseline: { alignItems: 'baseline' },
    },
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
      around: { justifyContent: 'space-around' },
      evenly: { justifyContent: 'space-evenly' },
    },
    wrap: {
      true: { flexWrap: 'wrap' },
      false: { flexWrap: 'nowrap' },
    },
    // `fill` e não `flex`: `flex` já é prop de estilo numérica do Tamagui.
    fill: {
      true: { flex: 1 },
    },
  } as const,
});

// Atalhos para os dois casos de longe mais comuns.
export const XStack = styled(Stack, { name: 'XStack', flexDirection: 'row' });
export const YStack = styled(Stack, { name: 'YStack', flexDirection: 'column' });

// O `styled()` do Tamagui envolve o componente em React.memo, e o serializador
// de código do Storybook cai em `<React.Memo>` quando não há displayName. Sem
// isto a documentação mostraria `<React.Memo gap="$3">` no lugar de `<YStack>`.
Stack.displayName = 'Stack';
XStack.displayName = 'XStack';
YStack.displayName = 'YStack';

export type StackProps = GetProps<typeof Stack>;
