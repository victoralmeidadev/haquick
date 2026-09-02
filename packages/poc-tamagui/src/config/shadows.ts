// Escala de elevação — o `shadows` do `createTheme` do MUI, adaptado.
//
// A *cor* da sombra é token de tema (`$shadowColor`), então light e dark podem
// ter sombras diferentes e trocar em runtime. A *geometria* (raio, deslocamento,
// opacidade) é constante de build, porque o Tamagui não tem categoria de token
// para essas props — mesma divisão do `shape`. Ver README.
export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type ShadowStyle = {
  shadowColor: string;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset: { width: number; height: number };
  /** Sombra do Android. `elevationAndroid` (e não `elevation`) é o nome que o Tamagui tipa. */
  elevationAndroid: number;
};

export type ShadowScale = Record<ElevationLevel, ShadowStyle | Record<string, never>>;

// Multiplicador global, no espírito do `spacing` do MUI: 0 desliga todas as
// sombras do design system; 1.5 deixa tudo mais dramático.
export type ShadowConfig = {
  intensity: number;
};

export const defaultShadowConfig: ShadowConfig = { intensity: 1 };

const LEVELS = {
  1: { opacity: 0.06, radius: 3, offsetY: 1, android: 1 },
  2: { opacity: 0.08, radius: 8, offsetY: 2, android: 2 },
  3: { opacity: 0.1, radius: 14, offsetY: 4, android: 4 },
  4: { opacity: 0.12, radius: 22, offsetY: 8, android: 8 },
  5: { opacity: 0.16, radius: 32, offsetY: 12, android: 12 },
} as const;

export function createShadows(config: ShadowConfig = defaultShadowConfig): ShadowScale {
  const scale = { 0: {} } as ShadowScale;

  (Object.keys(LEVELS) as unknown as (keyof typeof LEVELS)[]).forEach((level) => {
    const { opacity, radius, offsetY, android } = LEVELS[level];
    scale[level as ElevationLevel] = {
      shadowColor: '$shadowColor',
      shadowOpacity: opacity * config.intensity,
      shadowRadius: radius * config.intensity,
      shadowOffset: { width: 0, height: offsetY * config.intensity },
      elevationAndroid: Math.round(android * config.intensity),
    };
  });

  return scale;
}

export const shadows = createShadows();
