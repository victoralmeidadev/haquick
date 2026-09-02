import type { Size } from './types';

export const BUTTON_SIZES: Record<Size, { padY: number; padX: number; font: number; line: number }> =
  {
    sm: { padY: 6, padX: 12, font: 13, line: 18 },
    md: { padY: 10, padX: 16, font: 15, line: 20 },
    lg: { padY: 14, padX: 20, font: 17, line: 24 },
  };

export const CHECKBOX_SIZES: Record<Size, number> = { sm: 16, md: 20, lg: 24 };

export const CHECKBOX_LABEL_FONT: Record<Size, number> = { sm: 13, md: 15, lg: 17 };

/**
 * Qual chave do tema cada variante usa, por papel visual.
 *
 * Os valores são nomes de slot do tema (não cores), porque a resolução para
 * cor concreta acontece em runtime: no native pelo objeto de tema, na web pela
 * CSS custom property de mesmo nome. É o que permite a mesma decisão valer nas
 * duas plataformas sem um motor de estilo em comum.
 */
export const VARIANT_SLOTS: Record<
  Exclude<import('./types').SurfaceVariant, never>,
  { bg: string | null; fg: string; border: string | null }
> = {
  solid: { bg: '', fg: 'ContrastText', border: '' },
  soft: { bg: 'Soft', fg: 'SoftText', border: 'Soft' },
  outline: { bg: null, fg: '', border: '' },
  ghost: { bg: null, fg: '', border: null },
};

/** Monta a chave do tema: ('primary', 'Hover') -> 'primaryHover'. */
export function slot(intent: string, suffix: string | null): string | null {
  return suffix === null ? null : `${intent}${suffix}`;
}

export const AVATAR_SIZES: Record<Size, { box: number; font: number }> = {
  sm: { box: 28, font: 11 },
  md: { box: 40, font: 15 },
  lg: { box: 56, font: 20 },
};

export const ICON_BUTTON_SIZES: Record<Size, { box: number; font: number }> = {
  sm: { box: 28, font: 14 },
  md: { box: 36, font: 17 },
  lg: { box: 44, font: 20 },
};

export const SWITCH_SIZES: Record<Size, { track: number; height: number; thumb: number }> = {
  sm: { track: 32, height: 18, thumb: 14 },
  md: { track: 44, height: 24, thumb: 18 },
  lg: { track: 56, height: 30, thumb: 24 },
};

export const RADIO_SIZES: Record<Size, number> = { sm: 16, md: 20, lg: 24 };

export const PROGRESS_HEIGHT: Record<Size, number> = { sm: 4, md: 8, lg: 12 };

export const CHIP_SIZES = {
  sm: { padY: 2, padX: 8, font: 12, line: 16 },
  md: { padY: 4, padX: 12, font: 13, line: 18 },
} as const;

export const TIMELINE_DOT: Record<Size, number> = { sm: 10, md: 14, lg: 18 };

export const SPACER_SIZES = { xs: 2, sm: 8, md: 16, lg: 32, xl: 48 } as const;

export const LINK_FONT: Record<Size, { size: number; line: number }> = {
  sm: { size: 13, line: 20 },
  md: { size: 15, line: 22 },
  lg: { size: 17, line: 24 },
};

export const LABEL_FONT: Record<Size, { size: number; line: number }> = {
  sm: { size: 12, line: 16 },
  md: { size: 13, line: 18 },
  lg: { size: 15, line: 20 },
};

/** Durações das transições, em ms. */
export const DURATIONS = { quick: 150, medium: 300, slow: 450 } as const;
export type Speed = keyof typeof DURATIONS;
