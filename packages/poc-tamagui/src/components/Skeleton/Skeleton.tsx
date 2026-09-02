import type { GetProps } from '@tamagui/core';
import { View, styled } from '@tamagui/core';

// Placeholder de carregamento. Usa `$borderColor` (e não um shade fixo de
// cinza) para acompanhar tema light/dark automaticamente.
export const Skeleton = styled(View, {
  name: 'Skeleton',
  backgroundColor: '$borderColor',

  variants: {
    variant: {
      // `text` já vem com altura de linha; `circular` combina com Avatar.
      text: { height: 14, borderRadius: '$radiusXs', width: '100%' },
      circular: { borderRadius: '$radiusFull', width: 40, height: 40 },
      rectangular: { borderRadius: '$radiusMd', width: '100%', height: 80 },
    },
  } as const,

  defaultVariants: {
    variant: 'text',
  },
});

export type SkeletonProps = GetProps<typeof Skeleton>;

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
Skeleton.displayName = 'Skeleton';
