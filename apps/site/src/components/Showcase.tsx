import type { ReactNode } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  IconButton,
  Input,
  Label,
  List,
  ListItem,
  Progress,
  Radio,
  RadioGroup,
  Skeleton,
  Spinner,
  Switch,
  Typography,
  XStack,
  YStack,
} from 'haquick/web';

function Block({ children }: { children: ReactNode }) {
  return (
    <Card raised={1} gap={3} fill>
      {children}
    </Card>
  );
}

const INTENTS = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const;

export function Showcase() {
  return (
    <div className="showcase">
      <Block>
        <XStack gap={2} wrap align="center">
          <Button size="sm">Confirmar</Button>
          <Button size="sm" variant="soft" intent="success">
            Aprovar
          </Button>
          <Button size="sm" variant="outline" intent="error">
            Excluir
          </Button>
        </XStack>
        <XStack gap={2} wrap align="center">
          <IconButton label="Editar" size="sm" variant="outline" intent="primary">
            ✎
          </IconButton>
          <IconButton label="Fechar" size="sm">
            ✕
          </IconButton>
          <Chip size="sm" intent="primary" onRemove={() => {}}>
            tag
          </Chip>
          <Badge intent="success">Ativo</Badge>
          <Badge intent="warning">Pendente</Badge>
        </XStack>
      </Block>

      <Block>
        <YStack gap={1}>
          <Label required>E-mail</Label>
          <Input placeholder="voce@empresa.com" inputMode="email" size="sm" />
        </YStack>
        <XStack gap={4} wrap align="center">
          <Checkbox label="Aceito" defaultChecked size="sm" />
          <Switch defaultChecked size="sm" />
        </XStack>
        <RadioGroup defaultValue="pix" direction="row" size="sm">
          <Radio value="pix" label="Pix" />
          <Radio value="boleto" label="Boleto" />
        </RadioGroup>
      </Block>

      <Block>
        <Alert intent="success" variant="soft" title="Publicado">
          A versão 2.1 já está no ar.
        </Alert>
        <Alert intent="error" title="Falha no envio">
          Não conseguimos processar o arquivo.
        </Alert>
      </Block>

      <Block>
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
      </Block>

      <Block>
        <XStack gap={3} align="center">
          <Spinner intent="primary" />
          <Typography variant="body2" intent="neutral">
            Sincronizando...
          </Typography>
        </XStack>
        <Progress value={65} intent="success" />
        <YStack gap={2}>
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="45%" />
        </YStack>
      </Block>

      <Block>
        <Typography variant="caption" intent="neutral">
          Elevação
        </Typography>
        <XStack gap={2} wrap>
          {([0, 1, 2, 3, 4, 5] as const).map((n) => (
            <div key={n} className="elevation-box" style={{ boxShadow: `var(--haquick-shadow-${n})` }} />
          ))}
        </XStack>
        <Typography variant="caption" intent="neutral">
          Intenções
        </Typography>
        <div className="swatches">
          {INTENTS.map((intent) => (
            <div key={intent} className="swatch" style={{ background: `var(--haquick-${intent})` }} />
          ))}
        </div>
      </Block>
    </div>
  );
}
