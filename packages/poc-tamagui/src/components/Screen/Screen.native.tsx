import { ScrollView, View as RNView } from 'react-native';
import { View, useTheme } from '@tamagui/core';
import type { ScreenProps } from './types';

// No native a tela precisa do próprio container de rolagem.
export function Screen({ children, maxWidth, padded = true, scroll = true }: ScreenProps) {
  const theme = useTheme();
  const background = theme.background?.val as string;

  const content = (
    <View width="100%" maxWidth={maxWidth} alignSelf="center" flexGrow={1}>
      {children}
    </View>
  );

  if (!scroll) {
    return (
      <RNView style={{ flex: 1, backgroundColor: background, padding: padded ? 16 : 0 }}>
        {content}
      </RNView>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: background }}
      contentContainerStyle={{ padding: padded ? 16 : 0, flexGrow: 1 }}
    >
      {content}
    </ScrollView>
  );
}
