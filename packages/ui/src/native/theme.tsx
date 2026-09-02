import { createContext, useContext, useMemo, useSyncExternalStore } from 'react';
import { Appearance } from 'react-native';
import { defaultThemeConfig, type ThemeConfig } from '../tokens/config';
import { useControllableState } from '../core/useControllableState';
import { DEFAULT_THEME } from '../core/theme';
import type {
  ResolvedThemeMode,
  ThemeControl,
  ThemeMap,
  ThemeMode,
  ThemeModeControl,
  ThemeProviderProps,
} from '../core/theme';

export const radii = defaultThemeConfig.radii;

export type Theme = ThemeConfig['themes']['light'];

function subscribeToSystem(onChange: () => void) {
  const sub = Appearance.addChangeListener(onChange);
  return () => sub.remove();
}

const systemSnapshot = (): ResolvedThemeMode =>
  Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';

/** Preferência de cor do sistema operacional, reativa. */
export function useSystemMode(): ResolvedThemeMode {
  return useSyncExternalStore(subscribeToSystem, systemSnapshot, systemSnapshot);
}

type ThemeContextValue = ThemeControl & {
  resolved: Theme;
  /** Fator de opacidade da sombra do scheme em vigor. */
  shadowScale: number;
  hasProvider: boolean;
};

const DEFAULT_MAP: ThemeMap = { [DEFAULT_THEME]: defaultThemeConfig };

const FALLBACK: ThemeContextValue = {
  mode: 'light',
  resolvedMode: 'light',
  theme: DEFAULT_THEME,
  themes: [DEFAULT_THEME],
  resolved: defaultThemeConfig.themes.light,
  shadowScale: defaultThemeConfig.shadowOpacityScale.light,
  hasProvider: false,
  setMode: () => {},
  setTheme: () => {},
  toggle: () => {},
};

const ThemeContext = createContext<ThemeContextValue>(FALLBACK);

export function ThemeProvider({
  themes,
  theme,
  defaultTheme,
  onThemeChange,
  mode,
  defaultMode = 'system',
  onModeChange,
  children,
}: ThemeProviderProps) {
  const map = themes ?? DEFAULT_MAP;
  const keys = Object.keys(map);
  const fallbackKey = defaultTheme && map[defaultTheme] ? defaultTheme : (keys[0] ?? DEFAULT_THEME);

  const [currentTheme, setTheme] = useControllableState<string>(theme, fallbackKey, onThemeChange);
  const [currentMode, setMode] = useControllableState<ThemeMode>(mode, defaultMode, onModeChange);
  const systemMode = useSystemMode();
  const resolvedMode: ResolvedThemeMode = currentMode === 'system' ? systemMode : currentMode;

  const active = map[currentTheme] ?? map[fallbackKey] ?? defaultThemeConfig;
  const resolved = active.themes[resolvedMode];
  const shadowScale = active.shadowOpacityScale[resolvedMode];
  const names = keys.join(',');

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode: currentMode,
      resolvedMode,
      theme: currentTheme,
      themes: names.split(','),
      resolved,
      shadowScale,
      hasProvider: true,
      setMode,
      setTheme,
      toggle: () => setMode(resolvedMode === 'dark' ? 'light' : 'dark'),
    }),
    [currentMode, resolvedMode, currentTheme, names, resolved, shadowScale, setMode, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Objeto de tema resolvido — é o que todo componente native consome. Sem
 * provider devolve o tema claro padrão, então a biblioteca funciona sem setup.
 */
export function useTheme(): Theme {
  return useContext(ThemeContext).resolved;
}

/**
 * Interno: fator de opacidade da sombra do scheme em vigor.
 *
 * Não é reexportado no index — quem consome a biblioteca não tem o que fazer
 * com ele. Existe porque no native a sombra é objeto de estilo montado no
 * componente, e não CSS gerado com o fator já embutido.
 */
export function useShadowScale(): number {
  return useContext(ThemeContext).shadowScale;
}

function useProvidedContext(hook: string): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx.hasProvider) {
    throw new Error(`${hook} precisa de um <ThemeProvider> acima na árvore.`);
  }
  return ctx;
}

/** Controle de claro/escuro. Exige `<ThemeProvider>` acima na árvore. */
export function useThemeMode(): ThemeModeControl {
  const { mode, resolvedMode, setMode, toggle } = useProvidedContext('useThemeMode');
  return { mode, resolvedMode, setMode, toggle };
}

/** Os dois eixos: tema nomeado e claro/escuro. Exige `<ThemeProvider>`. */
export function useThemeControl(): ThemeControl {
  const { mode, resolvedMode, setMode, toggle, theme, themes, setTheme } =
    useProvidedContext('useThemeControl');
  return { mode, resolvedMode, setMode, toggle, theme, themes, setTheme };
}

/** Lê um slot do tema pelo nome montado em runtime (ex: 'primaryHover'). */
export function themeColor(theme: Theme, key: string | null): string | undefined {
  return key === null ? undefined : (theme as unknown as Record<string, string>)[key];
}
