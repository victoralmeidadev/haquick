// Geometria do design system — o equivalente ao `shape` do `createTheme` do MUI.
// É daqui que sai a "borda de tudo": nenhum componente escreve um raio ou uma
// espessura literal, todos apontam para a escala gerada abaixo.

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

// Multiplicadores do raio base. Mexer aqui muda a *proporção* entre os degraus;
// mexer em `borderRadius` muda a escala inteira de uma vez.
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

  // `radiusFull` também é token (e não um 999 solto) para dar pra deixar
  // até as pílulas quadradas passando `radiusFull: 0` num tema customizado.
  tokens.radiusFull = RADIUS_FULL;

  return tokens;
}

// Espessuras são constantes de build, e não tokens: o Tamagui só resolve `$token`
// em `borderWidth` se a prop pertencer a alguma categoria de token — e
// `borderWidth` não pertence a nenhuma (só `borderRadius`, `width/height`,
// `zIndex` e as props de cor pertencem). Então os componentes importam este
// objeto direto. Ver README, "Customizando a geometria".
export const shape = defaultShape;
