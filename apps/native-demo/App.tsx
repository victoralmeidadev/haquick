import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';
import {
  Alert,
  Avatar,
  Badge,
  BottomSheet,
  BottomSheetProvider,
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
  Screen,
  Skeleton,
  Spacer,
  Spinner,
  Switch,
  ThemeProvider,
  Typography,
  useThemeMode,
  XStack,
  YStack,
} from 'haquick/native';

type Person = { name: string; role: string; email: string; status: 'ativo' | 'pendente' };

const PEOPLE: Person[] = [
  { name: 'Ana Silva', role: 'Engenheira', email: 'ana@empresa.com', status: 'ativo' },
  { name: 'Bruno Costa', role: 'Designer', email: 'bruno@empresa.com', status: 'pendente' },
];

export default function App() {
  return (
    <BottomSheetProvider>
      <ThemeProvider defaultMode="system">
        <Demo />
        <StatusBar style="auto" />
      </ThemeProvider>
    </BottomSheetProvider>
  );
}

function Demo() {
  const { mode, resolvedMode, setMode, toggle } = useThemeMode();
  const [notify, setNotify] = useState(true);
  const [sheet, setSheet] = useState(false);

  return (
    <>
    <Screen>
      <YStack gap={4}>
        <YStack gap={2}>
          <Typography variant="h4">Haquick · native-demo</Typography>
          <Typography variant="body2" intent="neutral">
            Os mesmos componentes do Storybook, aqui pela implementação de StyleSheet.
          </Typography>
        </YStack>

        <Card raised={1} gap={3}>
          <Typography variant="h6">Tema</Typography>
          <Typography variant="body2" intent="neutral">
            No native o tema é valor de Context, então quem chama useTheme() re-renderiza — ao
            contrário da web, onde a troca é um atributo no {'<html>'} e nada re-renderiza.
          </Typography>

          <XStack gap={2} wrap align="center">
            <Button size="sm" onPress={toggle}>
              Alternar
            </Button>
            {(['light', 'dark', 'system'] as const).map((m) => (
              <Button
                key={m}
                size="sm"
                variant={mode === m ? 'solid' : 'outline'}
                intent="neutral"
                onPress={() => setMode(m)}
              >
                {m}
              </Button>
            ))}
          </XStack>

          <Typography variant="caption" intent="neutral">
            {`mode=${mode} · resolvedMode=${resolvedMode}`}
          </Typography>
        </Card>

        <Alert intent="info" title="Átomos">
          Todos os componentes abaixo saem do mesmo pacote que a versão web, com as mesmas props.
        </Alert>

        <Card raised={2} gap={3}>
          <Typography variant="h6">Formulário</Typography>

          <YStack gap={2}>
            <Label required>E-mail</Label>
            <Input placeholder="voce@empresa.com" inputMode="email" />
            <HelperText>Usamos só para enviar o recibo.</HelperText>
          </YStack>

          <Checkbox label="Aceito os termos" defaultChecked />
          <Switch label="Notificações" checked={notify} onCheckedChange={setNotify} />

          <RadioGroup defaultValue="pix" direction="row">
            <Radio value="pix" label="Pix" />
            <Radio value="boleto" label="Boleto" />
          </RadioGroup>

          <XStack gap={2} align="center">
            <Button intent="primary">Confirmar</Button>
            <Button variant="outline" intent="neutral">
              Cancelar
            </Button>
            <Spacer fill />
            <IconButton label="Mais opções">⋯</IconButton>
          </XStack>
        </Card>

        <Card gap={3}>
          <Typography variant="h6">Estado de carregamento</Typography>
          <Progress value={65} intent="success" />
          <XStack gap={3} align="center">
            <Spinner />
            <Typography variant="body2" intent="neutral">
              Sincronizando...
            </Typography>
          </XStack>
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="40%" />
        </Card>

        <XStack gap={2} wrap>
          <Chip intent="primary" onRemove={() => {}}>
            haquick
          </Chip>
          <Chip intent="secondary" onRemove={() => {}}>
            design-system
          </Chip>
          <Chip variant="solid" intent="success">
            ativo
          </Chip>
        </XStack>

        <Link onPress={() => Linking.openURL('https://www.radix-ui.com/primitives')}>
          Ver os primitivos do Radix
        </Link>

        <Divider />

        <YStack gap={2}>
          <Typography variant="h6">Onde estaria uma tabela</Typography>
          <Typography variant="body2" intent="neutral">
            DataTable sai só de haquick/web. No celular o mesmo dado vira lista: a hierarquia da
            informação é outra, e o React Native nem tem papel de acessibilidade para tabela.
          </Typography>

          <List>
            {PEOPLE.map((p) => (
              <ListItem
                key={p.email}
                title={p.name}
                subtitle={`${p.role} · ${p.email}`}
                leading={
                  <Avatar
                    size="sm"
                    initials={p.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  />
                }
                trailing={
                  <Badge intent={p.status === 'ativo' ? 'success' : 'warning'}>{p.status}</Badge>
                }
              />
            ))}
          </List>
        </YStack>

        <Divider />

        <YStack gap={2}>
          <Typography variant="h6">Bottom sheet</Typography>
          <Typography variant="body2" intent="neutral">
            Aqui é o @gorhom/bottom-sheet: arraste com inércia, snap points e backdrop em
            Reanimated, na thread de UI. Na web a mesma API vira um diálogo ancorado embaixo.
          </Typography>
          <Button variant="outline" intent="neutral" onPress={() => setSheet(true)}>
            Abrir folha
          </Button>

        </YStack>
      </YStack>
    </Screen>
    <BottomSheet
      open={sheet}
      onOpenChange={setSheet}
      title="Filtrar pessoas"
      description="Arraste para baixo para fechar."
      snapPoints={['40%', '80%']}
      footer={<Button onPress={() => setSheet(false)}>Aplicar</Button>}
    >
      <YStack gap={3}>
        <YStack gap={2}>
          <Label>Nome</Label>
          <Input placeholder="Buscar por nome" />
        </YStack>
        <Checkbox label="Só ativos" defaultChecked />
        <Checkbox label="Incluir arquivados" />
      </YStack>
    </BottomSheet>
    </>
  );
}
