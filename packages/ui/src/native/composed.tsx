import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { DURATIONS, TIMELINE_DOT, VARIANT_SLOTS, slot } from '../core/scales';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { themeColor, radii, useTheme } from './theme';
import { IconButton, Typography } from './primitives';


import { defaultShape } from '../tokens/shape';
import { useControllableState } from '../core/useControllableState';
import type {
  AccordionItemProps,
  AlertProps,
  CollapseProps,
  EmptyStateProps,
  FadeProps,
  ListItemProps,
  PageHeaderProps,
  StatCardProps,
  TimelineItemProps,
} from '../core/components';

export function Alert({ title, children, intent = 'info', variant = 'outline', icon, action }: AlertProps) {
  const theme = useTheme();

  const outlined = variant === 'outline';
  const slots = VARIANT_SLOTS[variant === 'outline' ? 'ghost' : variant];
  const background = outlined ? theme.background : themeColor(theme, slot(intent, slots.bg));
  const text = outlined ? theme.color : themeColor(theme, slot(intent, slots.fg));
  const titleColor = outlined ? themeColor(theme, intent) : text;

  return (
    <View
      accessibilityRole="alert"
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        padding: 12,
        borderRadius: radii.radiusMd,
        borderWidth: defaultShape.borderWidth,
        borderLeftWidth: defaultShape.borderWidth * 4,
        borderColor: outlined ? themeColor(theme, intent) : background,
        backgroundColor: background,
      }}
    >
      {icon}
      <View style={{ flex: 1, gap: 4 }}>
        {title ? (
          <Typography variant="subtitle2" color={titleColor}>
            {title}
          </Typography>
        ) : null}
        {typeof children === 'string' ? (
          <Typography variant="body2" color={text}>
            {children}
          </Typography>
        ) : (
          children
        )}
      </View>
      {action}
    </View>
  );
}

export function EmptyState({ title, description, icon, intent = 'neutral', action }: EmptyStateProps) {
  const theme = useTheme();
  return (
    <View style={styles.empty}>
      {icon ? (
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: radii.radiusFull,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: themeColor(theme, `${intent}Soft`),
          }}
        >
          {typeof icon === 'string' ? (
            <Typography variant="h5" intent={intent}>
              {icon}
            </Typography>
          ) : (
            icon
          )}
        </View>
      ) : null}
      <View style={{ alignItems: 'center', gap: 4, maxWidth: 380 }}>
        <Typography variant="h6" align="center">
          {title}
        </Typography>
        {description ? (
          <Typography variant="body2" intent="neutral" align="center">
            {description}
          </Typography>
        ) : null}
      </View>
      {action}
    </View>
  );
}

export function List({ children, width }: { children?: ReactNode; width?: number }) {
  const theme = useTheme();
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <View
      style={{
        width,
        overflow: 'hidden',
        backgroundColor: theme.background,
        borderWidth: defaultShape.borderWidth,
        borderColor: theme.borderColor,
        borderRadius: radii.radiusMd,
      }}
    >
      {items.map((item, i) => cloneElement(item as ReactElement<ListItemProps>, { first: i === 0 }))}
    </View>
  );
}

export function ListItem({ title, subtitle, leading, trailing, onPress, first }: ListItemProps) {
  const theme = useTheme();
  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderTopWidth: first ? 0 : defaultShape.borderWidth,
        borderTopColor: theme.borderColor,
      }}
    >
      {leading}
      <View style={{ flex: 1, gap: 2 }}>
        {typeof title === 'string' ? <Typography variant="subtitle2">{title}</Typography> : title}
        {typeof subtitle === 'string' ? (
          <Typography variant="body2" intent="neutral">
            {subtitle}
          </Typography>
        ) : (
          subtitle
        )}
      </View>
      {trailing}
    </Pressable>
  );
}

export function Timeline({ children }: { children?: ReactNode }) {
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <View>
      {items.map((item, i) =>
        cloneElement(item as ReactElement<TimelineItemProps>, { last: i === items.length - 1 })
      )}
    </View>
  );
}

export function TimelineItem({
  title,
  subtitle,
  children,
  intent = 'primary',
  variant = 'filled',
  size = 'md',
  last,
}: TimelineItemProps) {
  const theme = useTheme();
  const d = TIMELINE_DOT[size];
  const intentColor = themeColor(theme, intent);

  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <View style={{ alignItems: 'center', width: TIMELINE_DOT.lg }}>
        <View
          style={{
            width: d,
            height: d,
            marginTop: 3,
            borderRadius: radii.radiusFull,
            borderWidth: defaultShape.controlBorderWidth,
            borderColor: intentColor,
            backgroundColor: variant === 'filled' ? intentColor : theme.background,
          }}
        />
        {!last ? (
          <View
            style={{
              flexGrow: 1,
              width: defaultShape.borderWidth,
              minHeight: 16,
              marginTop: 4,
              backgroundColor: theme.borderColor,
            }}
          />
        ) : null}
      </View>

      <View style={{ flex: 1, gap: 2, paddingBottom: last ? 0 : 16 }}>
        {typeof title === 'string' ? <Typography variant="subtitle2">{title}</Typography> : title}
        {typeof subtitle === 'string' ? (
          <Typography variant="caption" intent="neutral">
            {subtitle}
          </Typography>
        ) : (
          subtitle
        )}
        {children}
      </View>
    </View>
  );
}

export function PageHeader({ title, subtitle, onBack, leading, actions, divided }: PageHeaderProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        paddingBottom: 16,
        borderBottomWidth: divided ? defaultShape.borderWidth : 0,
        borderBottomColor: theme.borderColor,
      }}
    >
      {onBack ? (
        <IconButton label="Voltar" onPress={onBack}>
          ←
        </IconButton>
      ) : null}
      {leading}
      <View style={{ flex: 1, gap: 2 }}>
        {typeof title === 'string' ? <Typography variant="h4">{title}</Typography> : title}
        {typeof subtitle === 'string' ? (
          <Typography variant="body2" intent="neutral">
            {subtitle}
          </Typography>
        ) : (
          subtitle
        )}
      </View>
      {actions ? <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>{actions}</View> : null}
    </View>
  );
}

export function StatCard({ label, value, hint, intent, trailing }: StatCardProps) {
  return (
    <View style={{ flexGrow: 1, flexBasis: 180, gap: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <Typography variant="caption" intent="neutral">
            {label}
          </Typography>
          {typeof value === 'string' || typeof value === 'number' ? (
            <Typography variant="h3" intent={intent}>
              {value}
            </Typography>
          ) : (
            value
          )}
        </View>
        {trailing}
      </View>
      {hint ? (
        <Typography variant="caption" intent="neutral">
          {hint}
        </Typography>
      ) : null}
    </View>
  );
}

export function Fade({ children, visible = true, speed = 'medium', unmountOnExit }: FadeProps) {
  const [mounted, setMounted] = useState(visible);
  const [opacidade] = useState(() => new Animated.Value(visible ? 1 : 0));

  useEffect(() => {
    if (visible) setMounted(true);

    Animated.timing(opacidade, {
      toValue: visible ? 1 : 0,
      duration: DURATIONS[speed],
      useNativeDriver: true,
    }).start(() => {
      if (!visible && unmountOnExit) setMounted(false);
    });
  }, [visible, unmountOnExit, speed, opacidade]);

  if (!mounted) return null;

  return <Animated.View style={{ opacity: opacidade }}>{children}</Animated.View>;
}

export function Collapse({ children, open = false, speed = 'medium' }: CollapseProps) {
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const [animated] = useState(() => new Animated.Value(open ? 1 : 0));

  useEffect(() => {
    Animated.timing(animated, {
      toValue: open ? 1 : 0,
      duration: DURATIONS[speed],
      useNativeDriver: false,
    }).start();
  }, [open, speed, animated]);

  return (
    <Animated.View
      style={{
        overflow: 'hidden',
        height: animated.interpolate({ inputRange: [0, 1], outputRange: [0, measuredHeight] }),
      }}
    >
      <View onLayout={(e) => setMeasuredHeight(e.nativeEvent.layout.height)}>{children}</View>
    </Animated.View>
  );
}

export function Accordion({ children }: { children?: ReactNode }) {
  const theme = useTheme();
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <View
      style={{
        overflow: 'hidden',
        backgroundColor: theme.background,
        borderWidth: defaultShape.borderWidth,
        borderColor: theme.borderColor,
        borderRadius: radii.radiusMd,
      }}
    >
      {items.map((item, i) =>
        cloneElement(item as ReactElement<AccordionItemProps>, { first: i === 0 })
      )}
    </View>
  );
}

export function AccordionItem({
  title,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled,
  first,
}: AccordionItemProps) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, onOpenChange);

  return (
    <View
      style={{
        borderTopWidth: first ? 0 : defaultShape.borderWidth,
        borderTopColor: theme.borderColor,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen, disabled: !!disabled }}
        disabled={disabled}
        onPress={() => setIsOpen(!isOpen)}
        style={styles.accHead}
      >
        {typeof title === 'string' ? <Typography variant="subtitle2">{title}</Typography> : title}
        <View style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}>
          <Typography variant="body2" intent="neutral">
            ⌄
          </Typography>
        </View>
      </Pressable>

      <Collapse open={isOpen} speed="quick">
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {typeof children === 'string' ? (
            <Typography variant="body2" intent="neutral">
              {children}
            </Typography>
          ) : (
            children
          )}
        </View>
      </Collapse>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', justifyContent: 'center', gap: 12, paddingVertical: 48, paddingHorizontal: 24 },
  accHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
