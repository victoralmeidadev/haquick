import {
  baseColors,
  baseDarkColors,
  defaultPaletteOptions,
  type PaletteOptions,
} from './palette';
import {
  createAppThemes,
  defaultSurfaces,
  type IntentColors,
  type SurfaceColors,
} from './themes';
import { createRadiusTokens, defaultShape, type ShapeConfig } from './shape';
import {
  createShadowOpacityScale,
  createShadows,
  type ShadowConfig,
  type ShadowOpacityScale,
  type ShadowScale,
} from './shadows';

/** O que pode mudar entre claro e escuro. Tudo opcional: o que faltar herda. */
export type SchemeInput = {
  /** Cores só deste scheme. Substituem a intenção inteira vinda de `colors`. */
  colors?: IntentColors;
  /** Fundo, texto, borda e cor da sombra. Só o que for informado é sobrescrito. */
  surfaces?: Partial<SurfaceColors>;
};

export type ThemeConfigInput = {
  /** Cores das intenções, valendo nos dois schemes. Um hex deriva o resto; um objeto controla slot a slot. */
  colors?: IntentColors;
  /** Como os slots derivados (hover, press, soft...) saem da escala de shades. */
  palette?: PaletteOptions;
  /**
   * O que difere entre claro e escuro.
   *
   * Fica separado de `colors` porque em `IntentColorInput` as chaves `light` e
   * `dark` já significam outra coisa — os tons claro e escuro da MESMA cor,
   * usados como texto sobre superfície tingida.
   */
  schemes?: { light?: SchemeInput; dark?: SchemeInput };
  /** Raio base e espessuras. `borderRadius: 0` deixa tudo quadrado. */
  shape?: Partial<ShapeConfig>;
  /** Intensidade da escala de elevação. `intensity: 0` desliga as sombras. */
  shadows?: ShadowConfig;
};

export type ThemeConfig = {
  themes: ReturnType<typeof createAppThemes>;
  radii: ReturnType<typeof createRadiusTokens>;
  shape: ShapeConfig;
  shadows: ShadowScale;
  shadowOpacityScale: ShadowOpacityScale;
};

export function createTheme(input: ThemeConfigInput = {}): ThemeConfig {
  const shape: ShapeConfig = { ...defaultShape, ...input.shape };

  const surfaces = {
    light: { ...defaultSurfaces.light, ...input.schemes?.light?.surfaces },
    dark: { ...defaultSurfaces.dark, ...input.schemes?.dark?.surfaces },
  };

  const userColors = input.colors ?? {};
  const darkDefaults = Object.fromEntries(
    Object.entries(baseDarkColors).filter(([intent]) => !(intent in userColors))
  );

  return {
    themes: createAppThemes(
      { ...baseColors, ...userColors },
      { ...defaultPaletteOptions, ...input.palette },
      surfaces,
      {
        light: input.schemes?.light?.colors,
        dark: { ...darkDefaults, ...input.schemes?.dark?.colors },
      }
    ),
    radii: createRadiusTokens(shape),
    shape,
    shadows: createShadows(input.shadows),
    shadowOpacityScale: createShadowOpacityScale(input.shadows),
  };
}

/** O tema que vale quando o app não passa nenhum. */
export const defaultThemeConfig = createTheme();
