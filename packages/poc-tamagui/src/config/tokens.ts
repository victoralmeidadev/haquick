import { createTokens } from '@tamagui/core';
import { config as defaultConfig } from '@tamagui/config/v3';
import {
  baseColors,
  defaultPaletteOptions,
  resolveIntent,
  type ColorIntent,
  type PaletteOptions,
} from './palette';
import type { IntentColors } from './themes';
import { createRadiusTokens, defaultShape, type ShapeConfig } from './shape';

// Gera os tokens de cor (ex: $primary50 ... $primary900) a partir da paleta.
// Além dos tokens numéricos, expõe o "500" também com o nome semântico puro
// (ex: $primary) para ficar parecido com o palette.primary.main do MUI.
//
// Itera sobre as chaves recebidas (e não sobre uma lista fixa), então uma
// intenção nova adicionada em `createCrossUIConfig` ganha shades automaticamente.
export function createColorTokens(
  colors: IntentColors,
  options: Required<PaletteOptions> = defaultPaletteOptions
) {
  const tokens: Record<string, string> = {};

  (Object.keys(colors) as ColorIntent[]).forEach((intent) => {
    const { shades, main } = resolveIntent(colors[intent]!, options);
    Object.entries(shades).forEach(([shade, value]) => {
      tokens[`${intent}${shade}`] = value;
    });
    tokens[intent] = main;
  });

  return tokens;
}

// Mescla cores e raios customizados por cima dos tokens padrão do Tamagui.
// Os raios entram no grupo `radius`, que é onde o Tamagui resolve `$token` em
// `borderRadius` — por isso `borderRadius="$radiusMd"` acompanha o `shape`.
export function createAppTokens(
  colors: IntentColors = baseColors,
  shape: ShapeConfig = defaultShape,
  options: Required<PaletteOptions> = defaultPaletteOptions
) {
  return createTokens({
    ...defaultConfig.tokens,
    color: {
      ...defaultConfig.tokens.color,
      ...createColorTokens(colors, options),
    },
    radius: {
      ...defaultConfig.tokens.radius,
      ...createRadiusTokens(shape),
    },
  });
}

export const colorTokens = createColorTokens(baseColors);
export const tokens = createAppTokens();
