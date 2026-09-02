import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { themeColor, radii, useTheme } from './theme';
import { defaultShape } from '../tokens/shape';
import { shadows } from '../tokens/shadows';
import type { DialogProps } from '../core/types';

export function Dialog({ open, onOpenChange, title, description, children, footer }: DialogProps) {
  const theme = useTheme();

  const close = () => onOpenChange?.(false);

  return (
    <Modal
      visible={!!open}
      transparent
      animationType="fade"
      onRequestClose={close}
      accessibilityViewIsModal
    >
      {/* Clique fora fecha — o equivalente ao overlay do Radix. */}
      <Pressable style={styles.overlay} onPress={close}>
        <Pressable
          onPress={() => {}}
          style={[
            styles.cartao,
            {
              backgroundColor: theme.background,
              borderColor: theme.borderColor,
              borderRadius: radii.radiusLg,
              ...(shadows[4] as object),
              shadowColor: themeColor(theme, 'shadowColor'),
            },
          ]}
        >
          <Text style={[styles.title, { color: theme.color }]}>{title}</Text>

          {description ? (
            <Text style={[styles.description, { color: themeColor(theme, 'neutral') }]}>{description}</Text>
          ) : null}

          {children}

          {footer ? <View style={styles.rodape}>{footer}</View> : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  cartao: {
    width: '100%',
    maxWidth: 440,
    borderWidth: defaultShape.borderWidth,
    padding: 20,
    gap: 12,
  },
  title: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
  description: { fontSize: 13, lineHeight: 20 },
  rodape: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, paddingTop: 8 },
});
