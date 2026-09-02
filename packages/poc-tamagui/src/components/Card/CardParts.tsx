import type { ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View, styled } from '@tamagui/core';
import { shape } from '../../config/shape';
import { Media } from '../Media';
import { Typography } from '../Typography';

// Partes de composição do Card, como CardHeader/CardContent/CardActions do MUI.
// O <Card> continua servindo sozinho para casos simples; estas peças existem
// para o caso em que cabeçalho, corpo e rodapé precisam de tratamento próprio
// (padding, divisórias, alinhamento).

export const CardHeader = styled(View, {
  name: 'CardHeader',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$3',
  paddingBottom: '$3',
});

export const CardContent = styled(View, {
  name: 'CardContent',
  flexDirection: 'column',
  gap: '$2',
});

export const CardFooter = styled(View, {
  name: 'CardFooter',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$2',
  paddingTop: '$3',

  variants: {
    // Divisória acima do rodapé, para separar as ações do conteúdo.
    divided: {
      true: { borderTopWidth: shape.borderWidth, borderTopColor: '$borderColor' },
    },
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
    },
  } as const,
});

const CardMediaFrame = styled(View, {
  name: 'CardMedia',
  overflow: 'hidden',
  backgroundColor: '$borderColor',
  width: '100%',
  height: 160,
});

export type CardMediaProps = GetProps<typeof CardMediaFrame> & {
  src: string;
  alt?: string;
  fit?: 'cover' | 'contain';
};

export function CardMedia({ src, alt, fit, ...rest }: CardMediaProps) {
  return (
    <CardMediaFrame {...rest}>
      <Media src={src} alt={alt} fit={fit} />
    </CardMediaFrame>
  );
}

export type CardTitleProps = { children?: ReactNode; subtitle?: ReactNode };

// Atalho para o par título + subtítulo, que é o miolo de quase todo cabeçalho.
export function CardTitle({ children, subtitle }: CardTitleProps) {
  return (
    <View flex={1} gap={2}>
      <Typography variant="h6">{children}</Typography>
      {subtitle ? (
        <Typography variant="body2" intent="neutral">
          {subtitle}
        </Typography>
      ) : null}
    </View>
  );
}

export type CardHeaderProps = GetProps<typeof CardHeader>;
export type CardContentProps = GetProps<typeof CardContent>;
export type CardFooterProps = GetProps<typeof CardFooter>;

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';
CardMediaFrame.displayName = 'CardMediaFrame';
