import type { ReactNode } from 'react';
import type { ColorIntent, Size, SurfaceVariant } from './types';
import type { StackProps } from './layout';
import type { TypographyVariant } from './typography';

export type TypographyProps = {
  variant?: TypographyVariant;
  intent?: ColorIntent;
  children?: ReactNode;
  align?: 'left' | 'center' | 'right';
  /** Cor literal, quando não vem de uma intenção (ex: texto sobre foto). */
  color?: string;
};

export type SurfaceProps = Pick<StackProps, 'gap' | 'padding' | 'width' | 'maxWidth' | 'fill'>;

export type CardProps = SurfaceProps & {
  children?: ReactNode;
  /** Elevação de 0 a 5. */
  raised?: 0 | 1 | 2 | 3 | 4 | 5;
};

export type BadgeProps = { children?: ReactNode; intent?: ColorIntent };

export type ChipProps = {
  children?: ReactNode;
  intent?: ColorIntent;
  variant?: SurfaceVariant;
  size?: 'sm' | 'md';
  leading?: ReactNode;
  onPress?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
};

export type AvatarProps = {
  src?: string;
  initials?: string;
  label?: string;
  intent?: ColorIntent;
  size?: Size;
};

export type IconButtonProps = {
  children?: ReactNode;
  /** Obrigatório: o botão não tem texto visível. */
  label: string;
  variant?: SurfaceVariant;
  intent?: ColorIntent;
  size?: Size;
  rounded?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export type LinkProps = {
  children?: ReactNode;
  href?: string;
  intent?: ColorIntent;
  underline?: 'always' | 'hover' | 'none';
  size?: Size;
  disabled?: boolean;
  onPress?: () => void;
};

export type LabelProps = { children?: ReactNode; required?: boolean; size?: Size };
export type HelperTextProps = { children?: ReactNode; error?: boolean };

export type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  intent?: ColorIntent;
  size?: Size;
  label?: ReactNode;
};

export type RadioProps = {
  value: string;
  checked?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  intent?: ColorIntent;
  size?: Size;
  label?: ReactNode;
};

export type RadioGroupProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  intent?: ColorIntent;
  size?: Size;
  direction?: 'row' | 'column';
  children?: ReactNode;
};

export type SpinnerProps = { size?: 'sm' | 'lg'; intent?: ColorIntent; color?: string };

export type ProgressProps = { value?: number; intent?: ColorIntent; size?: Size };

export type SkeletonProps = {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | `${number}%`;
  height?: number;
};

export type DividerProps = { orientation?: 'horizontal' | 'vertical' };

export type SpacerProps = { size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; fill?: boolean };

export type AlertProps = {
  title?: string;
  children?: ReactNode;
  intent?: ColorIntent;
  variant?: 'outline' | 'soft' | 'solid';
  icon?: ReactNode;
  action?: ReactNode;
};

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  intent?: ColorIntent;
  action?: ReactNode;
};

export type ListItemProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  onPress?: () => void;
  /** Preenchido pela <List>: some a borda de cima do primeiro item. */
  first?: boolean;
};

export type TimelineItemProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  intent?: ColorIntent;
  variant?: 'filled' | 'outlined';
  size?: Size;
  /** Preenchido pela <Timeline>: some o conector do último item. */
  last?: boolean;
};

export type StatCardProps = {
  label: string;
  value: ReactNode;
  hint?: string;
  intent?: ColorIntent;
  trailing?: ReactNode;
};

export type PageHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  onBack?: () => void;
  leading?: ReactNode;
  actions?: ReactNode;
  divided?: boolean;
};

export type AccordionItemProps = {
  title: ReactNode;
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  first?: boolean;
};

export type FadeProps = {
  children?: ReactNode;
  visible?: boolean;
  speed?: 'quick' | 'medium' | 'slow';
  unmountOnExit?: boolean;
};

export type CollapseProps = {
  children?: ReactNode;
  open?: boolean;
  speed?: 'quick' | 'medium' | 'slow';
};

export type TooltipProps = {
  children?: ReactNode;
  label: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
};
