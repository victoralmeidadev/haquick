export type Anchor = { id: string; label: string };
export type NavItem = { id: string; label: string; anchors?: Anchor[] };
export type NavGroup = { group: string; items: NavItem[] };

export const NAV: NavGroup[] = [
  {
    group: 'Começando',
    items: [
      { id: 'installation', label: 'Instalação' },
      { id: 'web', label: 'Setup web' },
      { id: 'native', label: 'Setup native' },
      { id: 'entry-points', label: 'Entry points' },
    ],
  },
  {
    group: 'Componentes',
    items: [
      {
        id: 'action',
        label: 'Ação',
        anchors: [
          { id: 'button', label: 'Button' },
          { id: 'icon-button', label: 'IconButton' },
          { id: 'link', label: 'Link' },
        ],
      },
      {
        id: 'form',
        label: 'Formulário',
        anchors: [
          { id: 'input', label: 'Input' },
          { id: 'label', label: 'Label + HelperText' },
          { id: 'controls', label: 'Checkbox, Radio, Switch' },
        ],
      },
      {
        id: 'data',
        label: 'Exibição de dados',
        anchors: [
          { id: 'badge-chip', label: 'Badge e Chip' },
          { id: 'avatar', label: 'Avatar' },
          { id: 'list', label: 'List e ListItem' },
          { id: 'timeline', label: 'Timeline' },
        ],
      },
      {
        id: 'feedback',
        label: 'Feedback',
        anchors: [
          { id: 'alert', label: 'Alert' },
          { id: 'loading', label: 'Spinner, Progress, Skeleton' },
        ],
      },
      {
        id: 'layout',
        label: 'Layout',
        anchors: [
          { id: 'stacks', label: 'XStack e YStack' },
          { id: 'divider-spacer', label: 'Divider e Spacer' },
          { id: 'card', label: 'Card' },
          { id: 'card-parts', label: 'Partes do Card' },
        ],
      },
      {
        id: 'overlay',
        label: 'Sobreposição',
        anchors: [
          { id: 'dialog', label: 'Dialog' },
          { id: 'bottom-sheet', label: 'BottomSheet' },
        ],
      },
      {
        id: 'motion',
        label: 'Movimento',
        anchors: [
          { id: 'fade', label: 'Fade' },
          { id: 'collapse', label: 'Collapse' },
          { id: 'accordion', label: 'Accordion' },
        ],
      },
      {
        id: 'web-only',
        label: 'Exclusivo de web',
        anchors: [
          { id: 'grid', label: 'Grid' },
          { id: 'table', label: 'DataTable' },
          { id: 'tooltip', label: 'Tooltip' },
        ],
      },
    ],
  },
  {
    group: 'Customização',
    items: [
      { id: 'theme', label: 'Tema' },
      { id: 'named-themes', label: 'Temas nomeados' },
      { id: 'palette', label: 'Paleta' },
      { id: 'intents', label: 'Intenções' },
      { id: 'runtime-themes', label: 'Claro e escuro' },
      { id: 'borders', label: 'Bordas' },
      { id: 'shadows', label: 'Sombras' },
    ],
  },
];

export const DEFAULT_SECTION = 'installation';

export const ALL_ITEMS = NAV.flatMap((g) => g.items);
