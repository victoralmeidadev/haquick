import { Pressable, StyleSheet, Text, View } from 'react-native';
import { themeColor, radii, useTheme } from './theme';
import { CHECKBOX_LABEL_FONT, CHECKBOX_SIZES } from '../core/scales';
import { defaultShape } from '../tokens/shape';
import { useControllableState } from '../core/useControllableState';
import type { CheckboxProps } from '../core/types';

export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  indeterminate,
  disabled,
  intent = 'primary',
  size = 'md',
  label,
}: CheckboxProps) {
  const theme = useTheme();
  const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, onCheckedChange);

  const box = CHECKBOX_SIZES[size];
  const filled = isChecked || indeterminate;
  const intentColor = themeColor(theme, intent);
  const markColor = themeColor(theme, `${intent}ContrastText`);

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: indeterminate ? 'mixed' : isChecked, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => setIsChecked(!isChecked)}
      style={[styles.row, { opacity: disabled ? 0.5 : 1 }]}
    >
      <View
        style={[
          styles.box,
          {
            width: box,
            height: box,
            borderRadius: radii.radiusXs,
            borderColor: filled ? intentColor : theme.borderColor,
            backgroundColor: filled ? intentColor : 'transparent',
          },
        ]}
      >
        {indeterminate ? (
          <View style={{ width: box * 0.5, height: 2, borderRadius: 1, backgroundColor: markColor }} />
        ) : isChecked ? (
          <View
            style={{
              width: box * 0.28,
              height: box * 0.55,
              borderRightWidth: 2,
              borderBottomWidth: 2,
              borderColor: markColor,
              transform: [{ rotate: '45deg' }],
              marginTop: -box * 0.08,
            }}
          />
        ) : null}
      </View>

      {label != null ? (
        <Text style={{ fontSize: CHECKBOX_LABEL_FONT[size], color: theme.color }}>{label}</Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: defaultShape.controlBorderWidth,
  },
});
