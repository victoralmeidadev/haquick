import { BUTTON_SIZES, CHECKBOX_SIZES } from '../core/scales';
import { defaultThemeConfig, type ThemeConfig } from './config';

/** Chave usada quando o app não nomeia nenhum tema. */
export const DEFAULT_THEME = 'default';

export type ThemeMap = Record<string, ThemeConfig>;

type Scheme = 'light' | 'dark';

const SCHEMES = ['light', 'dark'] as const;

function toVars(theme: Record<string, string>): string {
  return Object.entries(theme)
    .map(([key, value]) => `  --haquick-${key}: ${value};`)
    .join('\n');
}

function intentsOf(theme: Record<string, string>): string[] {
  return Object.keys(theme)
    .filter((k) => k.endsWith('ContrastText'))
    .map((k) => k.slice(0, -'ContrastText'.length));
}

const INTENT_TARGETS = [
  'haquick-btn',
  'haquick-cb',
  'haquick-badge',
  'haquick-chip',
  'haquick-ib',
  'haquick-sw',
  'haquick-radio',
  'haquick-alert',
  'haquick-avatar',
  'haquick-dot',
  'haquick-txt',
  'haquick-bar',
  'haquick-glyph',
  'haquick-link',
];

function intentRules(intents: string[]): string {
  return intents
    .map(
      (i) => `${INTENT_TARGETS.map((c) => `.${c}[data-intent="${i}"]`).join(', ')} {
  --i: var(--haquick-${i});
  --i-hover: var(--haquick-${i}Hover);
  --i-press: var(--haquick-${i}Press);
  --i-contrast: var(--haquick-${i}ContrastText);
  --i-soft: var(--haquick-${i}Soft);
  --i-soft-hover: var(--haquick-${i}SoftHover);
  --i-soft-text: var(--haquick-${i}SoftText);
}`
    )
    .join('\n');
}

const rgb = (hex: string) =>
  `${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)}`;

function shadowVarsFor(
  surface: Record<string, string>,
  shadows: ThemeConfig['shadows'],
  opacityScale: number
): string {
  const color = rgb(surface.shadowColor ?? '#000000');
  return Object.entries(shadows)
    .map(([level, s]) => {
      if (!('shadowRadius' in s)) return `  --haquick-shadow-${level}: none;`;
      const { shadowOpacity, shadowRadius, shadowOffset } = s;
      const alpha = Math.round(Math.min(1, shadowOpacity * opacityScale) * 1000) / 1000;
      return `  --haquick-shadow-${level}: 0 ${shadowOffset.height}px ${shadowRadius}px rgba(${color},${alpha});`;
    })
    .join('\n');
}

function geometryVars(config: ThemeConfig): string {
  const { radii: radiusTokens, shape } = config;
  return [
    ...Object.entries(radiusTokens).map(([k, v]) => `  --haquick-${k}: ${v}px;`),
    `  --haquick-borderWidth: ${shape.borderWidth}px;`,
    `  --haquick-controlBorderWidth: ${shape.controlBorderWidth}px;`,
    ...Object.entries(BUTTON_SIZES).flatMap(([s, v]) => [
      `  --haquick-btn-${s}-padY: ${v.padY}px;`,
      `  --haquick-btn-${s}-padX: ${v.padX}px;`,
      `  --haquick-btn-${s}-font: ${v.font}px;`,
      `  --haquick-btn-${s}-line: ${v.line}px;`,
    ]),
    ...Object.entries(CHECKBOX_SIZES).map(([s, v]) => `  --haquick-cb-${s}: ${v}px;`),
  ].join('\n');
}

/**
 * Seletor de um par (tema, scheme).
 *
 * O tema padrão fica em `:root` para a biblioteca funcionar sem provider, e
 * por isso NÃO ganha também um bloco `[data-theme="…"]`: os dois teriam a
 * mesma especificidade e o segundo, vindo depois, venceria o bloco escuro.
 *
 * Os demais dependem da ordem de emissão — o tema padrão primeiro — porque
 * `[data-theme="natal"]` e `[data-scheme="dark"]` empatam em especificidade.
 * O par completo tem um atributo a mais, então ganha dos dois.
 */
export function selectorFor(key: string, scheme: Scheme, defaultTheme: string): string {
  if (key === defaultTheme) return scheme === 'light' ? ':root' : `[data-scheme="${scheme}"]`;
  return scheme === 'light'
    ? `[data-theme="${key}"]`
    : `[data-theme="${key}"][data-scheme="${scheme}"]`;
}

export function generateThemeCSS(
  themes: ThemeMap = { [DEFAULT_THEME]: defaultThemeConfig },
  defaultTheme?: string
): string {
  const keys = Object.keys(themes);
  const fallback = defaultTheme && themes[defaultTheme] ? defaultTheme : (keys[0] ?? DEFAULT_THEME);
  const ordered = [fallback, ...keys.filter((k) => k !== fallback)].filter((k) => themes[k]);

  const blocks = ordered.flatMap((key) => {
    const config = themes[key];
    return SCHEMES.map((scheme) => {
      const body = [
        `  color-scheme: ${scheme};`,
        toVars(config.themes[scheme]),
        scheme === 'light' ? geometryVars(config) : null,
        shadowVarsFor(config.themes[scheme], config.shadows, config.shadowOpacityScale[scheme]),
      ]
        .filter(Boolean)
        .join('\n');
      return `${selectorFor(key, scheme, fallback)} {\n${body}\n}`;
    });
  });

  const intents = [
    ...new Set(
      ordered.flatMap((k) => [
        ...intentsOf(themes[k].themes.light),
        ...intentsOf(themes[k].themes.dark),
      ])
    ),
  ];

  return [...blocks, intentRules(intents)].join('\n\n');
}
