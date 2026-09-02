import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { XStack, YStack } from '../Stack';

const meta: Meta<typeof Tooltip> = {
  title: 'Web Only/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <YStack padding="$8" align="start">
      <Tooltip label="Salva sem sair da página">
        <Button>Salvar</Button>
      </Tooltip>
    </YStack>
  ),
};

export const Placements: Story = {
  render: () => (
    <XStack gap="$8" padding="$8" align="center">
      <Tooltip label="Acima" placement="top">
        <IconButton label="Acima" variant="outline" intent="primary">
          ↑
        </IconButton>
      </Tooltip>
      <Tooltip label="Abaixo" placement="bottom">
        <IconButton label="Abaixo" variant="outline" intent="primary">
          ↓
        </IconButton>
      </Tooltip>
      <Tooltip label="À esquerda" placement="left">
        <IconButton label="Esquerda" variant="outline" intent="primary">
          ←
        </IconButton>
      </Tooltip>
      <Tooltip label="À direita" placement="right">
        <IconButton label="Direita" variant="outline" intent="primary">
          →
        </IconButton>
      </Tooltip>
    </XStack>
  ),
};
