import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, XStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Avatar',
};

export default meta;

type Story = StoryObj;

export const Initials: Story = {
  decorators: [
    (Story) => (
      <XStack gap={2} align="center">
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      <Avatar size="sm" initials="AS" />
      <Avatar size="md" initials="BC" intent="secondary" />
      <Avatar size="lg" initials="CN" intent="success" />
    </>
  ),
};

export const WithImage: Story = {
  decorators: [
    (Story) => (
      <XStack gap={2} align="center">
        <Story />
      </XStack>
    ),
  ],
  render: () => (
    <>
      <Avatar size="lg" src="https://i.pravatar.cc/96?img=5" label="Ana Silva" />
      <Avatar size="lg" initials="SF" label="Sem foto" />
    </>
  ),
};
