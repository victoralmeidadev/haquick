import type { ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View, Text, styled } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';
import { intentContent, intentSurface, type VariantExtras } from '../../config/intents';

export type AlertVariant = 'outline' | 'soft' | 'solid';
import { shape } from '../../config/shape';

// Mensagem de feedback (o `Alert` do MUI). A variante `outline` usa fundo do
// tema + barra lateral colorida, então funciona igual em light e dark — sem
// depender de um shade claro fixo da intenção.
export const AlertFrame = styled(View, {
  name: 'Alert',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '$3',
  padding: '$3',
  borderRadius: '$radiusMd',
  borderWidth: shape.borderWidth,
  borderLeftWidth: shape.borderWidth * 4,

  variants: {
    variant: {
      outline: { backgroundColor: '$background' },
      soft: {},
      solid: {},
    },
    intent: (intent: ColorIntent, { props }: VariantExtras) => {
      const variant = (props.variant as AlertVariant) ?? 'outline';
      // `outline` mantém o fundo do tema e usa a cor só nas bordas.
      return variant === 'outline'
        ? { borderColor: `$${intent}` }
        : intentSurface(intent, variant, false);
    },
  } as const,

  defaultVariants: {
    variant: 'outline',
    intent: 'info',
  },
});

const AlertTitle = styled(Text, {
  name: 'AlertTitle',
  fontSize: 14,
  fontWeight: '700',
  lineHeight: 20,

  variants: {
    variant: {
      outline: {},
      soft: {},
      solid: {},
    },
    intent: (intent: ColorIntent, { props }: VariantExtras) =>
      intentContent(intent, (props.variant as AlertVariant) ?? 'outline'),
  } as const,

  defaultVariants: { variant: 'outline', intent: 'info' },
});

const AlertBody = styled(Text, {
  name: 'AlertBody',
  fontSize: 13,
  lineHeight: 20,

  variants: {
    variant: {
      // No outline o corpo é texto comum; solid/soft precisam da cor do par.
      outline: { color: '$color' },
      soft: {},
      solid: {},
    },
    intent: (intent: ColorIntent, { props }: VariantExtras) => {
      const variant = (props.variant as AlertVariant) ?? 'outline';
      if (variant === 'solid') return { color: `$${intent}ContrastText` };
      if (variant === 'soft') return { color: `$${intent}SoftText` };
      return { color: '$color' };
    },
  } as const,

  defaultVariants: { variant: 'outline', intent: 'info' },
});

export type AlertProps = GetProps<typeof AlertFrame> & {
  title?: string;
  children?: ReactNode;
  /** Slot à esquerda — ícone da mensagem. */
  icon?: ReactNode;
  /** Slot à direita — ex: <IconButton label="Fechar">✕</IconButton>. */
  action?: ReactNode;
};

export function Alert({
  title,
  children,
  icon,
  action,
  variant = 'outline',
  intent = 'info',
  ...rest
}: AlertProps) {
  return (
    <AlertFrame variant={variant} intent={intent} role="alert" {...rest}>
      {icon}

      <View flex={1} gap="$1">
        {title ? (
          <AlertTitle variant={variant} intent={intent}>
            {title}
          </AlertTitle>
        ) : null}

        {typeof children === 'string' ? (
          <AlertBody variant={variant} intent={intent}>
            {children}
          </AlertBody>
        ) : (
          children
        )}
      </View>

      {action}
    </AlertFrame>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
AlertFrame.displayName = 'AlertFrame';
AlertTitle.displayName = 'AlertTitle';
AlertBody.displayName = 'AlertBody';
