import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { radii, useTheme } from './theme';
import { useControllableState } from '../core/useControllableState';
import {
  DEFAULT_SNAP_POINTS,
  sheetAction,
  type BottomSheetProps,
  type SnapPoint,
} from '../core/sheet';
import { Typography } from './primitives';
import { defaultShape } from '../tokens/shape';

/**
 * Obrigatório na raiz do app native.
 *
 * Na web o componente de mesmo nome não faz nada, então o código do app fica
 * igual dos dois lados.
 */
export function BottomSheetProvider({ children }: { children?: ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export function BottomSheet({
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  description,
  children,
  footer,
  snapPoints = DEFAULT_SNAP_POINTS,
  hideHandle,
  dismissible = true,
}: BottomSheetProps) {
  const theme = useTheme();
  const ref = useRef<BottomSheetModal>(null);
  const [isOpen, setOpen] = useControllableState(open, defaultOpen, onOpenChange);

  const snapKey = JSON.stringify(snapPoints);
  const points = useMemo(() => JSON.parse(snapKey) as SnapPoint[], [snapKey]);

  const presented = useRef(false);

  useEffect(() => {
    const action = sheetAction(isOpen, presented.current);
    if (!action) return;
    presented.current = isOpen;
    if (action === 'present') ref.current?.present();
    else ref.current?.dismiss();
  }, [isOpen]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior={dismissible ? 'close' : 'none'}
      />
    ),
    [dismissible]
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={points}
      enableDynamicSizing={false}
      enablePanDownToClose={dismissible}
      handleComponent={hideHandle ? null : undefined}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: theme.background,
        borderTopLeftRadius: radii.radiusLg,
        borderTopRightRadius: radii.radiusLg,
      }}
      handleIndicatorStyle={{ backgroundColor: theme.borderColor }}
      onDismiss={() => {
        presented.current = false;
        setOpen(false);
      }}
    >
      <BottomSheetView style={styles.content}>
        {title ? <Typography variant="h6">{title}</Typography> : null}
        {description ? (
          <Typography variant="body2" intent="neutral">
            {description}
          </Typography>
        ) : null}

        <View style={styles.body}>{children}</View>

        {footer ? (
          <View
            style={[
              styles.footer,
              { borderTopWidth: defaultShape.borderWidth, borderTopColor: theme.borderColor },
            ]}
          >
            {footer}
          </View>
        ) : null}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

export { GorhomBottomSheet as RawBottomSheet };

const styles = StyleSheet.create({
  content: { flex: 1, gap: 12, paddingHorizontal: 20, paddingBottom: 20 },
  body: { flex: 1 },
  footer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, paddingTop: 12 },
});
