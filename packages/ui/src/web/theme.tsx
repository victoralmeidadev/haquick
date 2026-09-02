import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';
import { defaultThemeConfig, type ThemeConfig } from '../tokens/config';
import { DEFAULT_THEME, generateThemeCSS } from '../tokens/css';
import { useControllableState } from '../core/useControllableState';
import type {
  ResolvedThemeMode,
  ThemeControl,
  ThemeMap,
  ThemeMode,
  ThemeModeControl,
  ThemeProviderProps,
} from '../core/theme';

export type Theme = ThemeConfig['themes']['light'];

export const radii = defaultThemeConfig.radii;

export { generateThemeCSS };

let injected = false;

/**
 * Injeta o tema padrão, se ele já não estiver na folha de estilo.
 *
 * Quem importa `haquick/styles.css` recebe o tema padrão junto, gerado em
 * build — e aí esta função não faz nada. A checagem existe porque nem todo
 * consumo passa por lá: no monorepo os apps apontam para `src`, onde não há
 * arquivo gerado, e um app que só importe o JS também não teria as variáveis.
 *
 * Injeta no INÍCIO do <head> para que a folha do app venha depois e possa
 * sobrescrever `--haquick-*` sem precisar de seletor mais específico.
 */
export function applyTheme() {
  if (injected || typeof document === 'undefined') return;
  injected = true;

  const alreadyThemed = getComputedStyle(document.documentElement)
    .getPropertyValue('--haquick-primary')
    .trim();
  if (alreadyThemed) return;

  const style = document.createElement('style');
  style.setAttribute('data-haquick-theme', '');
  style.textContent = generateThemeCSS();
  document.head.prepend(style);
}

const QUERY = '(prefers-color-scheme: dark)';

function subscribeToSystem(onChange: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

const systemSnapshot = (): ResolvedThemeMode =>
  typeof window !== 'undefined' && window.matchMedia?.(QUERY).matches ? 'dark' : 'light';

const serverSnapshot = (): ResolvedThemeMode => 'light';

/** Preferência de cor do sistema operacional, reativa. */
export function useSystemMode(): ResolvedThemeMode {
  return useSyncExternalStore(subscribeToSystem, systemSnapshot, serverSnapshot);
}

type ThemeContextValue = ThemeControl & { resolved: Theme; hasProvider: boolean };

const DEFAULT_MAP: ThemeMap = { [DEFAULT_THEME]: defaultThemeConfig };

const FALLBACK: ThemeContextValue = {
  mode: 'light',
  resolvedMode: 'light',
  theme: DEFAULT_THEME,
  themes: [DEFAULT_THEME],
  resolved: defaultThemeConfig.themes.light,
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
  applyTheme();

  const map = themes ?? DEFAULT_MAP;
  const keys = Object.keys(map);
  const fallbackKey = defaultTheme && map[defaultTheme] ? defaultTheme : (keys[0] ?? DEFAULT_THEME);

  const [currentTheme, setTheme] = useControllableState<string>(theme, fallbackKey, onThemeChange);
  const [currentMode, setMode] = useControllableState<ThemeMode>(mode, defaultMode, onModeChange);
  const systemMode = useSystemMode();
  const resolvedMode: ResolvedThemeMode = currentMode === 'system' ? systemMode : currentMode;

  const customCSS = themes ? generateThemeCSS(map, fallbackKey) : null;

  useEffect(() => {
    if (!customCSS) return;
    const style = document.createElement('style');
    style.setAttribute('data-haquick-theme-app', '');
    style.textContent = customCSS;
    document.head.append(style);
    return () => style.remove();
  }, [customCSS]);

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute('data-theme', currentTheme);
    el.setAttribute('data-scheme', resolvedMode);
    return () => {
      el.removeAttribute('data-theme');
      el.removeAttribute('data-scheme');
    };
  }, [currentTheme, resolvedMode]);

  const active = map[currentTheme] ?? map[fallbackKey] ?? defaultThemeConfig;
  const resolved = active.themes[resolvedMode];
  const names = keys.join(',');

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode: currentMode,
      resolvedMode,
      theme: currentTheme,
      themes: names.split(','),
      resolved,
      hasProvider: true,
      setMode,
      setTheme,
      toggle: () => setMode(resolvedMode === 'dark' ? 'light' : 'dark'),
    }),
    [currentMode, resolvedMode, currentTheme, names, resolved, setMode, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Objeto de tema resolvido. Os componentes web não precisam dele — o estilo
 * sai das custom properties —, mas o código do app às vezes precisa de um
 * valor de cor concreto. Sem provider, devolve o tema claro padrão.
 */
export function useTheme(): Theme {
  return useContext(ThemeContext).resolved;
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
