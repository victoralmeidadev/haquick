import type { ReactNode } from 'react';
import { View } from '@tamagui/core';
import { Divider } from '../components/Divider';
import { PageHeader } from '../components/PageHeader';
import { Screen } from '../components/Screen';
import { Typography } from '../components/Typography';

export type DetailSection = {
  title?: string;
  content: ReactNode;
};

export type DetailTemplateProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  onBack?: () => void;
  /** Avatar ou ícone à esquerda do título. */
  leading?: ReactNode;
  actions?: ReactNode;
  /** Blocos de conteúdo, separados por divisória. */
  sections?: DetailSection[];
  children?: ReactNode;
  /** Barra fixa no fim com as ações principais. */
  footer?: ReactNode;
  maxWidth?: number;
};

// Tela de detalhe: cabeçalho com identificação do registro e blocos de
// conteúdo. As seções vêm por dados (e não por composição) porque a divisória
// entre elas precisa saber quem é a última.
export function DetailTemplate({
  title,
  subtitle,
  onBack,
  leading,
  actions,
  sections = [],
  children,
  footer,
  maxWidth = 780,
}: DetailTemplateProps) {
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

      <View gap="$5" paddingTop="$4" flexGrow={1}>
        {sections.map((section, index) => (
          <View key={section.title ?? index} gap="$3">
            {section.title ? (
              <Typography variant="overline" intent="neutral">
                {section.title}
              </Typography>
            ) : null}

            {section.content}

            {index < sections.length - 1 ? <Divider marginTop="$2" /> : null}
          </View>
        ))}

        {children}
      </View>

      {footer ? (
        <View
          flexDirection="row"
          justifyContent="flex-end"
          gap="$2"
          paddingTop="$4"
          marginTop="$4"
          borderTopWidth={1}
          borderTopColor="$borderColor"
        >
          {footer}
        </View>
      ) : null}
    </Screen>
  );
}
