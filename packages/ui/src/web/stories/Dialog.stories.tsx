import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Dialog, Typography, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Dialog',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
    <YStack gap={3} align="start">
      <Typography variant="body2" intent="neutral">
        Foco preso, Esc, clique fora e trava de rolagem vêm do Radix.
      </Typography>
      <Button onPress={() => setOpen(true)}>Abrir diálogo</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Excluir projeto"
        description="Esta ação não pode ser desfeita."
        footer={
          <>
            <Button variant="ghost" intent="neutral" onPress={() => setOpen(false)}>Cancelar</Button>
            <Button intent="error" onPress={() => setOpen(false)}>Excluir</Button>
          </>
        }
      />
    </YStack>
    );
  },
};
