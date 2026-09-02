
export type ShapeConfig = {
  /**
   * Raio base. Toda a escala `$radiusXs`..`$radiusXl` deriva dele por
   * multiplicação — equivale ao `shape.borderRadius` do MUI.
   * `0` deixa o design system inteiro quadrado.
   */
  borderRadius: number;
  /** Espessura de borda de superfícies: Card, Input, List, Button outline... */
  borderWidth: number;
  /**
   * Espessura de borda de controles (Checkbox, Radio). Fica separada porque
   * controle pequeno precisa de borda mais pesada que superfície grande.
   */
  controlBorderWidth: number;
};

export const defaultShape: ShapeConfig = {
  borderRadius: 8,
  borderWidth: 1,
  controlBorderWidth: 2,
};

const RADIUS_STEPS = {
  radiusNone: 0,
  radiusXs: 0.5,
  radiusSm: 0.75,
  radiusMd: 1,
  radiusLg: 1.5,
  radiusXl: 2,
} as const;

/** Valor de "pílula/círculo" — grande o bastante para arredondar por completo. */
export const RADIUS_FULL = 9999;

export function createRadiusTokens(shape: ShapeConfig) {
  const tokens: Record<string, number> = {};

  for (const [name, multiplier] of Object.entries(RADIUS_STEPS)) {
    tokens[name] = Math.round(shape.borderRadius * multiplier);
  }

  tokens.radiusFull = RADIUS_FULL;

  return tokens;
}

export const shape = defaultShape;
