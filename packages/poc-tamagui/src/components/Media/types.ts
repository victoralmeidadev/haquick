export type MediaProps = {
  /** URL da imagem. */
  src: string;
  /** Texto alternativo — vira `alt` na web e `accessibilityLabel` no native. */
  alt?: string;
  /** Como a imagem preenche o container. */
  fit?: 'cover' | 'contain';
};
