import type { ReactNode } from 'react';

export type SnapPoint = number | `${number}%`;

export type BottomSheetProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  /**
   * Alturas de parada, da menor para a maior.
   *
   * No native o usuário arrasta entre elas. Na web não há gesto: a primeira
   * parada vira a altura da folha e as demais são ignoradas.
   */
  snapPoints?: SnapPoint[];
  /** Esconde a alça de arraste (só tem efeito no native). */
  hideHandle?: boolean;
  /** Fecha ao tocar fora ou arrastar para baixo. */
  dismissible?: boolean;
};

export const DEFAULT_SNAP_POINTS: SnapPoint[] = ['50%'];

/**
 * O que fazer com o modal, dado o estado pedido e o que está apresentado.
 *
 * Fica separado do componente porque o Gorhom não tolera `dismiss()` fora de
 * apresentação: a chamada não lança, mas deixa o modal surdo a todo `present()`
 * seguinte, sem erro nem log. Um efeito ingênuo (`open ? present : dismiss`)
 * cai nisso duas vezes — na montagem, com o modal ainda não apresentado, e
 * quando a folha se fecha sozinha e o estado volta a false com ela já fechada.
 *
 * A regra é de três linhas e custou dois dias de depuração em device, então
 * mora aqui, onde um teste alcança sem React Native.
 */
export function sheetAction(open: boolean, presented: boolean): 'present' | 'dismiss' | null {
  if (open === presented) return null;
  return open ? 'present' : 'dismiss';
}

/** Converte uma parada em altura CSS. Usado só pela web. */
export function snapToCSS(point: SnapPoint): string {
  return typeof point === 'number' ? `${point}px` : point;
}
