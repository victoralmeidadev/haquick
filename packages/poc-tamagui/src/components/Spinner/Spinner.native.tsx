import { ActivityIndicator } from 'react-native';
import { useTheme } from '@tamagui/core';
import type { SpinnerProps } from './types';

// Versão native: o ActivityIndicator já é o spinner idiomático de cada
// plataforma (iOS e Android desenham o seu). Cores vêm do tema via useTheme(),
// porque o ActivityIndicator não lê tokens do Tamagui.
export function Spinner({ size = 'sm', intent = 'primary', color }: SpinnerProps) {
  const theme = useTheme();
  const resolved = color ?? ((theme as any)[intent]?.val as string);

  return <ActivityIndicator size={size === 'lg' ? 'large' : 'small'} color={resolved} />;
}
