import { View } from '@tamagui/core';
import type { ScreenProps } from './types';

// Na web quem rola é o documento — não existe ScrollView aqui, e usar um
// container com overflow próprio quebraria a rolagem natural da página.
export function Screen({ children, maxWidth, padded = true, scroll }: ScreenProps) {
  void scroll;

  return (
    <View flexGrow={1} backgroundColor="$background" padding={padded ? '$4' : 0}>
      <View width="100%" maxWidth={maxWidth} alignSelf="center" flexGrow={1}>
        {children}
      </View>
    </View>
  );
}
