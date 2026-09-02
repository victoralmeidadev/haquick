import type { ColorIntent } from '../../config/palette';

export type SpinnerProps = {
  size?: 'sm' | 'lg';
  intent?: ColorIntent;
  /** Sobrescreve a cor derivada do `intent` — usado por cima de fundos sólidos. */
  color?: string;
};

export const SPINNER_SIZE = {
  sm: 16,
  lg: 32,
} as const;
