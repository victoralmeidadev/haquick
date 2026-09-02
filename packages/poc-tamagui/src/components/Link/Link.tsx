import type { GetProps } from '@tamagui/core';
import { Text, styled } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';

const LinkText = styled(Text, {
  name: 'Link',
  color: '$primary',
  fontWeight: '500',
  cursor: 'pointer',

  variants: {
    intent: (intent: ColorIntent) => ({ color: `$${intent}` }),
    underline: {
      always: { textDecorationLine: 'underline' },
      hover: { hoverStyle: { textDecorationLine: 'underline' } },
      none: { textDecorationLine: 'none' },
    },
    size: {
      sm: { fontSize: 13, lineHeight: 20 },
      md: { fontSize: 15, lineHeight: 22 },
      lg: { fontSize: 17, lineHeight: 24 },
    },
    disabled: {
      true: { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' },
    },
  } as const,

  defaultVariants: {
    intent: 'primary',
    underline: 'hover',
    size: 'md',
  },
});

export type LinkProps = GetProps<typeof LinkText> & {
  /** Na web vira um <a href> de verdade; no native é ignorado (use `onPress`). */
  href?: string;
};

export function Link({ href, ...rest }: LinkProps) {
  // `tag`/`href` só têm efeito no DOM; no React Native o Text simplesmente
  // ignora essas props, então o mesmo arquivo serve para as duas plataformas.
  const webProps = href ? ({ tag: 'a', href } as const) : null;

  return <LinkText role="link" {...webProps} {...rest} />;
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
LinkText.displayName = 'LinkText';
