import { useState, type ReactNode } from 'react';
import { View } from '@tamagui/core';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { shape } from '../../config/shape';
import { useControllableState } from '../../hooks/useControllableState';

export type ComposerProps = {
  /** Modo controlado. Omita para o composer guardar o próprio texto. */
  value?: string;
  onChangeText?: (text: string) => void;
  /** Chamado no envio. O composer limpa o campo depois, se não-controlado. */
  onSend?: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /**
   * Agente respondendo: o botão de enviar vira botão de parar. É o estado
   * entre RUN_STARTED e RUN_FINISHED do AG-UI.
   */
  busy?: boolean;
  onStop?: () => void;
  /** Slot à esquerda — anexos, seletor de modelo. */
  leading?: ReactNode;
  /** Linha acima do campo — sugestões, arquivos anexados. */
  header?: ReactNode;
  rows?: number;
};

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
  const [text, setText] = useControllableState(value, '', onChangeText);
  const [fieldKey, setFieldKey] = useState(0);

  const canSend = text.trim().length > 0 && !busy && !disabled;

  const send = () => {
    if (!canSend) return;
    onSend?.(text.trim());
    if (value === undefined) {
      setText('');
      // O Input é não-controlado quando não recebe `value`, então trocar a
      // chave é o que efetivamente limpa o campo depois do envio.
      setFieldKey((k) => k + 1);
    }
  };

  return (
    <View
      gap="$2"
      paddingTop="$3"
      borderTopWidth={shape.borderWidth}
      borderTopColor="$borderColor"
      backgroundColor="$background"
    >
      {header}

      <View flexDirection="row" gap="$2" alignItems="flex-end">
        {leading}

        <View flex={1}>
          <Input
            key={fieldKey}
            multiline
            rows={rows}
            value={value}
            defaultValue={value === undefined ? '' : undefined}
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
