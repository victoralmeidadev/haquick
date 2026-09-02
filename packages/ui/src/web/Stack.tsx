import type { CSSProperties } from 'react';
import { ALIGN_CSS, JUSTIFY_CSS, type StackProps } from '../core/layout';
import { space } from '../tokens/spacing';
import './components.css';

function stackStyle(direcao: 'row' | 'column', p: StackProps): CSSProperties {
  return {
    display: 'flex',
    flexDirection: direcao,
    gap: space(p.gap),
    padding: space(p.padding),
    alignItems: p.align ? ALIGN_CSS[p.align] : undefined,
    justifyContent: p.justify ? JUSTIFY_CSS[p.justify] : undefined,
    flexWrap: p.wrap ? 'wrap' : undefined,
    flexGrow: p.fill ? 1 : undefined,
    width: p.width,
    maxWidth: p.maxWidth,
  };
}

export function XStack({ children, ...p }: StackProps) {
  return <div style={stackStyle('row', p)}>{children}</div>;
}

export function YStack({ children, ...p }: StackProps) {
  return <div style={stackStyle('column', p)}>{children}</div>;
}

export const Stack = YStack;
