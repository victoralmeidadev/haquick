import { createContext, useContext, useMemo, type CSSProperties, type ReactNode } from 'react';
import { ALIGN_CSS, JUSTIFY_CSS, type Align, type Justify } from '../core/layout';
import { space, type SpaceStep } from '../tokens/spacing';
import { applyTheme } from './theme';
import './components.css';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Quantas colunas o item ocupa. `auto` = largura do conteúdo, `grow` = sobra. */
export type GridSpan = number | 'auto' | 'grow';

export type GridSize = GridSpan | Partial<Record<Breakpoint, GridSpan>>;

export type GridOffset = number | Partial<Record<Breakpoint, number>>;

/**
 * Larguras mínimas de cada breakpoint, em px — as mesmas do MUI.
 *
 * Estão aqui e nas media queries do components.css. Mudar exige mudar nos dois
 * lugares: media query não lê custom property.
 */
export const BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export type GridProps = {
  children?: ReactNode;
  /** Vira container de grade. Sem isto, o Grid é só item. */
  container?: boolean;
  /** Espaçamento entre itens, na escala. Atalho para rowSpacing + columnSpacing. */
  spacing?: SpaceStep;
  rowSpacing?: SpaceStep;
  columnSpacing?: SpaceStep;
  /** Colunas do container. Default 12. */
  columns?: number;
  /** Quantas colunas o item ocupa — número, `auto`, `grow` ou um valor por breakpoint. */
  size?: GridSize;
  /** Colunas vazias antes do item. */
  offset?: GridOffset;
  align?: Align;
  justify?: Justify;
  /** Default: true. */
  wrap?: boolean;
  padding?: SpaceStep;
};

type Vars = Record<string, string | number>;

const GridContext = createContext<{ columns: number; columnGap: number }>({
  columns: 12,
  columnGap: 0,
});

const isResponsive = <T,>(v: unknown): v is Partial<Record<Breakpoint, T>> =>
  typeof v === 'object' && v !== null;

function spanVars(size: GridSize | undefined): Vars {
  if (size === undefined) return {};
  const vars: Vars = {};

  const put = (bp: Breakpoint, value: GridSpan) => {
    vars[`--haquick-s-${bp}`] = value === 'auto' || value === 'grow' ? 'auto' : value;
    vars[`--haquick-g-${bp}`] = value === 'grow' ? 1 : 0;
  };

  if (isResponsive<GridSpan>(size)) {
    (Object.keys(size) as Breakpoint[]).forEach((bp) => {
      const value = size[bp];
      if (value !== undefined) put(bp, value);
    });
  } else {
    put('xs', size);
  }

  return vars;
}

function offsetVars(offset: GridOffset | undefined): Vars {
  if (offset === undefined) return {};
  if (isResponsive<number>(offset)) {
    const vars: Vars = {};
    (Object.keys(offset) as Breakpoint[]).forEach((bp) => {
      const value = offset[bp];
      if (value !== undefined) vars[`--haquick-o-${bp}`] = value;
    });
    return vars;
  }
  return { '--haquick-o-xs': offset };
}

export function Grid({
  children,
  container,
  spacing,
  rowSpacing,
  columnSpacing,
  columns = 12,
  size,
  offset,
  align,
  justify,
  wrap = true,
  padding,
}: GridProps) {
  applyTheme();

  const parent = useContext(GridContext);
  const columnGap = space(columnSpacing ?? spacing) ?? 0;
  const rowGap = space(rowSpacing ?? spacing) ?? 0;

  const style: CSSProperties & Vars = {
    ...spanVars(size),
    ...offsetVars(offset),
    '--haquick-grid-cgap': `${parent.columnGap}px`,
    '--haquick-grid-columns': parent.columns,
  };

  if (container) {
    style.columnGap = columnGap;
    style.rowGap = rowGap;
    if (align) style.alignItems = ALIGN_CSS[align];
    if (justify) style.justifyContent = JUSTIFY_CSS[justify];
    if (!wrap) style.flexWrap = 'nowrap';
  }

  if (padding !== undefined) style.padding = space(padding);

  const node = (
    <div className={container ? 'haquick-grid haquick-gi' : 'haquick-gi'} style={style}>
      {children}
    </div>
  );

  const value = useMemo(() => ({ columns, columnGap }), [columns, columnGap]);

  return container ? <GridContext.Provider value={value}>{node}</GridContext.Provider> : node;
}
