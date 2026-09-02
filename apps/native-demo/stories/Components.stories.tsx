import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  HelperText,
  IconButton,
  Input,
  Label,
  Link,
  List,
  ListItem,
  Progress,
  Radio,
  RadioGroup,
  Skeleton,
  Spinner,
  Switch,
  Timeline,
  TimelineItem,
  Typography,
  XStack,
  YStack,
} from 'haquick/native';

// Os mesmos componentes do Storybook da web — mas aqui é a implementação de
// StyleSheet rodando no runtime do React Native, não uma simulação.
const Frame = ({ children }: { children: React.ReactNode }) => (
  <View style={{ padding: 16 }}>{children}</View>
);

const meta: Meta = {
  title: 'Componentes',
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
};

export default meta;

type Story = StoryObj;

const INTENTS = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const;
const VARIANTS = ['solid', 'soft', 'outline', 'ghost'] as const;

export const Buttons: Story = {
  render: () => (
    <YStack gap={4}>
      {VARIANTS.map((variant) => (
        <YStack key={variant} gap={2}>
          <Typography variant="overline" intent="neutral">
            {variant}
          </Typography>
          <XStack gap={2} wrap>
            {INTENTS.slice(0, 4).map((intent) => (
              <Button key={intent} size="sm" variant={variant} intent={intent}>
                {intent}
              </Button>
            ))}
          </XStack>
        </YStack>
      ))}

      <Divider />

      <XStack gap={2} wrap align="center">
        <Button size="sm">sm</Button>
        <Button>md</Button>
        <Button size="lg">lg</Button>
        <Button loading>loading</Button>
        <Button disabled>disabled</Button>
      </XStack>

      <XStack gap={2} wrap align="center">
        <IconButton label="Editar" variant="outline" intent="primary">
          ✎
        </IconButton>
        <IconButton label="Excluir" variant="solid" intent="error">
          ✕
        </IconButton>
        <IconButton label="Mais" variant="ghost" intent="neutral">
          ⋯
        </IconButton>
      </XStack>
    </YStack>
  ),
};

export const Typographies: Story = {
  render: () => (
    <YStack gap={2}>
      {(
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'body1', 'body2', 'caption', 'overline'] as const
      ).map((v) => (
        <Typography key={v} variant={v}>
          {v} — o rápido cão marrom
        </Typography>
      ))}
      <Divider />
      <XStack gap={3} wrap>
        {INTENTS.map((i) => (
          <Typography key={i} variant="subtitle2" intent={i}>
            {i}
          </Typography>
        ))}
      </XStack>
    </YStack>
  ),
};

export const Form: Story = {
  render: () => (
    <YStack gap={4}>
      <YStack gap={1}>
        <Label required>E-mail</Label>
        <Input placeholder="voce@empresa.com" inputMode="email" />
        <HelperText>Usamos só para o recibo.</HelperText>
      </YStack>

      <YStack gap={1}>
        <Label required>Senha</Label>
        <Input secure defaultValue="senha123" error />
        <HelperText error>Mínimo de 8 caracteres.</HelperText>
      </YStack>

      <YStack gap={1}>
        <Label>Observações</Label>
        <Input multiline rows={3} placeholder="Opcional" />
      </YStack>

      <XStack gap={4} wrap align="center">
        <Checkbox label="Aceito" defaultChecked />
        <Checkbox label="Indeterminado" indeterminate />
        <Switch label="Notificações" defaultChecked />
      </XStack>

      <RadioGroup defaultValue="pix" direction="row">
        <Radio value="pix" label="Pix" />
        <Radio value="boleto" label="Boleto" />
        <Radio value="cartao" label="Cartão" />
      </RadioGroup>

      <Link onPress={() => {}}>Termos de uso</Link>
    </YStack>
  ),
};

export const DataDisplay: Story = {
  render: () => (
    <YStack gap={4}>
      <XStack gap={2} wrap align="center">
        <Badge intent="success">Ativo</Badge>
        <Badge intent="warning">Pendente</Badge>
        <Badge intent="error">Erro</Badge>
        <Chip intent="primary" onRemove={() => {}}>
          tag
        </Chip>
        <Chip variant="solid" intent="secondary">
          solid
        </Chip>
      </XStack>

      <XStack gap={2} align="center">
        <Avatar size="sm" initials="AS" />
        <Avatar initials="BC" intent="secondary" />
        <Avatar size="lg" initials="CN" intent="success" />
      </XStack>

      <List>
        <ListItem
          title="Ana Silva"
          subtitle="ana@empresa.com"
          leading={<Avatar size="sm" initials="AS" />}
          trailing={<Badge intent="success">Ativo</Badge>}
        />
        <ListItem
          title="Bruno Costa"
          subtitle="bruno@empresa.com"
          leading={<Avatar size="sm" initials="BC" intent="secondary" />}
          trailing={<Badge intent="warning">Pendente</Badge>}
        />
      </List>

      <Timeline>
        <TimelineItem intent="success" title="Pedido criado" subtitle="10:32" />
        <TimelineItem intent="primary" title="Em separação" subtitle="11:05" />
        <TimelineItem intent="neutral" variant="outlined" title="A caminho" />
      </Timeline>
    </YStack>
  ),
};

export const Feedback: Story = {
  render: () => (
    <YStack gap={4}>
      <Alert intent="success" variant="soft" title="Publicado">
        A versão 2.1 já está no ar.
      </Alert>
      <Alert intent="error" title="Falha no envio">
        Não conseguimos processar o arquivo.
      </Alert>
      <Alert intent="warning" variant="solid" title="Atenção">
        Seu plano expira em 3 dias.
      </Alert>

      <XStack gap={3} align="center">
        <Spinner intent="primary" />
        <Spinner intent="success" size="lg" />
        <Typography variant="body2" intent="neutral">
          Sincronizando...
        </Typography>
      </XStack>

      <Progress value={65} intent="success" />
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="rectangular" height={60} />
    </YStack>
  ),
};

export const Surfaces: Story = {
  render: () => (
    <YStack gap={4}>
      {([0, 1, 2, 3, 4, 5] as const).map((n) => (
        <Card key={n} raised={n}>
          <Typography variant="subtitle2">raised={n}</Typography>
        </Card>
      ))}
    </YStack>
  ),
};
