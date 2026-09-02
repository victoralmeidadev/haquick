import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Common/Radio',
  component: RadioGroup,
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="pix">
      <Radio value="pix" label="Pix" />
      <Radio value="boleto" label="Boleto" />
      <Radio value="cartao" label="Cartão de crédito" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="sim" direction="row" intent="success">
      <Radio value="sim" label="Sim" />
      <Radio value="nao" label="Não" />
      <Radio value="talvez" label="Talvez" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="a" disabled>
      <Radio value="a" label="Opção A" />
      <Radio value="b" label="Opção B" />
    </RadioGroup>
  ),
};
