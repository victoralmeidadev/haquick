import type { Meta, StoryObj } from '@storybook/react';
import {
  Badge,
  Button,
  Card,
  ThemeProvider,
  Typography,
  XStack,
  YStack,
  createTheme,
  useThemeControl,
  useThemeMode,
} from '../index';

const meta: Meta = {
  title: 'Componentes/ThemeProvider',
};

export default meta;

type Story = StoryObj;

function ModeSwitch() {
  const { mode, resolvedMode, setMode, toggle } = useThemeMode();

  return (
    <YStack gap={2} align="start">
      <XStack gap={2} wrap align="center">
        <Button size="sm" onPress={toggle}>Alternar</Button>
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
    </YStack>
  );
}

export const ModeSwitching: Story = {
  render: () => (
    <ThemeProvider defaultMode="light">
      <YStack gap={3} align="start">
        <Typography variant="body2" intent="neutral">
          A troca escreve data-scheme no &lt;html&gt;. As duas paletas já estão no CSS, então
          nenhum componente re-renderiza por causa de cor.
        </Typography>
        <ModeSwitch />
        <Card raised={2} width={320} gap={2}>
          <Typography variant="subtitle1">Cartão de exemplo</Typography>
          <XStack gap={2} wrap>
            <Badge intent="success">pago</Badge>
            <Badge intent="warning">pendente</Badge>
            <Badge intent="error">cancelado</Badge>
          </XStack>
          <Button>Confirmar</Button>
        </Card>
      </YStack>
    </ThemeProvider>
  ),
};

const themes = {
  default: createTheme(),
  natal: createTheme({
    colors: { primary: '#C8102E', secondary: '#046A38' },
    schemes: {
      light: { surfaces: { background: '#FFF8F5' } },
      dark: {
        colors: { primary: '#F2617A' },
        surfaces: { background: '#120A0A', shadowColor: '#FFD9A8' },
      },
    },
  }),
};

function ThemePicker() {
  const { theme, themes: names, setTheme, resolvedMode, toggle } = useThemeControl();

  return (
    <YStack gap={2} align="start">
      <XStack gap={2} wrap align="center">
        {names.map((key) => (
          <Button
            key={key}
            size="sm"
            variant={theme === key ? 'solid' : 'outline'}
            intent="neutral"
            onPress={() => setTheme(key)}
          >
            {key}
          </Button>
        ))}
        <Button size="sm" onPress={toggle}>
          {resolvedMode === 'dark' ? 'claro' : 'escuro'}
        </Button>
      </XStack>
      <Typography variant="caption" intent="neutral">
        {`theme=${theme} · resolvedMode=${resolvedMode}`}
      </Typography>
    </YStack>
  );
}

export const NamedThemes: Story = {
  render: () => (
    <ThemeProvider themes={themes} defaultMode="light">
      <YStack gap={3} align="start">
        <Typography variant="body2" intent="neutral">
          Os dois eixos são independentes: cada tema nomeado tem versão clara e escura, e trocar
          um não mexe no outro.
        </Typography>
        <ThemePicker />
        <Card raised={2} width={320} gap={2}>
          <Typography variant="subtitle1">Cartão de exemplo</Typography>
          <XStack gap={2} wrap>
            <Badge intent="primary">primary</Badge>
            <Badge intent="secondary">secondary</Badge>
          </XStack>
          <Button>Confirmar</Button>
        </Card>
      </YStack>
    </ThemeProvider>
  ),
};
