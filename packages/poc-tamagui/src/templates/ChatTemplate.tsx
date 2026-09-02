import type { ReactNode } from 'react';
import { View } from '@tamagui/core';
import { Composer, type ComposerProps } from '../components/Chat';
import { PageHeader } from '../components/PageHeader';
import { Screen } from '../components/Screen';

export type ChatTemplateProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  onBack?: () => void;
  /** Avatar ou ícone do agente, ao lado do título. */
  leading?: ReactNode;
  actions?: ReactNode;
  /** A <MessageList> com as mensagens. */
  children?: ReactNode;
  /** Props repassadas ao <Composer> do rodapé. Omita para não mostrar. */
  composer?: ComposerProps;
  maxWidth?: number;
};

// Tela de conversa com agente: cabeçalho, histórico e composer fixo no fim.
//
// Não sabe de protocolo. Quem consome AG-UI (ou qualquer outro transporte)
// traduz os eventos em <Message>/<ToolCall> e passa como children — o que
// mantém o template utilizável com qualquer backend.
export function ChatTemplate({
  title,
  subtitle,
  onBack,
  leading,
  actions,
  children,
  composer,
  maxWidth = 760,
}: ChatTemplateProps) {
  return (
    <Screen maxWidth={maxWidth}>
      <PageHeader
        divided
        title={title}
        subtitle={subtitle}
        onBack={onBack}
        leading={leading}
        actions={actions}
      />

      <View flexGrow={1}>{children}</View>

      {composer ? <Composer {...composer} /> : null}
    </Screen>
  );
}
