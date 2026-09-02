import type { ReactNode } from 'react';

export type ScreenProps = {
  children?: ReactNode;
  /** Largura máxima do conteúdo, centralizado. Sem valor, ocupa tudo. */
  maxWidth?: number;
  /** Padding padrão da tela. Desligue para telas que sangram até a borda. */
  padded?: boolean;
  /**
   * Rolagem própria. No native vira ScrollView; na web quem rola é o documento,
   * então isto só afeta o mobile.
   */
  scroll?: boolean;
};
