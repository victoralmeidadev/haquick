import type { ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View, styled } from '@tamagui/core';
import { shape } from '../../config/shape';
import { IconButton } from '../IconButton';
import { Typography } from '../Typography';

const PageHeaderFrame = styled(View, {
  name: 'PageHeader',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '$3',
  paddingBottom: '$4',

  variants: {
    divided: {
      true: { borderBottomWidth: shape.borderWidth, borderBottomColor: '$borderColor' },
    },
  } as const,
});

export type PageHeaderProps = GetProps<typeof PageHeaderFrame> & {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Botão de voltar à esquerda. Sem o handler, o botão não aparece. */
  onBack?: () => void;
  /** Slot à esquerda do título — avatar, ícone. */
  leading?: ReactNode;
  /** Ações à direita: botões, menu. */
  actions?: ReactNode;
};

// Cabeçalho de tela: título, subtítulo e ações. É a peça que todos os
// templates usam no topo, e serve sozinha em telas que não usam template.
export function PageHeader({
  title,
  subtitle,
  onBack,
  leading,
  actions,
  ...rest
}: PageHeaderProps) {
  return (
    <PageHeaderFrame {...rest}>
      {onBack ? (
        <IconButton label="Voltar" onPress={onBack} marginTop={-2}>
          ←
        </IconButton>
      ) : null}

      {leading}

      <View flex={1} gap={2}>
        {typeof title === 'string' ? <Typography variant="h4">{title}</Typography> : title}

        {subtitle ? (
          typeof subtitle === 'string' ? (
            <Typography variant="body2" intent="neutral">
              {subtitle}
            </Typography>
          ) : (
            subtitle
          )
        ) : null}
      </View>

      {actions ? (
        <View flexDirection="row" gap="$2" alignItems="center" flexWrap="wrap">
          {actions}
        </View>
      ) : null}
    </PageHeaderFrame>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
PageHeaderFrame.displayName = 'PageHeaderFrame';
