import { View, styled } from '@tamagui/core';

export const Divider = styled(View, {
  name: 'Divider',
  backgroundColor: '$borderColor',

  variants: {
    orientation: {
      horizontal: { height: 1, width: '100%' },
      vertical: { width: 1, height: '100%' },
    },
  } as const,

  defaultVariants: { orientation: 'horizontal' },
});

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
Divider.displayName = 'Divider';
