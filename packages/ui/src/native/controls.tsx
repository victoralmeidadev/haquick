import { createContext, useContext, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { themeColor, radii, useTheme } from './theme';
import { useControllableState } from '../core/useControllableState';
import { INPUT_FONT, INPUT_PAD, KEYBOARD_TYPE, type InputProps } from '../core/form';
import { PROGRESS_HEIGHT, RADIO_SIZES, SWITCH_SIZES } from '../core/scales';
import { defaultShape } from '../tokens/shape';
import { shadows } from '../tokens/shadows';
import type {
  ProgressProps,
  RadioGroupProps,
  RadioProps,
  SpinnerProps,
  SwitchProps,
} from '../core/components';

export function Input({
  value,
  defaultValue,
  onChangeText,
  onFocus,
  onBlur,
  placeholder,
  disabled,
  error,
  secure,
  inputMode = 'text',
  autoFocus,
  size = 'md',
  multiline,
  rows = 3,
  label,
}: InputProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const pad = INPUT_PAD[size];

  const border = error ? themeColor(theme, 'error') : focused ? themeColor(theme, 'primary') : theme.borderColor;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: multiline ? 'flex-start' : 'center',
        backgroundColor: disabled ? theme.backgroundPress : theme.background,
        borderWidth: defaultShape.borderWidth,
        borderColor: border,
        borderRadius: radii.radiusMd,
        paddingHorizontal: pad.x,
        paddingVertical: pad.y,
        minHeight: multiline ? undefined : pad.min,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <TextInput
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        onFocus={() => {
          setFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
        placeholder={placeholder}
        placeholderTextColor={themeColor(theme, 'neutral')}
        editable={!disabled}
        autoFocus={autoFocus}
        secureTextEntry={secure && !multiline}
        multiline={multiline}
        numberOfLines={multiline ? rows : undefined}
        textAlignVertical={multiline ? 'top' : 'center'}
        keyboardType={KEYBOARD_TYPE[inputMode]}
        accessibilityLabel={label}
        style={{
          flex: 1,
          padding: 0,
          fontSize: INPUT_FONT[size],
          color: theme.color,
          minHeight: multiline ? INPUT_FONT[size] * 1.5 * rows : undefined,
        }}
      />
    </View>
  );
}

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  intent = 'primary',
  size = 'md',
  label,
}: SwitchProps) {
  const theme = useTheme();
  const [on, setOn] = useControllableState(checked, defaultChecked, onCheckedChange);
  const s = SWITCH_SIZES[size];
  const folga = (s.height - s.thumb) / 2;

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: on, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => setOn(!on)}
      style={[styles.row, { gap: 12, opacity: disabled ? 0.5 : 1 }]}
    >
      <View
        style={{
          width: s.track,
          height: s.height,
          borderRadius: radii.radiusFull,
          justifyContent: 'center',
          backgroundColor: on ? themeColor(theme, intent) : theme.borderColor,
        }}
      >
        <View
          style={[
            {
              width: s.thumb,
              height: s.thumb,
              borderRadius: radii.radiusFull,
              backgroundColor: '#FFFFFF',
              marginLeft: on ? s.track - s.thumb - folga : folga,
            },
            shadows[2] as object,
          ]}
        />
      </View>
      {typeof label === 'string' ? <Text style={{ color: theme.color }}>{label}</Text> : label}
    </Pressable>
  );
}

type CtxRadio = {
  value?: string;
  setValue: (v: string) => void;
  disabled?: boolean;
  intent?: RadioProps['intent'];
  size?: RadioProps['size'];
};

const RadioCtx = createContext<CtxRadio | null>(null);

export function RadioGroup({
  value,
  defaultValue = '',
  onValueChange,
  disabled,
  intent = 'primary',
  size = 'md',
  direction = 'column',
  children,
}: RadioGroupProps) {
  const [current, setValue] = useControllableState(value, defaultValue, onValueChange);

  return (
    <RadioCtx.Provider value={{ value: current, setValue, disabled, intent, size }}>
      <View
        accessibilityRole="radiogroup"
        style={{ flexDirection: direction, gap: direction === 'row' ? 16 : 12 }}
      >
        {children}
      </View>
    </RadioCtx.Provider>
  );
}

export function Radio({ value, checked, onPress, disabled, intent, size, label }: RadioProps) {
  const theme = useTheme();
  const group = useContext(RadioCtx);

  const isChecked = checked ?? group?.value === value;
  const isDisabled = disabled ?? group?.disabled;
  const intentColor = themeColor(theme, intent ?? group?.intent ?? 'primary');
  const box = RADIO_SIZES[size ?? group?.size ?? 'md'];

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: !!isChecked, disabled: !!isDisabled }}
      disabled={isDisabled}
      onPress={() => {
        group?.setValue(value);
        onPress?.();
      }}
      style={[styles.row, { opacity: isDisabled ? 0.5 : 1 }]}
    >
      <View
        style={{
          width: box,
          height: box,
          borderRadius: radii.radiusFull,
          borderWidth: defaultShape.controlBorderWidth,
          borderColor: isChecked ? intentColor : theme.borderColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isChecked ? (
          <View
            style={{
              width: box * 0.5,
              height: box * 0.5,
              borderRadius: radii.radiusFull,
              backgroundColor: intentColor,
            }}
          />
        ) : null}
      </View>
      {typeof label === 'string' ? <Text style={{ color: theme.color }}>{label}</Text> : label}
    </Pressable>
  );
}

export function Spinner({ size = 'sm', intent = 'primary', color: fixedColor }: SpinnerProps) {
  const theme = useTheme();
  return <ActivityIndicator size={size === 'lg' ? 'large' : 'small'} color={fixedColor ?? themeColor(theme, intent)} />;
}

export function Progress({ value = 0, intent = 'primary', size = 'md' }: ProgressProps) {
  const theme = useTheme();
  const pct = Math.min(100, Math.max(0, value));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ now: pct, min: 0, max: 100 }}
      style={{
        width: '100%',
        height: PROGRESS_HEIGHT[size],
        overflow: 'hidden',
        backgroundColor: theme.borderColor,
        borderRadius: radii.radiusFull,
      }}
    >
      <View
        style={{
          height: '100%',
          width: `${pct}%`,
          backgroundColor: themeColor(theme, intent),
          borderRadius: radii.radiusFull,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
