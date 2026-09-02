import type { ReactNode } from 'react';
import type { ThemeMap } from '../tokens/css';

export type ThemeMode = 'light' | 'dark' | 'system';

/** `system` já resolvido para uma das duas paletas concretas. */
export type ResolvedThemeMode = 'light' | 'dark';

export { DEFAULT_THEME } from '../tokens/css';
export type { ThemeMap };

export type ThemeProviderProps = {
  /**
   * Temas disponíveis, de `createTheme()`. Sem isto valem os padrões.
   *
   * Na web todos entram no CSS de uma vez, então alternar entre eles é trocar
   * um atributo — o mesmo custo de alternar claro/escuro.
   *
   * Na web os quatro eixos (cores, superfícies, geometria e sombras) têm
   * efeito, porque todos viram custom property. No native só cores e
   * superfícies: raios e sombras ainda são lidos do módulo pelos componentes.
   */
  themes?: ThemeMap;
  /** Chave do tema em vigor. Controlado — deixe de fora para usar `defaultTheme`. */
  theme?: string;
  /** Tema inicial. Sem isto, a primeira chave de `themes`. */
  defaultTheme?: string;
  onThemeChange?: (theme: string) => void;
  /** Controlado. Deixe de fora para usar `defaultMode`. */
  mode?: ThemeMode;
  defaultMode?: ThemeMode;
  onModeChange?: (mode: ThemeMode) => void;
  children: ReactNode;
};

export type ThemeModeControl = {
  /** O que foi pedido — pode ser `system`. */
  mode: ThemeMode;
  /** O que está valendo — nunca é `system`. */
  resolvedMode: ResolvedThemeMode;
  setMode: (mode: ThemeMode) => void;
  /** Alterna entre claro e escuro a partir do que está valendo agora. */
  toggle: () => void;
};

/** Os dois eixos. `useThemeMode` devolve só o de cima. */
export type ThemeControl = ThemeModeControl & {
  /** Chave do tema em vigor. */
  theme: string;
  /** Chaves disponíveis, na ordem em que foram declaradas. */
  themes: string[];
  setTheme: (theme: string) => void;
};
