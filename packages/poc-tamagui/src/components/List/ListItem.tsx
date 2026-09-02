import type { ReactNode } from 'react';
import type { GetProps } from '@tamagui/core';
import { View, Text, styled } from '@tamagui/core';
import { shape } from '../../config/shape';

export const ListItemFrame = styled(View, {
  name: 'ListItem',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$3',
  paddingVertical: '$3',
  paddingHorizontal: '$4',
  borderBottomWidth: shape.borderWidth,
  borderBottomColor: '$borderColor',
  backgroundColor: '$background',
  hoverStyle: { backgroundColor: '$backgroundHover' },
  pressStyle: { backgroundColor: '$backgroundPress' },
});

export type ListItemProps = GetProps<typeof ListItemFrame> & {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export function ListItem({ title, subtitle, leading, trailing, ...rest }: ListItemProps) {
  return (
    <ListItemFrame {...rest}>
      <View flexDirection="row" alignItems="center" gap="$3" flexShrink={1}>
        {leading}
        <View flexShrink={1}>
          <Text fontSize={15} fontWeight="600" color="$color">
            {title}
          </Text>
          {subtitle ? (
            <Text fontSize={13} color="$neutral">
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      {trailing}
    </ListItemFrame>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
ListItemFrame.displayName = 'ListItemFrame';
