import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Collapse, Fade } from './Transition';
import { Button } from '../Button';
import { Card } from '../Card';
import { Typography } from '../Typography';
import { XStack, YStack } from '../Stack';

const meta: Meta = {
  title: 'Common/Transition',
};

export default meta;

type Story = StoryObj;

export const FadeDemo: Story = {
  name: 'Fade',
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <YStack gap="$3" width={320}>
        <XStack gap="$2">
          <Button size="sm" onPress={() => setVisible((v) => !v)}>
            {visible ? 'Esconder' : 'Mostrar'}
          </Button>
        </XStack>
        <Fade visible={visible} speed="medium">
          <Card raised={2}>
            <Typography variant="body2">Some e volta pela opacidade.</Typography>
          </Card>
        </Fade>
      </YStack>
    );
  },
};

export const FadeUnmounting: Story = {
  name: 'Fade (unmountOnExit)',
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <YStack gap="$3" width={320}>
        <Button size="sm" onPress={() => setVisible((v) => !v)}>
          {visible ? 'Esconder' : 'Mostrar'}
        </Button>
        <Fade visible={visible} unmountOnExit>
          <Card raised={2}>
            <Typography variant="body2">
              Com unmountOnExit some da árvore, então o espaço no layout é liberado.
            </Typography>
          </Card>
        </Fade>
        <Typography variant="caption" intent="neutral">
          Este texto sobe quando o card sai.
        </Typography>
      </YStack>
    );
  },
};

export const CollapseDemo: Story = {
  name: 'Collapse',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <YStack gap="$3" width={340}>
        <Button size="sm" onPress={() => setOpen((v) => !v)}>
          {open ? 'Fechar' : 'Abrir'}
        </Button>
        <Collapse open={open}>
          <Card raised={1} gap="$2">
            <Typography variant="subtitle2">Conteúdo medido</Typography>
            <Typography variant="body2" intent="neutral">
              A altura é medida com onLayout e animada de 0 até o valor real. Altura automática
              não interpola em nenhuma das duas plataformas.
            </Typography>
          </Card>
        </Collapse>
      </YStack>
    );
  },
};
