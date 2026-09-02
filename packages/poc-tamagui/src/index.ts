// Layout
export * from './components/Screen';
export * from './components/Stack';
export * from './components/Spacer';
export * from './components/Divider';
export * from './components/Card';
export * from './components/PageHeader';

// Tipografia
export * from './components/Typography';
export * from './components/Link';

// Ação
export * from './components/Button';
export * from './components/IconButton';

// Formulário
export * from './components/Input';
export * from './components/Label';
export * from './components/HelperText';
export * from './components/Checkbox';
export * from './components/Radio';
export * from './components/Switch';

// Exibição de dados
export * from './components/Avatar';
export * from './components/Media';
export * from './components/Timeline';
export * from './components/StatCard';
export * from './components/Badge';
export * from './components/Chip';
export * from './components/List';
export * from './components/Table';

// Movimento
export * from './components/Transition';

// Divulgação progressiva
export * from './components/Accordion';

// Agentes conversacionais
export * from './components/Chat';

// Feedback
export * from './components/Alert';
export * from './components/EmptyState';
export * from './components/Spinner';
export * from './components/Progress';
export * from './components/Skeleton';

// Templates de tela
export * from './templates';

// Hooks
export { useControllableState } from './hooks/useControllableState';

// Configuração / tema
export { config, createCrossUIConfig } from './config/tamagui.config';
export type { AppConfig, CrossUIConfigInput, ThemeOverride } from './config/tamagui.config';

export {
  baseColors,
  createShades,
  getContrastText,
  intents,
  resolveIntent,
  defaultPaletteOptions,
} from './config/palette';
export type {
  BaseIntents,
  ColorIntent,
  CustomIntents,
  IntentColorInput,
  PaletteOptions,
  ResolvedIntent,
  ShadeScale,
} from './config/palette';

export { createAppThemes, defaultSurfaces } from './config/themes';
export type { IntentColors, SurfaceColors } from './config/themes';

export { defaultShape, shape, createRadiusTokens } from './config/shape';
export type { ShapeConfig } from './config/shape';

export { shadows, createShadows, defaultShadowConfig } from './config/shadows';
export type { ElevationLevel, ShadowConfig, ShadowScale, ShadowStyle } from './config/shadows';

export { intentContent, intentSurface } from './config/intents';
export type { SurfaceVariant } from './config/intents';
