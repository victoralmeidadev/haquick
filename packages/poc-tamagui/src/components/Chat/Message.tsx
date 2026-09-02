import { View, styled } from '@tamagui/core';
import { Typography } from '../Typography';
import { shape } from '../../config/shape';
import type { MessageProps, MessageRole } from './types';

const Bubble = styled(View, {
  name: 'MessageBubble',
  paddingVertical: '$3',
  paddingHorizontal: '$4',
  maxWidth: '100%',
  borderWidth: shape.borderWidth,
  borderColor: 'transparent',

  variants: {
    role: {
      // O usuário recebe superfície tingida, o assistente fica na cor do tema.
      // Isso mantém a leitura confortável em blocos longos de resposta — que é
      // o que o assistente costuma produzir.
      user: {
        backgroundColor: '$primarySoft',
        borderTopLeftRadius: '$radiusLg',
        borderTopRightRadius: '$radiusLg',
        borderBottomLeftRadius: '$radiusLg',
        borderBottomRightRadius: '$radiusXs',
      },
      assistant: {
        backgroundColor: '$background',
        borderColor: '$borderColor',
        borderTopLeftRadius: '$radiusLg',
        borderTopRightRadius: '$radiusLg',
        borderBottomLeftRadius: '$radiusXs',
        borderBottomRightRadius: '$radiusLg',
      },
      system: {
        backgroundColor: 'transparent',
        paddingVertical: '$2',
        paddingHorizontal: 0,
      },
    },
  } as const,
});

// Cursor de digitação: um bloco fino ao fim do texto enquanto o stream corre.
const Cursor = styled(View, {
  name: 'MessageCursor',
  width: 2,
  height: 15,
  marginLeft: 3,
  marginBottom: -2,
  backgroundColor: '$primary',
  borderRadius: 1,
});

const ALIGNMENT: Record<MessageRole, 'flex-start' | 'flex-end' | 'center'> = {
  user: 'flex-end',
  assistant: 'flex-start',
  system: 'center',
};

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
  if (role === 'system') {
    return (
      <View alignItems="center" paddingVertical="$2">
        <Typography variant="caption" intent="neutral" textAlign="center">
          {children}
        </Typography>
      </View>
    );
  }

  const doAssistente = role === 'assistant';

  return (
    <View flexDirection="row" gap="$2" justifyContent={ALIGNMENT[role]} width="100%">
      {doAssistente && avatar ? <View paddingTop="$1">{avatar}</View> : null}

      <View gap="$1" maxWidth="78%" alignItems={doAssistente ? 'flex-start' : 'flex-end'}>
        {author || timestamp ? (
          <View flexDirection="row" gap="$2" alignItems="baseline">
            {author ? <Typography variant="caption">{author}</Typography> : null}
            {timestamp ? (
              <Typography variant="caption" intent="neutral">
                {timestamp}
              </Typography>
            ) : null}
          </View>
        ) : null}

        <Bubble role={role}>
          {typeof children === 'string' ? (
            <Typography variant="body1">
              {children}
              {streaming ? <Cursor /> : null}
            </Typography>
          ) : (
            <View gap="$2">
              {children}
              {streaming ? <Cursor /> : null}
            </View>
          )}
        </Bubble>

        {status === 'error' ? (
          <Typography variant="caption" intent="error">
            Falha ao enviar
          </Typography>
        ) : null}

        {actions ? (
          <View flexDirection="row" gap="$1" paddingTop={2}>
            {actions}
          </View>
        ) : null}
      </View>
    </View>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
Bubble.displayName = 'MessageBubble';
Cursor.displayName = 'MessageCursor';
