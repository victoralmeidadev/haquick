import { useState, type ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View, Text, styled } from '@tamagui/core';
import { shape } from '../../config/shape';

// EXCLUSIVO DE WEB — de propósito.
//
// Tooltip é acionado por hover, que não existe em touch. Em mobile o padrão
// equivalente é outro componente (long-press + popover), com API e ergonomia
// diferentes — fingir que é "o mesmo componente" só esconderia o problema.
//
// Por isso este arquivo é `.web.tsx` sem contraparte `.native.tsx`, e o
// componente sai só de `cross-ui/web`. Importar no app native vira erro de
// build, que é o comportamento desejado.
const TooltipBubble = styled(View, {
  name: 'TooltipBubble',
  backgroundColor: '$neutral800',
  paddingVertical: '$1',
  paddingHorizontal: '$2',
  borderRadius: '$radiusSm',
  maxWidth: 240,
  // Sem isso a bolha encolhe até a largura do gatilho (a faixa de posição usa
  // left/right: 0) e o texto quebra linha à toa. Com flexShrink 0 ela toma a
  // largura do conteúdo e transborda centralizada.
  flexShrink: 0,
  borderWidth: shape.borderWidth,
  borderColor: '$neutral700',
});

const TooltipText = styled(Text, {
  name: 'TooltipText',
  color: '#FFFFFF',
  fontSize: 12,
  lineHeight: 16,
});

// Cada posição vira uma "faixa" absoluta ao redor do gatilho; a bolha se
// centraliza dentro dela por flexbox, sem precisar de translate em %.
const PLACEMENTS = {
  top: { bottom: '100%', left: 0, right: 0, alignItems: 'center', paddingBottom: 6 },
  bottom: { top: '100%', left: 0, right: 0, alignItems: 'center', paddingTop: 6 },
  left: { right: '100%', top: 0, bottom: 0, justifyContent: 'center', paddingRight: 6 },
  right: { left: '100%', top: 0, bottom: 0, justifyContent: 'center', paddingLeft: 6 },
} as const;

export type TooltipProps = GetProps<typeof View> & {
  /** Texto exibido no hover. */
  label: string;
  placement?: keyof typeof PLACEMENTS;
  children?: ReactNode;
};

export function Tooltip({ label, placement = 'top', children, ...rest }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <View
      position="relative"
      alignSelf="flex-start"
      // `onMouseEnter/Leave` do DOM em vez do `onHoverIn/Out` do Tamagui:
      // o View base não registra os handlers de hover do Tamagui, e como este
      // componente é web-only não há motivo para não usar o evento nativo.
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...rest}
    >
      {children}

      {open ? (
        // `pointerEvents="none"` evita que a bolha roube o hover do gatilho
        // e crie um loop de abre/fecha.
        <View position="absolute" pointerEvents="none" zIndex={1000} {...PLACEMENTS[placement]}>
          <TooltipBubble>
            <TooltipText>{label}</TooltipText>
          </TooltipBubble>
        </View>
      ) : null}
    </View>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
TooltipBubble.displayName = 'TooltipBubble';
TooltipText.displayName = 'TooltipText';
