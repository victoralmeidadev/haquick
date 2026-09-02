import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet, Button, Input, Label, Typography, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/BottomSheet',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
    <YStack gap={3} align="start">
      <Typography variant="body2" intent="neutral">
        No native é o @gorhom/bottom-sheet, com arraste e snap points. Na web, um diálogo
        ancorado embaixo — mesma API.
      </Typography>
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
    </YStack>
    );
  },
};
