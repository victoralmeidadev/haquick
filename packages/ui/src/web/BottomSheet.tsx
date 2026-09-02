import * as RadixDialog from '@radix-ui/react-dialog';
import { applyTheme } from './theme';
import { DEFAULT_SNAP_POINTS, snapToCSS, type BottomSheetProps } from '../core/sheet';
import './components.css';

export function BottomSheet({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  children,
  footer,
  snapPoints = DEFAULT_SNAP_POINTS,
  dismissible = true,
}: BottomSheetProps) {
  applyTheme();

  const height = snapToCSS(snapPoints[snapPoints.length - 1] ?? '50%');

  return (
    <RadixDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="haquick-overlay" />
        <RadixDialog.Content
          className="haquick-sheet"
          style={{ height }}
          onPointerDownOutside={dismissible ? undefined : (e) => e.preventDefault()}
          onEscapeKeyDown={dismissible ? undefined : (e) => e.preventDefault()}
        >
          <div className="haquick-sheet-handle" aria-hidden="true" />

          {title ? <RadixDialog.Title className="haquick-dialog-title">{title}</RadixDialog.Title> : null}
          {description ? (
            <RadixDialog.Description className="haquick-dialog-desc">{description}</RadixDialog.Description>
          ) : null}

          <div className="haquick-sheet-body">{children}</div>

          {footer ? <div className="haquick-dialog-footer">{footer}</div> : null}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

export const BottomSheetTrigger = RadixDialog.Trigger;
export const BottomSheetClose = RadixDialog.Close;

/**
 * No native este provider é obrigatório (gesture handler + portal do Gorhom).
 * Na web não há nada a montar, então ele existe só para o mesmo código de app
 * compilar dos dois lados.
 */
export function BottomSheetProvider({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
