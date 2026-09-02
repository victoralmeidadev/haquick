import { Text, styled } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';

// Universal: escala de tipografia ao estilo MUI (h1..h6, subtitle, body, caption,
// overline), mais variantes de cor por intenção (primary/success/error/...).
export const Typography = styled(Text, {
  name: 'Typography',
  color: '$color',

  variants: {
    variant: {
      h1: { fontSize: 40, lineHeight: 48, fontWeight: '700' },
      h2: { fontSize: 32, lineHeight: 40, fontWeight: '700' },
      h3: { fontSize: 28, lineHeight: 36, fontWeight: '700' },
      h4: { fontSize: 24, lineHeight: 32, fontWeight: '600' },
      h5: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
      h6: { fontSize: 17, lineHeight: 24, fontWeight: '600' },
      subtitle1: { fontSize: 16, lineHeight: 24, fontWeight: '500' },
      subtitle2: { fontSize: 14, lineHeight: 20, fontWeight: '500' },
      body1: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
      body2: { fontSize: 13, lineHeight: 20, fontWeight: '400' },
      caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' },
      overline: {
        fontSize: 11,
        lineHeight: 16,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
      },
    },
    // Sem `intent` o texto herda `$color` do tema; quando informado, segue a
    // intenção (e acompanha qualquer cor nova de config/palette.ts).
    intent: (intent: ColorIntent) => ({ color: `$${intent}` }),
  } as const,

  defaultVariants: {
    variant: 'body1',
  },
});

export type TypographyProps = Parameters<typeof Typography>[0];

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
Typography.displayName = 'Typography';
