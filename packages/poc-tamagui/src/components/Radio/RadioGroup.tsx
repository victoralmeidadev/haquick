import { createContext, useContext, type ReactNode } from 'react';
import { View } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';
import { useControllableState } from '../../hooks/useControllableState';

type RadioGroupContextValue = {
  value?: string;
  setValue: (next: string) => void;
  disabled?: boolean;
  intent?: ColorIntent;
  size?: 'sm' | 'md' | 'lg';
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroup() {
  return useContext(RadioGroupContext);
}

export type RadioGroupProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Desabilita todos os Radio filhos de uma vez. */
  disabled?: boolean;
  intent?: ColorIntent;
  size?: 'sm' | 'md' | 'lg';
  direction?: 'row' | 'column';
  children?: ReactNode;
};

// O grupo é quem guarda o valor selecionado — cada <Radio /> só declara o
// próprio `value` e lê o estado por contexto (mesma ideia do RadioGroup do MUI).
export function RadioGroup({
  value,
  defaultValue = '',
  onValueChange,
  disabled,
  intent = 'primary',
  size = 'md',
  direction = 'column',
  children,
}: RadioGroupProps) {
  const [current, setValue] = useControllableState(value, defaultValue, onValueChange);

  return (
    <RadioGroupContext.Provider value={{ value: current, setValue, disabled, intent, size }}>
      <View
        flexDirection={direction}
        gap={direction === 'row' ? '$4' : '$3'}
        role="radiogroup"
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}
