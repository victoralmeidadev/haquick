import { useState, type ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View, styled } from '@tamagui/core';
import { shape } from '../../config/shape';
import { Collapse, type Speed } from '../Transition';
import { Typography } from '../Typography';
import { useControllableState } from '../../hooks/useControllableState';

const AccordionFrame = styled(View, {
  name: 'Accordion',
  flexDirection: 'column',
  borderWidth: shape.borderWidth,
  borderColor: '$borderColor',
  borderRadius: '$radiusMd',
  backgroundColor: '$background',
  overflow: 'hidden',
});

export type AccordionItemProps = {
  title: ReactNode;
  children?: ReactNode;
  /** Modo controlado. Omita e use `defaultOpen` para não-controlado. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  speed?: Speed;
  /** Preenchido pelo <Accordion>: some a borda de cima do primeiro item. */
  first?: boolean;
};

export function AccordionItem({
  title,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled,
  speed = 'quick',
  first,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, onOpenChange);

  return (
    <View
      borderTopWidth={first ? 0 : shape.borderWidth}
      borderTopColor="$borderColor"
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
    >
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap="$3"
        paddingVertical="$3"
        paddingHorizontal="$4"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        hoverStyle={{ backgroundColor: '$backgroundHover' }}
        pressStyle={{ backgroundColor: '$backgroundPress' }}
        onPress={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
        aria-disabled={!!disabled}
      >
        {typeof title === 'string' ? <Typography variant="subtitle2">{title}</Typography> : title}

        {/* Chevron por rotação: o mesmo caractere serve fechado e aberto. */}
        <View transition={speed} rotate={isOpen ? '180deg' : '0deg'}>
          <Typography variant="body2" intent="neutral">
            ⌄
          </Typography>
        </View>
      </View>

      <Collapse open={isOpen} speed={speed}>
        <View paddingHorizontal="$4" paddingBottom="$4">
          {typeof children === 'string' ? (
            <Typography variant="body2" intent="neutral">
              {children}
            </Typography>
          ) : (
            children
          )}
        </View>
      </Collapse>
    </View>
  );
}

export type AccordionProps = GetProps<typeof AccordionFrame> & { children?: ReactNode };

export function Accordion({ children, ...rest }: AccordionProps) {
  return <AccordionFrame {...rest}>{children}</AccordionFrame>;
}

// Versão de conveniência: só um item aberto por vez. Fica separada do
// <Accordion> normal porque exige controlar o estado de todos os filhos, o que
// o modo simples (cada item com o seu estado) não precisa.
export type AccordionSingleProps = GetProps<typeof AccordionFrame> & {
  items: { id: string; title: ReactNode; content: ReactNode }[];
  defaultOpen?: string;
  speed?: Speed;
};

export function AccordionSingle({
  items,
  defaultOpen,
  speed = 'quick',
  ...rest
}: AccordionSingleProps) {
  const [openId, setOpenId] = useState<string | undefined>(defaultOpen);

  return (
    <AccordionFrame {...rest}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          first={index === 0}
          speed={speed}
          open={openId === item.id}
          onOpenChange={(open) => setOpenId(open ? item.id : undefined)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </AccordionFrame>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
AccordionFrame.displayName = 'AccordionFrame';
