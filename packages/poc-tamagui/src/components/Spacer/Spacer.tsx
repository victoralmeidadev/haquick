import type { GetProps } from '@tamagui/core';
import { View, styled } from '@tamagui/core';

// Espaço fixo entre elementos, para os casos em que o `gap` do Stack não
// serve (um respiro pontual maior, ou empurrar o resto com `fill`).
export const Spacer = styled(View, {
  name: 'Spacer',

  variants: {
    size: {
      xs: { width: '$1', height: '$1' },
      sm: { width: '$2', height: '$2' },
      md: { width: '$4', height: '$4' },
      lg: { width: '$6', height: '$6' },
      xl: { width: '$8', height: '$8' },
    },
    // Ocupa todo o espaço livre — o clássico "empurra o próximo pro fim".
    // Chamado `fill` e não `flex` porque `flex` já é prop de estilo do Tamagui.
    fill: {
      true: { flex: 1 },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
});

export type SpacerProps = GetProps<typeof Spacer>;

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
Spacer.displayName = 'Spacer';
