import type { ColorIntent } from '../tokens/palette';

export type { ColorIntent };
export type SurfaceVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  children?: React.ReactNode;
  variant?: SurfaceVariant;
  intent?: ColorIntent;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
};

export type CheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
  intent?: ColorIntent;
  size?: Size;
  label?: React.ReactNode;
};

export type DialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  /** Ações do rodapé. */
  footer?: React.ReactNode;
};
