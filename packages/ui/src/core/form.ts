import type { Size } from './types';

export type InputProps = {
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  secure?: boolean;
  inputMode?: 'text' | 'email' | 'numeric' | 'tel' | 'url' | 'search';
  autoFocus?: boolean;
  size?: Size;
  multiline?: boolean;
  rows?: number;
  label?: string;
};

export const INPUT_FONT: Record<Size, number> = { sm: 13, md: 15, lg: 17 };
export const INPUT_PAD: Record<Size, { x: number; y: number; min: number }> = {
  sm: { x: 8, y: 4, min: 32 },
  md: { x: 12, y: 8, min: 40 },
  lg: { x: 12, y: 12, min: 48 },
};

/** Mapeia o inputMode normalizado para o keyboardType do React Native. */
export const KEYBOARD_TYPE = {
  text: 'default',
  email: 'email-address',
  numeric: 'numeric',
  tel: 'phone-pad',
  url: 'url',
  search: 'default',
} as const;
