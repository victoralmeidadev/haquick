import { View, styled } from '@tamagui/core';
import { shape } from '../../config/shape';

export const List = styled(View, {
  name: 'List',
  flexDirection: 'column',
  borderColor: '$borderColor',
  borderWidth: shape.borderWidth,
  borderRadius: '$radiusMd',
  overflow: 'hidden',
  backgroundColor: '$background',
});

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
List.displayName = 'List';
