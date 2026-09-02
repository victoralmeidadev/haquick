import {
  baseColors,
  defaultPaletteOptions,
  resolveIntent,
  type ColorIntent,
  type IntentColorInput,
  type PaletteOptions,
} from './palette';

// Cores "de superfície" — o que no MUI seria `palette.background`,
// `palette.text` e `palette.divider`. Ficam fora das intenções porque não têm
// escala de shades: são valores diretos por tema.
export type SurfaceColors = {
  background: string;
  backgroundHover: string;
  backgroundPress: string;
  color: string;
  colorHover: string;
  borderColor: string;
  /** Cor base das sombras — ver config/shadows.ts. */
  shadowColor: string;
};

export const defaultSurfaces: { light: SurfaceColors; dark: SurfaceColors } = {
  light: {
    background: '#FFFFFF',
    backgroundHover: '#F5F5F6',
    backgroundPress: '#EAEAEC',
    color: '#0B0B0C',
    colorHover: '#0B0B0C',
    borderColor: '#E4E4E7',
    shadowColor: '#0B0B0C',
  },
  dark: {
    background: '#0B0B0C',
    backgroundHover: '#1A1A1C',
    backgroundPress: '#242426',
    color: '#F5F5F6',
    colorHover: '#FFFFFF',
    borderColor: '#2A2A2E',
    shadowColor: '#000000',
  },
};

export type IntentColors = Partial<Record<ColorIntent, IntentColorInput>>;

// Estrutura inspirada no palette do MUI (main/light/dark/contrastText),
// só que "achatada" em chaves porque temas do Tamagui são mapas planos.
// Ex: palette.primary.main  -> theme.primary
//     palette.primary.light -> theme.primaryLight
//     palette.primary.dark  -> theme.primaryDark
//     palette.primary.contrastText -> theme.primaryContrastText
//
// `mode` existe por causa da variante `soft` (superfície tingida): o fundo e o
// texto dela são os únicos slots que precisam ser DIFERENTES entre light e dark.
// Um tom claríssimo da cor serve de fundo no tema light e some no dark.
// É aqui que `light` e `dark` ganham função: viram o texto legível sobre esse
// fundo — o mesmo papel que têm no Alert e no Chip do MUI.
export function buildIntentThemes(
  colors: IntentColors,
  options: Required<PaletteOptions> = defaultPaletteOptions,
  mode: 'light' | 'dark' = 'light'
) {
  const theme: Record<string, string> = {};

  (Object.keys(colors) as ColorIntent[]).forEach((intent) => {
    const resolved = resolveIntent(colors[intent]!, options);
    theme[intent] = resolved.main;
    theme[`${intent}Light`] = resolved.light;
    theme[`${intent}Dark`] = resolved.dark;
    theme[`${intent}ContrastText`] = resolved.contrastText;
    theme[`${intent}Hover`] = resolved.hover;
    theme[`${intent}Press`] = resolved.press;

    theme[`${intent}Soft`] = resolved.shades[options.softShade[mode]];
    theme[`${intent}SoftHover`] = resolved.shades[options.softHoverShade[mode]];
    theme[`${intent}SoftText`] = mode === 'dark' ? resolved.light : resolved.dark;
  });

  return theme;
}

export function createAppThemes(
  colors: IntentColors = baseColors,
  options: Required<PaletteOptions> = defaultPaletteOptions,
  surfaces: { light: SurfaceColors; dark: SurfaceColors } = defaultSurfaces
) {
  return {
    light: { ...surfaces.light, ...buildIntentThemes(colors, options, 'light') },
    dark: { ...surfaces.dark, ...buildIntentThemes(colors, options, 'dark') },
  };
}

const defaultThemes = createAppThemes();

export const lightTheme = defaultThemes.light;
export const darkTheme = defaultThemes.dark;
