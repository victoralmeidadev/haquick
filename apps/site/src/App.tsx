import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from 'haquick/web';
import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { Docs } from './pages/Docs';
import { DEFAULT_SECTION } from './pages/docs/nav';
import { readRoute, writeRoute, type AppLocation, type Route } from './routes';

const THEMES = {
  default: createTheme(),
  natal: createTheme({
    colors: { primary: '#C8102E', secondary: '#046A38' },
    schemes: {
      light: {
        surfaces: { background: '#FFF8F5', backgroundHover: '#FBE9E3', borderColor: '#EFD6CE' },
      },
      dark: {
        colors: { primary: '#F2617A' },
        surfaces: {
          background: '#120A0A',
          backgroundHover: '#1D1010',
          borderColor: '#3A2020',
          shadowColor: '#FFD9A8',
        },
      },
    },
  }),
};

export function App() {
  const [local, setLocal] = useState<AppLocation>(readRoute);

  useEffect(() => {
    const onHashChange = () => setLocal(readRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (next: AppLocation) => {
    writeRoute(next);
    setLocal(next);
    if (!next.anchor) window.scrollTo({ top: 0 });
  };

  return (
    <ThemeProvider themes={THEMES} defaultMode="system">
      <div className="shell">
        <Nav route={local.route} onNavigate={(route: Route) => navigate({ route })} />

        {local.route === 'docs' ? (
          <Docs
            section={local.section ?? DEFAULT_SECTION}
            anchor={local.anchor}
            onNavigate={(section, anchor) => navigate({ route: 'docs', section, anchor })}
          />
        ) : (
          <Home onNavigate={(route) => navigate({ route })} />
        )}
      </div>
    </ThemeProvider>
  );
}
