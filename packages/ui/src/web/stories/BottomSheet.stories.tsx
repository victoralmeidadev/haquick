import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet, Button, Input, Label, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/BottomSheet',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (Story) => (
      <YStack gap={3} align="start">
        <Story />
      </YStack>
    ),
  ],
  render: () => {
    const [open, setOpen] = useState(false);

    return (
    <>
      <Button onPress={() => setOpen(true)}>Abrir folha</Button>
      <BottomSheet
        open={open}
        onOpenChange={setOpen}
        title="Filtrar pedidos"
        description="As escolhas valem só para esta sessão."
        snapPoints={['50%']}
        footer={<Button onPress={() => setOpen(false)}>Aplicar</Button>}
      >
        <YStack gap={2}>
          <Label>Cliente</Label>
          <Input placeholder="Nome ou e-mail" />
        </YStack>
      </BottomSheet>
    </>
    );
  },
};
