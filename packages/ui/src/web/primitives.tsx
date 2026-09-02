import { createElement, type CSSProperties } from 'react';
import { applyTheme } from './theme';
import { TAG_BY_VARIANT, TYPOGRAPHY } from '../core/typography';
import { AVATAR_SIZES, ICON_BUTTON_SIZES, LINK_FONT, SPACER_SIZES } from '../core/scales';
import { space } from '../tokens/spacing';
import type {
  AvatarProps,
  BadgeProps,
  CardProps,
  ChipProps,
  DividerProps,
  HelperTextProps,
  IconButtonProps,
  LabelProps,
  LinkProps,
  SkeletonProps,
  SpacerProps,
  TypographyProps,
} from '../core/components';
import './components.css';

export function Typography({ variant = 'body1', intent, children, align, color }: TypographyProps) {
  applyTheme();
  const t = TYPOGRAPHY[variant];

  const style: CSSProperties = {
    fontSize: t.size,
    lineHeight: `${t.line}px`,
    fontWeight: t.weight,
    textTransform: t.transform,
    letterSpacing: t.spacing,
    textAlign: align,
    color,
  };

  return createElement(
    TAG_BY_VARIANT[variant],
    { className: 'haquick-txt', 'data-intent': intent, style },
    children
  );
}

export function Card({ children, raised = 0, gap, padding, width, maxWidth, fill }: CardProps) {
  applyTheme();
  return (
    <div
      className="haquick-card"
      data-raised={raised || undefined}
      style={{
        gap: space(gap),
        padding: padding !== undefined ? space(padding) : undefined,
        width,
        maxWidth,
        flexGrow: fill ? 1 : undefined,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children?: React.ReactNode }) {
  return <div className="haquick-card-head">{children}</div>;
}

export function CardContent({ children }: { children?: React.ReactNode }) {
  return <div className="haquick-card-content">{children}</div>;
}

export function CardFooter({
  children,
  divided,
  justify = 'start',
}: {
  children?: React.ReactNode;
  divided?: boolean;
  justify?: 'start' | 'center' | 'end' | 'between';
}) {
  const map = { start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between' };
  return (
    <div className="haquick-card-foot" data-divided={divided || undefined} style={{ justifyContent: map[justify] }}>
      {children}
    </div>
  );
}

export function CardTitle({ children, subtitle }: { children?: React.ReactNode; subtitle?: React.ReactNode }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">{children}</Typography>
      {subtitle ? (
        <Typography variant="body2" intent="neutral">
          {subtitle}
        </Typography>
      ) : null}
    </div>
  );
}

export function CardMedia({ src, alt, height = 160 }: { src: string; alt?: string; height?: number }) {
  return (
    <div className="haquick-card-media" style={{ height }}>
      <img src={src} alt={alt ?? ''} />
    </div>
  );
}

export function Badge({ children, intent = 'primary' }: BadgeProps) {
  applyTheme();
  return (
    <span className="haquick-badge" data-intent={intent}>
      {children}
    </span>
  );
}

export function Chip({
  children,
  intent = 'neutral',
  variant = 'outline',
  size = 'md',
  leading,
  onPress,
  onRemove,
  disabled,
}: ChipProps) {
  applyTheme();
  return (
    <span
      className="haquick-chip"
      data-intent={intent}
      data-variant={variant}
      data-size={size}
      data-pressable={onPress ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      onClick={onPress}
      role={onPress ? 'button' : undefined}
    >
      {leading}
      {children}
      {onRemove ? (
        <button type="button" className="haquick-chip-x" aria-label="Remover" onClick={onRemove}>
          ✕
        </button>
      ) : null}
    </span>
  );
}

export function Avatar({ src, initials, label, intent = 'primary', size = 'md' }: AvatarProps) {
  applyTheme();
  const s = AVATAR_SIZES[size];
  return (
    <span
      className="haquick-avatar"
      data-intent={intent}
      style={{ width: s.box, height: s.box, fontSize: s.font }}
    >
      {src ? <img src={src} alt={label ?? ''} /> : initials}
    </span>
  );
}

export function Skeleton({ variant = 'text', width, height }: SkeletonProps) {
  applyTheme();
  return <div className="haquick-skel" data-variant={variant} style={{ width, height }} />;
}

export function Divider({ orientation = 'horizontal' }: DividerProps) {
  applyTheme();
  return <hr className="haquick-divider" data-orientation={orientation} />;
}

export function Spacer({ size = 'md', fill }: SpacerProps) {
  const v = SPACER_SIZES[size];
  return <div style={{ width: v, height: v, flexGrow: fill ? 1 : undefined }} />;
}

export function IconButton({
  children,
  label,
  variant = 'ghost',
  intent = 'neutral',
  size = 'md',
  rounded,
  disabled,
  onPress,
}: IconButtonProps) {
  applyTheme();
  const s = ICON_BUTTON_SIZES[size];
  return (
    <button
      type="button"
      className="haquick-ib"
      data-variant={variant}
      data-intent={intent}
      data-rounded={rounded ? 'true' : undefined}
      style={{ width: s.box, height: s.box, fontSize: s.font }}
      aria-label={label}
      disabled={disabled}
      onClick={onPress}
    >
      {children}
    </button>
  );
}

export function Link({
  children,
  href,
  intent = 'primary',
  underline = 'hover',
  size = 'md',
  disabled,
  onPress,
}: LinkProps) {
  applyTheme();
  const f = LINK_FONT[size];
  const comuns = {
    className: 'haquick-link',
    'data-intent': intent,
    'data-underline': underline,
    'data-disabled': disabled ? 'true' : undefined,
    style: { fontSize: f.size, lineHeight: `${f.line}px` },
  } as const;

  return href ? (
    <a {...comuns} href={href}>
      {children}
    </a>
  ) : (
    <button {...comuns} type="button" onClick={onPress}>
      {children}
    </button>
  );
}

export function Label({ children, required, size = 'md' }: LabelProps) {
  applyTheme();
  const f = { sm: 12, md: 13, lg: 15 }[size];
  return (
    <label className="haquick-label" style={{ fontSize: f }}>
      {children}
      {required ? <span className="haquick-label-req"> *</span> : null}
    </label>
  );
}

export function HelperText({ children, error }: HelperTextProps) {
  applyTheme();
  return (
    <span className="haquick-helper" data-error={error ? 'true' : undefined}>
      {children}
    </span>
  );
}
