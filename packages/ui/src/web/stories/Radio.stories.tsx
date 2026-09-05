import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Radio',
};

export default meta;

type Story = StoryObj;

export const Column: Story = {
  render: () => (
    <RadioGroup defaultValue="pix">
      <Radio value="pix" label="Pix" />
      <Radio value="boleto" label="Boleto" />
      <Radio value="cartao" label="Cartão de crédito" />
    </RadioGroup>
  ),
};

export const Row: Story = {
  render: () => (
    <RadioGroup defaultValue="pix" direction="row">
      <Radio value="pix" label="Pix" />
      <Radio value="boleto" label="Boleto" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  decorators: [
    (Story) => (
      <YStack gap={3}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <RadioGroup defaultValue="a" disabled>
      <Radio value="a" label="Grupo inteiro desabilitado" />
      <Radio value="b" label="Segunda opção" />
    </RadioGroup>
  ),
};
