import type { ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View, styled } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';
import { Typography } from '../Typography';

const EmptyStateFrame = styled(View, {
  name: 'EmptyState',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$3',
  paddingVertical: '$8',
  paddingHorizontal: '$5',
});

const Glyph = styled(View, {
  name: 'EmptyStateGlyph',
  width: 56,
  height: 56,
  borderRadius: '$radiusFull',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    intent: (intent: ColorIntent) => ({ backgroundColor: `$${intent}Soft` }),
  } as const,

  defaultVariants: { intent: 'neutral' },
});

export type EmptyStateProps = GetProps<typeof EmptyStateFrame> & {
  title: string;
  description?: string;
  /** Caractere/emoji ou nó React. String vira glifo dentro do círculo. */
  icon?: ReactNode;
  intent?: ColorIntent;
  /** Botão de saída — "Limpar filtros", "Criar o primeiro". */
  action?: ReactNode;
};

// Estado vazio: lista sem resultados, busca sem retorno, erro sem conteúdo.
// Usado pelos templates quando não há dados, e útil sozinho.
export function EmptyState({
  title,
  description,
  icon,
  intent = 'neutral',
  action,
  ...rest
}: EmptyStateProps) {
  return (
    <EmptyStateFrame {...rest}>
      {icon ? (
        <Glyph intent={intent}>
          {typeof icon === 'string' ? (
            <Typography variant="h5" intent={intent}>
              {icon}
            </Typography>
          ) : (
            icon
          )}
        </Glyph>
      ) : null}

      <View alignItems="center" gap="$1" maxWidth={380}>
        <Typography variant="h6" textAlign="center">
          {title}
        </Typography>
        {description ? (
          <Typography variant="body2" intent="neutral" textAlign="center">
            {description}
          </Typography>
        ) : null}
      </View>

      {action}
    </EmptyStateFrame>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
EmptyStateFrame.displayName = 'EmptyStateFrame';
Glyph.displayName = 'Glyph';
