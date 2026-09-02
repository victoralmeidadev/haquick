import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Input,
  Switch,
  ThemeProvider,
  Typography,
  XStack,
  YStack,
} from 'haquick/web';
import { brandTheme } from '../theme';

const meta: Meta = {
  title: 'Customização/Tema',
};

export default meta;

type Story = StoryObj;

function Sample({ title }: { title: string }) {
  return (
    <Card raised={2} width={330} gap={3}>
      <Typography variant="h6">{title}</Typography>

      <XStack gap={2} wrap>
        <Button>Confirmar</Button>
        <Button variant="outline">Cancelar</Button>
        <Button variant="ghost" intent="neutral">
          Ajuda
        </Button>
      </XStack>

      <Input placeholder="voce@empresa.com" />

      <XStack gap={2} align="center" wrap>
        <Badge>novo</Badge>
        <Chip intent="primary" onRemove={() => {}}>
          filtro
        </Chip>
        <Switch defaultChecked />
        <Checkbox defaultChecked />
      </XStack>

      <Alert intent="info" title="Tema aplicado">
        Cores, hover e superfícies vêm todos do tema.
      </Alert>
    </Card>
  );
}

export const NewIntent: Story = {
  render: () => (
    <YStack gap={3} align="start">
      <Typography variant="h6">intent=&quot;brand&quot;</Typography>
      <XStack gap={2} wrap align="center">
        <Button intent="brand">Solid</Button>
        <Button intent="brand" variant="outline">
          Outline
        </Button>
        <Button intent="brand" variant="ghost">
          Ghost
        </Button>
      </XStack>
      <XStack gap={2} wrap align="center">
        <Badge intent="brand">novo</Badge>
        <Chip intent="brand" variant="solid">
          tag
        </Chip>
        <Switch intent="brand" defaultChecked />
        <Checkbox intent="brand" defaultChecked />
        <Typography intent="brand" variant="subtitle1">
          texto
        </Typography>
      </XStack>
      <Alert intent="brand" title="Alert com intenção nova">
        Shades, contrastText, hover e press foram derivados da cor base.
      </Alert>
    </YStack>
  ),
};

export const BrandTheme: Story = {
  render: () => {
    const [brand, setBrand] = useState(false);

    return (
      <YStack gap={4} align="start">
        <Button variant="outline" intent="neutral" onPress={() => setBrand((b) => !b)}>
          {brand ? 'Voltar ao padrão' : 'Aplicar tema brand'}
        </Button>

        {brand ? (
          <ThemeProvider theme={brandTheme}>
            <Sample title="Tema brand" />
          </ThemeProvider>
        ) : (
          <Sample title="Padrão" />
        )}
      </YStack>
    );
  },
};

export const Elevation: Story = {
  render: () => (
    <XStack gap={4} wrap>
      {([0, 1, 2, 3, 4, 5] as const).map((level) => (
        <Card key={level} raised={level} width={130}>
          <Typography variant="subtitle2">raised={level}</Typography>
        </Card>
      ))}
    </XStack>
  ),
};
