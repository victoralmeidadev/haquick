import { View, styled } from '@tamagui/core';
import { shape } from '../../config/shape';
import { shadows } from '../../config/shadows';

// Superfície base do design system (o `Paper` do MUI). Também universal:
// mesma lógica do Button.
export const Card = styled(View, {
  name: 'Card',
  backgroundColor: '$background',
  borderColor: '$borderColor',
  borderWidth: shape.borderWidth,
  borderRadius: '$radiusLg',
  padding: '$4',

  variants: {
    // Escala de elevação (0–5), como o `elevation` do Paper do MUI.
    // A variante se chama `raised` e não `elevation` porque `elevation` já é
    // prop de estilo do React Native — mesma armadilha de `flex`/`direction`,
    // em que o tipo da prop colapsa para `undefined`.
    raised: {
      0: shadows[0],
      1: shadows[1],
      2: shadows[2],
      3: shadows[3],
      4: shadows[4],
      5: shadows[5],
    },
  } as const,

  defaultVariants: { raised: 0 },
});

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
Card.displayName = 'Card';
