import type { GetProps } from '@tamagui/core';
import { View, styled } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';

const ProgressTrack = styled(View, {
  name: 'Progress',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: '$borderColor',
  borderRadius: '$radiusFull',

  variants: {
    size: {
      sm: { height: 4 },
      md: { height: 8 },
      lg: { height: 12 },
    },
  } as const,

  defaultVariants: { size: 'md' },
});

const ProgressBar = styled(View, {
  name: 'ProgressBar',
  height: '100%',
  borderRadius: '$radiusFull',

  variants: {
    intent: (intent: ColorIntent) => ({ backgroundColor: `$${intent}` }),
  } as const,

  defaultVariants: { intent: 'primary' },
});

export type ProgressProps = GetProps<typeof ProgressTrack> & {
  /** Progresso de 0 a 100. Valores fora da faixa são limitados. */
  value?: number;
  intent?: ColorIntent;
};

// Barra determinada (o "LinearProgress" do MUI). Para carregamento sem
// percentual conhecido use o <Spinner />.
export function Progress({ value = 0, intent = 'primary', size = 'md', ...rest }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <ProgressTrack
      size={size}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <ProgressBar intent={intent} width={`${clamped}%`} />
    </ProgressTrack>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
ProgressTrack.displayName = 'ProgressTrack';
ProgressBar.displayName = 'ProgressBar';
