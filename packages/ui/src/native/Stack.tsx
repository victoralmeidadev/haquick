import { View } from 'react-native';
import { ALIGN_CSS, JUSTIFY_CSS, type StackProps } from '../core/layout';
import { space } from '../tokens/spacing';

function stackStyle(direcao: 'row' | 'column', p: StackProps) {
  return {
    flexDirection: direcao,
    gap: space(p.gap),
    padding: space(p.padding),
    alignItems: p.align ? (ALIGN_CSS[p.align] as 'center') : undefined,
    justifyContent: p.justify ? (JUSTIFY_CSS[p.justify] as 'center') : undefined,
    flexWrap: p.wrap ? ('wrap' as const) : undefined,
    flexGrow: p.fill ? 1 : undefined,
    width: p.width,
    maxWidth: p.maxWidth,
  };
}

export function XStack({ children, ...p }: StackProps) {
  return <View style={stackStyle('row', p)}>{children}</View>;
}

export function YStack({ children, ...p }: StackProps) {
  return <View style={stackStyle('column', p)}>{children}</View>;
}

export const Stack = YStack;
