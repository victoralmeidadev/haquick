import { useState } from 'react';
import { TextInput } from 'react-native';
import { useTheme } from '@tamagui/core';
import { InputFrame } from './InputFrame';
import { INPUT_FONT_SIZE, type InputProps } from './types';

// Mapeia o `inputMode` normalizado para o `keyboardType` do React Native.
const KEYBOARD_TYPE = {
  text: 'default',
  email: 'email-address',
  numeric: 'numeric',
  tel: 'phone-pad',
  url: 'url',
  search: 'default',
} as const;

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
  label,
  multiline,
  rows = 3,
}: InputProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <InputFrame
      size={size}
      error={error}
      focused={focused && !error}
      disabled={disabled}
      alignItems={multiline ? 'flex-start' : 'center'}
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
        placeholderTextColor={theme.neutral?.val as string}
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
          fontSize: INPUT_FONT_SIZE[size],
          color: theme.color?.val as string,
          ...(multiline ? { minHeight: INPUT_FONT_SIZE[size] * 1.5 * rows } : null),
        }}
      />
    </InputFrame>
  );
}
