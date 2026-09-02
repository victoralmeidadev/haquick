import { View } from '@tamagui/core';
import { Badge } from '../Badge';
import { Collapse } from '../Transition';
import { Spinner } from '../Spinner';
import { Typography } from '../Typography';
import { useControllableState } from '../../hooks/useControllableState';
import { shape } from '../../config/shape';
import type { ToolCallProps, ToolCallStatus } from './types';

const STATUS_LABEL: Record<ToolCallStatus, { text: string; intent: 'primary' | 'success' | 'error' }> = {
  running: { text: 'executando', intent: 'primary' },
  success: { text: 'concluída', intent: 'success' },
  error: { text: 'falhou', intent: 'error' },
};

function Block({ title, content }: { title: string; content: string }) {
  return (
    <View gap="$1">
      <Typography variant="overline" intent="neutral">
        {title}
      </Typography>
      <View backgroundColor="$backgroundPress" padding="$2" borderRadius="$radiusSm">
        <Typography variant="body2" fontFamily="monospace">
          {content}
        </Typography>
      </View>
    </View>
  );
}

// Chamada de ferramenta feita pelo agente, recolhível.
//
// Mapeia direto para o par TOOL_CALL_START / TOOL_CALL_END do AG-UI: `running`
// enquanto só houve o start, `success`/`error` quando o end chega.
export function ToolCall({
  name,
  status = 'running',
  args,
  result,
  defaultOpen = false,
}: ToolCallProps & { open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useControllableState<boolean>(undefined, defaultOpen);
  const label = STATUS_LABEL[status];
  const hasDetails = Boolean(args || result);

  return (
    <View
      borderWidth={shape.borderWidth}
      borderColor="$borderColor"
      borderRadius="$radiusMd"
      backgroundColor="$background"
      overflow="hidden"
      alignSelf="flex-start"
      maxWidth="100%"
    >
      <View
        flexDirection="row"
        alignItems="center"
        gap="$2"
        paddingVertical="$2"
        paddingHorizontal="$3"
        cursor={hasDetails ? 'pointer' : 'default'}
        hoverStyle={hasDetails ? { backgroundColor: '$backgroundHover' } : undefined}
        onPress={hasDetails ? () => setOpen(!open) : undefined}
        role={hasDetails ? 'button' : undefined}
        aria-expanded={hasDetails ? open : undefined}
      >
        {status === 'running' ? <Spinner size="sm" /> : null}

        <Typography variant="subtitle2" fontFamily="monospace">
          {name}
        </Typography>

        <Badge intent={label.intent}>{label.text}</Badge>

        {hasDetails ? (
          <View transition="quick" rotate={open ? '180deg' : '0deg'}>
            <Typography variant="body2" intent="neutral">
              ⌄
            </Typography>
          </View>
        ) : null}
      </View>

      {hasDetails ? (
        <Collapse open={open} speed="quick">
          <View gap="$3" paddingHorizontal="$3" paddingBottom="$3">
            {args ? <Block title="Argumentos" content={args} /> : null}
            {result ? <Block title="Resultado" content={result} /> : null}
          </View>
        </Collapse>
      ) : null}
    </View>
  );
}
