import { createTheme } from 'haquick/web';

declare module 'haquick/tokens' {
  interface CustomIntents {
    brand: true;
  }
}

export const brandTheme = createTheme({
  colors: {
    brand: '#DB2777',
    primary: {
      main: '#DB2777',
      hover: '#BE185D',
      press: '#9D174D',
      contrastText: '#FFFFFF',
    },
    secondary: '#7C3AED',
  },
  schemes: {
    light: { surfaces: { background: '#FFF7FB', borderColor: '#F5D0E4' } },
    dark: { surfaces: { background: '#1A0A12', borderColor: '#4A1D33' } },
  },
});

export const defaultPlusBrand = createTheme({
  colors: { brand: '#DB2777' },
});
