import type { ReactNode } from 'react';
import { View, Text } from '@tamagui/core';
import type { ColorIntent } from '../../config/palette';
import { useRadioGroup } from './RadioGroup';
import { shape } from '../../config/shape';

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

export type RadioProps = {
  /** Identifica esta opção dentro do <RadioGroup>. */
  value: string;
  /** Use quando o Radio estiver fora de um <RadioGroup>. */
  checked?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  intent?: ColorIntent;
  size?: keyof typeof SIZES;
  label?: ReactNode;
};

export function Radio({
  value,
  checked,
  onPress,
  disabled,
  intent,
  size,
  label,
}: RadioProps) {
  const group = useRadioGroup();

  // Props locais ganham do grupo, para dar pra customizar uma opção isolada.
  const isChecked = checked ?? group?.value === value;
  const isDisabled = disabled ?? group?.disabled;
  const resolvedIntent = intent ?? group?.intent ?? 'primary';
  const resolvedSize = size ?? group?.size ?? 'md';

  const box = SIZES[resolvedSize];

  return (
    <View
      flexDirection="row"
      alignItems="center"
      gap="$2"
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      opacity={isDisabled ? 0.5 : 1}
      pointerEvents={isDisabled ? 'none' : 'auto'}
      onPress={() => {
        group?.setValue(value);
        onPress?.();
      }}
      role="radio"
      aria-checked={!!isChecked}
      aria-disabled={!!isDisabled}
    >
      <View
        width={box}
        height={box}
        borderRadius="$radiusFull"
        borderWidth={shape.controlBorderWidth}
        alignItems="center"
        justifyContent="center"
        borderColor={isChecked ? (`$${resolvedIntent}` as any) : '$borderColor'}
        hoverStyle={isChecked ? undefined : { borderColor: `$${resolvedIntent}` as any }}
      >
        {isChecked ? (
          <View
            width={box * 0.5}
            height={box * 0.5}
            borderRadius="$radiusFull"
            backgroundColor={`$${resolvedIntent}` as any}
          />
        ) : null}
      </View>

      {label != null ? (
        typeof label === 'string' ? (
          <Text fontSize={LABEL_FONT_SIZE[resolvedSize]} color="$color">
            {label}
          </Text>
        ) : (
          label
        )
      ) : null}
    </View>
  );
}
