import type { ReactNode } from 'react';
import { View } from '@tamagui/core';
import type { ColorIntent } from '../config/palette';
import { PageHeader } from '../components/PageHeader';
import { Screen } from '../components/Screen';
import { StatCard } from '../components/StatCard';

export type DashboardStat = {
  label: string;
  value: ReactNode;
  hint?: string;
  intent?: ColorIntent;
  trailing?: ReactNode;
};

export type DashboardTemplateProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** Linha de indicadores no topo. Envolve sozinha em telas estreitas. */
  stats?: DashboardStat[];
  /** Painéis abaixo dos indicadores. */
  children?: ReactNode;
  maxWidth?: number;
};

// Tela de visão geral: cabeçalho, faixa de indicadores e área livre de painéis.
// Os indicadores vêm por dados porque a faixa precisa distribuí-los por igual
// — com composição, cada tela teria de repetir o flex/wrap na mão.
export function DashboardTemplate({
  title,
  subtitle,
  actions,
  stats = [],
  children,
  maxWidth = 1100,
}: DashboardTemplateProps) {
  return (
    <Screen maxWidth={maxWidth}>
      <PageHeader title={title} subtitle={subtitle} actions={actions} />

      {stats.length > 0 ? (
        <View flexDirection="row" gap="$3" flexWrap="wrap" paddingBottom="$4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              hint={stat.hint}
              intent={stat.intent}
              trailing={stat.trailing}
            />
          ))}
        </View>
      ) : null}

      <View gap="$4" flexGrow={1}>
        {children}
      </View>
    </Screen>
  );
}
