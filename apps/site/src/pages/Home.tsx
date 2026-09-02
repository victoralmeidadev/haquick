import { Button, Typography } from 'haquick/web';
import { CodeBlock } from '../components/CodeBlock';
import { InstallCommand } from '../components/InstallCommand';
import { Showcase } from '../components/Showcase';
import metrics from '../metrics.json';
import type { Route } from '../routes';

const FEATURES: [string, string][] = [
  ['Uma API, duas plataformas', 'As mesmas props em React e React Native. Muda só o import.'],
  ['Sem passo de build', 'Vite e Metro padrão, sem plugin nem compilador.'],
  ['HTML semântico', 'Typography vira h1–h6, Link com href vira <a>, Badge vira <span>.'],
  ['Acessibilidade pelo Radix', 'Dialog, Checkbox e Tooltip com foco preso, Esc e ARIA corretos.'],
  ['Claro, escuro e temas nomeados', 'Dois eixos independentes, com opção de seguir o sistema.'],
  ['Intenção × variante', 'Sete cores semânticas × quatro preenchimentos, independentes entre si.'],
  ['Temas e cores próprias', 'createTheme monta o seu, com intenções novas e tipadas.'],
  ['Controlado ou não', 'Checkbox, Switch e RadioGroup aceitam os dois modos.'],
];

const EXAMPLE = `import { Button, Card, Typography } from 'haquick/web';
//                                          ~~~~~~~~~~~~
// no app mobile, a única mudança:          'haquick/native'

export function Profile() {
  return (
    <Card raised={2} gap={3}>
      <Typography variant="h6">Ana Silva</Typography>
      <Button intent="primary">Seguir</Button>
    </Card>
  );
}`;

const STATS: [string, string][] = [
  [String(metrics.components.web), 'componentes na web'],
  [String(metrics.components.native), 'no React Native'],
  ['7 × 4', 'intenções × variantes'],
  ['0', 'passos de build'],
];

export function Home({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <main className="page">
      {/* Hero centralizado e curto: o que é, não o que representa. */}
      <div className="hero">
        <h1 className="hero-title">Haquick</h1>
        <p className="hero-sub">
          Biblioteca de componentes para React e React Native. As mesmas props nas duas
          plataformas, a partir de um único pacote.
        </p>
        <div className="hero-actions">
          <Button onPress={() => onNavigate('docs')}>Começar</Button>
          <Button variant="outline" intent="neutral" onPress={() => onNavigate('docs')}>
            Componentes
          </Button>
        </div>
      </div>

      {/* Componentes reais antes de qualquer texto sobre eles. */}
      <Showcase />

      <div className="stats">
        {STATS.map(([value, label]) => (
          <div key={label} className="stat">
            <span className="stat-value">{value}</span>
            <Typography variant="caption" intent="neutral">
              {label}
            </Typography>
          </div>
        ))}
      </div>

      {/* Instalação, logo cedo — é o que a pessoa veio fazer. */}
      <div className="block">
        <Typography variant="h5">Instalação</Typography>
        <InstallCommand />
        <div className="prose">
          <Typography variant="body2" intent="neutral">
            Importe a folha de estilo uma vez no ponto de entrada. O tema padrão já vem
            aplicado; não há configuração obrigatória.
          </Typography>
        </div>
        <CodeBlock>{`import 'haquick/styles.css';`}</CodeBlock>
      </div>

      {/* Import: a única diferença entre as plataformas. */}
      <div className="block">
        <Typography variant="h5">Um import, duas plataformas</Typography>
        <div className="prose">
          <Typography variant="body2" intent="neutral">
            Nenhuma prop muda entre web e mobile. O que muda é a implementação por trás: na web
            um elemento HTML com CSS, no mobile um primitivo do React Native com StyleSheet.
          </Typography>
        </div>
        <CodeBlock>{EXAMPLE}</CodeBlock>
      </div>

      {/* Recursos: uma linha cada. */}
      <div className="block">
        <Typography variant="h5">Recursos</Typography>
        <div className="features">
          {FEATURES.map(([title, text]) => (
            <div key={title} className="feature">
              <Typography variant="subtitle2">{title}</Typography>
              <Typography variant="body2" intent="neutral">
                {text}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      {/* O que a pessoa precisa saber antes de escolher, não depois. */}
      <div className="block">
        <Typography variant="h5">Três componentes só existem na web</Typography>
        <div className="prose">
          <Typography variant="body2" intent="neutral">
            Tooltip, DataTable e Grid são exclusivos de haquick/web — dependem de hover ou de
            largura de tela. Importá-los de haquick/native é erro de tipo e de compilação.
          </Typography>
        </div>
      </div>
    </main>
  );
}
