import { createContext, useContext, useState, type ReactNode } from 'react';
import { applyTheme } from './theme';
import { useControllableState } from '../core/useControllableState';
import { INPUT_FONT, INPUT_PAD, type InputProps } from '../core/form';
import { PROGRESS_HEIGHT, RADIO_SIZES, SWITCH_SIZES } from '../core/scales';
import type {
  ProgressProps,
  RadioGroupProps,
  RadioProps,
  SpinnerProps,
  SwitchProps,
} from '../core/components';
import './components.css';

export function Input({
  value,
  defaultValue,
  onChangeText,
  onFocus,
  onBlur,
  placeholder,
  disabled,
  error,
  secure,
  inputMode = 'text',
  autoFocus,
  size = 'md',
  multiline,
  rows = 3,
  label,
}: InputProps) {
  applyTheme();
  const [focused, setFocused] = useState(false);
  const pad = INPUT_PAD[size];

  const comuns = {
    value,
    defaultValue,
    placeholder,
    disabled,
    autoFocus,
    'aria-label': label,
    'aria-invalid': !!error,
    onChange: (e: { target: { value: string } }) => onChangeText?.(e.target.value),
    onFocus: () => {
      setFocused(true);
      onFocus?.();
    },
    onBlur: () => {
      setFocused(false);
      onBlur?.();
    },
    style: { fontSize: INPUT_FONT[size] },
  };

  return (
    <div
      className="haquick-field"
      data-focused={focused && !error ? 'true' : undefined}
      data-error={error ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      data-multiline={multiline ? 'true' : undefined}
      style={{ padding: `${pad.y}px ${pad.x}px`, minHeight: multiline ? undefined : pad.min }}
    >
      {multiline ? (
        <textarea {...comuns} rows={rows} />
      ) : (
        <input
          {...comuns}
          type={secure ? 'password' : 'text'}
          inputMode={inputMode === 'text' ? undefined : inputMode}
        />
      )}
    </div>
  );
}

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  intent = 'primary',
  size = 'md',
  label,
}: SwitchProps) {
  applyTheme();
  const [on, setOn] = useControllableState(checked, defaultChecked, onCheckedChange);
  const s = SWITCH_SIZES[size];
  const folga = (s.height - s.thumb) / 2;

  return (
    <label className="haquick-sw-row" data-disabled={disabled ? 'true' : undefined}>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={typeof label === 'string' ? label : undefined}
        disabled={disabled}
        className="haquick-sw"
        data-intent={intent}
        data-checked={on ? 'true' : undefined}
        style={{ width: s.track, height: s.height }}
        onClick={() => setOn(!on)}
      >
        <span
          className="haquick-sw-thumb"
          style={{
            width: s.thumb,
            height: s.thumb,
            marginLeft: on ? s.track - s.thumb - folga : folga,
          }}
        />
      </button>
      {label}
    </label>
  );
}

type CtxRadio = {
  value?: string;
  setValue: (v: string) => void;
  disabled?: boolean;
  intent?: RadioProps['intent'];
  size?: RadioProps['size'];
};

const RadioCtx = createContext<CtxRadio | null>(null);

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
  applyTheme();
  const [current, setValue] = useControllableState(value, defaultValue, onValueChange);

  return (
    <RadioCtx.Provider value={{ value: current, setValue, disabled, intent, size }}>
      <div
        role="radiogroup"
        style={{
          display: 'flex',
          flexDirection: direction,
          gap: direction === 'row' ? 16 : 12,
        }}
      >
        {children}
      </div>
    </RadioCtx.Provider>
  );
}

export function Radio({ value, checked, onPress, disabled, intent, size, label }: RadioProps) {
  applyTheme();
  const group = useContext(RadioCtx);

  const isChecked = checked ?? group?.value === value;
  const isDisabled = disabled ?? group?.disabled;
  const themeColor = intent ?? group?.intent ?? 'primary';
  const tam = size ?? group?.size ?? 'md';
  const box = RADIO_SIZES[tam];

  return (
    <label className="haquick-radio-row" data-disabled={isDisabled ? 'true' : undefined}>
      <button
        type="button"
        role="radio"
        aria-checked={!!isChecked}
        disabled={isDisabled}
        className="haquick-radio"
        data-intent={themeColor}
        data-checked={isChecked ? 'true' : undefined}
        style={{ width: box, height: box }}
        onClick={() => {
          group?.setValue(value);
          onPress?.();
        }}
      >
        {isChecked ? (
          <span className="haquick-radio-dot" style={{ width: box * 0.5, height: box * 0.5 }} />
        ) : null}
      </button>
      {label}
    </label>
  );
}

export function Spinner({ size = 'sm', intent = 'primary', color }: SpinnerProps) {
  applyTheme();
  const box = size === 'lg' ? 32 : 16;
  const thickness = size === 'lg' ? 3 : 2;

  return (
    <span
      role="progressbar"
      aria-label="Carregando"
      className="haquick-spin"
      style={{
        width: box,
        height: box,
        borderWidth: thickness,
        borderTopColor: color ?? `var(--haquick-${intent})`,
      }}
    />
  );
}

export function Progress({ value = 0, intent = 'primary', size = 'md' }: ProgressProps) {
  applyTheme();
  const pct = Math.min(100, Math.max(0, value));

  return (
    <div
      className="haquick-track"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ height: PROGRESS_HEIGHT[size] }}
    >
      <div className="haquick-bar" data-intent={intent} style={{ width: `${pct}%` }} />
    </div>
  );
}

export type { ReactNode };
