import type { ReactNode } from 'react';
import { View, Text } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';
import { useControllableState } from '../../hooks/useControllableState';
import { shape } from '../../config/shape';

// Tamanhos em px porque a marca de check é desenhada proporcionalmente à
// caixa (não dá pra derivar de token de espaçamento).
const SIZES = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

const LABEL_FONT_SIZE = {
  sm: 13,
  md: 15,
  lg: 17,
} as const;

export type CheckboxProps = {
  /** Modo controlado. Omita e use `defaultChecked` para não-controlado. */
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Estado "parcial" (ex: alguns filhos marcados) — desenha um traço. */
  indeterminate?: boolean;
  disabled?: boolean;
  intent?: ColorIntent;
  size?: keyof typeof SIZES;
  label?: ReactNode;
};

export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  indeterminate,
  disabled,
  intent = 'primary',
  size = 'md',
  label,
}: CheckboxProps) {
  const [isChecked, setChecked] = useControllableState(checked, defaultChecked, onCheckedChange);

  const box = SIZES[size];
  const filled = isChecked || indeterminate;
  const markColor = `$${intent}ContrastText`;

  return (
    <View
      flexDirection="row"
      alignItems="center"
      gap="$2"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
      onPress={() => setChecked(!isChecked)}
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : isChecked}
      aria-disabled={!!disabled}
    >
      <View
        width={box}
        height={box}
        borderRadius="$radiusXs"
        borderWidth={shape.controlBorderWidth}
        alignItems="center"
        justifyContent="center"
        borderColor={filled ? (`$${intent}` as any) : '$borderColor'}
        backgroundColor={filled ? (`$${intent}` as any) : 'transparent'}
        hoverStyle={filled ? undefined : { borderColor: `$${intent}` as any }}
      >
        {indeterminate ? (
          <View width={box * 0.5} height={2} borderRadius={1} backgroundColor={markColor as any} />
        ) : isChecked ? (
          // Check desenhado com duas bordas de um View rotacionado — evita
          // depender de fonte de ícones ou de react-native-svg.
          <View
            width={box * 0.28}
            height={box * 0.55}
            borderRightWidth={2}
            borderBottomWidth={shape.controlBorderWidth}
            borderColor={markColor as any}
            rotate="45deg"
            marginTop={-box * 0.08}
          />
        ) : null}
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
