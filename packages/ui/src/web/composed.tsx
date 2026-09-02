import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { applyTheme } from './theme';
import { Typography, IconButton } from './primitives';
import { DURATIONS, TIMELINE_DOT } from '../core/scales';
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
  TooltipProps,
} from '../core/components';
import { useControllableState } from '../core/useControllableState';
import './components.css';

export function Alert({ title, children, intent = 'info', variant = 'outline', icon, action }: AlertProps) {
  applyTheme();
  return (
    <div className="haquick-alert" role="alert" data-intent={intent} data-variant={variant}>
      {icon}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {title ? <p className="haquick-alert-title">{title}</p> : null}
        {typeof children === 'string' ? <p className="haquick-alert-body">{children}</p> : children}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ title, description, icon, intent = 'neutral', action }: EmptyStateProps) {
  applyTheme();
  return (
    <div className="haquick-empty">
      {icon ? (
        <div className="haquick-glyph" data-intent={intent}>
          {icon}
        </div>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', maxWidth: 380 }}>
        <Typography variant="h6" align="center">
          {title}
        </Typography>
        {description ? (
          <Typography variant="body2" intent="neutral" align="center">
            {description}
          </Typography>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function List({ children, width }: { children?: ReactNode; width?: number }) {
  applyTheme();
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div className="haquick-list" style={{ width }}>
      {items.map((item, i) =>
        cloneElement(item as ReactElement<ListItemProps>, { first: i === 0 })
      )}
    </div>
  );
}

export function ListItem({ title, subtitle, leading, trailing, onPress, first }: ListItemProps) {
  const content = (
    <>
      {leading}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {typeof title === 'string' ? <Typography variant="subtitle2">{title}</Typography> : title}
        {typeof subtitle === 'string' ? (
          <Typography variant="body2" intent="neutral">
            {subtitle}
          </Typography>
        ) : (
          subtitle
        )}
      </div>
      {trailing}
    </>
  );

  return onPress ? (
    <button type="button" className="haquick-li" data-first={first || undefined} data-pressable="true" onClick={onPress}>
      {content}
    </button>
  ) : (
    <div className="haquick-li" data-first={first || undefined}>
      {content}
    </div>
  );
}

export function Timeline({ children }: { children?: ReactNode }) {
  applyTheme();
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div className="haquick-tl">
      {items.map((item, i) =>
        cloneElement(item as ReactElement<TimelineItemProps>, { last: i === items.length - 1 })
      )}
    </div>
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
  const d = TIMELINE_DOT[size];
  return (
    <div className="haquick-tl-item">
      <div className="haquick-tl-col">
        <span className="haquick-dot" data-intent={intent} data-variant={variant} style={{ width: d, height: d }} />
        {!last ? <span className="haquick-tl-line" /> : null}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, paddingBottom: last ? 0 : 16 }}>
        {typeof title === 'string' ? <Typography variant="subtitle2">{title}</Typography> : title}
        {typeof subtitle === 'string' ? (
          <Typography variant="caption" intent="neutral">
            {subtitle}
          </Typography>
        ) : (
          subtitle
        )}
        {children}
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, onBack, leading, actions, divided }: PageHeaderProps) {
  applyTheme();
  return (
    <div className="haquick-ph" data-divided={divided || undefined}>
      {onBack ? (
        <IconButton label="Voltar" onPress={onBack}>
          ←
        </IconButton>
      ) : null}
      {leading}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {typeof title === 'string' ? <Typography variant="h4">{title}</Typography> : title}
        {typeof subtitle === 'string' ? (
          <Typography variant="body2" intent="neutral">
            {subtitle}
          </Typography>
        ) : (
          subtitle
        )}
      </div>
      {actions ? <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>{actions}</div> : null}
    </div>
  );
}

export function StatCard({ label, value, hint, intent, trailing }: StatCardProps) {
  applyTheme();
  return (
    <div className="haquick-card" data-raised="1" style={{ flexGrow: 1, flexBasis: 180, gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography variant="caption" intent="neutral">
            {label}
          </Typography>
          {typeof value === 'string' || typeof value === 'number' ? (
            <span className="haquick-txt" data-intent={intent} style={{ fontSize: 28, lineHeight: '32px', fontWeight: 700 }}>
              {value}
            </span>
          ) : (
            value
          )}
        </div>
        {trailing}
      </div>
      {hint ? (
        <Typography variant="caption" intent="neutral">
          {hint}
        </Typography>
      ) : null}
    </div>
  );
}

export function Fade({ children, visible = true, speed = 'medium', unmountOnExit }: FadeProps) {
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      return;
    }
    if (!unmountOnExit) return;
    const t = setTimeout(() => setMounted(false), DURATIONS[speed]);
    return () => clearTimeout(t);
  }, [visible, unmountOnExit, speed]);

  if (!mounted) return null;

  return (
    <div
      className="haquick-fade"
      style={{ opacity: visible ? 1 : 0, ['--dur' as string]: `${DURATIONS[speed]}ms` }}
    >
      {children}
    </div>
  );
}

export function Collapse({ children, open = false, speed = 'medium' }: CollapseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setMeasuredHeight(el.scrollHeight));
    ro.observe(el);
    setMeasuredHeight(el.scrollHeight);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      className="haquick-collapse"
      style={{ height: open ? measuredHeight : 0, ['--dur' as string]: `${DURATIONS[speed]}ms` }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

export function Accordion({ children }: { children?: ReactNode }) {
  applyTheme();
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <div className="haquick-acc">
      {items.map((item, i) =>
        cloneElement(item as ReactElement<AccordionItemProps>, { first: i === 0 })
      )}
    </div>
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
  const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, onOpenChange);

  return (
    <div className="haquick-acc-item" data-first={first || undefined} data-disabled={disabled ? 'true' : undefined}>
      <button
        type="button"
        className="haquick-acc-head"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
      >
        {typeof title === 'string' ? <Typography variant="subtitle2">{title}</Typography> : title}
        <span className="haquick-acc-chev">⌄</span>
      </button>

      <Collapse open={isOpen} speed="quick">
        <div className="haquick-acc-body">
          {typeof children === 'string' ? (
            <Typography variant="body2" intent="neutral">
              {children}
            </Typography>
          ) : (
            children
          )}
        </div>
      </Collapse>
    </div>
  );
}

export function Tooltip({ children, label, placement = 'top' }: TooltipProps) {
  applyTheme();
  return (
    <RadixTooltip.Provider delayDuration={200}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content className="haquick-tip" side={placement} sideOffset={6}>
            {label}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
