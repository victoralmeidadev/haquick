import type { ReactNode } from 'react';
import { View } from '@tamagui/core';
import { EmptyState } from '../components/EmptyState';
import { Input, type InputProps } from '../components/Input';
import { PageHeader } from '../components/PageHeader';
import { Screen } from '../components/Screen';
import { Skeleton } from '../components/Skeleton';

export type ListTemplateProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  onBack?: () => void;
  /** Ações do cabeçalho — normalmente o botão de criar. */
  actions?: ReactNode;
  /** Campo de busca acima da lista. Omita para não mostrar. */
  search?: InputProps;
  /** Filtros/chips entre a busca e a lista. */
  filters?: ReactNode;
  /** A lista em si. */
  children?: ReactNode;
  /** Mostra esqueletos no lugar do conteúdo. */
  loading?: boolean;
  /** Quando `true`, mostra `emptyState` no lugar do conteúdo. */
  empty?: boolean;
  emptyState?: ReactNode;
  maxWidth?: number;
};

// Tela de listagem: cabeçalho, busca, filtros e conteúdo — com os três estados
// que toda lista tem (carregando, vazia, com dados) resolvidos aqui, para cada
// tela não reimplementar essa mesma ramificação.
export function ListTemplate({
  title,
  subtitle,
  onBack,
  actions,
  search,
  filters,
  children,
  loading,
  empty,
  emptyState,
  maxWidth = 900,
}: ListTemplateProps) {
  return (
    <Screen maxWidth={maxWidth}>
      <PageHeader title={title} subtitle={subtitle} onBack={onBack} actions={actions} />

      {search ? (
        <View paddingBottom="$3">
          <Input placeholder="Buscar..." {...search} />
        </View>
      ) : null}

      {filters ? (
        <View flexDirection="row" gap="$2" flexWrap="wrap" paddingBottom="$3">
          {filters}
        </View>
      ) : null}

      {loading ? (
        <View gap="$3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangular" height={56} />
          ))}
        </View>
      ) : empty ? (
        (emptyState ?? <EmptyState icon="∅" title="Nada por aqui" />)
      ) : (
        children
      )}
    </Screen>
  );
}
