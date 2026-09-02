import { createTamagui } from '@tamagui/core';
import { config as defaultConfig } from '@tamagui/config/v3';
import { baseColors, defaultPaletteOptions, type PaletteOptions } from './palette';
import { defaultShape, type ShapeConfig } from './shape';
import { createAppTokens } from './tokens';
import {
  buildIntentThemes,
  createAppThemes,
  defaultSurfaces,
  type IntentColors,
  type SurfaceColors,
} from './themes';

export type ThemeOverride = {
  colors?: IntentColors;
  surfaces?: { light?: Partial<SurfaceColors>; dark?: Partial<SurfaceColors> };
};

export type CrossUIConfigInput = {
  /**
   * Cores por intenção. Aceita `'#hex'` (deriva light/dark/contrastText/hover/
   * press) ou o objeto com os slots na mão.
   *
   * Para ADICIONAR uma intenção nova, aumente `CustomIntents` — ver palette.ts.
   */
  colors?: IntentColors;
  /** De quais shades cada slot é derivado (hover, press, light, dark). */
  palette?: PaletteOptions;
  /** Fundo, texto, borda e cor de sombra, por tema. */
  surfaces?: { light?: Partial<SurfaceColors>; dark?: Partial<SurfaceColors> };
  /** `borderRadius` regera toda a escala `$radiusXs`..`$radiusXl`. */
  shape?: Partial<Pick<ShapeConfig, 'borderRadius'>>;
  /**
   * Temas nomeados extras, trocáveis em RUNTIME com `<Theme name="brand">`.
   * Cada um vira os sub-temas `light_<nome>` e `dark_<nome>` do Tamagui, então
   * continua respeitando o light/dark de fora.
   */
  themes?: Record<string, ThemeOverride>;
};

function mergeSurfaces(override: CrossUIConfigInput['surfaces']) {
  return {
    light: { ...defaultSurfaces.light, ...override?.light },
    dark: { ...defaultSurfaces.dark, ...override?.dark },
  };
}

// Equivalente ao `createTheme` do MUI: monta um config completo do Tamagui a
// partir de overrides parciais, sem precisar forkar o pacote.
//
// Estende o config padrão do Tamagui (fonts, animations, media queries já
// vêm testados para web + native) só trocando tokens e temas.
export function createCrossUIConfig(input: CrossUIConfigInput = {}) {
  const colors: IntentColors = { ...baseColors, ...input.colors };
  const paletteOptions = { ...defaultPaletteOptions, ...input.palette };
  const shape = { ...defaultShape, ...input.shape };
  const surfaces = mergeSurfaces(input.surfaces);

  const base = createAppThemes(colors, paletteOptions, surfaces);

  // Sub-temas nomeados: `light_brand` / `dark_brand` são o formato que o
  // Tamagui espera para <Theme name="brand"> herdar o light/dark do pai.
  const extraThemes: Record<string, Record<string, string>> = {};

  Object.entries(input.themes ?? {}).forEach(([name, override]) => {
    const themeColors: IntentColors = { ...colors, ...override.colors };
    const intentTheme = buildIntentThemes(themeColors, paletteOptions);
    const themeSurfaces = {
      light: { ...surfaces.light, ...override.surfaces?.light },
      dark: { ...surfaces.dark, ...override.surfaces?.dark },
    };

    extraThemes[`light_${name}`] = { ...themeSurfaces.light, ...intentTheme };
    extraThemes[`dark_${name}`] = { ...themeSurfaces.dark, ...intentTheme };
  });

  return createTamagui({
    ...defaultConfig,
    // Repassado explicitamente (e não só pelo spread) para o TypeScript
    // inferir os nomes das animações e habilitar a prop `animation`.
    // O driver certo por plataforma já vem do @tamagui/config/v3: CSS na web,
    // Animated no React Native.
    animations: defaultConfig.animations,
    tokens: createAppTokens(colors, shape, paletteOptions),
    themes: {
      ...defaultConfig.themes,
      light: { ...defaultConfig.themes.light, ...base.light },
      dark: { ...defaultConfig.themes.dark, ...base.dark },
      ...extraThemes,
    },
  });
}

export const config = createCrossUIConfig();

export type AppConfig = typeof config;

declare module '@tamagui/core' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
