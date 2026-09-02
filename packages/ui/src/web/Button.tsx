import { applyTheme } from './theme';
import type { ButtonProps } from '../core/types';
import './components.css';

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
  applyTheme();

  return (
    <button
      type="button"
      className="haquick-btn"
      data-variant={variant}
      data-intent={intent}
      data-size={size}
      data-full={fullWidth ? 'true' : undefined}
      disabled={disabled || loading}
      aria-busy={!!loading}
      onClick={onPress}
    >
      {loading ? <span className="haquick-spin" aria-hidden /> : null}
      {children}
    </button>
  );
}
