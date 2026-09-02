import { useEffect, useState, type ReactNode } from 'react';
import { applyTheme } from './theme';
import { Typography, IconButton, Badge } from './primitives';
import { Input, Spinner } from './controls';
import { Collapse } from './composed';
import { Chip } from './primitives';
import { useControllableState } from '../core/useControllableState';
import type {
  ComposerProps,
  MessageListProps,
  MessageProps,
  SuggestionsProps,
  ToolCallProps,
  ToolCallStatus,
  TypingIndicatorProps,
} from '../core/chat';
import './components.css';

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
  applyTheme();

  if (role === 'system') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
        <Typography variant="caption" intent="neutral" align="center">
          {children}
        </Typography>
      </div>
    );
  }

  const doAssistente = role === 'assistant';

  return (
    <div className="haquick-msg-row" style={{ justifyContent: ALIGNMENT[role] }}>
      {doAssistente && avatar ? <div style={{ paddingTop: 4 }}>{avatar}</div> : null}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          maxWidth: '78%',
          alignItems: doAssistente ? 'flex-start' : 'flex-end',
        }}
      >
        {author || timestamp ? (
          <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
            {author ? <Typography variant="caption">{author}</Typography> : null}
            {timestamp ? (
              <Typography variant="caption" intent="neutral">
                {timestamp}
              </Typography>
            ) : null}
          </div>
        ) : null}

        <div className="haquick-bubble" data-role={role}>
          {typeof children === 'string' ? (
            <Typography variant="body1">
              {children}
              {streaming ? <span className="haquick-cursor" /> : null}
            </Typography>
          ) : (
            <>
              {children}
              {streaming ? <span className="haquick-cursor" /> : null}
            </>
          )}
        </div>

        {status === 'error' ? (
          <Typography variant="caption" intent="error">
            Falha ao enviar
          </Typography>
        ) : null}

        {actions ? <div style={{ display: 'flex', gap: 4, paddingTop: 2 }}>{actions}</div> : null}
      </div>
    </div>
  );
}

export function MessageList({ children, empty, isEmpty }: MessageListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '12px 0' }}>
      {isEmpty ? empty : children}
    </div>
  );
}

export function Suggestions({ items, onSelect, disabled }: SuggestionsProps) {
  if (items.length === 0) return null;
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {items.map((item) => (
        <Chip key={item} size="sm" intent="primary" disabled={disabled} onPress={() => onSelect?.(item)}>
          {item}
        </Chip>
      ))}
    </div>
  );
}

export function TypingIndicator({ intent = 'neutral', speed = 320 }: TypingIndicatorProps) {
  applyTheme();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((p) => (p + 1) % 3), speed);
    return () => clearInterval(t);
  }, [speed]);

  return (
    <div className="haquick-typing" role="status" aria-label="O assistente está digitando">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="haquick-typing-dot"
          style={{ opacity: step === i ? 1 : 0.3, background: `var(--haquick-${intent})` }}
        />
      ))}
    </div>
  );
}

const STATUS_LABEL: Record<ToolCallStatus, { text: string; intent: 'primary' | 'success' | 'error' }> = {
  running: { text: 'executando', intent: 'primary' },
  success: { text: 'concluída', intent: 'success' },
  error: { text: 'falhou', intent: 'error' },
};

function Block({ title, content }: { title: string; content: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="overline" intent="neutral">
        {title}
      </Typography>
      <div className="haquick-tool-block">
        <span className="haquick-mono" style={{ fontSize: 13, lineHeight: '20px' }}>
          {content}
        </span>
      </div>
    </div>
  );
}

export function ToolCall({ name, status = 'running', args, result, defaultOpen = false }: ToolCallProps) {
  applyTheme();
  const [open, setOpen] = useControllableState<boolean>(undefined, defaultOpen);
  const label = STATUS_LABEL[status];
  const hasDetails = Boolean(args || result);

  return (
    <div className="haquick-tool">
      <button
        type="button"
        className="haquick-tool-head"
        data-pressable={hasDetails ? 'true' : undefined}
        aria-expanded={hasDetails ? open : undefined}
        disabled={!hasDetails}
        onClick={() => hasDetails && setOpen(!open)}
      >
        {status === 'running' ? <Spinner size="sm" /> : null}
        <span className="haquick-mono" style={{ fontWeight: 500, fontSize: 14 }}>
          {name}
        </span>
        <Badge intent={label.intent}>{label.text}</Badge>
        {hasDetails ? <span className="haquick-acc-chev">⌄</span> : null}
      </button>

      {hasDetails ? (
        <Collapse open={open} speed="quick">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 12px 12px' }}>
            {args ? <Block title="Argumentos" content={args} /> : null}
            {result ? <Block title="Resultado" content={result} /> : null}
          </div>
        </Collapse>
      ) : null}
    </div>
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
  applyTheme();
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
    <div className="haquick-composer">
      {header}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        {leading}
        <div style={{ flex: 1 }}>
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
        </div>
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
      </div>
    </div>
  );
}

export type { ReactNode };
