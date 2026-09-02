export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type ShadowStyle = {
  shadowColor: string;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset: { width: number; height: number };
  /**
   * Sombra do Android — a única que o Android desenha; as props shadow* são
   * exclusivas do iOS. O nome é `elevation` porque é assim que o React Native
   * tipa em ViewStyle; na versão Tamagui chamava-se `elevationAndroid`, que o
   * React Native ignora silenciosamente.
   */
  elevation: number;
};

export type ShadowScale = Record<ElevationLevel, ShadowStyle | Record<string, never>>;

export type ShadowConfig = {
  intensity?: number;
  /**
   * Fator de opacidade por scheme, aplicado depois de `intensity`.
   *
   * Existe porque as duas cores de sombra não pesam igual: a opacidade que mal
   * aparece em preto sobre branco vira halo em branco sobre preto. Fica no
   * tema, e não chumbado no gerador de CSS, para um tema com sombra colorida
   * poder calibrar a sua.
   */
  opacityScale?: { light?: number; dark?: number };
};

/** `opacityScale` já resolvido — os dois schemes sempre presentes. */
export type ShadowOpacityScale = { light: number; dark: number };

export const defaultShadowConfig: Required<ShadowConfig> = {
  intensity: 1,
  opacityScale: { light: 1, dark: 0.9 },
};

export function createShadowOpacityScale(config: ShadowConfig = {}): ShadowOpacityScale {
  return {
    light: config.opacityScale?.light ?? defaultShadowConfig.opacityScale.light!,
    dark: config.opacityScale?.dark ?? defaultShadowConfig.opacityScale.dark!,
  };
}

const LEVELS = {
  1: { opacity: 0.06, radius: 3, offsetY: 1, android: 1 },
  2: { opacity: 0.08, radius: 8, offsetY: 2, android: 2 },
  3: { opacity: 0.1, radius: 14, offsetY: 4, android: 4 },
  4: { opacity: 0.12, radius: 22, offsetY: 8, android: 8 },
  5: { opacity: 0.16, radius: 32, offsetY: 12, android: 12 },
} as const;

export function createShadows(config: ShadowConfig = {}): ShadowScale {
  const intensity = config.intensity ?? defaultShadowConfig.intensity;
  const scale = { 0: {} } as ShadowScale;

  (Object.keys(LEVELS) as unknown as (keyof typeof LEVELS)[]).forEach((level) => {
    const { opacity, radius, offsetY, android } = LEVELS[level];
    scale[level as ElevationLevel] = {
      shadowColor: '$shadowColor',
      shadowOpacity: opacity * intensity,
      shadowRadius: radius * intensity,
      shadowOffset: { width: 0, height: offsetY * intensity },
      elevation: Math.round(android * intensity),
    };
  });

  return scale;
}

export const shadows = createShadows();
