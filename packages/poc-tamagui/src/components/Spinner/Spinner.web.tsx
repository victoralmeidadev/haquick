import { useTheme } from '@tamagui/core';
import { SPINNER_SIZE, type SpinnerProps } from './types';

// Versão web: anel girando em CSS puro.
//
// Não usa o ActivityIndicator do React Native de propósito — o pacote não deve
// exigir `react-native-web` num app React comum. O `@tamagui/core` sozinho já
// renderiza DOM, então só os componentes que dependiam de um primitivo do RN
// (este, Input e Avatar) precisam de versão por plataforma.
const ANIMATION_NAME = 'crossui-spin';

let keyframesInjected = false;

function ensureKeyframes() {
  // `typeof document` protege SSR (Next, Remix), onde não há head para injetar.
  if (keyframesInjected || typeof document === 'undefined') return;
  keyframesInjected = true;

  const style = document.createElement('style');
  style.textContent = `@keyframes ${ANIMATION_NAME}{to{transform:rotate(360deg)}}`;
  document.head.appendChild(style);
}

export function Spinner({ size = 'sm', intent = 'primary', color }: SpinnerProps) {
  const theme = useTheme();
  ensureKeyframes();

  const resolved = color ?? ((theme as any)[intent]?.val as string);
  const box = SPINNER_SIZE[size];
  const thickness = size === 'lg' ? 3 : 2;

  return (
    <div
      role="progressbar"
      aria-label="Carregando"
      style={{
        width: box,
        height: box,
        borderRadius: '50%',
        border: `${thickness}px solid currentColor`,
        // A borda de cima colorida sobre as demais transparentes é o que
        // cria a "fatia" que se percebe girando.
        borderTopColor: resolved,
        color: 'transparent',
        boxSizing: 'border-box',
        animation: `${ANIMATION_NAME} 0.7s linear infinite`,
        flexShrink: 0,
      }}
    />
  );
}
