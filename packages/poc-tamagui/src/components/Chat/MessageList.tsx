import type { ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View, styled } from '@tamagui/core';
import { Chip } from '../Chip';

const MessageListFrame = styled(View, {
  name: 'MessageList',
  flexDirection: 'column',
  gap: '$4',
  paddingVertical: '$3',
});

export type MessageListProps = GetProps<typeof MessageListFrame> & {
  children?: ReactNode;
  /** Mostrado quando não há mensagens — normalmente um <EmptyState />. */
  empty?: ReactNode;
  isEmpty?: boolean;
};

// Só o empilhamento das mensagens. A rolagem fica com o <Screen> ou com o
// container do app: um contêiner de rolagem próprio aqui competiria com o do
// native (ScrollView) e quebraria a rolagem natural da página na web.
export function MessageList({ children, empty, isEmpty, ...rest }: MessageListProps) {
  return <MessageListFrame {...rest}>{isEmpty ? empty : children}</MessageListFrame>;
}

export type SuggestionsProps = {
  items: string[];
  onSelect?: (item: string) => void;
  disabled?: boolean;
};

// Respostas rápidas. No AG-UI equivalem ao que o agente sugere via estado
// compartilhado; aqui são só rótulos com um callback.
export function Suggestions({ items, onSelect, disabled }: SuggestionsProps) {
  if (items.length === 0) return null;

  return (
    <View flexDirection="row" gap="$2" flexWrap="wrap">
      {items.map((item) => (
        <Chip
          key={item}
          size="sm"
          intent="primary"
          disabled={disabled}
          onPress={() => onSelect?.(item)}
        >
          {item}
        </Chip>
      ))}
    </View>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
MessageListFrame.displayName = 'MessageListFrame';
