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

// Chip é a versão *interativa* do Badge: pode ser clicado, selecionado ou
// removido (filtros, tags de input). Para status estático use <Badge />.
export const ChipFrame = styled(View, {
  name: 'Chip',
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-start',
  gap: '$2',
  borderRadius: '$radiusFull',
  borderWidth: shape.borderWidth,
  borderColor: 'transparent',

  variants: {
    variant: {
      solid: {},
      soft: {},
      outline: {},
      ghost: {},
    },
    intent: (intent: ColorIntent, { props }: VariantExtras) =>
      intentSurface(intent, surfaceVariantOf(props, 'outline'), !!props.onPress),
    size: {
      sm: { paddingVertical: 2, paddingHorizontal: '$2' },
      md: { paddingVertical: '$1', paddingHorizontal: '$3' },
    },
    disabled: {
      true: { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' },
    },
  } as const,

  defaultVariants: {
    variant: 'outline',
    intent: 'neutral',
    size: 'md',
  },
});

const ChipText = styled(Text, {
  name: 'ChipText',
  fontWeight: '500',

  variants: {
    variant: {
      solid: {},
      soft: {},
      outline: {},
      ghost: {},
    },
    intent: (intent: ColorIntent, { props }: VariantExtras) =>
      intentContent(intent, surfaceVariantOf(props, 'outline')),
    size: {
      sm: { fontSize: 12, lineHeight: 16 },
      md: { fontSize: 13, lineHeight: 18 },
    },
  } as const,

  defaultVariants: {
    variant: 'outline',
    intent: 'neutral',
    size: 'md',
  },
});

export type ChipProps = GetProps<typeof ChipFrame> & {
  children?: ReactNode;
  /** Slot antes do texto — ex: <Avatar size="sm" /> ou um ícone. */
  leading?: ReactNode;
  /** Quando definido, mostra o "✕" de remover. */
  onRemove?: () => void;
};

export function Chip({
  children,
  leading,
  onRemove,
  variant = 'outline',
  intent = 'neutral',
  size = 'md',
  disabled,
  ...rest
}: ChipProps) {
  return (
    <ChipFrame
      variant={variant}
      intent={intent}
      size={size}
      disabled={disabled}
      cursor={rest.onPress ? 'pointer' : 'default'}
      {...rest}
    >
      {leading}

      <ChipText variant={variant} intent={intent} size={size}>
        {children}
      </ChipText>

      {onRemove ? (
        <View
          onPress={onRemove}
          cursor="pointer"
          role="button"
          aria-label="Remover"
          hitSlop={8}
        >
          <ChipText variant={variant} intent={intent} size={size} fontWeight="700">
            ✕
          </ChipText>
        </View>
      ) : null}
    </ChipFrame>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
ChipFrame.displayName = 'ChipFrame';
ChipText.displayName = 'ChipText';
