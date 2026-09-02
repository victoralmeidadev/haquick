import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { HelperText } from '../HelperText';
import { Input } from '../Input';
import { YStack } from '../Stack';

const meta: Meta<typeof Label> = {
  title: 'Common/Label',
  component: Label,
  args: { children: 'E-mail' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};

// Label + Input + HelperText são os três átomos que formam um campo completo.
export const FieldWithHelper: Story = {
  render: () => (
    <YStack gap="$2" width={320}>
      <Label required>E-mail</Label>
      <Input placeholder="voce@empresa.com" />
      <HelperText>Usamos só para enviar o recibo.</HelperText>
    </YStack>
  ),
};

export const FieldWithError: Story = {
  render: () => (
    <YStack gap="$2" width={320}>
      <Label required>E-mail</Label>
      <Input placeholder="voce@empresa.com" defaultValue="não-é-email" error />
      <HelperText error>Informe um e-mail válido.</HelperText>
    </YStack>
  ),
};
