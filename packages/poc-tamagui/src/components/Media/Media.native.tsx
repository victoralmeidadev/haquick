import { Image } from 'react-native';
import type { MediaProps } from './types';

export function Media({ src, alt, fit = 'cover' }: MediaProps) {
  return (
    <Image
      source={{ uri: src }}
      accessibilityLabel={alt}
      resizeMode={fit}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
