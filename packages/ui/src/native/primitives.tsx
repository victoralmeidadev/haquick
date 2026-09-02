import { Image, Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle } from 'react-native';
import {
  AVATAR_SIZES,
  CHIP_SIZES,
  ICON_BUTTON_SIZES,
  LINK_FONT,
  SPACER_SIZES,
  VARIANT_SLOTS,
  slot,
} from '../core/scales';
import { themeColor, radii, useShadowScale, useTheme } from './theme';
import { TYPOGRAPHY } from '../core/typography';


import { defaultShape } from '../tokens/shape';
import { shadows, type ShadowStyle } from '../tokens/shadows';
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

export function Typography({ variant = 'body1', intent, children, align, color }: TypographyProps) {
  const theme = useTheme();
  const t = TYPOGRAPHY[variant];

  const style: StyleProp<TextStyle> = {
    fontSize: t.size,
    lineHeight: t.line,
    fontWeight: t.weight,
    textTransform: t.transform,
    letterSpacing: t.spacing,
    textAlign: align,
    color: color ?? (intent ? themeColor(theme, intent) : theme.color),
  };

  return <Text style={style}>{children}</Text>;
}

export function Card({ children, raised = 0, gap, padding, width, maxWidth, fill }: CardProps) {
  const theme = useTheme();
  const shadowScale = useShadowScale();
  const base = raised > 0 ? (shadows[raised] as ShadowStyle) : null;
  const shadow = base
    ? {
        ...base,
        shadowColor: themeColor(theme, 'shadowColor'),
        shadowOpacity: base.shadowOpacity * shadowScale,
      }
    : null;

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          borderColor: theme.borderColor,
          borderWidth: defaultShape.borderWidth,
          borderRadius: radii.radiusLg,
          padding: padding !== undefined ? space(padding) : 16,
          gap: space(gap),
          width,
          maxWidth,
          flexGrow: fill ? 1 : undefined,
        },
        shadow,
      ]}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children }: { children?: React.ReactNode }) {
  return <View style={styles.cardHead}>{children}</View>;
}

export function CardContent({ children }: { children?: React.ReactNode }) {
  return <View style={styles.cardContent}>{children}</View>;
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
  const theme = useTheme();
  const map = { start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between' } as const;
  return (
    <View
      style={[
        styles.cardFoot,
        { justifyContent: map[justify] },
        divided ? { borderTopWidth: defaultShape.borderWidth, borderTopColor: theme.borderColor } : null,
      ]}
    >
      {children}
    </View>
  );
}

export function CardTitle({ children, subtitle }: { children?: React.ReactNode; subtitle?: React.ReactNode }) {
  return (
    <View style={{ flex: 1, gap: 2 }}>
      <Typography variant="h6">{children}</Typography>
      {subtitle ? (
        <Typography variant="body2" intent="neutral">
          {subtitle}
        </Typography>
      ) : null}
    </View>
  );
}

export function CardMedia({ src, alt, height = 160 }: { src: string; alt?: string; height?: number }) {
  const theme = useTheme();
  return (
    <View style={{ height, overflow: 'hidden', backgroundColor: theme.borderColor, width: '100%' }}>
      <Image source={{ uri: src }} accessibilityLabel={alt} resizeMode="cover" style={styles.preenche} />
    </View>
  );
}

export function Badge({ children, intent = 'primary' }: BadgeProps) {
  const theme = useTheme();
  return (
    <View style={[styles.badge, { backgroundColor: themeColor(theme, intent), borderRadius: radii.radiusFull }]}>
      <Text style={[styles.badgeText, { color: themeColor(theme, `${intent}ContrastText`) }]}>{children}</Text>
    </View>
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
  const theme = useTheme();
  const slots = VARIANT_SLOTS[variant];
  const s = CHIP_SIZES[size];

  const background = slots.bg === null ? 'transparent' : themeColor(theme, slot(intent, slots.bg));
  const text = themeColor(theme, slot(intent, slots.fg));

  return (
    <Pressable
      disabled={disabled || !onPress}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 8,
        paddingVertical: s.padY,
        paddingHorizontal: s.padX,
        borderRadius: radii.radiusFull,
        borderWidth: defaultShape.borderWidth,
        borderColor: themeColor(theme, slot(intent, slots.border)) ?? 'transparent',
        backgroundColor: background,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {leading}
      <Text style={{ fontSize: s.font, lineHeight: s.line, fontWeight: '500', color: text }}>
        {children}
      </Text>
      {onRemove ? (
        <Pressable onPress={onRemove} accessibilityRole="button" accessibilityLabel="Remover" hitSlop={8}>
          <Text style={{ fontSize: s.font, fontWeight: '700', color: text }}>✕</Text>
        </Pressable>
      ) : null}
    </Pressable>
  );
}

export function Avatar({ src, initials, label, intent = 'primary', size = 'md' }: AvatarProps) {
  const theme = useTheme();
  const s = AVATAR_SIZES[size];

  return (
    <View
      style={{
        width: s.box,
        height: s.box,
        borderRadius: radii.radiusFull,
        backgroundColor: themeColor(theme, intent),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {src ? (
        <Image source={{ uri: src }} accessibilityLabel={label} resizeMode="cover" style={styles.preenche} />
      ) : (
        <Text style={{ fontSize: s.font, fontWeight: '700', color: themeColor(theme, `${intent}ContrastText`) }}>
          {initials}
        </Text>
      )}
    </View>
  );
}

export function Skeleton({ variant = 'text', width, height }: SkeletonProps) {
  const theme = useTheme();
  const base =
    variant === 'text'
      ? { height: 14, borderRadius: radii.radiusXs, width: '100%' as const }
      : variant === 'circular'
        ? { width: 40, height: 40, borderRadius: radii.radiusFull }
        : { width: '100%' as const, height: 80, borderRadius: radii.radiusMd };

  return <View style={[base, { backgroundColor: theme.borderColor }, { width, height }]} />;
}

export function Divider({ orientation = 'horizontal' }: DividerProps) {
  const theme = useTheme();
  return (
    <View
      style={
        orientation === 'horizontal'
          ? { height: 1, width: '100%', backgroundColor: theme.borderColor }
          : { width: 1, height: '100%', backgroundColor: theme.borderColor }
      }
    />
  );
}

export function Spacer({ size = 'md', fill }: SpacerProps) {
  const v = SPACER_SIZES[size];
  return <View style={{ width: v, height: v, flexGrow: fill ? 1 : undefined }} />;
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
  const theme = useTheme();
  const slots = VARIANT_SLOTS[variant];
  const s = ICON_BUTTON_SIZES[size];
  const text = themeColor(theme, slot(intent, slots.fg));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={{
        width: s.box,
        height: s.box,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: rounded ? radii.radiusMd : radii.radiusFull,
        borderWidth: defaultShape.borderWidth,
        borderColor: themeColor(theme, slot(intent, slots.border)) ?? 'transparent',
        backgroundColor: slots.bg === null ? 'transparent' : themeColor(theme, slot(intent, slots.bg)),
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {typeof children === 'string' ? (
        <Text style={{ fontSize: s.font, fontWeight: '600', color: text }}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export function Link({ children, intent = 'primary', underline = 'hover', size = 'md', disabled, onPress }: LinkProps) {
  const theme = useTheme();
  const f = LINK_FONT[size];

  return (
    <Pressable accessibilityRole="link" disabled={disabled} onPress={onPress}>
      <Text
        style={{
          fontSize: f.size,
          lineHeight: f.line,
          fontWeight: '500',
          color: themeColor(theme, intent),
          textDecorationLine: underline === 'always' ? 'underline' : 'none',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export function Label({ children, required, size = 'md' }: LabelProps) {
  const theme = useTheme();
  const f = { sm: 12, md: 13, lg: 15 }[size];
  return (
    <Text style={{ fontSize: f, fontWeight: '600', color: theme.color }}>
      {children}
      {required ? <Text style={{ color: themeColor(theme, 'error') }}> *</Text> : null}
    </Text>
  );
}

export function HelperText({ children, error }: HelperTextProps) {
  const theme = useTheme();
  return (
    <Text style={{ fontSize: 12, lineHeight: 16, color: themeColor(theme, error ? 'error' : 'neutral') }}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  preenche: { width: '100%', height: '100%' },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingBottom: 12 },
  cardContent: { flexDirection: 'column', gap: 8 },
  cardFoot: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 12 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontSize: 12, lineHeight: 16, fontWeight: '600' },
});
