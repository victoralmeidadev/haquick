import { View, styled } from '@tamagui/core';
import { shape } from '../../config/shape';

// Moldura compartilhada pelas duas plataformas: borda, foco, erro e padding
// vivem aqui (só Tamagui, sem nenhum primitivo de plataforma). O que muda entre
// web e native é apenas o campo de texto de dentro.
export const InputFrame = styled(View, {
  name: 'Input',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '$background',
  borderColor: '$borderColor',
  borderWidth: shape.borderWidth,
  borderRadius: '$radiusMd',

  variants: {
    size: {
      sm: { paddingHorizontal: '$2', paddingVertical: '$1', minHeight: 32 },
      md: { paddingHorizontal: '$3', paddingVertical: '$2', minHeight: 40 },
      lg: { paddingHorizontal: '$3', paddingVertical: '$3', minHeight: 48 },
    },
    focused: {
      true: { borderColor: '$primary' },
    },
    // Declarado depois de `focused` só por leitura; quem garante a precedência
    // é o componente, que não passa `focused` junto de `error`.
    error: {
      true: { borderColor: '$error' },
    },
    disabled: {
      true: { opacity: 0.5, backgroundColor: '$backgroundPress' },
    },
  } as const,

  defaultVariants: { size: 'md' },
});

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
InputFrame.displayName = 'InputFrame';
