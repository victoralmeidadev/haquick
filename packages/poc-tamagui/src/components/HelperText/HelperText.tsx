import type { GetProps } from '@tamagui/core';
import { Text, styled } from '@tamagui/core';

// Texto auxiliar abaixo de um campo (o `FormHelperText` do MUI): dica quando
// neutro, mensagem de validação quando `error`.
export const HelperText = styled(Text, {
  name: 'HelperText',
  color: '$neutral',
  fontSize: 12,
  lineHeight: 16,

  variants: {
    error: {
      true: { color: '$error' },
    },
  } as const,
});

export type HelperTextProps = GetProps<typeof HelperText>;

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
HelperText.displayName = 'HelperText';
