import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { themeColor, radii, useTheme } from './theme';
import { BUTTON_SIZES, VARIANT_SLOTS, slot } from '../core/scales';
import { defaultShape } from '../tokens/shape';
import type { ButtonProps } from '../core/types';

export function Button({
  children,
  variant = 'solid',
  intent = 'primary',
  size = 'md',
  disabled,
  loading,
  fullWidth,
  onPress,
}: ButtonProps) {
  const theme = useTheme();
  const [pressed, setPressed] = useState(false);

  const slots = VARIANT_SLOTS[variant];
  const dims = BUTTON_SIZES[size];

  const transparent = slots.bg === null;
  const baseBackground = transparent ? 'transparent' : themeColor(theme, slot(intent, slots.bg));
  const pressBackground = transparent
    ? theme.backgroundPress
    : themeColor(theme, slot(intent, slots.bg === 'Soft' ? 'SoftHover' : 'Press'));

  const text = themeColor(theme, slot(intent, slots.fg));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!(disabled || loading), busy: !!loading }}
      disabled={disabled || loading}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.base,
        {
          paddingVertical: dims.padY,
          paddingHorizontal: dims.padX,
          borderRadius: size === 'sm' ? radii.radiusSm : radii.radiusMd,
          backgroundColor: pressed ? pressBackground : baseBackground,
          borderColor: themeColor(theme, slot(intent, slots.border)) ?? 'transparent',
          opacity: disabled || loading ? 0.5 : 1,
        },
        fullWidth ? styles.cheio : null,
      ]}
    >
      {loading ? <ActivityIndicator size="small" color={text} /> : null}
      <Text style={[styles.text, { fontSize: dims.font, lineHeight: dims.line, color: text }]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: defaultShape.borderWidth,
    alignSelf: 'flex-start',
  },
  cheio: { alignSelf: 'stretch', width: '100%' },
  text: { fontWeight: '600' },
});

export const ButtonRow = View;
