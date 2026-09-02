import { useEffect, useState } from 'react';
import { View, styled } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';

const Dot = styled(View, {
  name: 'TypingDot',
  width: 6,
  height: 6,
  borderRadius: '$radiusFull',

  variants: {
    intent: (intent: ColorIntent) => ({ backgroundColor: `$${intent}` }),
  } as const,

  defaultVariants: { intent: 'neutral' },
});

export type TypingIndicatorProps = {
  intent?: ColorIntent;
  /** Intervalo entre os passos, em ms. */
  speed?: number;
};

// Três pontos pulsando enquanto o agente pensa.
//
// A animação é por estado (um índice que cicla) e não por keyframes: keyframes
// só existem no CSS, e isso quebraria no React Native. Assim a mesma
// implementação vale nas duas plataformas, com o `transition` do Tamagui
// suavizando a troca de opacidade.
export function TypingIndicator({ intent = 'neutral', speed = 320 }: TypingIndicatorProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep((p) => (p + 1) % 3), speed);
    return () => clearInterval(timer);
  }, [speed]);

  return (
    <View
      flexDirection="row"
      gap="$2"
      alignItems="center"
      paddingVertical="$3"
      paddingHorizontal="$4"
      role="status"
      aria-label="O assistente está digitando"
    >
      {[0, 1, 2].map((i) => (
        <Dot key={i} intent={intent} transition="quick" opacity={step === i ? 1 : 0.3} />
      ))}
    </View>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
Dot.displayName = 'TypingDot';
