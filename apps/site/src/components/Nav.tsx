import { Badge, Button, IconButton, useThemeMode } from 'haquick/web';
import type { Route } from '../routes';

export function Nav({ route, onNavigate }: { route: Route; onNavigate: (route: Route) => void }) {
  const { resolvedMode, toggle } = useThemeMode();

  return (
    <header className="nav">
      <div className="nav-inner">
        <button
          type="button"
          className="nav-brand"
          aria-label="Ir para a home"
          onClick={() => onNavigate('home')}
        >
          {/* Marca: quadrado com a inicial, em vez de só texto. */}
          <span className="nav-mark" aria-hidden="true">
            H
          </span>
          <span className="nav-name">Haquick</span>
          <Badge intent="neutral">v0.1.0</Badge>
        </button>

        <div className="nav-spacer" />

        <Button
          size="sm"
          variant={route === 'home' ? 'soft' : 'ghost'}
          intent={route === 'home' ? 'primary' : 'neutral'}
          onPress={() => onNavigate('home')}
        >
          Home
        </Button>
        <Button
          size="sm"
          variant={route === 'docs' ? 'soft' : 'ghost'}
          intent={route === 'docs' ? 'primary' : 'neutral'}
          onPress={() => onNavigate('docs')}
        >
          Documentação
        </Button>

        <IconButton
          label={resolvedMode === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          size="sm"
          onPress={toggle}
        >
          {resolvedMode === 'dark' ? '☀' : '☾'}
        </IconButton>
      </div>
    </header>
  );
}
