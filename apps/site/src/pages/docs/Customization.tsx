import { Alert, Button, Card, Chip, Typography, XStack, YStack, useThemeControl } from 'haquick/web';
import { CodeBlock } from '../../components/CodeBlock';
import { Section } from '../../components/Section';

const SLOTS: [string, string][] = [
  ['main', 'A cor da intenção. Único slot obrigatório.'],
  ['light', 'Tom claro. Usado como texto sobre superfície tingida no tema escuro.'],
  ['dark', 'Tom escuro. Usado como texto sobre superfície tingida no tema claro.'],
  ['contrastText', 'Texto sobre o fundo sólido. Derivado da luminosidade de main.'],
  ['hover', 'Fundo no hover. Derivado do shade 600.'],
  ['press', 'Fundo no press. Derivado do shade 700.'],
];

const RADII: [string, string, string][] = [
  ['--haquick-radiusXs', '0.5×', 'Checkbox, Skeleton de texto'],
  ['--haquick-radiusSm', '0.75×', 'Button pequeno, Tooltip'],
  ['--haquick-radiusMd', '1×', 'Button, Input, List, Alert'],
  ['--haquick-radiusLg', '1.5×', 'Card'],
  ['--haquick-radiusXl', '2×', '—'],
  ['--haquick-radiusFull', '—', 'Avatar, Badge, Chip, Switch, Progress'],
];

export function ThemeSection() {
  return (
    <Section
      title="Tema"
      subtitle="createTheme recebe um objeto com cinco eixos: cores, paleta, schemes, geometria e sombras. Todos são opcionais."
    >
      <CodeBlock>{`import { createTheme, ThemeProvider } from 'haquick/web';

const theme = createTheme({
  colors: {
    secondary: '#7C3AED',              // um hex deriva os demais slots
    primary: {                         // ou informe slot a slot
      main: '#DB2777',
      hover: '#BE185D',
      press: '#9D174D',
      contrastText: '#FFFFFF',
    },
  },
  palette: { hoverShade: 400 },        // muda a derivação de todas as intenções
  schemes: {                           // o que difere entre claro e escuro
    light: { surfaces: { background: '#FFF7FB' } },
    dark: {
      colors: { primary: '#F472B6' },  // a mesma intenção, outra cor no escuro
      surfaces: { background: '#180A12' },
    },
  },
  shape: { borderRadius: 2 },
  shadows: { intensity: 0 },           // 0 desliga todas as sombras
});

export function App() {
  return (
    <ThemeProvider themes={{ default: theme }} defaultMode="system">
      {/* ... */}
    </ThemeProvider>
  );
}`}</CodeBlock>

      <Typography variant="body2" intent="neutral">
        colors vale nos dois schemes. schemes.light e schemes.dark sobrescrevem apenas o que
        precisa diferir, e a substituição é por intenção inteira: informar primary só no escuro
        traz hover, press e contrastText derivados dessa cor.
      </Typography>

      <Typography variant="body2" intent="neutral">
        Dentro de uma intenção, as chaves light e dark são tons da mesma cor, não schemes. O eixo
        claro/escuro está sempre em schemes.
      </Typography>

      <Alert intent="warning" variant="soft" title="Limitação no React Native">
        Cores e superfícies valem nas duas plataformas. Raios e sombras só têm efeito na web: no
        React Native esses valores são lidos do módulo, dentro de StyleSheet.create, antes de o
        Context existir.
      </Alert>
    </Section>
  );
}

export function NamedThemesSection() {
  const { theme, themes, setTheme } = useThemeControl();

  return (
    <Section
      title="Temas nomeados"
      subtitle="themes recebe um mapa de temas e theme define qual está em vigor. É um eixo independente do claro/escuro: cada tema tem as duas versões."
    >
      <YStack gap={4}>
        <XStack gap={2} wrap align="center">
          {themes.map((key) => (
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
          <Typography variant="caption" intent="neutral">
            alterna o tema desta página
          </Typography>
        </XStack>

        <CodeBlock>{`const themes = {
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

<ThemeProvider themes={themes} defaultTheme="default" defaultMode="system">`}</CodeBlock>

        <CodeBlock>{`import { useThemeControl } from 'haquick/web';

function ThemePicker() {
  const { theme, themes, setTheme } = useThemeControl();

  return themes.map((key) => (
    <Button key={key} onPress={() => setTheme(key)}>{key}</Button>
  ));
}`}</CodeBlock>

        <Typography variant="body2" intent="neutral">
          useThemeMode devolve apenas o eixo claro/escuro; useThemeControl devolve os dois.
        </Typography>

        <Alert intent="info" variant="soft" title="Escopar um tema a uma subárvore">
          Aplique os dois atributos em qualquer elemento e o tema vale dali para baixo:
          &lt;section data-theme=&quot;natal&quot; data-scheme=&quot;dark&quot;&gt;. Disponível
          apenas na web.
        </Alert>
      </YStack>
    </Section>
  );
}

export function PaletteSection() {
  return (
    <Section
      title="Paleta"
      subtitle="Cada intenção tem seis slots. Informar main é suficiente: os outros cinco são derivados de uma escala de shades 50–900."
    >
      <Card raised={1} gap={2}>
        {SLOTS.map(([slot, text]) => (
          <XStack key={slot} gap={3} align="baseline" wrap>
            <Chip size="sm" intent="primary" variant="soft">
              {slot}
            </Chip>
            <Typography variant="body2" intent="neutral">
              {text}
            </Typography>
          </XStack>
        ))}
      </Card>

      <Typography variant="body2" intent="neutral">
        Informar um slot na mão sobrescreve apenas aquele; os demais continuam derivados.
        palette muda as regras de derivação para todas as intenções de uma vez.
      </Typography>
    </Section>
  );
}

export function IntentsSection() {
  return (
    <Section
      title="Intenções"
      subtitle="O conjunto de intenções é extensível: declare a nova no tipo e informe a cor no tema."
    >
      <CodeBlock>{`declare module 'haquick/tokens' {
  interface CustomIntents {
    brand: true;
  }
}

const theme = createTheme({
  colors: { brand: '#DB2777' },
});`}</CodeBlock>

      <Typography variant="body2" intent="neutral">
        A partir daí intent=&quot;brand&quot; type-checa e funciona em todo componente com o eixo
        intent — Button, IconButton, Chip, Badge, Alert, Avatar, Typography, Switch, Checkbox,
        Radio, Progress, Spinner e Link. Shades, contrastText, hover e press são derivados.
      </Typography>

      <Alert intent="info" variant="soft" title="Declare a augmentation no seu app">
        O tipo reflete as intenções do seu tema. Declarada dentro do pacote, valeria para todos os
        apps.
      </Alert>
    </Section>
  );
}

export function RuntimeThemesSection() {
  return (
    <Section
      title="Modo claro e escuro"
      subtitle="O ThemeProvider aceita light, dark e system."
    >
      <CodeBlock>{`import { useThemeMode } from 'haquick/web';

function ThemeToggle() {
  const { mode, resolvedMode, setMode, toggle } = useThemeMode();

  return <button onClick={toggle}>{resolvedMode === 'dark' ? '☀' : '☾'}</button>;
}`}</CodeBlock>

      <Typography variant="body2" intent="neutral">
        mode é o valor pedido e pode ser system; resolvedMode é o que está em vigor e nunca é.
        Com system, alterar a preferência do sistema operacional atualiza o tema imediatamente,
        nas duas plataformas.
      </Typography>

      <Typography variant="body2" intent="neutral">
        O provider aceita mode e defaultMode, então funciona controlado ou não controlado, e
        notifica mudanças por onModeChange.
      </Typography>
    </Section>
  );
}

export function BordersSection() {
  return (
    <Section
      title="Bordas"
      subtitle="Um raio base gera a escala inteira. Nenhum componente escreve raio ou espessura literal."
    >
      <CodeBlock>{`createTheme({
  shape: {
    borderRadius: 8,        // raio base — toda a escala deriva dele
    borderWidth: 1,         // Card, Input, List, Button outline
    controlBorderWidth: 2,  // Checkbox, Radio
  },
});`}</CodeBlock>

      <Card raised={1} gap={2}>
        {RADII.map(([token, mult, use]) => (
          <XStack key={token} gap={3} align="baseline" wrap>
            <Chip size="sm" intent="secondary" variant="soft">
              {token}
            </Chip>
            <Typography variant="body2">{mult}</Typography>
            <Typography variant="body2" intent="neutral">
              {use}
            </Typography>
          </XStack>
        ))}
      </Card>

      <Typography variant="body2" intent="neutral">
        Na web cada degrau é uma custom property e pode ser sobrescrito direto em CSS, sem passar
        pelo createTheme.
      </Typography>

      <CodeBlock>{`/* app.css */
:root {
  --haquick-radiusLg: 20px;   /* só o Card fica mais redondo */
}`}</CodeBlock>
    </Section>
  );
}

export function ShadowsSection() {
  return (
    <Section
      title="Sombras"
      subtitle="Escala de elevação de 0 a 5, usada pelo Card e pelo polegar do Switch."
    >
      <YStack gap={4}>
        <XStack gap={4} wrap>
          {([0, 1, 2, 3, 4, 5] as const).map((n) => (
            <Card key={n} raised={n} width={110}>
              <Typography variant="subtitle2">raised={n}</Typography>
            </Card>
          ))}
        </XStack>

        <CodeBlock>{`createTheme({
  shadows: {
    intensity: 1.5,                     // 0 desliga tudo, 1 é o padrão
  },
  schemes: {
    light: { surfaces: { shadowColor: '#0B0B0C' } },
    dark: { surfaces: { shadowColor: '#8AB4FF' } },   // no escuro a sombra é clara
  },
});`}</CodeBlock>
      </YStack>
    </Section>
  );
}
