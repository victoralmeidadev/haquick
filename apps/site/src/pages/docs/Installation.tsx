import { Alert, Card, Chip, Typography, XStack, YStack } from 'haquick/web';
import { CodeBlock } from '../../components/CodeBlock';
import { InstallCommand } from '../../components/InstallCommand';
import { Section } from '../../components/Section';

const PEERS: [string, string, string][] = [
  ['react', '18.2', 'sempre'],
  ['react-native', '0.78', 'app mobile'],
  ['@gorhom/bottom-sheet', '5.0', 'BottomSheet'],
  ['react-native-reanimated', '4.0', 'BottomSheet'],
  ['react-native-worklets', '0.5', 'BottomSheet'],
  ['react-native-gesture-handler', '2.20', 'BottomSheet'],
];

const ENTRY_POINTS: [string, string][] = [
  ['haquick/web', 'Componentes para React em navegador.'],
  ['haquick/native', 'Componentes para React Native.'],
  ['haquick/tokens', 'Paleta, escalas e temas em TypeScript, sem dependência de plataforma.'],
];

export function InstallationSection() {
  return (
    <Section
      title="Instalação"
      subtitle="React é a única dependência obrigatória. As demais dependem da plataforma."
    >
      <InstallCommand />

      <Typography variant="body2" intent="neutral">
        Radix, que implementa o comportamento dos componentes de sobreposição, e TanStack Table,
        que move o DataTable, já são dependências do pacote. Para usar haquick/web não é preciso
        instalar mais nada.
      </Typography>

      <Typography variant="body2" intent="neutral">
        react-native é um peer opcional, exigido apenas pelo app mobile. Uma aplicação web não
        instala nada do ecossistema React Native.
      </Typography>
    </Section>
  );
}

export function WebSetupSection() {
  return (
    <YStack>
      <Section
        title="Setup web"
        subtitle="Importe a folha de estilo no ponto de entrada. Não há plugin de build nem provider obrigatório."
      >
        <CodeBlock>{`import 'haquick/styles.css';`}</CodeBlock>

        <Typography variant="body2" intent="neutral">
          O arquivo contém as regras dos componentes e o tema padrão. Um tema próprio é aplicado
          pelo ThemeProvider e não dispensa esse import.
        </Typography>

        <CodeBlock>{`import { Button, Card, Typography } from 'haquick/web';

export function Profile() {
  return (
    <Card raised={2} gap={3}>
      <Typography variant="h6">Ana Silva</Typography>
      <Button intent="primary">Seguir</Button>
    </Card>
  );
}`}</CodeBlock>

        <Typography variant="subtitle2">Next.js (App Router)</Typography>

        <Typography variant="body2" intent="neutral">
          O import da folha de estilo vai no layout raiz. Os componentes de haquick/web são
          client components e podem ser usados a partir de um Server Component.
        </Typography>

        <CodeBlock>{`// app/layout.tsx
import 'haquick/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}`}</CodeBlock>

        <Typography variant="subtitle2">ThemeProvider</Typography>

        <Typography variant="body2" intent="neutral">
          Opcional na web. Use-o para alternar entre claro e escuro, para aplicar um tema criado
          com createTheme ou para ler o tema em vigor pelos hooks.
        </Typography>

        <CodeBlock>{`import { ThemeProvider } from 'haquick/web';

export function App() {
  return (
    <ThemeProvider defaultMode="system">
      {/* ... */}
    </ThemeProvider>
  );
}`}</CodeBlock>
      </Section>
    </YStack>
  );
}

export function NativeSetupSection() {
  return (
    <Section
      title="Setup native"
      subtitle="Envolva o app no ThemeProvider. Não há configuração de bundler."
    >
      <CodeBlock>{`import { ThemeProvider } from 'haquick/native';

export default function App() {
  return (
    <ThemeProvider defaultMode="system">
      {/* ... */}
    </ThemeProvider>
  );
}`}</CodeBlock>

      <Typography variant="body2" intent="neutral">
        Diferente da web, o provider é obrigatório: sem ele os componentes usam o tema claro.
      </Typography>

      <Typography variant="subtitle2">Versões mínimas</Typography>

      <Card raised={1} gap={2}>
        {PEERS.map(([pkg, min, when]) => (
          <XStack key={pkg} gap={3} align="baseline" wrap>
            <Chip size="sm" intent="primary" variant="soft">
              {pkg}
            </Chip>
            <Typography variant="body2">{min}</Typography>
            <Typography variant="body2" intent="neutral">
              {when}
            </Typography>
          </XStack>
        ))}
      </Card>

      <Typography variant="body2" intent="neutral">
        Verificado com Expo SDK 57: React Native 0.86, Reanimated 4.5, worklets 0.10 e gesture
        handler 2.32.
      </Typography>

      <Typography variant="subtitle2">BottomSheet</Typography>

      <Typography variant="body2" intent="neutral">
        Exige quatro peers opcionais e o BottomSheetProvider na raiz da árvore, que já inclui o
        GestureHandlerRootView pedido pelo Gorhom. O mesmo provider é exportado por haquick/web,
        onde não renderiza nada — o código do app é o mesmo nas duas plataformas.
      </Typography>

      <CodeBlock>{`npx expo install @gorhom/bottom-sheet react-native-reanimated react-native-worklets react-native-gesture-handler`}</CodeBlock>

      <CodeBlock>{`import { BottomSheetProvider, ThemeProvider } from 'haquick/native';

export default function App() {
  return (
    <BottomSheetProvider>
      <ThemeProvider defaultMode="system">
        {/* ... */}
      </ThemeProvider>
    </BottomSheetProvider>
  );
}`}</CodeBlock>
    </Section>
  );
}

export function EntryPointsSection() {
  return (
    <Section
      title="Entry points"
      subtitle="Três caminhos de importação, um por superfície."
    >
      <Card raised={1} gap={2}>
        {ENTRY_POINTS.map(([name, description]) => (
          <XStack key={name} gap={3} align="baseline" wrap>
            <Chip size="sm" intent="primary" variant="soft">
              {name}
            </Chip>
            <Typography variant="body2" intent="neutral">
              {description}
            </Typography>
          </XStack>
        ))}
      </Card>

      <CodeBlock>{`import { Button } from 'haquick/web';       // React
import { Button } from 'haquick/native';    // React Native`}</CodeBlock>

      <Typography variant="body2" intent="neutral">
        Um componente presente nos dois entry points aceita exatamente as mesmas props. O que
        muda é a implementação: um elemento HTML com classes CSS na web, um primitivo do React
        Native com StyleSheet no mobile.
      </Typography>

      <Alert intent="warning" variant="soft" title="Nem todo componente existe nos dois">
        Tooltip, DataTable e Grid são exclusivos de haquick/web. Importá-los de haquick/native é
        erro de tipo e de compilação.
      </Alert>

      <Typography variant="body2" intent="neutral">
        haquick/tokens expõe a camada de decisão de design — paleta, escalas de raio, sombra e
        espaçamento, a montagem dos temas e a serialização deles para CSS. Não depende de React
        nem de DOM, então pode ser usada em um script de build.
      </Typography>

      <CodeBlock>{`import { SPACING, createTheme, generateThemeCSS } from 'haquick/tokens';

writeFileSync('tema.css', generateThemeCSS({ default: createTheme({ ... }) }));`}</CodeBlock>
    </Section>
  );
}
