import { useCallback, useState } from 'react';

// Permite que Checkbox/Switch/RadioGroup funcionem tanto controlados
// (`checked` + `onCheckedChange`) quanto não-controlados (`defaultChecked`),
// igual aos inputs do React.
export function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (next: T) => void
): [T, (next: T) => void] {
  const [internal, setInternal] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  return [current, setValue];
}
