import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { applyTheme } from './theme';
import { CHECKBOX_LABEL_FONT } from '../core/scales';
import type { CheckboxProps } from '../core/types';
import './components.css';

export function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  indeterminate,
  disabled,
  intent = 'primary',
  size = 'md',
  label,
}: CheckboxProps) {
  applyTheme();

  const value = indeterminate ? 'indeterminate' : checked;

  return (
    <label className="haquick-cb-row" data-disabled={disabled ? 'true' : undefined}>
      <RadixCheckbox.Root
        className="haquick-cb"
        data-intent={intent}
        data-size={size}
        checked={value}
        defaultChecked={defaultChecked}
        onCheckedChange={(v) => onCheckedChange?.(v === true)}
        disabled={disabled}
      >
        <RadixCheckbox.Indicator className="haquick-cb-mark">
          {indeterminate ? (
            <svg width="10" height="2" viewBox="0 0 10 2" aria-hidden>
              <rect width="10" height="2" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="11" height="9" viewBox="0 0 11 9" aria-hidden>
              <path
                d="M1 4.5L4 7.5L10 1.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          )}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>

      {label != null ? (
        <span className="haquick-cb-label" style={{ fontSize: CHECKBOX_LABEL_FONT[size] }}>
          {label}
        </span>
      ) : null}
    </label>
  );
}
