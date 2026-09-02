import {
  baseColors,
  defaultPaletteOptions,
  resolveIntent,
  type ColorIntent,
  type IntentColorInput,
  type PaletteOptions,
} from './palette';

export type SurfaceColors = {
  background: string;
  backgroundHover: string;
  backgroundPress: string;
  color: string;
  colorHover: string;
  borderColor: string;
  /**
   * Cor base das sombras.
   *
   * No tema claro é escura, como se espera. No escuro é CLARA: preto sobre
   * fundo quase preto não produz contraste nenhum, e é o contraste que
   * comunica que a superfície está acima das outras.
   */
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
    shadowColor: '#FFFFFF',
  },
};

export type IntentColors = Partial<Record<ColorIntent, IntentColorInput>>;

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

/**
 * Temas concretos dos dois schemes.
 *
 * `schemeColors` sobrescreve intenções em um scheme só — é o caminho para uma
 * marca que fica ilegível no escuro. A substituição é por intenção inteira, e
 * não slot a slot: quem passa `{ primary: '#F472B6' }` no escuro recebe hover,
 * press e contrastText derivados dessa cor, não os da `primary` de fora.
 */
export function createAppThemes(
  colors: IntentColors = baseColors,
  options: Required<PaletteOptions> = defaultPaletteOptions,
  surfaces: { light: SurfaceColors; dark: SurfaceColors } = defaultSurfaces,
  schemeColors: { light?: IntentColors; dark?: IntentColors } = {}
) {
  return {
    light: {
      ...surfaces.light,
      ...buildIntentThemes({ ...colors, ...schemeColors.light }, options, 'light'),
    },
    dark: {
      ...surfaces.dark,
      ...buildIntentThemes({ ...colors, ...schemeColors.dark }, options, 'dark'),
    },
  };
}

const defaultThemes = createAppThemes();

export const lightTheme = defaultThemes.light;
export const darkTheme = defaultThemes.dark;
