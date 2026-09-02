import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from '@tamagui/core';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Common/Divider',
  component: Divider,
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <View width={280}>
      <Text>Acima</Text>
      <Divider marginVertical={12} />
      <Text>Abaixo</Text>
    </View>
  ),
};
