import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { BottomSheet, Button, Checkbox, Input, Label, Typography, YStack } from 'haquick/native';

// O Storybook on-device já monta GestureHandlerRootView + BottomSheetModalProvider
// na própria raiz — exatamente a mesma estrutura do nosso <BottomSheetProvider>.
//
// Então esta story é um experimento: se a folha abrir aqui e não abrir na tela
// de demonstração, o problema está no nosso provider e não no componente.
const meta: Meta = {
  title: 'Diagnóstico/BottomSheet',
};

export default meta;

type Story = StoryObj;

export const Sheet: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <View style={{ padding: 16 }}>
        <YStack gap={3}>
          <Typography variant="body2" intent="neutral">
            Sem o nosso BottomSheetProvider — quem provê é o próprio Storybook.
          </Typography>

          <Button onPress={() => setOpen(true)}>Abrir folha</Button>

          <BottomSheet
            open={open}
            onOpenChange={setOpen}
            title="Filtrar"
            description="Arraste para baixo para fechar."
            snapPoints={['40%', '80%']}
            footer={<Button onPress={() => setOpen(false)}>Aplicar</Button>}
          >
            <YStack gap={3}>
              <YStack gap={2}>
                <Label>Nome</Label>
                <Input placeholder="Buscar por nome" />
              </YStack>
              <Checkbox label="Só ativos" defaultChecked />
            </YStack>
          </BottomSheet>
        </YStack>
      </View>
    );
  },
};
