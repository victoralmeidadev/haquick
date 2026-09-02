// Implementação exclusiva de mobile: em vez de uma grid, cada linha vira um
// "card" empilhado (padrão comum em apps mobile para dados tabulares).
// Mesma prop API do Table.web.tsx, renderização completamente diferente.
import { FlatList } from 'react-native';
import { View, Text } from '@tamagui/core';
import type { TableProps } from './types';
import { shape } from '../../config/shape';

export function Table<T extends Record<string, unknown>>({ data, columns }: TableProps<T>) {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, i) => String(i)}
      renderItem={({ item }) => (
        <View
          backgroundColor="$background"
          borderColor="$borderColor"
          borderWidth={shape.borderWidth}
          borderRadius="$radiusMd"
          padding="$3"
          marginBottom="$2"
          gap="$1"
        >
          {columns.map((col) => (
            <View key={String(col.key)} flexDirection="row" justifyContent="space-between">
              <Text fontWeight="600">{col.header}</Text>
              <Text>{String(item[col.key] ?? '')}</Text>
            </View>
          ))}
        </View>
      )}
    />
  );
}
