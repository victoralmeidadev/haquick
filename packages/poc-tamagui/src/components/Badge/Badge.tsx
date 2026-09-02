import type { ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View, Text, styled } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';

// Pill de status, sempre estático. Para a versão clicável/removível (filtros,
// tags) use <Chip />.
export const BadgeFrame = styled(View, {
  name: 'Badge',
  alignSelf: 'flex-start',
  paddingHorizontal: '$2',
  paddingVertical: 2,
  borderRadius: '$radiusFull',

  variants: {
    // Variante funcional: acompanha automaticamente qualquer intenção nova
    // adicionada em config/palette.ts.
    intent: (intent: ColorIntent) => ({ backgroundColor: `$${intent}` }),
  } as const,

  defaultVariants: { intent: 'primary' },
});

const BadgeText = styled(Text, {
  name: 'BadgeText',
  fontSize: 12,
  fontWeight: '600',

  variants: {
    intent: (intent: ColorIntent) => ({ color: `$${intent}ContrastText` }),
  } as const,

  defaultVariants: { intent: 'primary' },
});

export type BadgeProps = GetProps<typeof BadgeFrame> & { children?: ReactNode };

export function Badge({ children, intent = 'primary', ...rest }: BadgeProps) {
  return (
    <BadgeFrame intent={intent} {...rest}>
      <BadgeText intent={intent}>{children}</BadgeText>
    </BadgeFrame>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
BadgeFrame.displayName = 'BadgeFrame';
BadgeText.displayName = 'BadgeText';
