import type { ColorIntent } from './palette';

// Estilo de superfície: em quase todo componente interativo a cor ("intent")
// e o preenchimento ("variant") são eixos independentes — `error` + `outline`
// tem que dar botão de borda vermelha, não botão vermelho.
//
// O Tamagui resolve variantes na ordem em que as props chegam, então duas
// variantes estáticas mexendo em `backgroundColor` se sobrescreveriam de forma
// imprevisível. Por isso `intent` é sempre uma variante *funcional* que lê
// `props.variant` e devolve o par já combinado — e essa combinação mora aqui,
// para Button, IconButton, Chip e Alert pintarem igual.
export type SurfaceVariant = 'solid' | 'soft' | 'outline' | 'ghost';

export function intentSurface(intent: ColorIntent, variant: SurfaceVariant, interactive = true) {
  // Hover/press de variantes transparentes usam os tokens do tema (e não um
  // shade claro da intenção) para continuarem legíveis no tema dark.
  const subtleStates = interactive
    ? {
        hoverStyle: { backgroundColor: '$backgroundHover' },
        pressStyle: { backgroundColor: '$backgroundPress' },
      }
    : {};

  switch (variant) {
    // Superfície tingida (o "standard" do Alert / "tonal" do Material 3).
    // Fundo e texto vêm de slots que variam por tema, então funciona nos dois.
    case 'soft':
      return {
        backgroundColor: `$${intent}Soft`,
        borderColor: `$${intent}Soft`,
        ...(interactive
          ? {
              hoverStyle: { backgroundColor: `$${intent}SoftHover` },
              pressStyle: { backgroundColor: `$${intent}SoftHover` },
            }
          : {}),
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderColor: `$${intent}`,
        ...subtleStates,
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        ...subtleStates,
      };
    default:
      return {
        backgroundColor: `$${intent}`,
        borderColor: `$${intent}`,
        ...(interactive
          ? {
              hoverStyle: { backgroundColor: `$${intent}Hover` },
              pressStyle: { backgroundColor: `$${intent}Press` },
            }
          : {}),
      };
  }
}

// Cor do conteúdo (texto/ícone) que fica em cima da superfície acima.
export function intentContent(intent: ColorIntent, variant: SurfaceVariant) {
  if (variant === 'solid') return { color: `$${intent}ContrastText` };
  if (variant === 'soft') return { color: `$${intent}SoftText` };
  return { color: `$${intent}` };
}

// A segunda posição das variantes funcionais do Tamagui recebe `{ props, theme,
// tokens... }`. Só precisamos de `props`, e tipá-la aqui evita repetir o `any`
// em cada componente.
export type VariantExtras = { props: Record<string, unknown> };

export function surfaceVariantOf(props: Record<string, unknown>, fallback: SurfaceVariant = 'solid') {
  return (props.variant as SurfaceVariant) ?? fallback;
}
