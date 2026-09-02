import { ScrollView, StyleSheet, View } from 'react-native';
import { SCREEN_PADDING, type ScreenProps } from '../core/layout';
import { useTheme } from './theme';

export function Screen({ children, maxWidth, padded = true, scroll = true }: ScreenProps) {
  const theme = useTheme();
  const padding = padded ? SCREEN_PADDING : 0;

  const content = (
    <View style={[styles.inner, { maxWidth }]}>{children}</View>
  );

  if (!scroll) {
    return (
      <View style={[styles.root, { backgroundColor: theme.background, padding: padding }]}>
        {content}
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: theme.background }]}
      contentContainerStyle={{ padding: padding, flexGrow: 1 }}
    >
      {content}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  inner: { flexGrow: 1, width: '100%', alignSelf: 'center' },
});
