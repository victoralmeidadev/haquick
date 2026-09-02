import type { ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';
import { Card } from '../Card';
import { Typography } from '../Typography';

export type StatCardProps = GetProps<typeof Card> & {
  label: string;
  value: ReactNode;
  /** Linha de contexto abaixo do número: variação, período, meta. */
  hint?: string;
  /** Cor do número. Sem valor, usa a cor de texto do tema. */
  intent?: ColorIntent;
  /** Slot à direita — ícone, badge de variação. */
  trailing?: ReactNode;
};

// Número grande com rótulo. É a peça de topo de dashboard, e o
// DashboardTemplate monta uma linha delas a partir de dados.
export function StatCard({ label, value, hint, intent, trailing, ...rest }: StatCardProps) {
  return (
    <Card raised={1} flexGrow={1} flexBasis={180} gap="$2" {...rest}>
      <View flexDirection="row" alignItems="flex-start" gap="$2">
        <View flex={1} gap="$1">
          <Typography variant="caption" intent="neutral">
            {label}
          </Typography>

          {typeof value === 'string' || typeof value === 'number' ? (
            <Typography variant="h3" fontSize={28} lineHeight={32} intent={intent}>
              {value}
            </Typography>
          ) : (
            value
          )}
        </View>

        {trailing}
      </View>

      {hint ? (
        <Typography variant="caption" intent="neutral">
          {hint}
        </Typography>
      ) : null}
    </Card>
  );
}
