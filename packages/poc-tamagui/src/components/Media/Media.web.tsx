import type { MediaProps } from './types';

// Imagem que preenche o container — quem define tamanho é quem envolve.
// Na web é um <img> puro, para o pacote não exigir react-native-web.
export function Media({ src, alt, fit = 'cover' }: MediaProps) {
  return (
    <img
      src={src}
      alt={alt ?? ''}
      style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }}
    />
  );
}
