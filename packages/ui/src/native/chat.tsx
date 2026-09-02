import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { themeColor, radii, useTheme } from './theme';
import { Badge, Chip, IconButton, Typography } from './primitives';
import { Input, Spinner } from './controls';
import { Collapse } from './composed';
import { useControllableState } from '../core/useControllableState';
import { defaultShape } from '../tokens/shape';
import type {
  ComposerProps,
  MessageListProps,
  MessageProps,
  SuggestionsProps,
  ToolCallProps,
  ToolCallStatus,
  TypingIndicatorProps,
} from '../core/chat';

const ALIGNMENT = { user: 'flex-end', assistant: 'flex-start', system: 'center' } as const;

export function Message({
  role,
  children,
  avatar,
  author,
  timestamp,
  streaming,
  status,
  actions,
}: MessageProps) {
  const theme = useTheme();

  if (role === 'system') {
    return (
      <View style={{ alignItems: 'center', paddingVertical: 8 }}>
        <Typography variant="caption" intent="neutral" align="center">
          {children}
        </Typography>
      </View>
    );
  }

  const doAssistente = role === 'assistant';

  return (
    <View style={{ flexDirection: 'row', gap: 8, width: '100%', justifyContent: ALIGNMENT[role] }}>
      {doAssistente && avatar ? <View style={{ paddingTop: 4 }}>{avatar}</View> : null}

      <View style={{ gap: 4, maxWidth: '78%', alignItems: doAssistente ? 'flex-start' : 'flex-end' }}>
        {author || timestamp ? (
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'baseline' }}>
            {author ? <Typography variant="caption">{author}</Typography> : null}
            {timestamp ? (
              <Typography variant="caption" intent="neutral">
                {timestamp}
              </Typography>
            ) : null}
          </View>
        ) : null}

        <View
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            maxWidth: '100%',
            borderWidth: defaultShape.borderWidth,
            borderColor: doAssistente ? theme.borderColor : 'transparent',
            backgroundColor: doAssistente ? theme.background : themeColor(theme, 'primarySoft'),
            borderTopLeftRadius: radii.radiusLg,
            borderTopRightRadius: radii.radiusLg,
            borderBottomLeftRadius: doAssistente ? radii.radiusXs : radii.radiusLg,
            borderBottomRightRadius: doAssistente ? radii.radiusLg : radii.radiusXs,
          }}
        >
          {typeof children === 'string' ? (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Typography variant="body1">{children}</Typography>
              {streaming ? <View style={[styles.cursor, { backgroundColor: themeColor(theme, 'primary') }]} /> : null}
            </View>
          ) : (
            <View style={{ gap: 8 }}>
              {children}
              {streaming ? <View style={[styles.cursor, { backgroundColor: themeColor(theme, 'primary') }]} /> : null}
            </View>
          )}
        </View>

        {status === 'error' ? (
          <Typography variant="caption" intent="error">
            Falha ao enviar
          </Typography>
        ) : null}

        {actions ? <View style={{ flexDirection: 'row', gap: 4, paddingTop: 2 }}>{actions}</View> : null}
      </View>
    </View>
  );
}

export function MessageList({ children, empty, isEmpty }: MessageListProps) {
  return <View style={{ gap: 16, paddingVertical: 12 }}>{isEmpty ? empty : children}</View>;
}

export function Suggestions({ items, onSelect, disabled }: SuggestionsProps) {
  if (items.length === 0) return null;
  return (
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      {items.map((item) => (
        <Chip key={item} size="sm" intent="primary" disabled={disabled} onPress={() => onSelect?.(item)}>
          {item}
        </Chip>
      ))}
    </View>
  );
}

export function TypingIndicator({ intent = 'neutral', speed = 320 }: TypingIndicatorProps) {
  const theme = useTheme();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((p) => (p + 1) % 3), speed);
    return () => clearInterval(t);
  }, [speed]);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="O assistente está digitando"
      style={{ flexDirection: 'row', gap: 8, alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 }}
    >
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: radii.radiusFull,
            backgroundColor: themeColor(theme, intent),
            opacity: step === i ? 1 : 0.3,
          }}
        />
      ))}
    </View>
  );
}

const STATUS_LABEL: Record<ToolCallStatus, { text: string; intent: 'primary' | 'success' | 'error' }> = {
  running: { text: 'executando', intent: 'primary' },
  success: { text: 'concluída', intent: 'success' },
  error: { text: 'falhou', intent: 'error' },
};

function Block({ title, content }: { title: string; content: string }) {
  const theme = useTheme();
  return (
    <View style={{ gap: 4 }}>
      <Typography variant="overline" intent="neutral">
        {title}
      </Typography>
      <View style={{ backgroundColor: theme.backgroundPress, padding: 8, borderRadius: radii.radiusSm }}>
        <Text style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 20, color: theme.color }}>
          {content}
        </Text>
      </View>
    </View>
  );
}

export function ToolCall({ name, status = 'running', args, result, defaultOpen = false }: ToolCallProps) {
  const theme = useTheme();
  const [open, setOpen] = useControllableState<boolean>(undefined, defaultOpen);
  const label = STATUS_LABEL[status];
  const hasDetails = Boolean(args || result);

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        maxWidth: '100%',
        overflow: 'hidden',
        borderWidth: defaultShape.borderWidth,
        borderColor: theme.borderColor,
        borderRadius: radii.radiusMd,
        backgroundColor: theme.background,
      }}
    >
      <Pressable
        accessibilityRole={hasDetails ? 'button' : undefined}
        accessibilityState={hasDetails ? { expanded: open } : undefined}
        disabled={!hasDetails}
        onPress={() => setOpen(!open)}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, paddingHorizontal: 12 }}
      >
        {status === 'running' ? <Spinner size="sm" /> : null}
        <Text style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: '500', color: theme.color }}>
          {name}
        </Text>
        <Badge intent={label.intent}>{label.text}</Badge>
        {hasDetails ? (
          <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
            <Typography variant="body2" intent="neutral">
              ⌄
            </Typography>
          </View>
        ) : null}
      </Pressable>

      {hasDetails ? (
        <Collapse open={open} speed="quick">
          <View style={{ gap: 12, paddingHorizontal: 12, paddingBottom: 12 }}>
            {args ? <Block title="Argumentos" content={args} /> : null}
            {result ? <Block title="Resultado" content={result} /> : null}
          </View>
        </Collapse>
      ) : null}
    </View>
  );
}

export function Composer({
  value,
  onChangeText,
  onSend,
  placeholder = 'Escreva uma mensagem...',
  disabled,
  busy,
  onStop,
  leading,
  header,
  rows = 2,
}: ComposerProps) {
  const theme = useTheme();
  const [text, setText] = useControllableState(value, '', onChangeText);
  const [resetKey, setResetKey] = useState(0);

  const canSend = text.trim().length > 0 && !busy && !disabled;

  const send = () => {
    if (!canSend) return;
    onSend?.(text.trim());
    if (value === undefined) {
      setText('');
      setResetKey((k) => k + 1);
    }
  };

  return (
    <View
      style={{
        gap: 8,
        paddingTop: 12,
        borderTopWidth: defaultShape.borderWidth,
        borderTopColor: theme.borderColor,
        backgroundColor: theme.background,
      }}
    >
      {header}
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-end' }}>
        {leading}
        <View style={{ flex: 1 }}>
          <Input
            key={resetKey}
            multiline
            rows={rows}
            value={value}
            onChangeText={setText}
            placeholder={placeholder}
            disabled={disabled}
            label="Mensagem"
          />
        </View>
        {busy ? (
          <IconButton label="Parar resposta" variant="solid" intent="neutral" onPress={onStop}>
            ■
          </IconButton>
        ) : (
          <IconButton
            label="Enviar mensagem"
            variant="solid"
            intent="primary"
            disabled={!canSend}
            onPress={send}
          >
            ↑
          </IconButton>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cursor: { width: 2, height: 15, marginLeft: 3, marginBottom: 2, borderRadius: 1 },
});
