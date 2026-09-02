import type { SpaceStep } from '../tokens/spacing';

export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export const ALIGN_CSS: Record<Align, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

export const JUSTIFY_CSS: Record<Justify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

export type StackProps = {
  children?: React.ReactNode;
  /** Passo da escala de espaçamento entre os filhos. */
  gap?: SpaceStep;
  padding?: SpaceStep;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
  /**
   * Cresce para ocupar o espaço livre. Usa `flex-grow` e NÃO `flex: 1` — este
   * último zera o flex-basis e deixa o container ficar menor que o conteúdo,
   * o que já causou dois bugs na versão anterior (ver README do cross-ui-v0).
   */
  fill?: boolean;
  /**
   * Aceita px ou porcentagem. O tipo é a INTERSEÇÃO do que as duas plataformas
   * aceitam: a web engoliria qualquer string CSS ('50vw', 'calc(...)'), mas o
   * React Native só entende número ou porcentagem. Tipar pela web deixaria
   * passar valor que quebra no mobile só em runtime.
   */
  width?: number | `${number}%`;
  maxWidth?: number;
};

export type ScreenProps = {
  children?: React.ReactNode;
  maxWidth?: number;
  padded?: boolean;
  /** Só afeta o native; na web quem rola é o documento. */
  scroll?: boolean;
};

/** Padding padrão da tela, em px — o mesmo nos dois lados. */
export const SCREEN_PADDING = 16;
