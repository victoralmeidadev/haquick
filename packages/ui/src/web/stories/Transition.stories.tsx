import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, Button, Card, Collapse, Fade, Typography, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Transition',
};

export default meta;

type Story = StoryObj;

export const FadeAndCollapse: Story = {
  render: () => {
    const [fade, setFade] = useState(true);
    const [open, setOpen] = useState(false);

    return (
    <YStack gap={3} width={420}>
      <XStack gap={2}>
        <Button size="sm" onPress={() => setFade((v) => !v)}>Fade</Button>
        <Button size="sm" variant="outline" intent="neutral" onPress={() => setOpen((v) => !v)}>
          Collapse
        </Button>
      </XStack>

      <Fade visible={fade}>
        <Card raised={1}>
          <Typography variant="body2">Transição de opacidade.</Typography>
        </Card>
      </Fade>

      <Collapse open={open}>
        <Card raised={1}>
          <Typography variant="body2">
            Altura medida com ResizeObserver — altura automática não interpola.
          </Typography>
        </Card>
      </Collapse>
    </YStack>
    );
  },
};

export const SingleOpenAccordion: Story = {
  render: () => (
    <YStack width={420}>
      <Accordion>
        <AccordionItem first title="O que é universal?" defaultOpen>
          As props. A implementação é escrita uma vez por plataforma.
        </AccordionItem>
        <AccordionItem title="Preciso de react-native-web?">
          Não. Na web os componentes são HTML com CSS.
        </AccordionItem>
        <AccordionItem title="E o compilador?">
          Não existe. Vite e Metro padrão.
        </AccordionItem>
      </Accordion>
    </YStack>
  ),
};
