
export type ShadeScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  let r: number;
  let g: number;
  let b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (v: number) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const LIGHTNESS_BY_SHADE: Record<keyof ShadeScale, number | null> = {
  50: 0.95,
  100: 0.9,
  200: 0.8,
  300: 0.7,
  400: 0.6,
  500: null, 
  600: 0.4,
  700: 0.3,
  800: 0.2,
  900: 0.1,
};

export function createShades(baseHex: string): ShadeScale {
  const [h, s] = hexToHsl(baseHex);

  const entries = (Object.keys(LIGHTNESS_BY_SHADE) as unknown as (keyof ShadeScale)[]).map(
    (shade) => {
      const targetLightness = LIGHTNESS_BY_SHADE[shade];
      const value = targetLightness === null ? baseHex : hslToHex(h, s, targetLightness);
      return [shade, value] as const;
    }
  );

  return Object.fromEntries(entries) as ShadeScale;
}

export function getContrastText(hex: string, light = '#FFFFFF', dark = '#0B0B0C'): string {
  const [, , l] = hexToHsl(hex);
  return l > 0.6 ? dark : light;
}

export interface BaseIntents {
  primary: true;
  secondary: true;
  success: true;
  warning: true;
  error: true;
  info: true;
  neutral: true;
}

export interface CustomIntents {}

export type ColorIntent = (keyof BaseIntents | keyof CustomIntents) & string;

export type IntentColorInput =
  | string
  | {
      main: string;
      light?: string;
      dark?: string;
      contrastText?: string;
      /** Fundo no hover. Default: shade 600. */
      hover?: string;
      /** Fundo no press/active. Default: shade 700. */
      press?: string;
    };

export type ResolvedIntent = {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
  hover: string;
  press: string;
  shades: ShadeScale;
};

export type PaletteOptions = {
  lightShade?: keyof ShadeScale;
  darkShade?: keyof ShadeScale;
  hoverShade?: keyof ShadeScale;
  pressShade?: keyof ShadeScale;
  /**
   * Shades do fundo tingido da variante `soft`, por modo. É o único par que
   * precisa ser diferente entre light e dark: um tom claríssimo da cor funciona
   * como fundo no tema light e some no dark, e vice-versa.
   */
  softShade?: { light: keyof ShadeScale; dark: keyof ShadeScale };
  softHoverShade?: { light: keyof ShadeScale; dark: keyof ShadeScale };
  /** Par usado pelo cálculo de contraste automático. */
  contrastText?: { light: string; dark: string };
};

export const defaultPaletteOptions: Required<PaletteOptions> = {
  lightShade: 300,
  darkShade: 700,
  hoverShade: 600,
  pressShade: 700,
  softShade: { light: 50, dark: 800 },
  softHoverShade: { light: 100, dark: 700 },
  contrastText: { light: '#FFFFFF', dark: '#0B0B0C' },
};

export function resolveIntent(
  input: IntentColorInput,
  options: Required<PaletteOptions> = defaultPaletteOptions
): ResolvedIntent {
  const spec = typeof input === 'string' ? { main: input } : input;
  const shades = createShades(spec.main);

  return {
    main: spec.main,
    shades,
    light: spec.light ?? shades[options.lightShade],
    dark: spec.dark ?? shades[options.darkShade],
    contrastText:
      spec.contrastText ??
      getContrastText(spec.main, options.contrastText.light, options.contrastText.dark),
    hover: spec.hover ?? shades[options.hoverShade],
    press: spec.press ?? shades[options.pressShade],
  };
}

export const baseColors: Record<keyof BaseIntents, string> = {
  primary: '#3B5BDB',
  secondary: '#0F766E',
  success: '#15803D',
  warning: '#B45309',
  error: '#DC2626',
  info: '#0E7490',
  neutral: '#64748B',
};

/**
 * As mesmas intenções no tema escuro: tons mais claros, com hover e press
 * subindo em vez de descer. Valem só onde o app não informou a cor em `colors`.
 */
export const baseDarkColors: Record<keyof BaseIntents, IntentColorInput> = {
  primary: { main: '#7C93FF', hover: '#93A6FF', press: '#A9B8FF' },
  secondary: { main: '#2DD4BF', hover: '#5EEAD4', press: '#99F6E4' },
  success: { main: '#4ADE80', hover: '#86EFAC', press: '#BBF7D0' },
  warning: { main: '#FBBF24', hover: '#FCD34D', press: '#FDE68A' },
  error: { main: '#F87171', hover: '#FCA5A5', press: '#FECACA' },
  info: { main: '#22D3EE', hover: '#67E8F9', press: '#A5F3FC' },
  neutral: { main: '#94A3B8', hover: '#B4BFCD', press: '#CBD5E1' },
};

export const intents = Object.keys(baseColors) as ColorIntent[];
