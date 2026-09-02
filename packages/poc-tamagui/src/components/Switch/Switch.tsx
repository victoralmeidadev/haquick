import type { ReactNode } from 'react';
import { View, Text, styled } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';
import { useControllableState } from '../../hooks/useControllableState';
import { shadows } from '../../config/shadows';

// Trilho e polegar em px: o deslocamento do polegar é calculado a partir
// dessas medidas, então token de espaçamento não serve aqui.
const SIZES = {
  sm: { track: 32, height: 18, thumb: 14 },
  md: { track: 44, height: 24, thumb: 18 },
  lg: { track: 56, height: 30, thumb: 24 },
} as const;

const LABEL_FONT_SIZE = {
  sm: 13,
  md: 15,
  lg: 17,
} as const;

// A sombra do polegar vem da escala de elevação (config/shadows.ts), não de
// valores soltos — assim `intensity: 0` também desliga a sombra do Switch.
const SwitchThumb = styled(View, {
  name: 'SwitchThumb',
  borderRadius: '$radiusFull',
  backgroundColor: '#FFFFFF',
  ...shadows[2],
});

export type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  intent?: ColorIntent;
  size?: keyof typeof SIZES;
  label?: ReactNode;
};

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  intent = 'primary',
  size = 'md',
  label,
}: SwitchProps) {
  const [isOn, setOn] = useControllableState(checked, defaultChecked, onCheckedChange);

  const { track, height, thumb } = SIZES[size];
  const padding = (height - thumb) / 2;

  return (
    <View
      flexDirection="row"
      alignItems="center"
      gap="$3"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
      onPress={() => setOn(!isOn)}
      role="switch"
      aria-checked={isOn}
      aria-disabled={!!disabled}
    >
      <View
        width={track}
        height={height}
        borderRadius="$radiusFull"
        justifyContent="center"
        backgroundColor={isOn ? (`$${intent}` as any) : '$borderColor'}
      >
        <SwitchThumb
          width={thumb}
          height={thumb}
          marginLeft={isOn ? track - thumb - padding : padding}
        />
      </View>

      {label != null ? (
        typeof label === 'string' ? (
          <Text fontSize={LABEL_FONT_SIZE[size]} color="$color">
            {label}
          </Text>
        ) : (
          label
        )
      ) : null}
    </View>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
SwitchThumb.displayName = 'SwitchThumb';
