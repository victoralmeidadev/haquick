import type { ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View, Text, styled } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';
import {
  intentContent,
  intentSurface,
  surfaceVariantOf,
  type VariantExtras,
} from '../../config/intents';
import { shape } from '../../config/shape';

// Botão só de ícone (o `IconButton` do MUI): área de toque quadrada/redonda,
// sem label visível — por isso `label` é obrigatório para acessibilidade.
export const IconButtonFrame = styled(View, {
  name: 'IconButton',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$radiusFull',
  borderWidth: shape.borderWidth,
  borderColor: 'transparent',
  cursor: 'pointer',

  variants: {
    variant: {
      solid: {},
      soft: {},
      outline: {},
      ghost: {},
    },
    intent: (intent: ColorIntent, { props }: VariantExtras) =>
      intentSurface(intent, surfaceVariantOf(props, 'ghost')),
    size: {
      sm: { width: 28, height: 28 },
      md: { width: 36, height: 36 },
      lg: { width: 44, height: 44 },
    },
    // Cantos arredondados em vez de círculo, para barras de ferramentas.
    rounded: {
      true: { borderRadius: '$radiusMd' },
    },
    disabled: {
      true: { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' },
    },
  } as const,

  defaultVariants: {
    variant: 'ghost',
    intent: 'neutral',
    size: 'md',
  },
});

const IconButtonGlyph = styled(Text, {
  name: 'IconButtonGlyph',
  fontWeight: '600',
  textAlign: 'center',

  variants: {
    variant: {
      solid: {},
      soft: {},
      outline: {},
      ghost: {},
    },
    intent: (intent: ColorIntent, { props }: VariantExtras) =>
      intentContent(intent, surfaceVariantOf(props, 'ghost')),
    size: {
      sm: { fontSize: 14, lineHeight: 16 },
      md: { fontSize: 17, lineHeight: 20 },
      lg: { fontSize: 20, lineHeight: 24 },
    },
  } as const,

  defaultVariants: {
    variant: 'ghost',
    intent: 'neutral',
    size: 'md',
  },
});

export type IconButtonProps = GetProps<typeof IconButtonFrame> & {
  /** Ícone: um nó React (SVG, imagem) ou um caractere/emoji. */
  children?: ReactNode;
  /** Descrição para leitores de tela — o botão não tem texto visível. */
  label: string;
};

export function IconButton({
  children,
  label,
  variant = 'ghost',
  intent = 'neutral',
  size = 'md',
  disabled,
  ...rest
}: IconButtonProps) {
  return (
    <IconButtonFrame
      variant={variant}
      intent={intent}
      size={size}
      disabled={disabled}
      role="button"
      aria-label={label}
      aria-disabled={!!disabled}
      {...rest}
    >
      {/* Só embrulha em <Text> quando o ícone é um caractere: no React Native
          um <View> dentro de <Text> não é válido. */}
      {typeof children === 'string' ? (
        <IconButtonGlyph variant={variant} intent={intent} size={size}>
          {children}
        </IconButtonGlyph>
      ) : (
        children
      )}
    </IconButtonFrame>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
IconButtonFrame.displayName = 'IconButtonFrame';
IconButtonGlyph.displayName = 'IconButtonGlyph';
