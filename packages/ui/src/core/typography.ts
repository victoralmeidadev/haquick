export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

export type TextStyleTokens = {
  size: number;
  line: number;
  weight: '400' | '500' | '600' | '700' | '800';
  transform?: 'uppercase';
  spacing?: number;
};

export const TYPOGRAPHY: Record<TypographyVariant, TextStyleTokens> = {
  h1: { size: 40, line: 48, weight: '700' },
  h2: { size: 32, line: 40, weight: '700' },
  h3: { size: 28, line: 36, weight: '700' },
  h4: { size: 24, line: 32, weight: '600' },
  h5: { size: 20, line: 28, weight: '600' },
  h6: { size: 17, line: 24, weight: '600' },
  subtitle1: { size: 16, line: 24, weight: '500' },
  subtitle2: { size: 14, line: 20, weight: '500' },
  body1: { size: 15, line: 22, weight: '400' },
  body2: { size: 13, line: 20, weight: '400' },
  caption: { size: 12, line: 16, weight: '400' },
  overline: { size: 11, line: 16, weight: '600', transform: 'uppercase', spacing: 1 },
};

/** Qual tag HTML cada variante vira na web — semântica, não só aparência. */
export const TAG_BY_VARIANT: Record<TypographyVariant, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'p',
  subtitle2: 'p',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
};
