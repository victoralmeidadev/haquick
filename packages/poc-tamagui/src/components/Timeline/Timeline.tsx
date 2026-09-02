import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View, styled } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';
import { shape } from '../../config/shape';
import { Typography } from '../Typography';

const DOT_SIZE = { sm: 10, md: 14, lg: 18 } as const;

const TimelineFrame = styled(View, {
  name: 'Timeline',
  flexDirection: 'column',
});

const Dot = styled(View, {
  name: 'TimelineDot',
  borderRadius: '$radiusFull',
  borderWidth: shape.controlBorderWidth,
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    // `filled` pinta o miolo; `outlined` deixa só o anel — útil para marcar
    // etapas ainda não concluídas.
    variant: {
      filled: {},
      outlined: { backgroundColor: '$background' },
    },
    intent: (intent: ColorIntent, { props }: { props: Record<string, unknown> }) => {
      const filled = (props.variant ?? 'filled') === 'filled';
      return {
        borderColor: `$${intent}`,
        ...(filled ? { backgroundColor: `$${intent}` } : null),
      };
    },
    size: {
      sm: { width: DOT_SIZE.sm, height: DOT_SIZE.sm },
      md: { width: DOT_SIZE.md, height: DOT_SIZE.md },
      lg: { width: DOT_SIZE.lg, height: DOT_SIZE.lg },
    },
  } as const,

  defaultVariants: { variant: 'filled', intent: 'primary', size: 'md' },
});

export type TimelineItemProps = {
  title: ReactNode;
  /** Linha secundária: horário, autor, status. */
  subtitle?: ReactNode;
  /** Conteúdo livre abaixo do título. */
  children?: ReactNode;
  intent?: ColorIntent;
  variant?: 'filled' | 'outlined';
  size?: keyof typeof DOT_SIZE;
  /** Preenchido pelo <Timeline>; some o conector do último item. */
  last?: boolean;
};

export function TimelineItem({
  title,
  subtitle,
  children,
  intent = 'primary',
  variant = 'filled',
  size = 'md',
  last,
}: TimelineItemProps) {
  return (
    <View flexDirection="row" gap="$3">
      {/* Coluna do marcador: bolinha + linha até o próximo item. */}
      <View alignItems="center" width={DOT_SIZE.lg}>
        <Dot intent={intent} variant={variant} size={size} marginTop={3} />
        {!last ? (
          <View
            flex={1}
            width={shape.borderWidth}
            minHeight={16}
            backgroundColor="$borderColor"
            marginTop={4}
          />
        ) : null}
      </View>

      <View flex={1} paddingBottom={last ? 0 : '$4'} gap={2}>
        {typeof title === 'string' ? <Typography variant="subtitle2">{title}</Typography> : title}

        {subtitle ? (
          typeof subtitle === 'string' ? (
            <Typography variant="caption" intent="neutral">
              {subtitle}
            </Typography>
          ) : (
            subtitle
          )
        ) : null}

        {children}
      </View>
    </View>
  );
}

export type TimelineProps = GetProps<typeof TimelineFrame> & { children?: ReactNode };

// O conector do último item precisa sumir, e só o pai sabe quem é o último —
// por isso o Timeline injeta `ultimo` em vez de o item adivinhar.
export function Timeline({ children, ...rest }: TimelineProps) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <TimelineFrame {...rest}>
      {items.map((item, index) =>
        cloneElement(item as ReactElement<TimelineItemProps>, {
          last: index === items.length - 1,
        })
      )}
    </TimelineFrame>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
TimelineFrame.displayName = 'TimelineFrame';
Dot.displayName = 'Dot';
