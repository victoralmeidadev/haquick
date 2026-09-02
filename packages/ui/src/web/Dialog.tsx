import * as RadixDialog from '@radix-ui/react-dialog';
import { applyTheme } from './theme';
import type { DialogProps } from '../core/types';
import './components.css';

export function Dialog({ open, onOpenChange, title, description, children, footer }: DialogProps) {
  applyTheme();

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="haquick-overlay" />
        <RadixDialog.Content className="haquick-dialog">
          <RadixDialog.Title className="haquick-dialog-title">{title}</RadixDialog.Title>
          {description ? (
            <RadixDialog.Description className="haquick-dialog-desc">
              {description}
            </RadixDialog.Description>
          ) : null}

          {children}

          {footer ? <div className="haquick-dialog-footer">{footer}</div> : null}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;
