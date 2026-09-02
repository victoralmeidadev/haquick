import type { Meta, StoryObj } from '@storybook/react';
import { Card, Screen, Typography, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Screen',
};

export default meta;

type Story = StoryObj;

export const WithMaxWidth: Story = {
  render: () => (
    <Screen maxWidth={520}>
      <YStack gap={3}>
        <Typography variant="h5">Conteúdo centrado</Typography>
        <Typography variant="body2" intent="neutral">
          Screen aplica o padding padrão e limita a largura. Na web quem rola é o documento;
          no native ele embrulha num ScrollView.
        </Typography>
        <Card raised={1}>
          <Typography variant="body2">Um cartão qualquer.</Typography>
        </Card>
      </YStack>
    </Screen>
  ),
};
