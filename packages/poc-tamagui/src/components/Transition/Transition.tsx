import { useEffect, useState, type ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View } from '@tamagui/core';

// Transições universais.
//
// O `@tamagui/config/v3` já resolve o driver por plataforma sozinho — CSS na
// web, Animated no React Native — então a prop `transition` do Tamagui funciona
// nos dois lados sem código específico aqui.
//
// Atenção ao nome: no Tamagui 2.x a prop é `transition`. `animation` era o
// nome da v1 e hoje não existe mais — passá-la não dá erro em runtime, só é
// ignorada em silêncio.
//
// O que NÃO existe é o `AnimatePresence` (pacote separado, não instalado): sem
// ele o Tamagui anima a entrada mas não segura o componente montado durante a
// saída. Por isso `Fade` controla a desmontagem na mão, com um timer do mesmo
// tamanho da animação.

/** Velocidades expostas pelo design system, em ms — batem com os nomes do Tamagui. */
export const DURATIONS = {
  quick: 150,
  medium: 300,
  slow: 450,
} as const;

export type Speed = keyof typeof DURATIONS;

export type FadeProps = GetProps<typeof View> & {
  /** Controla a transição. */
  visible?: boolean;
  speed?: Speed;
  /**
   * Remove da árvore depois que a saída termina. Sem isto o elemento fica
   * montado e invisível, o que preserva o espaço ocupado no layout.
   */
  unmountOnExit?: boolean;
  children?: ReactNode;
};

export function Fade({
  visible = true,
  speed = 'medium',
  unmountOnExit,
  children,
  ...rest
}: FadeProps) {
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      return;
    }
    if (!unmountOnExit) return;

    const timer = setTimeout(() => setMounted(false), DURATIONS[speed]);
    return () => clearTimeout(timer);
  }, [visible, unmountOnExit, speed]);

  if (!mounted) return null;

  return (
    <View transition={speed} opacity={visible ? 1 : 0} {...rest}>
      {children}
    </View>
  );
}

export type CollapseProps = GetProps<typeof View> & {
  open?: boolean;
  speed?: Speed;
  children?: ReactNode;
};

// Anima a altura de 0 até a altura real do conteúdo.
//
// A altura precisa ser um número para poder ser animada — `auto` não interpola
// em nenhuma das duas plataformas. Por isso o conteúdo é medido com `onLayout`
// (que o Tamagui implementa também na web) e o valor medido vira o alvo.
export function Collapse({ open = false, speed = 'medium', children, ...rest }: CollapseProps) {
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);

  return (
    <View
      transition={speed}
      overflow="hidden"
      height={open ? (measuredHeight ?? undefined) : 0}
      {...rest}
    >
      <View onLayout={(e) => setMeasuredHeight(e.nativeEvent.layout.height)}>{children}</View>
    </View>
  );
}
