import type { GetProps } from '@tamagui/core';
import { View, Text, styled } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';
import { Media } from '../Media';

const AvatarFrame = styled(View, {
  name: 'Avatar',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: '$radiusFull',

  variants: {
    intent: (intent: ColorIntent) => ({ backgroundColor: `$${intent}` }),
    size: {
      sm: { width: 28, height: 28 },
      md: { width: 40, height: 40 },
      lg: { width: 56, height: 56 },
    },
  } as const,

  defaultVariants: { intent: 'primary', size: 'md' },
});

const AvatarInitials = styled(Text, {
  name: 'AvatarInitials',
  fontWeight: '700',

  variants: {
    intent: (intent: ColorIntent) => ({ color: `$${intent}ContrastText` }),
    size: {
      sm: { fontSize: 11 },
      md: { fontSize: 15 },
      lg: { fontSize: 20 },
    },
  } as const,

  defaultVariants: { intent: 'primary', size: 'md' },
});

export type AvatarProps = GetProps<typeof AvatarFrame> & {
  /** URL da imagem. Sem ela, caem as `initials`. */
  src?: string;
  initials?: string;
  /** Texto alternativo da imagem. */
  label?: string;
};

// A moldura é universal (só Tamagui); a imagem vem do <Media />, que é quem
// tem versão por plataforma.
// Os defaults ficam na assinatura, e não só em `defaultVariants`: passar
// `size={undefined}` para um styled() anula o defaultVariants em vez de cair
// nele. Sem isto o Avatar sem `size` sai com 0 de altura.
export function Avatar({
  src,
  initials,
  label,
  intent = 'primary',
  size = 'md',
  ...rest
}: AvatarProps) {
  return (
    <AvatarFrame intent={intent} size={size} {...rest}>
      {src ? (
        <Media src={src} alt={label} />
      ) : (
        <AvatarInitials intent={intent} size={size}>
          {initials}
        </AvatarInitials>
      )}
    </AvatarFrame>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
AvatarFrame.displayName = 'AvatarFrame';
AvatarInitials.displayName = 'AvatarInitials';
