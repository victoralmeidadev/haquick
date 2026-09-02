import { createRoot } from 'react-dom/client';
import 'haquick/styles.css';
import { Button, Card, Grid, ThemeProvider, Typography, createTheme } from 'haquick/web';
import { SPACING, generateThemeCSS } from 'haquick/tokens';

console.log('espaçamento 4 =', SPACING[4], '| CSS do tema:', generateThemeCSS().length, 'bytes');

const themes = {
  default: createTheme(),
  natal: createTheme({
    colors: { primary: '#C8102E' },
    schemes: { dark: { colors: { primary: '#F2617A' } } },
  }),
};

createRoot(document.getElementById('root')!).render(
  <ThemeProvider themes={themes} defaultMode="system">
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card raised={2} gap={3} padding={4}>
          <Typography variant="h6">Instalado do tarball</Typography>
          <Button intent="primary">Confirmar</Button>
        </Card>
      </Grid>
    </Grid>
  </ThemeProvider>
);
