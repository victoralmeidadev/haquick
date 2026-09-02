import { useState } from 'react';
import { useTheme } from '@tamagui/core';
import { InputFrame } from './InputFrame';
import { INPUT_FONT_SIZE, type InputProps } from './types';

// Versão web: `<input>` do DOM, sem `react-native-web`.
// O elemento é "nu" (sem borda/fundo próprios) porque quem desenha o campo é o
// InputFrame; as cores vêm do tema via useTheme(), já que um `<input>` puro não
// entende tokens do Tamagui.
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

  // O <textarea> e o <input> compartilham exatamente as mesmas props aqui, então
  // só a tag muda — o resto (cores, foco, tamanho) vem do InputFrame.
  const Field = (multiline ? 'textarea' : 'input') as 'input';

  return (
    <InputFrame
      size={size}
      error={error}
      focused={focused && !error}
      disabled={disabled}
      alignItems={multiline ? 'flex-start' : 'center'}
    >
      <Field
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChangeText?.(e.target.value)}
        onFocus={() => {
          setFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        {...(multiline ? { rows } : { type: secure ? 'password' : 'text' })}
        inputMode={inputMode === 'text' ? undefined : inputMode}
        aria-label={label}
        aria-invalid={!!error}
        style={{
          flex: 1,
          width: '100%',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          padding: 0,
          margin: 0,
          font: 'inherit',
          fontSize: INPUT_FONT_SIZE[size],
          color: theme.color?.val as string,
          ...(multiline ? { resize: 'none' as const, lineHeight: 1.5 } : null),
        }}
      />
    </InputFrame>
  );
}
