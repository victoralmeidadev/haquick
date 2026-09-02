export const SPACING = {
  0: 0,
  1: 2,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
  6: 32,
  7: 40,
  8: 48,
  9: 56,
  10: 64,
} as const;

export type SpaceStep = keyof typeof SPACING;

export function space(step: SpaceStep | undefined): number | undefined {
  return step === undefined ? undefined : SPACING[step];
}
