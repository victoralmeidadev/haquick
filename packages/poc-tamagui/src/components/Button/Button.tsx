import type { ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View, Text, styled, useTheme } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';
import {
  intentContent,
  intentSurface,
  surfaceVariantOf,
  type VariantExtras,
} from '../../config/intents';
import { Spinner } from '../Spinner';
import { shape } from '../../config/shape';

// Componente universal: o mesmo arquivo é usado em web (renderiza via
// react-native-web) e em React Native, sem precisar de Button.web.tsx /
// Button.native.tsx.
//
// A cor (`intent`) e o preenchimento (`variant`) são eixos separados, como o
// `color` + `variant` do MUI — ver comentário em config/intents.ts.
export const ButtonFrame = styled(View, {
  name: 'Button',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
  borderRadius: '$radiusMd',
  borderWidth: shape.borderWidth,
  borderColor: 'transparent',
  cursor: 'pointer',

  variants: {
    // Só declara os valores possíveis: quem pinta é a variante `intent`,
    // que lê o `variant` atual via props.
    variant: {
      solid: {},
      soft: {},
      outline: {},
      ghost: {},
    },
    intent: (intent: ColorIntent, { props }: VariantExtras) =>
      intentSurface(intent, surfaceVariantOf(props)),
    size: {
      sm: { paddingVertical: '$2', paddingHorizontal: '$3', borderRadius: '$radiusSm' },
      md: { paddingVertical: '$3', paddingHorizontal: '$4' },
      lg: { paddingVertical: '$4', paddingHorizontal: '$5' },
    },
    fullWidth: {
      true: { alignSelf: 'stretch', width: '100%' },
    },
    disabled: {
      true: { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' },
    },
  } as const,

  defaultVariants: {
    variant: 'solid',
    intent: 'primary',
    size: 'md',
  },
});

export const ButtonText = styled(Text, {
  name: 'ButtonText',
  fontWeight: '600',

  variants: {
    variant: {
      solid: {},
      soft: {},
      outline: {},
      ghost: {},
    },
    intent: (intent: ColorIntent, { props }: VariantExtras) =>
      intentContent(intent, surfaceVariantOf(props)),
    size: {
      sm: { fontSize: 13, lineHeight: 18 },
      md: { fontSize: 15, lineHeight: 20 },
      lg: { fontSize: 17, lineHeight: 24 },
    },
  } as const,

  defaultVariants: {
    variant: 'solid',
    intent: 'primary',
    size: 'md',
  },
});

export type ButtonProps = GetProps<typeof ButtonFrame> & {
  children?: ReactNode;
  /** Ícone antes do texto (equivale ao `startIcon` do MUI). */
  startIcon?: ReactNode;
  /** Ícone depois do texto (equivale ao `endIcon` do MUI). */
  endIcon?: ReactNode;
  /** Troca o `startIcon` por um spinner e desabilita o clique. */
  loading?: boolean;
};

export function Button({
  children,
  variant = 'solid',
  intent = 'primary',
  size = 'md',
  disabled,
  loading,
  startIcon,
  endIcon,
  ...rest
}: ButtonProps) {
  const theme = useTheme();

  // Em cima do fundo sólido o spinner precisa da cor de contraste, não da
  // cor da intenção (que sumiria no próprio fundo).
  const spinnerColor =
    variant === 'solid'
      ? ((theme as any)[`${intent}ContrastText`]?.val as string)
      : ((theme as any)[intent]?.val as string);

  return (
    <ButtonFrame
      variant={variant}
      intent={intent}
      size={size}
      disabled={disabled || loading}
      role="button"
      aria-disabled={!!(disabled || loading)}
      aria-busy={!!loading}
      {...rest}
    >
      {loading ? <Spinner size="sm" color={spinnerColor} /> : startIcon}
      {children != null ? (
        <ButtonText variant={variant} intent={intent} size={size}>
          {children}
        </ButtonText>
      ) : null}
      {endIcon}
    </ButtonFrame>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
ButtonFrame.displayName = 'ButtonFrame';
ButtonText.displayName = 'ButtonText';
